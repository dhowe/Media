!function(t){"use strict";function e(){var e=t.frameElement;this.detectAndroid(),i.addListener(this.onWidthChange.bind(this)),this.onWidthChange(i),null!==e&&this._withinIFrame()&&(this.throttle("resize","optimizedResize"),t.addEventListener("optimizedResize",this.resizeIFrameToFitContent.bind(this,e)))}var i=t.matchMedia("(max-width: 320px)"),n=Array.prototype.slice.call(document.querySelectorAll("footer#cbc-globalfooter h2"));return e.prototype.throttle=function(e,i,n){var o=n||t,r=!1,c=function(){r||(r=!0,requestAnimationFrame(function(){o.dispatchEvent(new CustomEvent(i)),r=!1}))};o.addEventListener(e,c)},e.prototype.detectAndroid=function(){var t=navigator.userAgent,e=t.indexOf("Android")>-1;if(e){var i=parseFloat(t.slice(t.indexOf("Android")+8)).toFixed(1);if(i<4.4){var n=document.querySelectorAll("img.cbc-globalfooter-logo"),o=n[0].src.replace("svg","png");n[0].src=o}}},e.prototype.navClickHandler=function(t){var e=t.target,i=e.parentElement;n.forEach(function(t,i,n){t!==e&&t.parentElement.classList.remove("cbc-globalfooter-mobile-active")},this),i.classList.toggle("cbc-globalfooter-mobile-active")},e.prototype._setListeners=function(){n.forEach(function(t,e,i){t.addEventListener("click",this.navClickHandler)},this)},e.prototype._removeListeners=function(){n.forEach(function(t,e,i){t.removeEventListener("click",this.navClickHandler)},this)},e.prototype.onWidthChange=function(t){t.matches?this._setListeners():this._removeListeners()},e.prototype._withinIFrame=function(){var e=!1;return t.location!==t.parent.location&&(e=!0),e},e.prototype.resizeIFrameToFitContent=function(t){t.id?t.height=t.contentDocument.body.scrollHeight:console.error("missing footer iframe ID")},new e}(window);