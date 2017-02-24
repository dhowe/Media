/**
 * DTVideos
 * @author rbenjamin@digitaltrends.com
 */
(function() {
	'use strict';


	/**
	 * Quick and dirty extender.
	 * @param {...Object} data
	 * @return {Object}
	 */
	var extend = function(data) {
		var out = {};

		for (var i = 0, l = arguments.length; i < l; i++) {
			if (!arguments[i]) {
				continue;
			}

			for (var k in arguments[i]) {
				if (arguments[i].hasOwnProperty(k)) {
					out[k] = arguments[i][k];
				}
			}
		}

		return out;
	};


	/**
	 * Register a player.
	 * @param {Object} player
	 */
	var registerPlayer = function(player) {
		DTVideos.players.push(player);
	};


	/**
	 * Remove a player.
	 * @param {Object} player
	 */
	var unregisterPlayer = function(player) {
		var i = DTVideos.players.length;
		while(i--) {
			if (DTVideos.players[i] === player) {
				DTVideos.players.splice(i, 1);
			}
		}
	};


	/**
	 * Stop all players except provided.
	 * @param {Object} player
	 */
	var pauseAll = function(player) {
		var i = DTVideos.players.length;
		while(i--) {
			if (DTVideos.players[i] !== player) {
				DTVideos.players[i].pause(true);
			}
		}
	};


	/**
	 * Construct jw platform video url.
	 * @param {string} content_id
	 * @return {string}
	 */
	var jwplayerFile = function(content_id, width) {
		var w = parseInt(width) || 1280;

		return (content_id) ? 'http://content.jwplatform.com/videos/' + content_id + '-' + w + '.mp4' : '';
	};


	/**
	 * Construct jw platform sources array.
	 * @param {string} content_id
	 * @param {int} width
	 * @return {Object[]}
	 */
	var jwplayerSources = function(content_id, width) {
		var w = parseInt(width) || 1280;

		var map = [
			['Web', 480],
			['SD', 720],
			['HD', 1280],
		];

		var sources = [];

		for (var i = 0, l = map.length; i < l; i++) {
			sources.push({
				file: DTVideos.jwplayerFile(content_id, map[i][1]),
				label: map[i][0],
			});
		}

		for (var i = 0, l = map.length; i < l; i++) {
			if (w <= map[i][1]) {
				sources[i].default = true;
				break;
			}

			if (i === l - 1) {
				sources[i].default = true;
			}
		}

		return sources;
	};


	/**
	 * Construct jw platform image url.
	 * @param {string} content_id
	 * @return {string}
	 */
	var jwplayerImage = function(content_id) {
		return (content_id) ? 'http://content.jwplatform.com/thumbs/' + content_id + '.jpg' : '';
	};


	/**
	 * Construct jw platform related content url
	 * @param {string} content_id
	 * @return {string}
	 */
	var jwplayerRelatedXml = function(content_id) {
		return (content_id) ? 'http://content.jwplatform.com/related6/' + content_id + '.xml' : '';
	};


	/**
	 * Construct jw platform feed url
	 * @param  {string} content_id
	 * @return {string}
	 */
	var jwplayerFeed = function(content_id) {
		return (content_id) ? 'http://content.jwplatform.com/feeds/' + content_id + '.rss' : '';
	};


	/**
	 * Jwplayer
	 * @todo This object constructor should be private and use a factory method on DTVideos instead
	 */
	var Jwplayer = function(container_id, call_jw_args, call_dt_args) {
		container_id = container_id || '';
		call_jw_args = call_jw_args || {};
		call_dt_args = call_dt_args || {};

		var self = this;

		var default_jw_args = {
			aspectratio: '16:9',
			autostart:   false,
			ga:          { idstring: 'title', label: 'mediaid' },
			image:       '',
			mute:        false,
			playlist:    '',
			primary:     'html5',
			related:     null,
			sharing:     { code: '<script src="//content.jwplatform.com/players/MEDIAID-83w7PVgg.js"></script>' },
			skin:        { name: 'dt' },
			width:       '100%',
		};

		var default_dt_args = {
			content_id:    '',
			discovery:     false,
			playlist:      [],
			quality:       null,
		};

		var jw_args = extend(default_jw_args, call_jw_args);
		var dt_args = extend(default_dt_args, call_dt_args);

		var player            = null;
		var container_el      = null;
		var ready             = false;
		var discovery_fetched = false;
		var playlist          = [];


		/**
		 * Go get discovery.
		 * @todo We should attempt to give control back to the jw platform player settings now that they don't suck.
		 */
		var appendDiscovery = function() {
			if (!window.XMLHttpRequest && window.ajaxurl) {
				return;
			}

			if (!dt_args.content_id) {
				return;
			}

			if (discovery_fetched) {
				return;
			}

			discovery_fetched = true;

			var xhr = new XMLHttpRequest();
			xhr.open('GET', encodeURI(window.ajaxurl + '?action=dtvideos_jwplayer_discovery&content_id=' + dt_args.content_id + '&type=playlist&width=640'));
			xhr.onload = function() {
				if (xhr.status !== 200) {
					return;
				}

				var response = JSON.parse(xhr.responseText);

				if (response.status !== 'OK' || !response.data) {
					return;
				}

				var data = response.data;
				for (var i = 0, l = data.length; i < l; i++) {
					if (data[i].file) {
						var item = {};
						item.file = data[i].file;

						if (data[i].image) {
							item.image = data[i].image;
						}

						playlist.push(item);
					}
				}
			};
			xhr.send();
		};


		/**
		 * Get jwplayer player.
		 * @return {Object}
		 */
		self.get_original_player = function() {
			if (player) {
				return player;
			}

			return null;
		};


		/**
		 * Hit play.
		 * @param {bool} play
		 */
		self.play = function(play) {
			play = (typeof play !== 'undefined') ? !!play : true;

			if (player) {
				if (ready) {
					player.play(play);
				} else {
					player.on('ready', function() {
						player.play(play);
					});
				}
			}
		};


		/**
		 * Hit pause.
		 * @param {bool} play
		 */
		self.pause = function(pause) {
			pause = (typeof pause !== 'undefined') ? !!pause : true;

			if (player) {
				if (ready) {
					player.pause(pause);
				} else {
					player.on('ready', function() {
						player.pause(pause);
					});
				}
			}
		};


		/**
		 * Remove the player.
		 * @todo Make this a factory method on DTVideos, instead of reaching out to unregister.
		 * @param {function} callback - Called after player is removed.
		 */
		self.remove = function(callback) {
			if (!player) {
				return;
			}

			player.once('remove', function() {
				if (typeof callback === 'function') {
					callback();
				}
			});

			if (player.getState() === 'buffering') { // trying to pause, stop, or remove during initial buffering leads to phantom audio
				var removed = false;

				player
					.once('stop', function() {
						if (!removed) {
							removed = true;
							player.remove();
						}
					})
					.once('pause', function() {
						if (!removed) {
							removed = true;
							player.remove();
						}
					})
					.once('adPause', function() {
						if (!removed) {
							removed = true;
							player.remove();
						}
					})
					.once('firstFrame', function() {
						player.pause(true);
						player.stop();
					})
					.once('adImpression', function() {
						player.pause(true);
						player.stop();
					})
					.once('adStarted', function() {
						player.pause(true);
						player.stop();
					})
					.once('time', function() {
						player.pause(true);
						player.stop();
					})
					.once('adTime', function() {
						player.pause(true);
						player.stop();
					});

				player.pause(true);
				player.stop();

				unregisterPlayer(player);
			} else {
				if (ready) {
					player.pause(true);
					player.stop();

					unregisterPlayer(player);

					setTimeout(function() {
						player.remove();
					}, 10);
				} else {
					player.on('ready', function() {
						player.pause(true);
						player.stop();

						unregisterPlayer(player);

						setTimeout(function() {
							player.remove();
						}, 10);
					});
				}
			}
		};


		/**
		 * Get state from player.
		 * @return {string}
		 */
		self.get_state = function() {
			if (player) {
				return player.getState();
			}

			return '';
		};


		/**
		 * Load a jw platform video into the player.
		 * @param {string} content_id
		 */
		self.load = function(content_id) {
			if (player && content_id) {
				var container_width = null;
				if (container_el) {
					container_width = container_el.getBoundingClientRect().width || container_width;
				}

				player.load({
					image: DTVideos.jwplayerImage(content_id),
					sources: DTVideos.jwplayerSources(content_id, container_width),
				});
			}
		};


		/**
		 * Resize the player.
		 * @param {int|string} width
		 * @param {int|string} height
		 */
		self.resize = function(width, height) {
			width = width || '100%';
			height = height || '100%';

			if (player && player.resize) {
				player.resize(width, height);
			}
		};


		(function() {
			if (!window.jwplayer || !container_id) {
				return;
			}

			container_el = document.getElementById(container_id);

			if (!container_el) {
				return;
			}

			// import advertising args
			if (!jw_args.advertising && window.dtv_jwplayer_advertising) {
				jw_args.advertising = window.dtv_jwplayer_advertising;
			}

			// create assets from content_id
			if (dt_args.content_id) {
				// removing 'playlist' prop if  we have a content_id and its likely an rss url, playlist overrides 'file' and 'sources' props in jw
				// TODO: try out json feeds, they have more sizes if we really need this, but it looks like a single video feed so probably not.
				// NOTE: per brandon this was done as a way of skirting an issue with not playing HD due to bit rate, atm HD is working great with sources.
				if (typeof jw_args.playlist === 'string') {
					jw_args.playlist = null;
				}

				if (!jw_args.file && !jw_args.sources) {
					var container_width = (typeof jw_args.width === 'number' && jw_args.width) ? jw_args.width : container_el.getBoundingClientRect().width || null;

					jw_args.sources = DTVideos.jwplayerSources(dt_args.content_id, container_width);
				}

				if (!jw_args.image) {
					jw_args.image = DTVideos.jwplayerImage(dt_args.content_id);
				}

				// NOTE: If related.property is set here or set to null, it will ignore the setting in the jwplayer admin.
				// TODO: No shit, we should get rid of all this crap and let jwplayer platform handle it.
				/*
				if (!jw_args.related) {
					jw_args.related = DTVideos.jwplayerRelatedXml(dt_args.content_id);
				}
				*/
			}

			// move related string into a proper object
			if (jw_args.related && typeof jw_args.related === 'string') {
				jw_args.related = { onclick: 'play', file: jw_args.related };
			}

			// start jwplayer
			player = jwplayer(container_id).setup(jw_args).on('ready', function() {
				ready = true;
			});

			// no fun stuff if we can't even get a player back
			if (!player) {
				return;
			}

			// TODO: This should be moved to the a factory method on DTVideos instead.
			registerPlayer(player);

			// stop other players when this one plays
			// TODO: This should originate from factory level too.
			player
				.on('play', function(evt) {
					DTVideos.pauseAll(player);
				})
				.on('adPlay', function(evt) {
					DTVideos.pauseAll(player);
				});

			//hook up to generic event proxy if available
			if (typeof onJWPlayerEvent === 'function') {
				player
					.on('ready', function(){
						onJWPlayerEvent('onReady', player, []);
					})
					.on('playlist', function(evt) {
						onJWPlayerEvent('onPlaylist', player, [evt.playlist]);
					})
					.on('playlistItem', function(evt) {
						onJWPlayerEvent('onPlaylistItem', player, [evt.index, evt.playlist]);
					})
					.on('playlistComplete', function(evt) {
						onJWPlayerEvent('onPlaylistComplete', player, []);
					})
					.on('bufferChange', function(evt) {
						onJWPlayerEvent('onBufferChange', player, [evt.buffer]);
					})
					.on('firstFrame', function(){
						onJWPlayerEvent('onFirstFrame', player, []);
					})
					.on('play', function(evt) {
						onJWPlayerEvent('onPlay', player, [evt.oldstate]);
					})
					.on('pause', function(evt) {
						onJWPlayerEvent('onPause', player, [evt.oldstate]);
					})
					.on('buffer', function(evt) {
						onJWPlayerEvent('onBuffer', player, [evt.oldstate]);
					})
					.on('idle', function(evt) {
						onJWPlayerEvent('onIdle', player, [evt.oldstate]);
					})
					.on('complete', function(evt) {
						onJWPlayerEvent('onComplete', player, []);
					})
					.on('error', function(evt) {
						onJWPlayerEvent('onError', player, [evt.message]);
					})
					.on('seek', function(evt) {
						onJWPlayerEvent('onSeek', player, [evt.position, evt.offset]);
					})
					.on('time', function(evt) {
						onJWPlayerEvent('onTime', player, [evt.duration ,evt.position]);
					})
					.on('mute', function(evt) {
						onJWPlayerEvent('onMute', player, [evt.mute]);
					})
					.on('volume', function(evt) {
						onJWPlayerEvent('onVolume', player, [evt.volume]);
					})
					.on('fullscreen', function(evt) {
						onJWPlayerEvent('onFullscreen', player, [evt.fullscreen]);
					})
					.on('resize', function(evt) {
						onJWPlayerEvent('onResize', player, [evt.width, evt.height]);
					})
					.on('levels', function(evt) {
						onJWPlayerEvent('onQualityLevels', player, [evt.levels]);
					})
					.on('levelsChanged', function(evt) {
						onJWPlayerEvent('onQualityChange', player, [evt.currentQuality]);
					})
					.on('audioTracks', function(evt) {
						onJWPlayerEvent('onAudioTracks', player, [evt.levels]);
					})
					.on('audioTrackChange', function(evt) {
						onJWPlayerEvent('onAudioTrackChange', player, [evt.currentTrack]);
					})
					.on('captionsList', function(evt) {
						onJWPlayerEvent('onCaptionsList', player, [evt.tracks]);
					})
					.on('captionsChanged', function(evt) {
						onJWPlayerEvent('onCaptionsChange', player, [evt.track]);
					})
					.on('controls', function(evt) {
						onJWPlayerEvent('onControls', player, [evt.controls]);
					})
					.on('displayClick', function(evt) {
						onJWPlayerEvent('onDisplayClick', player, []);
					})
					.on('adClick', function(evt) {
						onJWPlayerEvent('onAdClick', player, [evt.tag]);
					})
					.on('adCompanions', function(evt) {
						onJWPlayerEvent('onAdCompanions', player, [evt.tag, evt.companions]);
					})
					.on('adComplete', function(evt) {
						onJWPlayerEvent('onAdComplete', player, [evt.tag]);
					})
					.on('adSkipped', function(evt) {
						onJWPlayerEvent('onAdSkipped', player, [evt.tag]);
					})
					.on('adError', function(evt) {
						onJWPlayerEvent('onAdError', player, [evt.tag, evt.message]);
					})
					.on('adStarted', function(evt) { // VPAID
						onJWPlayerEvent('onAdStarted', player, [evt.tag]);
					})
					.on('adImpression', function(evt) { // VAST and IMA
						onJWPlayerEvent('onAdImpression', player, [evt.tag]);
					})
					.on('adTime', function(evt) {
						onJWPlayerEvent('onAdTime', player, [evt.tag, evt.position, evt.duration, evt.sequence]);
					})
					.on('beforePlay', function(evt) {
						onJWPlayerEvent('onBeforePlay', player, []);
					})
					.on('beforeComplete', function(evt) {
						onJWPlayerEvent('onBeforeComplete', player, [evt.tag]);
					})
					.on('adPause', function(evt) {
						onJWPlayerEvent('onAdPause', player, [evt.tag]);
					})
					.on('adPlay', function(evt) {
						onJWPlayerEvent('onAdPlay', player, [evt.tag]);
					})
					.on('meta', function(evt) {
						onJWPlayerEvent('onMeta', player, [evt.metadata]);
					});
			}

			// play next item in playlist after each item completes
			player.onBeforeComplete(function() {
				if (!playlist.length) {
					return;
				}

				var item = playlist.shift();

				player.load([item]);
				player.play(true);

				// append dt discovery items when end of playlist is reached
				if (dt_args.discovery && !playlist.length) {
					appendDiscovery();
				}
			});

			// add specified playlist items to playlist
			if (dt_args.playlist && dt_args.playlist.length) {
				var data = dt_args.data;
				for (var i = 0, l = data.length; i < l; i++) {
					if (data[i].file) {
						var item = {};
						item.file = data[i].file;

						if (data[i].image) {
							item.image = data[i].image;
						}

						playlist.push(item);
					}
				}
			}

			// append dt discovery items now if there is no playlist
			if (dt_args.discovery && !playlist.length) {
				appendDiscovery();
			}

			// TODO: Myatt, This should have been done in reverse, DTVideos is lower level than DTAds, it can't know about it.
			// single video ad refreshing
			var single_video_el = document.querySelector('body.single-video');

			if (single_video_el) {
				DTEvent.on('jwplayer:onReady', function(evt) {
					if (typeof DTAds !== 'object') {
						console.log('DTVideos: DTAds obj not found');
						return;
					}

					var time = 0;

					setInterval(function() {
						if (time % 30 === 0) {
							DTAds.Ads.refreshEl(single_video_el);

							DTAds.log('DTVidoes: Refreshed all slots.');
						}

						time++;
					}, 1000);
				});
			}
		}());
	};


	window.DTVideos = {
		players:            [],
		pauseAll:           pauseAll,
		jwplayerFile:       jwplayerFile,
		jwplayerSources:    jwplayerSources,
		jwplayerImage:      jwplayerImage,
		jwplayerRelatedXml: jwplayerRelatedXml,
		jwplayerFeed:       jwplayerFeed,
		Jwplayer:           Jwplayer,
	};
}());
