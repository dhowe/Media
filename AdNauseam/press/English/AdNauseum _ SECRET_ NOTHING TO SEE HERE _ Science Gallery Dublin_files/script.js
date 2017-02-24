//Initialising variables
var bg_img = "", bg_img_g = "", glitch_timer = "";
var timeArray = new Array(500, 1000, 1500, 2000); //Time interval options for between glitches
var timeArray2 = new Array(200, 250, 300, 350); //Time interval options for glitch length

var exhib_replaced = false;
var idx = 0;
var typingArray = new Array();
var typingArray1 = new Array('#typed1','#typed2','#typed3','#typed4','#typed5');
var typingArray2 = new Array('#typed6','#user-name-dos','#typed8','#typed9');
var typingArray3 = new Array('#typed10');

var gatewayTypingArray1 = new Array("#gateway1","#gateway2","#gateway3"); //Name form
var gatewayTypingArray2 = new Array("#gateway4","#gateway5"); //Location permission
var gatewayTypingArrayLoc = new Array("#gate4-loc","#gate4-weather"); //Location approved
var gatewayTypingArrayNoLoc = new Array("#gate4-no-loc"); //Location denied
var gatewayTypingArray3 = new Array('#gate5-resp-yes','#gateway6'); 
var gatewayTypingArray4 = new Array('#gate5-resp-no','#gateway6');
var gatewayTypingArray5 = new Array('#gate6-yes'); //Secret form
var gatewayTypingArray6 = new Array('#gate5b-no1');
var gatewayTypingArray7 = new Array('#gate5b-no2');
var gatewayTypingArray8 = new Array('#gate7-yes'); //Secret submitted
var gatewayTypingArray9 = new Array('#gate7-no'); //Secret refused

var is_touch_device = 'ontouchstart' in document.documentElement;

var badWeather = new Array(200,201,202,210,211,212,221,230,231,232,300,301,302,310,311,312,313,314,321,500,501,502,503,504,511,520,521,522,531,600,601,602,611,612,615,616,620,621,622,701,711,721,731,741,751,761,762,771,781,900,901,902,903,905,906,957,958,959,960,961,962); //Thunder, Drizzle, Rain, Snow, Atmosphere, Extreme
var okWeather = new Array(802,803,804,904,954,955,956);
var goodWeather = new Array(800,801,951,952,953);

var cookie_life = 60; //Cookie expires in 1 hour

$(document).ready(function(){
	
	if(is_touch_device){
		$('body').addClass('touch-screen');
	}
	
	if(show_gateway){
		initGateway();
	}else{
		initListeners();
	}

});

/*=================
 *** Functions ***
=================*/

