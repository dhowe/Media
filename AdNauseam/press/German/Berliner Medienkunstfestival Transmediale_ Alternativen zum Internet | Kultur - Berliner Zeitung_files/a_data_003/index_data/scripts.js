var container;
var content;
var bgExit;
var buttonExit;

enablerInitHandler = function(e) {
  if(Enabler.isVisible()) {
  startAd();
  } else {
  Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, startAd);
  }

};

startAd = function(e) {
  // Assign All the elements to the elements on the page
  container = document.getElementById('container_dc');
  content = document.getElementById('content_dc');
  anim = document.getElementById('animation');
  copies = document.getElementById('copies');
  bgExit = document.getElementById('background_exit_dc');
  buttonExit = document.getElementById('cta');
  bg = document.getElementById('bg');
  con = document.getElementById('con');
  container.style.display = 'block';

  

Enabler.setProfileId(1038079);
    var devDynamicContent = {};

    devDynamicContent.FeedData= [{}];
    devDynamicContent.FeedData[0]._id = 0;
    devDynamicContent.FeedData[0].ID = 1;
    devDynamicContent.FeedData[0].region = "Helsinki";
    devDynamicContent.FeedData[0].startDate = {};
    devDynamicContent.FeedData[0].startDate.RawValue = "04/02/2011 00:00 (+02:00)";
    devDynamicContent.FeedData[0].startDate.UtcValue = 1301695200000;
    devDynamicContent.FeedData[0].endDate = {};
    devDynamicContent.FeedData[0].endDate.RawValue = "05/08/2043 00:00 (+02:00)";
    devDynamicContent.FeedData[0].endDate.UtcValue = 2314648800000;
    devDynamicContent.FeedData[0].imageUrl = {};
    devDynamicContent.FeedData[0].imageUrl.Url = "http://campaigns.activearkjwt.com/finnair-aurora-event/img/bg2.jpg";
    devDynamicContent.FeedData[0].copy1 = "\u8B93\u60A8 \u524D\u5F80\u6B50\u6D32_br_\u7684\u6377\u5F91";
    devDynamicContent.FeedData[0].copy2 = "\u77ED\u9014\u5317\u6B50\u822A\u7DDA\uFF0C_br_\u5E36\u60A8\u524D\u5F80\u6B50\u6D32 60 \u591A\u500B\u57CE\u5E02";
    devDynamicContent.FeedData[0].copy3 = "\u8B93\u60A8 \u524D\u5F80\u6B50\u6D32_br_\u7684\u6377\u5F91";
    devDynamicContent.FeedData[0].copy4 = "\u77ED\u9014\u5317\u6B50\u822A\u7DDA\uFF0C_br_\u5E36\u60A8\u524D\u5F80\u6B50\u6D32 60 \u591A\u500B\u57CE\u5E02";
    devDynamicContent.FeedData[0].cta = "\u7ACB\u5373\u9810\u8A02";
    devDynamicContent.FeedData[0].pricesEnabled = false;
    devDynamicContent.FeedData2= [{}];
    devDynamicContent.FeedData2[0]._id = 0;
    devDynamicContent.FeedData2[0].ID = 1;
    devDynamicContent.FeedData2[0].region = "Helsinki";
    devDynamicContent.FeedData2[0].startDate = {};
    devDynamicContent.FeedData2[0].startDate.RawValue = "04/02/2011 00:00 (+02:00)";
    devDynamicContent.FeedData2[0].startDate.UtcValue = 1301695200000;
    devDynamicContent.FeedData2[0].endDate = {};
    devDynamicContent.FeedData2[0].endDate.RawValue = "05/08/2043 00:00 (+02:00)";
    devDynamicContent.FeedData2[0].endDate.UtcValue = 2314648800000;
    devDynamicContent.FeedData2[0].imageUrl = {};
    devDynamicContent.FeedData2[0].imageUrl.Url = "http://campaigns.activearkjwt.com/finnair-aurora-event/img/bg2.jpg";
    devDynamicContent.FeedData2[0].copy1 = "\u5FEB\u6377\u98DB\u5F80_br_\u6B50\u6D32";
    devDynamicContent.FeedData2[0].copy2 = "\u63A1\u7528\u8DDD\u96E2\u66F4\u77ED\u7684\u5317\u65B9\u822A\u7DDA\uFF0C_br_\u524D\u5F80\u6B50\u6D32 60 \u591A\u500B\u57CE\u5E02";
    devDynamicContent.FeedData2[0].copy3 = "\u5FEB\u6377\u98DB\u5F80_br_\u6B50\u6D32";
    devDynamicContent.FeedData2[0].copy4 = "\u63A1\u7528\u8DDD\u96E2\u66F4\u77ED\u7684\u5317\u65B9\u822A\u7DDA\uFF0C_br_\u524D\u5F80\u6B50\u6D32 60 \u591A\u500B\u57CE\u5E02";
    devDynamicContent.FeedData2[0].cta = "\u7ACB\u5373\u9810\u8A02";
    devDynamicContent.FeedData2[0].pricesEnabled = false;
    Enabler.setDevDynamicContent(devDynamicContent);


  


  bg.src = dynamicContent.FeedData2[0].imageUrl.Url;
  addListeners();
  createTexts(0);
};

