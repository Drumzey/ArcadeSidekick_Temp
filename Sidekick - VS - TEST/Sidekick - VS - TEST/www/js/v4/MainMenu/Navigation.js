function NavigateFromMainMenu(section) {

    if (CheckForUploads())
    {
        var popupText = uploadsNeeded.replace("SECTION", section);
        CreatePopup(popupText);
    }
    else
    {
        CompleteNavigation(section);
    }
}

function CompleteNavigation(section) {

    var appPage = AppPages[section];

    switch (section) {
        case "profile":
        case "setupfriendsTile":
        case "quiz":
        case "venues":
        case "achievements":
        case "tips":
        case "addTip":
            if (appPage.validateNavigate() === false) {
                // We are not allowed to navigate to the page
                CreatePopup(cannotNavigateAsNotOnline);
                return;
            }
            else {
                appPage.beforeNavigate();
                NavigateToInternalPage('#' + appPage.pageName);
                appPage.afterNavigate();
            }
            break;
        case "scores":
            MyScores();
            break;
        case "videogames":
            GotoGenre();
            break;
        case "pinball":
            GoToCategory("pinball");
            break;
        case "vectrex":
            GoToCategory("vectrex");
            break;
        case "custom":
            CustomGames();
            break;
        case "notifications":
            GoToNotifications();
            break;
        case "head2head":
            Head2Head();
            break;
        case "clubs":
            GotoClubs();
            break;
        case "top10":
            ArcadeTop50();
            break;
        case "bottom10":
            ArcadeBottom50();
            break;
        case "recentActivity":
            GetRecentActivity(0);
            break;
        default:
            CreatePopup(unknownPagePopUp);
            break;
    }
}

function Settings() {
    Setup();
    NavigateToInternalPage("#Settings");
}

function MyScores() {
    GoToMyScores();
}

function Friends() {
    SetupFriends();
}

function Category(node) {
    GoToCategory(node);
}

function AllGames(tab) {
    if (tab === null || tab === undefined) {
        SetAllGamesTab("AllAllTab");
        SetCurrentTab("AllAllTab");
    } else {
        SetAllGamesTab(tab);
        SetCurrentTab(tab);
    }

    $.mobile.loading('show', {
        theme: themeLetter,
        text: "Loading...",
        textVisible: "true"
    });
    setTimeout(function () {
        DisplayEveryGame();
    }, 1);
}