//Non-gateway event listeners
function initListeners(){
	/*=== Sliding mobile nav ===*/
	var nav_icon = $('#mob-nav i');
	$('#mob-nav').click(function(){
		if(nav_icon.hasClass('fa-bars')){
			nav_icon.removeClass('fa-bars').addClass('fa-times');
			$('#sidebar').animate({'left': '0px'}, 'fast');
			$(this).animate({'margin-left': '155px'}, 'fast');	
		}else if(nav_icon.hasClass('fa-times')){
			nav_icon.removeClass('fa-times').addClass('fa-bars');
			$('#sidebar').animate({'left': '-176px'}, 'fast');
			$(this).animate({'margin-left': '0px'}, 'fast');
		}
	});
	
	/*=== Reset sliding mobile nav on resize ===*/
	$(window).resize(function(){
		if($(window).width() > 768){  
			$('#sidebar').removeAttr('style');
			$('#mob-nav').removeAttr('style');
			if(nav_icon.hasClass('fa-times')){
				nav_icon.removeClass('fa-times').addClass('fa-bars');
			}
		}
	});
	
	/*=== Background glitch ===*/
	bg_img = "/secret/assets/img/bg-lead.jpg";
	bg_img_g = "/secret/assets/img/bg-lead-glitch.gif";
	var img_arr = [bg_img_g];
	preloadImage(img_arr);
	glitch_timer = setInterval(bgGlitch, 1000);
	
	/*=== HOME PAGE SCRIPTS ====*/
	if($("#home").length > 0 && show_gateway==false){		
		
		/*=== DOS interations ===*/
		$(window).on('scroll.dos', function(){
			
			if(($(window).scrollTop() + ($(window).height()/3)) >= $('#dos').offset().top){
				
				$(window).off("scroll.dos"); //Unbind
				
				//Hide and show stages
				$('#stage1').fadeOut("fast", function(){
					$('#stage2').fadeIn("fast", function(){
						startSection(typingArray1); //Show stage 2 text
					});
				});
				
				if(!is_touch_device){ // If not touch screen listen for key press
					$(document).keypress(function(event){
						var keyPushed = String.fromCharCode(event.which);
						if(keyPushed=="y" || keyPushed=="Y"){
							$(document).unbind("keypress");
							
							$('#stage3-yes').fadeIn("slow", function(){ //Show and trigger moving eye
								movingEye();
							});
						
						}else if(keyPushed=="n" || keyPushed=="N"){
							$(document).unbind("keypress");
						
							startSection(typingArray3); //Type out No response
						
						}
					});
				}
			}
		});
		
		/*=== Uncover redacted text on mobile ===*/
		if(is_touch_device){
			$(window).on('scroll.redac', function(){
				if(($(window).scrollTop() + ($(window).height()/3)) >= $('#redac-wrap').offset().top){
					$(window).off("scroll.redac");
					$('.redacted span').each(function(i, el){
						setTimeout(function(){
							$(el).addClass('hover');
						}, ( i*500) );
					});
				}
			});
		}
	    
	    /*=== Secrets scroller ===*/
	    $('#widget-scroller').scrollbox();
	    
	    /*=== Animated scroll links ===*/
	    $('#more-scroll').click(function(event){
		    event.preventDefault();
			$("html, body").animate({ scrollTop: $('#dossiers').offset().top }, "fast");    
	    });
	    $('#nav-home').click(function(event){
		    event.preventDefault();
			$("html, body").animate({ scrollTop: 0 }, "fast");    
	    });
	    $('#nav-dossiers').click(function(event){
		    event.preventDefault();
			$("html, body").animate({ scrollTop: $('#dossiers').offset().top }, "fast");    
	    });
	    $('#nav-exhibits').click(function(event){
		    event.preventDefault();
			$("html, body").animate({ scrollTop: $('#exhibits').offset().top }, "fast");    
	    });
	    
	    //Nav active states
	    checkNavState();
	    $(window).on('scroll.nav', function(){
			checkNavState();
		});
	    
	    /*=== Curators box ===*/
	    $(".curator-box").mouseover(function() {
	        var src = $(this).find('a.profile img').attr("src").replace("-pix.jpg", ".jpg");
	        $(this).find('a.profile img').attr("src", src);
	    }).mouseout(function() {
	        var src = $(this).find('a.profile img').attr("src").replace(".jpg", "-pix.jpg");
	        $(this).find('a.profile img').attr("src", src);
	    });
	    
    }
	/*=== END HOME PAGE SCRIPTS ===*/
	
	/*=== Exhibit grid ===*/	
	$(window).on('scroll.exhibpix', function(){
		if(($(window).scrollTop() + ($(window).height()/4)) >= $('#exhibits').offset().top){
			$(window).off("scroll.exhibpix");
			
			setTimeout(function(){
				$(".exhib-grid").each(function(){
					var src = $(this).find('a.img img').attr("src").replace("-pix.jpg", ".jpg");
					$(this).find('a.img img').attr("src", src);
				});
				exhib_replaced = true;
			},800);
		}
	});    
	if(is_touch_device){
		
		$(".exhib-grid").click(function(event){
			if(!$(this).hasClass('active')){
				event.preventDefault();
				$(this).addClass('active');
				$(".exhib-grid").not(this).removeClass('active');
			}
		});
		
	}else{
		//Unpixellate on hover
		$(".exhib-grid").mouseover(function() {
			if(exhib_replaced){
		        var src = $(this).find('a.img img').attr("src").replace(".jpg", "-pix.jpg");
		        $(this).find('a.img img').attr("src", src);
	        }
	    }).mouseout(function() {
		    if(exhib_replaced){
		        var src = $(this).find('a.img img').attr("src").replace("-pix.jpg", ".jpg");
		        $(this).find('a.img img').attr("src", src);
	        }
	    });
    }
}

