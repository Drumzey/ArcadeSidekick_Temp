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

    if (gameMapping.length === 0)
    {
        for (var game in gameCatalog) {
            if (gameCatalog.hasOwnProperty(game)) {
                gameMapping[gameCatalog[game].name.toLowerCase()] = game;                
            }
        }
    }

    return gameMapping[gameName];
}

$(document).on("scroll touchmove", Toggle);

function Toggle() {
    if (CurrentPage() === "#Game")
    {
        if ($(document).scrollTop() > 1) {
            $('#gamebanner').addClass('tiny');
        } else {
            $('#gamebanner').removeClass('tiny');
            $(window).trigger('resize');
        }
    }
    if (CurrentPage() === "#GameHighScores")
    {
        if ($(document).scrollTop() > 1) {
            $('#gamebannerhs').addClass('tiny');
        } else {
            $('#gamebannerhs').removeClass('tiny');
            $(window).trigger('resize');
        }
    }
}

function DoNothing() { }