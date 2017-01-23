var image_ids;
var currentCaptcha = 0;

function showCaptcha(id) {
    for(var i = 0; i < image_ids.length; i++) {
        var elem = document.getElementById(image_ids[i]);
        if(id == i) {
            elem.style.display ="block";
            currentCaptcha = i;
        } else {
            elem.style.display ="none";
        }
    }
}

function nextCaptcha() {
    currentCaptcha++;
    if(currentCaptcha >= image_ids.length) {
        currentCaptcha = 0;
    }
    showCaptcha(currentCaptcha);
}

function initCaptcha(ids) {
    image_ids = ids;
    showCaptcha(Math.floor(Math.random()*image_ids.length));
}
