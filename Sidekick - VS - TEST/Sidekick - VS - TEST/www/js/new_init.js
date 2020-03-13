$(document).bind("mobileinit", function () {
    $.mobile.defaultPageTransition = 'none';
    $.mobile.changePage.defaults.changeHash = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
});

$(document).on("click", '.ui-li-divider, .dividerIcon', function (e) {

    var listName = $(this).parent().attr("id");

    switch (listName) {
        case "gamelistul":
        case "allGamesul":
        case "allgamelistplayedul":
        case "allgamelistnotplayedul":
        case "gamelistplayedul":
        case "gamelistnotplayedul":
            break;
        default:
            e.stopPropagation();
            return false;
    }

    var IsCollapsed = false;
    var TheDivider = $(this);
    if ($(this).hasClass('dividerIcon')) {
        TheDivider = $(this).parents('.ui-li-divider');
    }

    var li = TheDivider.next(':not(.ui-li-divider)');
    while (li.length > 0) {
        IsCollapsed = li.css('display') === 'none';
        li.toggle();
        li = li.next(':not(.ui-li-divider)');
    }

    if (!IsCollapsed) {
        TheDivider.find('.dividerIcon').removeClass('ui-icon-minus').addClass('ui-icon-plus');
    } else {
        TheDivider.find('.dividerIcon').removeClass('ui-icon-plus').addClass('ui-icon-minus');
    }
    e.stopPropagation();
    return false;
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
    else if (CurrentPage() === "#Head2Head") {
        if (initHead2Head === false) {
            var myselect = $('#select-opponent-2');
            myselect[0].selectedIndex = 1;
            myselect.selectmenu("refresh");
            PopulateComparison();
            initHead2Head = true;
        }
    }
});

$(document).delegate('[data-role="page"]', 'pageinit', function () {

    $("#gamelistul").on("filterablefilter", function (e, data) {
        var result = $(this).children("li").not(".ui-screen-hidden").length;
        if (result === 0) {
            $('#no-results-gamelistul').fadeIn(300);
        } else {
            $('#no-results-gamelistul').fadeOut(0);
        }
    });

    $("#gamelistnotplayedul").on("filterablefilter", function (e, data) {
        var result = $(this).children("li").not(".ui-screen-hidden").length;
        if (result === 0) {
            $('#no-results-gamelistnotplayedul').fadeIn(300);
        } else {
            $('#no-results-gamelistnotplayedul').fadeOut(0);
        }
    });

    $("#allGamesul").on("filterablefilter", function (e, data) {
        var result = $(this).children("li").not(".ui-screen-hidden").length;
        if (result === 0) {
            $('#no-results-allGamesul').fadeIn(300);
        } else {
            $('#no-results-allGamesul').fadeOut(0);
        }
    });

    $("#allgamelistnotplayedul").on("filterablefilter", function (e, data) {
        var result = $(this).children("li").not(".ui-screen-hidden").length;
        if (result === 0) {
            $('#no-results-allgamelistnotplayedul').fadeIn(300);
        } else {
            $('#no-results-allgamelistnotplayedul').fadeOut(0);
        }
    });
});


$(document).on("pagecreate", function () {
    $.mobile.loading('hide');
});