//Gateway event listeners
function initGateway(){
	
	startTimecode();
	
	glitch_timer = setInterval(gateGlitch, 1000);
	
	setTimeout(function(){
		$('#gate1').fadeOut('fast', function(){
			$('#gate2').show();
			startSection(gatewayTypingArray1);
		});
	}, 3000);
	
	$( "#user-input-name" ).submit(function(event){
		event.preventDefault();
		$( "#user-input-name" ).submit(false);
		$('#gateway3').blur();
		var temp_text = "";
		user_name = $('#gateway3').val();
		if(user_name!=""){
			
			setCookie('secret_gateway', user_name, cookie_life);
			
			temp_text = $('#gateway5').text();
			$('p#user-name').text(user_name);
			$('#user-name-dos').text(user_name+". ");
			$('#gateway5').text( temp_text.replace(".", ", "+user_name+".") );
			
			temp_text = $('#gate6-no2').text();
			$('#gate6-no2').text( temp_text.replace("Come on,", "Come on, "+user_name+",") );
			
			temp_text = $('#gate7-yes').text();
			$('#gate7-yes').text( temp_text.replace("Thanks", "Thanks, "+user_name) );
			
			temp_text = $('#gate7-no').text();
			$('#gate7-no').text( temp_text.replace("nugget", "nugget, "+user_name) );
		}
		$('#gate2').fadeOut('fast',function(){
			$('#gate3').show();
			startSection(gatewayTypingArray2);
		});
	});
	
	$( "#user-input-secret" ).submit(function(event){
		event.preventDefault();
		$( "#user-input-secret" ).submit(false);
		$('#user-secret').blur();
		user_secret = $('#user-secret').val();
		
		$.ajax({	
			url: 'submit_secret.php',
			type: 'POST',
			data: $('#user-input-secret').serialize(),
			success: function(data){
				//console.log(data);
			},
			error: function(err){
				//console.log(err);
			}
		}).done(function() {
			$('#gate6').fadeOut('fast',function(){
				$('#gate7').show();
				startSection(gatewayTypingArray8);
			});
		});       		
		
	});
	
	$('#allow-loc').click(function(){
		getLocation('allow');
	});
	$('#deny-loc').click(function(){
		$('#gate3').fadeOut('fast',function(){
			$('#gate4').show();
			startSection(gatewayTypingArrayNoLoc);
		});
	});
	$('#btn-gate4-yes').click(function(){
		$('#gate4').fadeOut('fast',function(){
			$('#gate5').show();
			startSection(gatewayTypingArray3);
		});
	});
	$('#btn-gate4-no').click(function(){
		$('#gate4').fadeOut('fast',function(){
			$('#gate5').show();
			startSection(gatewayTypingArray4);
		});
	});
	$('#btn-gate5-yes').click(function(){
		$('#gate5').fadeOut('fast',function(){
			$('#gate6').show();
			startSection(gatewayTypingArray5);
		});
	});
	$('#btn-gate5-no').click(function(){
		$('#gate5').fadeOut('fast',function(){
			$('#gate5b').show();
			startSection(gatewayTypingArray6);
		});			
	});
	$('#btn-gate5b-yes').click(function(){
		$('#gate5b').fadeOut('fast',function(){
			$('#gate6').show();
			startSection(gatewayTypingArray5);
		});
	});
	$('#btn-gate5b-no').click(function(){
		if($('#gate5b-no2').is(':visible')){
			$('#gate5b').fadeOut('fast',function(){
				$('#gate7').show();
				startSection(gatewayTypingArray9);
			});
		}else{
			startSection(gatewayTypingArray7); //Display are you sure
		}
	});
}

