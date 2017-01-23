function thisMovie(movieName) {

    if (window.document[movieName]) {
        return window.document[movieName];
    }
    if (navigator.appName.indexOf("Microsoft Internet") == -1) {
        if (document.embeds && document.embeds[movieName])
            return document.embeds[movieName];
    } else {
        return document.getElementById(movieName);
    }
}

/*
 * 
 * @param {string} content
 * @param {string} size
 * @returns {undefined}
 * @does write content into all companion divs
 */
function writeIntoCompanionDiv(content, size) {
    try {
        if (typeof document.getElementById("AdSlot" + size) === 'object') {
            var element = document.getElementById("AdSlot" + size);
            element.innerHTML = content;
        }
    } catch (e) {
        mi24logger.error("writeIntoCompanionDiv " + e);
    }
}

/*
 * 
 * @param {int} id - video id, id2 - vm id, type - playertype flash/html5
 *
 * @returns {mi24player}
 * 
 */

function mi24playerClazz(id, type, id2) {

//if(typeof videoObj=='undefined') return;
    var playerType = type;
    var videoId = id;
    this.statuscalls = new Array();
    this.lastposition = 0;

    this.videoObj;
    this.flashMovie;
    this.html5Video;

    this.videoNode;
    this.thumbNode;
    this.playbtnNode;
    this.isResponsive = false;
    this.alreadyPlayed = false;

    this.playerDimXY = "512 288";
    this.playertype = playerType;
    this.playerVideoId = id;

    /*## Akamai Media Analytics Test  ##*/
    var viewerId = "";
    var vmId = id2;
    var name = "";
    var value = "";
    var recentFrame = -1;
    var playedBefore = false;

    this.getMovie = function (movieName) {
        if (playerType.match(/flash/i)) {
            return this.flashMovie;
        } else {
            return this.html5Video;
        }
    }

    this.html5PlayerOnPlayPressedStatusEvent = function () {
        if (!playedBefore) {
            playedBefore = true;

            /*var onPlayPressed = new Event('onPlayPressed');
             eval("mi24player_" + videoId).videoNode.dispatchEvent(onPlayPressed);*/

            /*this way is deprecated
             https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
             if it doesn't work anymore try above. Now used because of Android and older iOs
             */
            var event = document.createEvent('Event');
            event.initEvent('onPlayPressed', true, true);
            eval("mi24player_" + videoId).videoNode.dispatchEvent(event);
        }
    }

    this.setPlayerDimXY = function (dim) {
        this.playerDimXY = dim;
    }
    this.getPlayerDimXY = function () {
        return this.playerDimXY;
    }

    /*
     * 
     * @returns {undefined}
     * @does initialization of AKAMAI MEDIA ANALYTICS 
     */

    this.initAkamai = function () {
        viewerId = 'test_MI24';

        try {
            if (playerType == "html5") {
                akamaiSetViewerId(viewerId);

                setAkamaiMediaAnalyticsData("category", videoId, this.html5Video.id);
                setAkamaiMediaAnalyticsData("subCategory", vmId, this.html5Video.id);
                setAkamaiMediaAnalyticsData("vmId", vmId, this.html5Video.id);

                mi24logger.log("##init akamai completed ## video: " + videoId + " videoid: " + this.html5Video.id + " viewerId: " + viewerId + " config:" + AKAMAI_MEDIA_ANALYTICS_CONFIG_FILE_PATH);
            }
        } catch (e) {
            mi24logger.error("mi24player.initAkamai:" + e);
        }
    }

    /*
     * 
     * @param {type} obj
     * @returns {undefined}
     * @does initialize the dom video object
     */
    this.init = function (obj) {

        try {
            mi24logger.log("##init video object## video: " + videoId + " type: " + playerType);
            this.videoObj = obj;


            if (playerType.match(/flash/i)) {
                this.flashMovie = thisMovie(this.videoObj);
                mi24logger.log(this.flashMovie);
            }
            else if (playerType == "html5") {
                this.html5Video = this.videoObj;
                mi24logger.log(this.html5Video);
            }
            this.registerStatusFunction('play', 'mi24player_' + videoId + '.hideFallbackImage()')

        } catch (e) {
            mi24logger.error("mi24player.initVideoObject:" + e);
        }
    };

    this.hideFallbackImage = function () {
        document.getElementById('fallbackImage' + videoId).style.display = 'none';
    };

    /**
     *
     * @param position
     * @returns {boolean}
     */
    this.play = function (position) {
        try {
            if (typeof position == undefined) {
                position = 0;
            }

            if (playerType != "html5") {
                if (typeof position == 'number') {
                    /**
                     *@todo remove when new flashplayer is integrated
                     * workaround to get header info before seek
                     */
                    if (!this.alreadyPlayed) {
                        this.alreadyPlayed = true;
                        this.flashMovie.playFlashMovie();
                        var videoObj = this.flashMovie;
                        setTimeout(function () {
                            doFlashPlayAtWorkaround(videoObj, parseInt(position));
                        }, 400)
                    } else {
                        this.flashMovie.playFlashMovie(parseInt(position));
                    }
                }
                else {
                    this.flashMovie.playFlashMovie();
                }
            }
            else {
                if (position != undefined) {
                    if (this.alreadyPlayed) {
                        this.html5Video.currentTime = parseInt(position);
                        this.html5Video.play(position);
                    } else {
                        // get the header information before first seek
                        this.html5Video.play();
                        this.alreadyPlayed = true;
                        var obj = this;
                        var timerID = setInterval(function () {
                            doHtml5PlayAtWorkaround(timerID, obj, parseInt(position))
                        }, 100);
                    }
                } else {
                    this.html5Video.play();
                }
            }
            return true;

        } catch (e) {
            alert("movie not playable or not available");
            return false;
        }
    }

    /**
     * @param timerID
     * @param obj
     * @param position
     */
    function doHtml5PlayAtWorkaround(timerID, obj, position) {
        var time = obj.getposition();
        if (time > 0.5) {
            obj.html5Video.currentTime = position;
            obj.html5Video.play(position);
            clearInterval(timerID);
        }
    }

    /**
     * @todo remove when new flashplayer is integrated
     * @param videoObject
     * @param position
     */
    function doFlashPlayAtWorkaround(videoObject, position) {
        videoObject.playFlashMovie(position);
    }

    this.pause = function () {
        try {
            if (playerType != "html5") {
                this.flashMovie.pauseFlashMovie();
            }
            else {
                this.html5Video.pause();
            }

        } catch (e) {
            mi24logger.error("mi24player.pause:" + e);
        }
    }


    this.mute = function () {
        try {
            if (playerType != "html5") {
                this.flashMovie.toggleMute();
            }
            else {
                if (this.html5Video.muted) {
                    this.html5Video.muted = false;
                } else {
                    this.html5Video.muted = true;
                }

            }

        } catch (e) {
            mi24logger.error("mi24player.muted:" + e);
        }
    }

    this.stop = function () {
        try {
            if (playerType != "html5") {
                try {
                    this.flashMovie.stopFlashMovie();
                    this.alreadyPlayed = false;
                } catch (e) {
                    this.flashMovie.pauseFlashMovie();
                }
            }
            else {
                this.html5Video.pause();
                this.html5Video.currentTime = 0;
            }

        } catch (e) {
            mi24logger.error("mi24player.stop:" + e);
        }
    }

    /* Full screen functionen */
    var errorPlayerMessage = "Fullscreen functions are only available in html players"

    this.intoFullscreen = function () {
        if (playerType != "html5") {
            console.log(errorPlayerMessage);
            return;
        }
        if (this.html5Video.requestFullscreen) {
            this.html5Video.requestFullscreen();
        } else if (this.html5Video.mozRequestFullScreen) {
            this.html5Video.mozRequestFullScreen();
        } else if (this.html5Video.webkitRequestFullscreen) {
            this.html5Video.webkitRequestFullscreen();
        } else if (this.html5Video.msRequestFullscreen) {
            this.html5Video.msRequestFullscreen();
        }
    };

    this.exitFullscreen = function () {
        if (playerType != "html5") {
            console.log(errorPlayerMessage);
            return;
        }
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    };

    this.fullscreenEnabled = function () {
        if (playerType != "html5") {
            console.log(errorPlayerMessage);
            return;
        }
        return (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement) !== null;
    };

    this.toggleFullscreen = function () {
        if (playerType != "html5") {
            console.log(errorPlayerMessage);
            return;
        }
        if (this.fullscreenEnabled() === false) {
            this.intoFullscreen();
        } else {
            this.exitFullscreen();
        }
    };

    this.onChangeFullscreen = function (FShandler) {
        if (playerType != "html5") {
            console.log(errorPlayerMessage);
            return;
        }
        document.addEventListener("fullscreenchange", FShandler);
        document.addEventListener("webkitfullscreenchange", FShandler);
        document.addEventListener("mozfullscreenchange", FShandler);
        document.addEventListener("MSFullscreenChange", FShandler);
    };

    this.onIntoFullscreen = function (FShandler) {
        if (playerType != "html5") {
            console.log(errorPlayerMessage);
            return;
        }
        document.addEventListener('intoFullscreen', FShandler);
    };

    this.onOutFullscreen = function (FShandler) {
        if (playerType != "html5") {
            console.log(errorPlayerMessage);
            return;
        }
        document.addEventListener('outFullscreen', FShandler);
    };

    this.onChangeFullscreen(function () {
        var event, name;
        if ((document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement) !== null) {
            name ='intoFullscreen';
        } else {
            name = 'outFullscreen';
        }

        if (document.createEvent) {
            event = document.createEvent("HTMLEvents");
            event.initEvent(name, true, true);
            event.eventName = name;
            document.dispatchEvent(event);
        } else {
            event = document.createEventObject();
            event.eventType = name;
            event.eventName = name;
            document.fireEvent("on" + event.eventType, event);
        }
    });

    /*
     event_name: start,stop,pause
     */
    this.registerStatusFunction = function (event_name, function_name) {
        mi24logger.log("mi24player_" + videoId + ".registerStatusFunction " + event_name + ":" + function_name);
        if (typeof this.statuscalls[event_name] == 'undefined') {
            this.statuscalls[event_name] = new Array();
        }
        this.statuscalls[event_name][function_name] = function_name;
    }
    /*
     event_name: start,stop,pause
     */
    this.removeStatusFunction = function (event_name, function_name) {
        mi24logger.log("mi24player_" + videoId + ".removeStatusFunction " + event_name + ":" + function_name);
        try {
            delete this.statuscalls[event_name][function_name];
        } catch (e) {
            mi24logger.error("mi24player.removeStatusFunction:" + e);
        }
    }
    /*
     * @does  returns all status events
     */
    this.logStatusEvents = function () {
        for (var stat in this.statuscalls) {
            mi24logger.log("## " + stat + " ##");
            for (var fnc in this.statuscalls[stat]) {
                mi24logger.log(fnc)
            }
        }
    }

    /*
     * @does: something on status event
     * @input: status ()
     */
    this.flashPlayerStatusEvent = function (status_) {
        status_ = status_.toLowerCase();
        // STATUS_PLAY -> play
        if (status_.substr(0, 7) == "status_") {
            status_ = status_.substr(7);
        }
        this.param_ = ((typeof param_ == "undefined") ? "" : param_);
        if (typeof this.statuscalls[status_] != 'undefined') {
            for (var x in this.statuscalls[status_]) {
                try {
                    /* SHOULD WE NEED THIS ?
                     if (playerType != "html5") {
                     //mi24logger.log(this.statuscalls[status_][x] + '("' + status_ + '","' + this.param_ + '")');

                     eval(this.statuscalls[status_][x] + '("' + status_ + '","' + this.param_ + '")');
                     mi24logger.log('fire status: ' + status_+ " ,action: " + this.statuscalls[status_][x] + '("' + status_ + '","' + this.param_ + '")');

                     } else {
                     */

                    eval(this.statuscalls[status_][x]);
                    mi24logger.log('fire status: ' + status_ + " ,action: " + this.statuscalls[status_][x]);
                    /*}*/
                } catch (e) {
                    mi24logger.error("mi24player.flashPlayerStatusEvent:" + e);
                }
            }
        } else {
            mi24logger.log('fire status: ' + status_ + " , but not registered, see mi24player_" + videoId + ".logStatusEvents()");
        }

    }

    this.html5PlayerStatusEvent = function (event) {
        eval("mi24player_" + videoId).flashPlayerStatusEvent(event.type);
    }

    this.getposition = function () {
        try {
            var position = 0;
            if (playerType != "html5") {
                position = this.flashMovie.getPlayListTime();
            }
            else {
                position = this.html5Video.currentTime;
            }
            position = Math.round(position * 100) / 100;
            return position;
        } catch (e) {
            return null;
        }
    }

    this.getRoundedPosInSecs = function () {
        try {
            var position = 0;
            if (playerType != "html5") {
                position = this.flashMovie.getPlayListTime();
            }
            else {
                position = this.html5Video.currentTime;
            }
            position = Math.round(position);
            return position;
        } catch (e) {
            return null;
        }
    }
    /*
     * 
     * @param {string base64} data
     * @returns {unresolved}
     * @does  replace node in dom tree (single video embed)
     */
    this.replaceDom = function (data) {
        try {
            if (typeof data !== "string" || !data) {
                return null;
            }
            data = jQuery.trim(data);
            //data = "eyJpZCI6InRlc3RfZXh0ZXJuIiwiaHRtbCI6Ilx1MDBhMGhhbGxvIHRlc3QgYnVubnkifQ";
            data = mi24func.decodeBase64(data);
            mi24logger.log("mi24player.replaceDom: " + data);
            //var dataArr = jQuery.parseJSON(data);
            var dataArr = JSON && JSON.parse(data) || jQuery.parseJSON(data);
            //document.getElementById(id).innerHTML=html;
            /*
             if (rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) {

             return (new Function("return " + data))();

             }*/
            mi24logger.log(dataArr);
        } catch (e) {
            mi24logger.error("mi24player.replaceDom: " + e);
        }
    }
    /*
     * trigger actions and overlays
     */
    this.processEvents = function (frame) {
        frame = Math.floor(frame);
        //mi24logger.log(recentFrame +":" + frame);
        if (recentFrame === frame) {
        } else {
            recentFrame = frame;
            mi24config = eval("mi24config_" + videoId);
            for (var i = 0; i < mi24config.getActions().length; i++) {
                if (mi24config.getActions()[i][0] === frame) {
                    try {
                        mi24logger.log("action:" + mi24config.getActions()[i][2]);
                        eval(mi24config.getActions()[i][2]);
                    } catch (e) {
                        mi24logger.error("mi24player.processEvents:" + e);
                    }
                }
            }
            for (var i = 0; i < mi24config.getOverlays().length; i++) {
                if (mi24config.getOverlays()[i][0] === frame) {
                    try {
//document.getElementById("mi24overlay").innerHTML(overlays[i][2]);
                    } catch (e) {
                        mi24logger.error("mi24player.processEvents:" + e);
                    }
                }
            }

        }
    };

    this.analytics = {};
}

var mi24player;

