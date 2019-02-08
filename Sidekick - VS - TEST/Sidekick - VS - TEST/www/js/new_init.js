$(document).bind("mobileinit", function () {
    $.mobile.defaultPageTransition = 'none';
    $.mobile.changePage.defaults.changeHash = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
});

var gameOnShow = '';
$(document).on('pageshow', "div[data-role='page']", function () {
    $(window).trigger('resize');    
    if (CurrentPage() === "#Game") {
        $.mobile.silentScroll(0);
        Toggle();
        $(window).trigger('resize');
    }         
});

$(document).on("pagecreate", function () {
    $.mobile.loading('hide');
});