createTexts = function(textNum) {

  while (copies.firstChild) {
    copies.removeChild(copies.firstChild);
  }

  buttonExit.innerHTML = dynamicContent.FeedData2[0].cta.toUpperCase();

  copy1 = document.createElement("div");
  copy1.className ="copy1";
  //copy1.style.fontSize = "16px";

  var texts =   
  [dynamicContent.FeedData2[0].copy1,
  dynamicContent.FeedData2[0].copy2,
  dynamicContent.FeedData2[0].copy3,
  dynamicContent.FeedData2[0].copy4];
  //copy1.innerHTML = 
  var lines = texts[textNum].split("_br_");

  var lineSpans = [];

  copies.appendChild(copy1);

  for (var i = 0; i <= lines.length - 1; i++) {
    line = document.createElement("div");
    if(textNum == 1)  {
      line.style.textAlign = "left";
      copy1.style.left = "20px";
      line.style.width = "300px";
      line.style.fontSize = "21px";
      copy1.style.lineHeight = "30px";
    }
    else if(textNum == 4)  {
      line.style.textAlign = "left";
      copy1.style.left = "20px";
      line.style.width = "280px";
      line.style.fontSize = "21px";
    }
    else {
      copy1.style.left = "160px";
      line.style.width = "120px";
      line.style.textAlign = "center";
      if(textNum == 3) {
        copy1.style.top = "30px";
      }
      else {
        copy1.style.top = "24px";
      }
    }
    
    line.className = "line" + i;

    var delay = lines.length - 1 - i;

    line.style.webkitTransition="all 1s ease-out " + 0.2 * delay + "s";
    line.style.mozTransition="all 1s ease-out " + 0.2 * delay + "s";
    line.style.msTransition="all 1s ease-out " + 0.2 * delay + "s";
    line.style.OTransition="all 1s ease-out " + 0.2 * delay + "s";
    line.style.transition="all 1s ease-out " + 0.2 * delay + "s";

    line.innerHTML = lines[i].toUpperCase() + "<br>";
    copy1.appendChild(line);

    lineSpans.push(line);
    copy1.appendChild(line);
  }; 
  setTimeout(function() {
    animateTexts(lineSpans, textNum);
  },500);
}


var pfx = ["webkit", "moz", "MS", "o", ""];
function prefixedEventListener(element, type, callback) {
    for (var p = 0; p < pfx.length; p++) {
        if (!pfx[p]) type = type.toLowerCase();
        element.addEventListener(pfx[p]+type, callback, false);
    }
}

var first = true;
var frame = 1;

addListeners = function(e) {
  bgExit.addEventListener('click', bgExitHandler , false);
  buttonExit.addEventListener('click', buttonExitHandler , false);

  prefixedEventListener(bg,"TransitionEnd",function(e){  
    if(frame == 2) {
      anim.style.opacity = "0";

      bg.style.opacity = "0";

      copies.style.opacity = "0";
      setTimeout(function() {
        createTexts(1);
      },500);
      setTimeout(function() {
        first = true;
        anim.removeAttribute('style');
        con.removeAttribute('style');
        animate();
        copies.style.opacity = "0";
        setTimeout(function() {
          createTexts(2);
        },500);
      }, 6000);
    }   
    if(frame == 4 && dynamicContent.FeedData[0].pricesEnabled) {
      setTimeout(function() {
        copies.style.opacity = "0";
        setTimeout(function() {
          createTexts(3);
        },500);
      }, 4000);
    }

    console.log(frame);

    frame++;
  });

  setTimeout(animate, 500);

};