//Perform background glitch at random intervals
function bgGlitch(){
	bodyBgSwap(bg_img_g);
	
	setTimeout(function(){
		bodyBgSwap(bg_img)
	}, randRange(timeArray2));
		
	clearInterval(glitch_timer);
	glitch_timer = setInterval(bgGlitch, randRange(timeArray));
}

//Perform gateway glitch at random intervals
function gateGlitch(){
	$('#gateway').css({'opacity':'0.95'}); //Set opacity
	setTimeout(function(){
		$('#gateway').css({'opacity':'1'}); //Set opacity back
	}, randRange(timeArray2));
		
	clearInterval(glitch_timer);
	glitch_timer = setInterval(gateGlitch, randRange(timeArray));
}

//Return random element of array
function randRange(data){
	var randElem = data[Math.floor(data.length * Math.random())];
	return randElem;
}

//Swap body background image
function bodyBgSwap(img){
	$('body').css('background-image', 'url("'+img+'")');
}

//Preload images
function preloadImage(url_array){
	for(i=0; i<url_array.length; i++){
		var img = new Image();
		img.src = url_array[i];
	}   
}

//Map range function
Number.prototype.map = function(in_min, in_max, out_min, out_max){
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

//Moving eye
function movingEye(){
	if($('#stage3-yes').is(":visible")){
		$(document).mousemove(function(event) {
			var newLeft = Math.round(event.clientX.map(0, $(window).width(), 10, 70));
			var newTop = Math.round(event.clientY.map(0, $(window).height(), -10, 20));
			$('#dos-eye .move img').css({'left': newLeft+'px', 'top': newTop+'px'});
		});
	}
}

//Show text letter by letter
function startSection(sectionArray){
	idx = 0;
	typingArray = sectionArray;
	showText(sectionArray[0]);
}

function showText(target){
	idx++;
	var message = $(target).text();
	$(target).text("").show();
	letterByletter(target, message, 0);
}

function letterByletter(target, message, index){
	if (index < message.length) {
		$(target).append(message[index++]);
		setTimeout(function(){ letterByletter(target, message, index); }, 30);
	}else{

		if(target=="#gateway3"){ //Focus to input on gateway
			$("#gateway3").focus();
		}
		if(target=="#gateway5"){ //Show buttons
			$('#gate3-btns').fadeIn();
		}
		if(target=="#gate4-no-loc"){
			getTimeInfo("", "", "", "");
		}
		if(target=="#gate4-weather"){
			$('#gate4-btns').fadeIn();
		}
		if(target=="#gate5b-no1"){
			$('#gate5b-btns').fadeIn();
		}
		if(target=="#gateway6"){
			$('#gate5-btns').fadeIn();
		}
		if(target=="#gate6-yes"){
			$("#user-input-secret").fadeIn();
			$("#user-secret").focus();
		}
		if(target=="#gate6-no1"){
			$('#gate6-btns').fadeIn();
		}
		if(target=="#gate7-no" || target=="#gate7-yes"){
			$('#gate7-btns').fadeIn();
		}
		if(target=="#typed5"){
			setTimeout(function(){
				$('.interactive.first').hide();
				startSection(typingArray2);
			},800);
		}
		if(target=="#typed9" && is_touch_device){ //If touch device, listen for button click instead of keypress
			showMobBtns();
		}
		if(idx < typingArray.length){
			showText(typingArray[idx]);
		}
	}
}

//Yes / No buttons for mobile
function showMobBtns(){					
	$('#touch-answer').fadeIn("slow", function(){
		$('#play-yes').click(function(event){
			$('#touch-answer').hide();
			
			$('#stage3-yes').fadeIn("slow", function(){ //Show and trigger moving eye
				movingEye();
			});
		});
		
		$('#play-no').click(function(event){
			$('#touch-answer').hide();
			
			startSection(typingArray3); //Type out No response
		
		});
	});
}

//Create sharer pop-up
function socialShare(link){
    var width = 400, height = 300;
    var leftPosition, topPosition;
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    u=location.href;
    t=document.title;
    
    window.open(link,'sharer', windowFeatures);
    return false;
}

//Create Facebook pop-up
function fbShare(site_title, url, secret){
    FB.ui({
        method: 'feed',
        name: secret,
        link: url,
        caption: site_title
    }, function(response){});

}

//Hide gateway, show home page
function hideGateway(){

	setCookie('secret_gateway', 0, cookie_life); //Gets set to zero only if not already set
	
	$('#gateway').fadeOut('fast', function(){
		$('html, body').css({'overflow': 'visible'});
		$("#gateway").empty();
	});
	show_gateway = false;
	clearInterval(glitch_timer);
	initListeners();
}

//Geo location
function getLocation(btn_clicked){
	
	if($('#gate3').is(':visible')){ //If we haven't moved on	
		
		if (navigator.geolocation){ //If geolocate is supported / permission is granted
	
			navigator.geolocation.getCurrentPosition(function(position){
				var jsonUrl = '/secret/get_weather.php?lat='+position.coords.latitude+'&lng='+position.coords.longitude;
				$('#gate4-no-loc, #gate4-weather').hide();
				getWeatherInfo(jsonUrl);
			
			},function(error){
				//console.log("Error: "+error.code);
				if(error.code == error.PERMISSION_DENIED){
					if(btn_clicked=="allow"){ //Alter text if Yes was clicked
						$('#gate4-no-loc').text( "Looks like I can't find you. "+$('#gate4-no-loc').text() );
					}					
					$('#gate3').fadeOut('fast',function(){
						$('#gate4').show();
						startSection(gatewayTypingArrayNoLoc);
					});
				}else{
					getTimeInfo("", "", "", "");
				}
			},{timeout:9000});
	
		} else {
			//console.log("Geolocation is not supported by this browser.");
			getTimeInfo("", "", "", "");
		}
	}
}

function getWeatherInfo(jsonUrl){

	$.getJSON(jsonUrl, function(data){
		
		var loc_name = data.name;
		var location_chat = "Sweet - nice place. I know we'll get along."
		
		var weather_band = "", weather_chat = "", weather_temp = "";
		var weather_code = data.weather[0].id;
		weather_temp = data.main.temp;
		
		if(loc_name!=""){
			location_chat = loc_name+". "+location_chat;
		}
		
		if(indexOf.call(badWeather, weather_code)>-1){
			weather_chat = "Looks like a bad ";
			weather_band = "bad";
		}else if(indexOf.call(goodWeather, weather_code)>-1){
			weather_chat = "Looks like a nice ";
			weather_band = "good";
		}else{
			weather_chat = "Looks like an ok ";
			weather_band = "ok";
		}
		
		getTimeInfo(location_chat, weather_chat, weather_band, weather_temp);

	});
}

function getTimeInfo(location_chat, weather_chat, weather_band, weather_temp){
	var currentTime = new Date();
	var hours = currentTime.getHours();

	if(typeof hours === 'undefined'){
		hours = 12;
	}
	
	var chat_output = "", time_str = "", ques_str = "", weather_str = "", fallback_time = "";
	var next_step_resp_yes = "", next_step_resp_no = "";
	
	if(hours>=5 && hours<12){ //morning
		time_str = "day out.";
		fallback_time = "How's your morning? ";
		ques_str = "Have you had your breakfast yet?";
		next_step_resp_yes = "Good. You know it's the most important meal of the day.";
		next_step_resp_no = user_name+", breakfast is the most important meal of the day. Sort it out!";
		
	}else if(hours>=12 && hours<17){ //day
		time_str = "day out.";
		fallback_time = "How's your day? ";
		if(weather_band=="bad"){
			weather_str = " It's good you're indoors. Smart. ";
		}else{
			weather_str = " Pity you're staring at a computer screen, "+user_name+". ";
		}
		ques_str = "Wait, shouldn't you be working or something, "+user_name+"?";
		next_step_resp_yes = "Taking a 'break' are we? Good for you.";
		next_step_resp_no = "Good. Stick it to the man, "+user_name+".";
		
	}else if(hours>=17 && hours<22){ //evening
		time_str = "evening out.";
		fallback_time = "How's your evening? ";
		ques_str = "I feel a box set coming on. Into it?";
		next_step_resp_yes = "Of course you are, you don't live under a rock.";
		next_step_resp_no = "I would strongly suggest, "+user_name+", that you join the rest of humanity.";
		
	}else if(hours>=22 || hours<4){ //night
		fallback_time = "How's your night? ";
		if(weather_temp<=10){ //cold
			weather_chat = "Feels a bit cold tonight. Hope you've got a jumper, "+user_name+". ";
		}else if(weather_temp>10 && weather_temp<20){ //ok
			weather_chat = "Feels like a nice night out. Perfect bed temperature, Goldilocks style. ";
		}else if(weather_temp>=20){ //hot
			weather_chat = "Feels warm tonight. It's one foot out the bed tonight. ";
		}
		ques_str = "Aren't you up a bit late?";
		next_step_resp_yes = "Your internet addiction owns you! I hear you.";
		next_step_resp_no = "Seems like you might be. I like a bit of night owling too, "+user_name+".";
	}
	
	if(weather_temp==""){
		chat_output = fallback_time+ques_str;
	}else{
		chat_output = weather_chat+time_str+" "+ques_str;
	}
	
	$('#gate4-loc').text(location_chat);
	$('#gate4-weather').text(chat_output);
	$('#gate5-resp-yes').text(next_step_resp_yes);
	$('#gate5-resp-no').text(next_step_resp_no);
	
	$('#gate3').fadeOut('fast',function(){
		$('#gate4').show();
		startSection(gatewayTypingArrayLoc);
	});
}

var indexOf = function(needle){
    if(typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                if(this[i] === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle);
};

function setCookie(cookie, value, minutes){
	show_gateway = false;
	if(value==""){
		value = 0;
	}else{
		value = encodeURI(value);
	}	
	if(!$.cookie(cookie)){
		var date = new Date();
		date.setTime(date.getTime() + (minutes*60*1000));
		$.cookie(cookie, value, {expires:date, path:'/'});
	}
}

var TIME_PARSING_REGEX = /([0-9]{2}):([0-9]{2}):([0-9]{2}):([0-9]{2})/;

function padToTwoDigits(number) {
    return (number < 10 ? "0" : "") + number;
}

function startTimecode(){
	
	var $worked = $("#timecode");
	
    setInterval(function(){
		var myTime = $worked.text();
		var ss = myTime.split(":");
		var dt = new Date();
		dt.setHours(ss[0]);
		dt.setMinutes(ss[1]);
		dt.setSeconds(ss[2]);
		var dt2 = new Date(dt.valueOf() + 1000);
		var ts = dt2.toTimeString().split(" ")[0];
		$worked.text(ts);
    }, 1000);
}

function checkNavState(){
	if(($(window).scrollTop()+20) >= $('#exhibits').offset().top){
		$('.main-nav li.active').removeClass('active');
		$('#nav-exhibits').parent().addClass('active');
	}else if(($(window).scrollTop()+20) >= $('#dossiers').offset().top){
		$('.main-nav li.active').removeClass('active');
		$('#nav-dossiers').parent().addClass('active');
	}else{
		$('.main-nav li.active').removeClass('active');
		$('#nav-home').parent().addClass('active');
	}
}