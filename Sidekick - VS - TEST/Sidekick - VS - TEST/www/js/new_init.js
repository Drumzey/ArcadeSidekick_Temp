$(document).bind("mobileinit", function () {
    $.mobile.defaultPageTransition = 'none';
    $.mobile.changePage.defaults.changeHash = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
});

var gameOnShow = '';
var loaded = false;
$(document).on('pageshow', "div[data-role='page']", function () {
    $(window).trigger('resize');    
    if (CurrentPage() === "#Game") {
        $.mobile.silentScroll(0);
        Toggle();
        $(window).trigger('resize');
    }    
    else if (CurrentPage() === "#MainMenu" && loaded === false) {
        loaded = true;
        if (!CheckForFirstTime()) {         
            CheckForVerified();
            LoadFriendsGames();
        }
    }
});

$(document).on("pagecreate", function () {
    $.mobile.loading('hide');
});
