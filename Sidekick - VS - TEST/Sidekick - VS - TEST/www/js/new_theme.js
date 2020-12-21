var theme = 'default';
var themeLetter = 'a';

$.mobile.changeGlobalTheme = function (themeL) {
    var themes = " a b c d e f g h i";

    function setTheme(cssSelector, themeClass, themeL) {

        if ($(cssSelector).hasClass(themeClass + "-a") ||
            $(cssSelector).hasClass(themeClass + "-b") ||
            $(cssSelector).hasClass(themeClass + "-c") ||
            $(cssSelector).hasClass(themeClass + "-d") ||
            $(cssSelector).hasClass(themeClass + "-e") ||
            $(cssSelector).hasClass(themeClass + "-f") ||
            $(cssSelector).hasClass(themeClass + "-g") ||
            $(cssSelector).hasClass(themeClass + "-h") ||
            $(cssSelector).hasClass(themeClass + "-i")) {
            $(cssSelector)
                .removeClass(themes.split(" ").join(" " + themeClass + "-"))
                .addClass(themeClass + "-" + themeL)
                .attr("data-theme", themeL);
        }
    }

    setTheme(".ui-mobile-viewport", "ui-overlay", themeL);
    setTheme("[data-role='popup']", "ui-page-theme", themeL);
    setTheme("[data-role='popup']", "ui-body", themeL);
    setTheme("[data-role='content']", "ui-body", themeL);
    setTheme("[data-role='header']", "ui-bar", themeL);
    setTheme("[data-role='listview'] > li", "ui-body", themeL);

    setTheme("[data-role='list-divider']", "ui-bar", themeL);
    $("[data-role='list-divider']")
        .removeClass(themes.split(" ").join(" " + "ui-body" + "-"))

    setTheme("li", "ui-btn-up", themeL);
    setTheme("a", "ui-btn", themeL);
    setTheme(".ui-btn", "ui-btn-up", themeL);
    setTheme(".ui-btn", "ui-btn-hover", themeL);
    setTheme("[data-role='page']", "ui-page-theme", themeL);

    //Tabs
    setTheme("#PlayedTab", "ui-btn", themeL);
    setTheme("#NotPlayedTab", "ui-btn", themeL);
    setTheme("#AllTab", "ui-btn", themeL);
    setTheme("#AllPlayedTab", "ui-btn", themeL);
    setTheme("#AllNotPlayedTab", "ui-btn", themeL);
    setTheme("#AllAllTab", "ui-btn", themeL);
    setTheme('#MYFRIENDS', "ui-btn", themeL);
    setTheme('#ALLUSERS', "ui-btn", themeL);
    setTheme('#CLUBS', "ui-btn", themeL);
    setTheme('#FRIENDSSCORESTAB', "ui-btn", themeL);
    setTheme('#ALLSCORESTAB', "ui-btn", themeL);

    setTheme('#MYVENUES', "ui-btn", themeL);
    setTheme('#ALLVENUES', "ui-btn", themeL);

    setTheme("#70s", "ui-btn", themeL);
    setTheme("#80s", "ui-btn", themeL);
    setTheme("#90s", "ui-btn", themeL);

    setTheme("#AllScores", "ui-btn", themeL);
    setTheme("#RegisteredScores", "ui-btn", themeL);

    setTheme("#flipswitchWrapper div", "ui-bar", themeL);

    setTheme("#AllPlayers", "ui-btn", themeL);
    setTheme("#FriendsOnly", "ui-btn", themeL);

    $("#textlink").removeClass(themes.split(" ").join(" ui-btn-"));
    $("#facebooklink").removeClass(themes.split(" ").join(" ui-btn-"));
    $("#twitterlink").removeClass(themes.split(" ").join(" ui-btn-"));
    $("#otherlink").removeClass(themes.split(" ").join(" ui-btn-"));
};

function UpdateTheme() {
    var choice;

    $("input[id*=rc-theme-]:checked").each(function () {
        choice = $(this).val();
    });

    theme = choice;

    switch (choice) {
        case "frogger":
            themeLetter = "b";
            break;
        case "qix":
            themeLetter = "c";
            break;
        case "joust":
            themeLetter = "d";
            break;
        case "pacman":
            themeLetter = "e";
            break;
        case "invader":
            themeLetter = "f";
            break;
        case "donkey":
            themeLetter = "g";
            break;
        case "arkanoid":
            themeLetter = "h";
            break;
        case "battlezone":
            themeLetter = "i";
            break;
        default:
            theme = "default";
            themeLetter = "a";
    }

    SetItemInStorageWithCallBack('theme', theme, SetNewThemeInUI);
}

function SetNewThemeInUI() {
    GetItemFromStorageWithCallBack('theme', function (value) {

        theme = value;

        set_jqm_radio_button_off("radio-choice", "default");
        set_jqm_radio_button_off("radio-choice", "frogger");
        set_jqm_radio_button_off("radio-choice", "qix");
        set_jqm_radio_button_off("radio-choice", "joust");
        set_jqm_radio_button_off("radio-choice", "pacman");
        set_jqm_radio_button_off("radio-choice", "invader");
        set_jqm_radio_button_off("radio-choice", "donkey");
        set_jqm_radio_button_off("radio-choice", "arkanoid");
        set_jqm_radio_button_off("radio-choice", "battlezone");

        set_jqm_radio_button("radio-choice", theme);

        $('link[id="secondstyle"]').attr('href', 'css/' + theme + '.css');

        switch (theme) {
            case "frogger":
                themeLetter = "b";
                break;
            case "qix":
                themeLetter = "c";
                break;
            case "joust":
                themeLetter = "d";
                break;
            case "pacman":
                themeLetter = "e";
                break;
            case "invader":
                themeLetter = "f";
                break;
            case "donkey":
                themeLetter = "g";
                break;
            case "arkanoid":
                themeLetter = "h";
                break;
            case "battlezone":
                themeLetter = "i";
                break;
            default:
                theme = "default";
                themeLetter = "a";
                $('link[id="secondstyle"]').attr('href', 'css/default.css');
        }

        $.mobile.changeGlobalTheme(themeLetter);

        Show("#MainMenu");
        $(window).trigger('resize');
    });
}