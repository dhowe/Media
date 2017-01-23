// Client stub for the videocontrol PHP Class
function videocontrol(callback) {
	mode = 'sync';
	if (callback) { mode = 'async'; }
	this.className = 'videocontrol';
	this.dispatcher = new HTML_AJAX_Dispatcher(this.className,mode,callback,'http://4288.7431.m.edge-cdn.net/userstub.php?','JSON');
}
videocontrol.prototype  = {
	Sync: function() { this.dispatcher.Sync(); }, 
	Async: function(callback) { this.dispatcher.Async(callback); },
	search: function() { return this.dispatcher.doCall('search',arguments); },
	search2: function() { return this.dispatcher.doCall('search2',arguments); },
	scrollsearch: function() { return this.dispatcher.doCall('scrollsearch',arguments); },
	showinfo: function() { return this.dispatcher.doCall('showinfo',arguments); },
	videovote: function() { return this.dispatcher.doCall('videovote',arguments); },
	rememberVideo: function() { return this.dispatcher.doCall('rememberVideo',arguments); },
	removeRemVideo: function() { return this.dispatcher.doCall('removeRemVideo',arguments); },
	clearRemVideos: function() { return this.dispatcher.doCall('clearRemVideos',arguments); },
	rememberJob: function() { return this.dispatcher.doCall('rememberJob',arguments); },
	removeRemJob: function() { return this.dispatcher.doCall('removeRemJob',arguments); },
	clearRemJobs: function() { return this.dispatcher.doCall('clearRemJobs',arguments); },
	addToPlayed: function() { return this.dispatcher.doCall('addToPlayed',arguments); },
	refreshrememberedvideos: function() { return this.dispatcher.doCall('refreshrememberedvideos',arguments); },
	refreshrememberedjobs: function() { return this.dispatcher.doCall('refreshrememberedjobs',arguments); },
	refreshvideolisthome: function() { return this.dispatcher.doCall('refreshvideolisthome',arguments); },
	refreshvideostore: function() { return this.dispatcher.doCall('refreshvideostore',arguments); },
	refreshvideostorefroma: function() { return this.dispatcher.doCall('refreshvideostorefroma',arguments); },
	refreshvideolist: function() { return this.dispatcher.doCall('refreshvideolist',arguments); },
	refreshwwjrss: function() { return this.dispatcher.doCall('refreshwwjrss',arguments); },
	refreshoprss: function() { return this.dispatcher.doCall('refreshoprss',arguments); },
	recommendVideoCall: function() { return this.dispatcher.doCall('recommendVideoCall',arguments); },
	sendrecommendation: function() { return this.dispatcher.doCall('sendrecommendation',arguments); },
	sendrecommendationpopup: function() { return this.dispatcher.doCall('sendrecommendationpopup',arguments); },
	sendrecommendationpopupmi24: function() { return this.dispatcher.doCall('sendrecommendationpopupmi24',arguments); },
	reloadcaptcha: function() { return this.dispatcher.doCall('reloadcaptcha',arguments); },
	ppswitchview: function() { return this.dispatcher.doCall('ppswitchview',arguments); },
	checkcaptcha: function() { return this.dispatcher.doCall('checkcaptcha',arguments); },
	sendrecommendationvstore: function() { return this.dispatcher.doCall('sendrecommendationvstore',arguments); },
	vstorecommentrecieve: function() { return this.dispatcher.doCall('vstorecommentrecieve',arguments); },
	vstoreregisterdownload: function() { return this.dispatcher.doCall('vstoreregisterdownload',arguments); },
	publishusercomments: function() { return this.dispatcher.doCall('publishusercomments',arguments); },
	remusercomments: function() { return this.dispatcher.doCall('remusercomments',arguments); },
	get_skinHeightWidth: function() { return this.dispatcher.doCall('get_skinHeightWidth',arguments); },
	changeCategory: function() { return this.dispatcher.doCall('changeCategory',arguments); }
}

// Client stub for the UserAPIUtilityLibrary PHP Class
function UserAPIUtilityLibrary(callback) {
	mode = 'sync';
	if (callback) { mode = 'async'; }
	this.className = 'UserAPIUtilityLibrary';
	this.dispatcher = new HTML_AJAX_Dispatcher(this.className,mode,callback,'http://4288.7431.m.edge-cdn.net/userstub.php?','JSON');
}
UserAPIUtilityLibrary.prototype  = {
	Sync: function() { this.dispatcher.Sync(); }, 
	Async: function(callback) { this.dispatcher.Async(callback); },
	tree_switchnode: function() { return this.dispatcher.doCall('tree_switchnode',arguments); },
	insertDialog: function() { return this.dispatcher.doCall('insertDialog',arguments); },
	updateDialog: function() { return this.dispatcher.doCall('updateDialog',arguments); },
	destroyDialog: function() { return this.dispatcher.doCall('destroyDialog',arguments); },
	insertWindowButton: function() { return this.dispatcher.doCall('insertWindowButton',arguments); },
	insertTestDialog: function() { return this.dispatcher.doCall('insertTestDialog',arguments); },
	minimizeAll: function() { return this.dispatcher.doCall('minimizeAll',arguments); },
	kill_all_dialogs: function() { return this.dispatcher.doCall('kill_all_dialogs',arguments); }
}

// Client stub for the comments PHP Class
function comments(callback) {
	mode = 'sync';
	if (callback) { mode = 'async'; }
	this.className = 'comments';
	this.dispatcher = new HTML_AJAX_Dispatcher(this.className,mode,callback,'http://4288.7431.m.edge-cdn.net/userstub.php?','JSON');
}
comments.prototype  = {
	Sync: function() { this.dispatcher.Sync(); }, 
	Async: function(callback) { this.dispatcher.Async(callback); },
	form: function() { return this.dispatcher.doCall('form',arguments); },
	display_form: function() { return this.dispatcher.doCall('display_form',arguments); },
	editcomment: function() { return this.dispatcher.doCall('editcomment',arguments); },
	deletecomment: function() { return this.dispatcher.doCall('deletecomment',arguments); },
	displayformajax: function() { return this.dispatcher.doCall('displayformajax',arguments); },
	handle_form: function() { return this.dispatcher.doCall('handle_form',arguments); },
	list_entries: function() { return this.dispatcher.doCall('list_entries',arguments); },
	list_entry_recursion: function() { return this.dispatcher.doCall('list_entry_recursion',arguments); },
	addComment: function() { return this.dispatcher.doCall('addComment',arguments); },
	confirm: function() { return this.dispatcher.doCall('confirm',arguments); },
	confirmtostate1: function() { return this.dispatcher.doCall('confirmtostate1',arguments); },
	remove: function() { return this.dispatcher.doCall('remove',arguments); }
}

