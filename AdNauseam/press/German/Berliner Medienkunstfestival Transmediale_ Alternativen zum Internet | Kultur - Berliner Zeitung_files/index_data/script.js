
function show(divid) {
	if (document.getElementById)
	document.getElementById(divid).style.display="none";
}
function hide(divid) {
	if (document.getElementById)
	document.getElementById(divid).style.display="block";
}
function display(elementid, divid){
	if (document.getElementById(elementid).value == "show"){
		if (document.getElementById)
		document.getElementById(elementid).value = "hide";
		document.getElementById(elementid).src = "images/icons/lupe1_rev.gif";
		document.getElementById(divid).style.display = "block";
	}
	else if (document.getElementById(elementid).value == "hide"){
		if (document.getElementById)
		document.getElementById(elementid).value = "show";
		document.getElementById(elementid).src = "images/icons/lupe1.gif";
		document.getElementById(divid).style.display = "none";
	}
}
function switchstyle(divid,alt1,alt2){
	var cssclass1=document.getElementById(divid).className;
	if (cssclass1==alt1)document.getElementById(divid).className=alt2;
	else document.getElementById(divid).className=alt1;
}

function fadeIEin(id){
	var fadediv = document.getElementById(id);
 	if (document.all && !window.opera){
		fadediv.filters.blendTrans.Apply();
		fadediv.style.visibility = "visible";
		fadediv.filters.blendTrans.Play();
    }
}
function fadeIEout(fadediv){
 	if (document.all && !window.opera){
		fadediv.filters.blendTrans.Apply();
		fadediv.style.visibility = "hidden";
		fadediv.filters.blendTrans.Play();
		
    }
}

function fadeIn(id,opacity){
	var fadeTarget = document.getElementById(id);
	if (opacity <= 100){
		if (fadeTarget.style.MozOpacity!=null){
			fadeTarget.style.MozOpacity = (opacity/100)-.001;
		} else if (fadeTarget.style.opacity!=null){
			fadeTarget.style.opacity = (opacity/100)-.001;
		}
		opacity += 10;
		aktiv = window.setTimeout("fadeIn('"+id+"',"+opacity+")",30);
	}
}
/* Changes the input type 'text' to 'password' */
function setType(id,type){
	document.getElementById(id).value = "";
	document.getElementById(id).type = type;
}
function setTypeIE(id,type) {
	var elename = document.getElementById(id).name;
	var element = document.getElementById(id).tagName
	var elclass = document.getElementById(id).className;
	var nodeparent = document.getElementById(id).parentNode;
	var newEl = document.createElement(element);
	newEl.setAttribute("type", type);
	newEl.setAttribute("name", elename);
	newEl.setAttribute("id", id);
	newEl.setAttribute("class", elclass);
	newEl.setAttribute("value", "");
	nodeparent.replaceChild(newEl,document.getElementById(id));
	setTypeIE.el = newEl;
	setTimeout('setTypeIE.el.focus();',0);
}
			function highlightstar(lfd){             		
				tmp=lfd;
				lfd=new Number(tmp);
 				for (var I=1; I <= Math.ceil(lfd); I++){
					if ((I == Math.ceil(lfd)) && (((Math.floor(lfd*10)/10)-Math.floor(lfd)) < 0.5) && (Math.ceil(lfd) != Math.floor(lfd)) )
					   {
					   document.getElementById('star'+I).className='small_half_star';
					   }
					else									   
					   {
				       document.getElementById('star'+I).className='active_star';
				       }
				    
				}
				for (I=(Math.ceil(lfd)+1); I<=5; I++){
					document.getElementById('star'+I).className='inactive_star';
				}
			}
			function unhighlightstar(lfd){
				var I=1;
				for (var I=1; I<=lfd; I++){
					document.getElementById('star'+I).className='inactive_star';
				}
				highlightstar(document.getElementById('voteresult').value);
			}

function sendvideolinkmail(videorecievadr,linkdomid){
	var videolinkurl = document.getElementById(linkdomid).value;
	var videolinkname = document.getElementById('videolinkname').value;
	var mailsubject = document.getElementById('videolinksubject').value;
	if (videorecievadr.length > 6){
		//window.location.href = 'mailto:videorecievadr';
		document.getElementById('sendvideolink').innerHTML = "<a href=\'mailto:"+videorecievadr+"?subject="+mailsubject+"&body="+videolinkurl+"\'>" + videolinkname + "</a>";
	}
}

function addBookmark(title,url){
	if (window.opera && window.print){
		var newEl = document.createElement("a");
		newEl.setAttribute("href", url);
		newEl.setAttribute("title", title);
		newEl.setAttribute("rel", "sidebar");
		newEl.click();
	}
	else if (document.all){
		window.external.AddFavorite(url, title);
	}
	else if (window.sidebar){
		window.sidebar.addPanel(title, url, "");
	}
}

/* show Image Popup */
function showImage(img){
	foto= new Image();
	foto.src=(img);
	Controll(img);
}
function Controll(img){
	if((foto.width!=0)&&(foto.height!=0)){
		viewImage(img);
	}
	else {
		loadagain="Controll('"+img+"')";
		intervall=setTimeout(loadagain,20);
	}
}
function viewImage(img){
	imgwidth=foto.width+20;
	imgheight=foto.height+20;
	string="width="+imgwidth+",height="+imgheight;
	popup=window.open(img,"Image",string);
	popup.name = "Image";
	popup.focus();
}
function bttooltip(domid,tooltipid){
	$("#"+domid).bt
	({
		 ajaxPath		: 	"/fca.php?c=userclass_helptooltip&m=showtooltip&p="+tooltipid+" div#tooltip",
		     //fill		: 	'#F7F7F7',
                     fill		: 	'#676767',
		 //strokeStyle	: 	'#B7B7B7',
                 strokeStyle	: 	'#FFFFFF',
	     //spikeLength	: 	10,
             spikeLength	: 	0,
	     spikeGirth		: 	5,
	     //padding		: 	8,
             padding		: 	5,
	     //cornerRadius	: 	2,
             cornerRadius	: 	0,
	     cssStyles		: 	{
	                    		fontFamily: 'tahoma,verdana,arial,sans-serif',
	                    		//fontSize: '11px'
                                        fontSize: '12px',
                                        lineHeight: '16px',
                                        color: '#FFFFFF'
	                  		},
	     showTip		: 	function(box){
	                  					$(box).fadeIn(500);
	                  		},
	
	    positions		: 	['right', 'bottom']
	});
}

