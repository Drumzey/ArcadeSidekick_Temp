function Settings() {
    Setup();
    NavigateToInternalPage("#Settings");
}

function News() {
    GetNews();
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

function ArcadeTop20() {
    GetArcadeTop20();
}

function AllGames(tab) {
    if (tab === null || tab === undefined) {
        currentTab = "AllAllTab";
    } else {
        currentTab = tab;
    }

    Rehighlight();

    $.mobile.loading('show', {
        theme: themeLetter,
        text: "Loading...",
        textVisible: "true"
    });
    setTimeout(function () {
        DisplayEveryGame();
    }, 1);
}