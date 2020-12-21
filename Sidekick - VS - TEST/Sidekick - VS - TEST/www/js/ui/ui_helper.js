// Helper function to resize items - Can probably make a more generic version
function AlterRatingHeights(array, idPrefix, idPostFix) {
    for (var i = 0; i < array.length; i++) {
        var obj = array[i];
        var gameName = obj[0].replace(/_/g, ' ');

        GetHeights(idPrefix + gameName + idPostFix);
    }
}

function isEmpty(myObject) {
    for (var key in myObject) {
        if (myObject.hasOwnProperty(key)) {
            return false;
        }
    }

    return true;
}

function AddCollapseIcon(parent) {
    var ic = '<div class="ui-icon ui-btn-icon-left ui-icon-minus dividerIcon">&nbsp;</div>';
    $(parent + " > ul > li.ui-li-divider").prepend(ic);
    $(parent + " > ul > li.ui-li-divider").addClass("collapse-ui-li-divider");
    $(".dividerIcon").addClass("divIconPos");
}

//ARRAY HELPERS

function arrayUnique(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}

function SortById(a, b) {
    var aName = a[0].toLowerCase();
    var bName = b[0].toLowerCase();
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

//Radio button helpers

function set_jqm_radio_button_off(button_name, value) {

    $('input:radio[name="' + button_name + '"]').filter('[value="' + value + '"]').prop('checked', false).checkboxradio().checkboxradio('refresh');
}

function set_jqm_radio_button(button_name, value) {

    $('input:radio[name="' + button_name + '"]').filter('[value="' + value + '"]').prop('checked', true).checkboxradio().checkboxradio('refresh');
}

//MISC

function AllowedOnline() {
    return currentRecord.verified;
}

function TransformGameName(name) {
    var transformed = name.replace(/'/g, "");
    transformed = transformed.replace(/&apos;/g, "");
    transformed = transformed.replace(/&amp;/g, "");
    transformed = transformed.replace(/&/g, "");
    transformed = transformed.replace(/ /g, '_').toLowerCase();

    return transformed;
}

function TransformedCurrentGameName() {
    var transformed = currentGameName.replace(/'/g, "");
    transformed = transformed.replace(/&apos;/g, "");
    transformed = transformed.replace(/&amp;/g, "");
    transformed = transformed.replace(/&/g, "");
    transformed = transformed.replace(/ /g, '_').toLowerCase();

    return transformed;
}

var gameMapping = [];

function FindGameInCatalog(gameName) {

    if (gameMapping.length === 0) {
        for (var game in gameCatalog) {
            if (gameCatalog.hasOwnProperty(game)) {

                var lower = gameCatalog[game].name.toLowerCase();
                var transformed = TransformGameName(gameCatalog[game].name);

                if (lower === transformed)
                {
                    gameMapping[lower] = game;
                }
                else
                {
                    gameMapping[lower] = game;
                    gameMapping[transformed] = game;
                }
            }
        }
    }

    return gameMapping[gameName];
}

$(document).on("scroll touchmove", Toggle);

function Toggle() {
    if (CurrentPage() === "#Game") {
        if ($(document).scrollTop() > 1) {
            $('#gamebanner').addClass('tiny');
        } else {
            $('#gamebanner').removeClass('tiny');
            $(window).trigger('resize');
        }
    }
    if (CurrentPage() === "#GameHighScores") {
        if ($(document).scrollTop() > 1) {
            $('#gamebannerhs').addClass('tiny');
        } else {
            $('#gamebannerhs').removeClass('tiny');
            $(window).trigger('resize');
        }
    }
    if (CurrentPage() === "#MyDetailedScores") {
        if ($(document).scrollTop() > 1) {
            $('#detailedGameNameBanner').addClass('tiny');
        } else {
            $('#detailedGameNameBanner').removeClass('tiny');
            $(window).trigger('resize');
        }
    }
}

var popupopen = 0;
var popupname = '';
var temppopup = null;

function ShowPopup(name) {
    temppopup = null;
    $(name).popup('open');
    $('body').addClass('no-scroll');
    popupopen = 1;
    popupname = name;
}

var nextPopup = '';
var nextPopupId = '';

function SetNextPopUpId(id) {
    nextPopupId = id;
}

function SetNextPopUp(popupText) {
    nextPopup = popupText;
}

function ClosePopupWithNextPopoup() {
    $(popupname).off();
    $(popupname).on("popupafterclose", function () {
        if (nextPopupId !== '') {
            ShowPopup(nextPopupId);
            nextPopupId = '';
        }
        else {
            nextPopupId = '';
            popupname = '';
        }
    });

    $('body').removeClass('no-scroll');
    popupopen = 0;

    if (temppopup !== null) {
        temppopup.popup('close');
        popupname = '';
    }
    else {
        $(popupname).popup('close');
    }
}

function ClosePopup(popname) {

    if (popname) {
        popupname = popname;
    }

    $('body').removeClass('no-scroll');
    popupopen = 0;
    if (temppopup !== null) {
        temppopup.popup('close');
    }
    else {
        $(popupname).popup('close');
    }
    popupname = '';
}

function CreatePopup(popupCode) {

    popupopen = 1;

    var $popUp = $("<div data-overlay-theme='b'/>").popup({
        dismissible: false,
        theme: themeLetter,
        transition: "pop"
    }).on("popupafterclose", function () {
        $(this).remove();
        if (nextPopup !== '') {
            CreatePopup(nextPopup);
            nextPopup = '';
        }
        if (nextPopupId !== '') {
            ShowPopup(nextPopupId);
            nextPopupId = '';
        }
    });

    $(popupCode, {}).appendTo($popUp);
    $popUp.popup('open').trigger("create");
    temppopup = $popUp;
}

function DoNothing() { }