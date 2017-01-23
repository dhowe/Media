/* Put all code that should be run once the page has been loaded in here */

var $ = jQuery;

$(document).ready(function() {
    // Captify images
    $('img.captify').captify({});
});

function openLink(href, target) {
    window.open(href, target);
    return false;
}

/* Tables */
$(document).ready(function() {
  /* Row coloring for normal tables */
  $("table.add-row-status").find("tbody tr:even").addClass("even");
  
  /* Inline tables */
  $(".article-page table").attr("cellspacing", "0");
  $(".article-page table").find("tbody > tr:even").addClass("even");
  $(".article-page table").find("tbody > tr:first > td > strong").addClass("table-header").parent().addClass("th").parent().parent().parent().find("tbody > tr:even").removeClass("even").parent().parent().find("tbody > tr:odd").addClass("even");;
  $(".article-page table").find("tbody > tr:first > td.th:first-child").addClass("first");
});

/* Tell to a friend form */
$(document).ready(function() {
  $(".emptyfield-stf").val("3sjdn3s");
});