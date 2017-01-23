$(document).ready(function() { 



// shim for IE < 8

if (!Date.now) {

    Date.now = function() { return new Date().getTime(); }

}



$('#impressiontracker').attr("src","https://ad.doubleclick.net/ddm/trackimp/N34502.1979701WIRED.DE/B9083788.123053246;dc_trk_aid=296139106;dc_trk_cid=65702469;ord=" + Date.now());



	resizeViewport();



	window.onresize = function(event) {

		resizeViewport();

	}



	function resizeViewport() {

		$('#viewport').css({

			'height': '100vh'

		});

	}



    $("#video-ad").click(function(){

        window.open('http://adserver.adtech.de/?adlink|3.0|1147|5580835|1|16|AdId=13349086;BnId=1;link=https://ad.doubleclick.net/ddm/trackclk/N34502.1979701WIRED.DE/B9083788.123053246;dc_trk_aid=296139106;dc_trk_cid=65702469', '_blank');

    });



    // EVENT HANDLER

    var addEvent = function (elem, type, eventHandle) {

        if (elem == null || typeof(elem) == 'undefined') return;

        if (elem.addEventListener) {

            elem.addEventListener(type, eventHandle, false);

        } else if (elem.attachEvent) {

            elem.attachEvent("on" + type, eventHandle);

        } else {

            elem["on" + type] = eventHandle;

        }

    };

    // ADD EVENT

    addEvent(window, 'message', receiveMessage);



    // ON EVENT

    function receiveMessage(event) { 

        document.getElementById('video-ad').play();

    }



});



window.onload = function() {



    // Video

    var video = document.getElementById("video-ad");



    // Buttons

    var playButton = document.getElementById("play-pause");

    var muteButton = document.getElementById("mute");

    var fullScreenButton = document.getElementById("full-screen");



    // Sliders

    var seekBar = document.getElementById("seek-bar");

    var volumeBar = document.getElementById("volume-bar");





    // Event listener for the play/pause button

    playButton.addEventListener("click", function() {

        if (video.paused == true) {

            // Play the video

            video.play();



            // Update the button text to 'Pause'

            playButton.innerHTML = "Pause";

        } else {

            // Pause the video

            video.pause();



            // Update the button text to 'Play'

            playButton.innerHTML = "Play";

        }

    });





    // Event listener for the mute button

    muteButton.addEventListener("click", function() {

        if (video.muted == false) {

            // Mute the video

            video.muted = true;



            // Update the button text

            muteButton.innerHTML = "Unmute";

        } else {

            // Unmute the video

            video.muted = false;



            // Update the button text

            muteButton.innerHTML = "Mute";

        }

    });





    // Event listener for the full-screen button

    fullScreenButton.addEventListener("click", function() {

        if (video.requestFullscreen) {

            video.requestFullscreen();

        } else if (video.mozRequestFullScreen) {

            video.mozRequestFullScreen(); // Firefox

        } else if (video.webkitRequestFullscreen) {

            video.webkitRequestFullscreen(); // Chrome and Safari

        }

    });





    // Event listener for the seek bar

    seekBar.addEventListener("change", function() {

        // Calculate the new time

        var time = video.duration * (seekBar.value / 100);



        // Update the video time

        video.currentTime = time;

    });





    // Update the seek bar as the video plays

    video.addEventListener("timeupdate", function() {

        // Calculate the slider value

        var value = (100 / video.duration) * video.currentTime;



        // Update the slider value

        seekBar.value = value;

    });



    // Pause the video when the seek handle is being dragged

    seekBar.addEventListener("mousedown", function() {

        video.pause();

    });



    // Play the video when the seek handle is dropped

    seekBar.addEventListener("mouseup", function() {

        video.play();

    });



    // Event listener for the volume bar

    volumeBar.addEventListener("change", function() {

        // Update the video volume

        video.volume = volumeBar.value;

    });

}