animate = function() {

  var maskImg = [];
  var maskLayer = [];
  var maskContainer = [];


  while (con.firstChild) {
    con.removeChild(con.firstChild);
  }


      maskContainer = document.createElement("div");
      maskContainer.className ="maskPieceContainer";
      maskContainer.removeAttribute('style');

      maskImg = document.createElement("div");
      maskImg.className ="maskPiece";
      maskImg.removeAttribute('style');

      maskLayer = document.createElement("div");
      maskLayer.className ="maskPiece2";
      maskLayer.removeAttribute('style');

      maskContainer.style.transformOrigin="50% 50%";
      maskContainer.style.webkitTransformOrigin="50% 50%";
      maskContainer.style.mozTransformOrigin="50% 50%";
      maskContainer.style.msTransformOrigin="50% 50%";
      maskContainer.style.OTransformOrigin="50% 50%";

      maskImg.style.transformOrigin="50% 50%";
      maskImg.style.webkitTransformOrigin="50% 50%";
      maskImg.style.mozTransformOrigin="50% 50%";
      maskImg.style.msTransformOrigin="50% 50%";
      maskImg.style.OTransformOrigin="50% 50%";

      //maskContainer.style.transform="rotate(" + Math.floor(Math.random() * 220) + 1 + "deg)";
      
      var delay = 0.1;
      var duration = 0.4;
      var op = 2;

      maskImg.style.webkitTransition="opacity "+op+"s ease-in "+ delay +"s, -webkit-transform 2s ease-in-out "+ delay +"s";
      maskImg.style.mozTransition="opacity "+op+"s ease-in "+ delay +"s, -moz-transform 2s ease-in-out "+ delay +"s";
      maskImg.style.msTransition="opacity "+op+"s ease-in "+ delay +"s, -ms-transform 2s ease-in-out "+ delay +"s";
      maskImg.style.OTransition="opacity "+op+"s ease-in "+ delay +"s, -o-transform 2s ease-in-out "+ delay +"s";
      maskImg.style.transition="opacity "+op+"s ease-in "+ delay +"s, transform 2s ease-in-out "+ delay +"s";
     
      maskLayer.style.webkitTransition="opacity 1s ease-out "+ delay +"s";
      maskLayer.style.mozTransition="opacity 1s ease-out "+ delay +"s";
      maskLayer.style.msTransition="opacity 1s ease-out "+ delay +"s";
      maskLayer.style.OTransition="opacity 1s ease-out "+ delay +"s";
      maskLayer.style.transition="opacity 1s ease-out "+ delay +"s";

      maskContainer.appendChild(maskImg);
      maskContainer.appendChild(maskLayer);   
      
      con.appendChild(maskContainer);

      revealFace(maskImg, maskLayer, maskContainer);

  
}

animateTexts = function(spans, textNum) {



  if(textNum != 1) {
    for (var i = spans.length - 1; i >= 0; i--) {
      textFit(spans[i], {widthOnly: true, multiLine: false, detectMultiLine: false, reProcess: false});
    }
  }
  
  
  

  copies.style.opacity = "1";
  var nodes = copy1.childNodes;
  for(var i=0; i<nodes.length; i++) {
    nodes[i].style.webkitTransform="translate3d(0, 20px, 0)";
    nodes[i].style.mozTransform="translate3d(0, 20px, 0)";
    nodes[i].style.msTransform="translate3d(0, 20px, 0)";
    nodes[i].style.OTransform="translate3d(0, 20px, 0)";
    nodes[i].style.transform="translate3d(0, 20px, 0)";
    nodes[i].style.opacity = "1";
  }
}


revealFace = function(maskImg, maskLayer, maskImg2) {

  setTimeout(function() {

    buttonExit.style.opacity = "1";
    con.style.webkitTransition="all 5s ease-in-out 0s";
    con.style.mozTransition="all 5s ease-in-out 0s";
    con.style.msTransition="all 5s ease-in-out 0s";
    con.style.OTransition="all 5s ease-in-out 0s";
    con.style.transition="all 5s ease-in-out 0s";
    


    bg.style.webkitTransition="-webkit-transform 5s ease-in-out 2s, opacity 1s ease-in-out 0s";
    bg.style.mozTransition="-moz-transform 5s ease-in-out 2s, opacity 1s ease-in-out 0s";
    bg.style.msTransition="-ms-transform 5s ease-in-out 2s, opacity 1s ease-in-out 0s";
    bg.style.OTransition="-o-transform 5s ease-in-out 2s, opacity 1s ease-in-out 0s";
    bg.style.transition="transform 5s ease-in-out 2s, opacity 1s ease-in-out 0s";

    bg.style.webkitTransform="translate3d(0, 0, 0)";
    bg.style.mozTransform="translate3d(0, 0, 0)";
    bg.style.msTransform="translate3d(0, 0, 0)";
    bg.style.OTransform="translate3d(0, 0, 0)";
    bg.style.transform="translate3d(0, 0, 0)";

    bg.style.opacity = "1";

    maskImg.style.webkitTransform="scale(1.0, 1.0)";
    maskImg.style.mozTransform="scale(1.0, 1.0) rotate(0.01deg)";
    maskImg.style.msTransform="scale(1.0, 1.0) rotate(0.01deg)";
    maskImg.style.OTransform="scale(1.0, 1.0) rotate(0.01deg)";
    maskImg.style.transform="scale(1.0, 1.0) rotate(0.01deg)";

    maskImg.style.opacity="0";

    maskLayer.style.opacity = "0";
    
  },500);  
}


bgExitHandler = function(e) {

  Enabler.exit("background clicktrough");
}

buttonExitHandler = function(e) {

  Enabler.exit("button clicktrough");
}

// Wait for Enabler to init
window.onload = function(){
  
  if (Enabler.isInitialized()) {
    enablerInitHandler();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
  }
};















