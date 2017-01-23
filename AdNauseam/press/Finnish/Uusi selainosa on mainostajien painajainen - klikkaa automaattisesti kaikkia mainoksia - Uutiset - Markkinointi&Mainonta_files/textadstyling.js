$(document).ready(function() {
    var ad_container_class = "leikiad";
    
    $("."+ad_container_class).prepend("<p>[ mainos ]</p>");
    $("."+ad_container_class).css({
        "margin":       "2em 0",
        "padding":      "1em 0",
        "border-top":   "2px solid #EEE",
        "border-bottom":"2px solid #EEE"
    });
    $("."+ad_container_class+" h6").css({
        "margin":       "0 0 1em",
        "font-size":    "1.04em"
    });
});
