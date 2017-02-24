$(document).on('click', '.js-navtoggle--mobile', function(event){
    if($('.navigation__list--mobile').is(':visible')){
        $('.navigation__list--mobile').hide();
        }
    else{
        $('.navigation__list--mobile').show();
    }
});
