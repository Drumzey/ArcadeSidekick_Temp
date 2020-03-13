var pageHistory = new Array();

function deviceready() {
    $(document).bind('backbutton', NavigateBackDeviceButton);
}
$(document).bind('deviceready', deviceready);

function ExitApp() {
    console.log("Exiting app");
    navigator.app.exitApp();
}

function NavigateToInternalPage(pageName) {
    if (CurrentPage() !== pageName) {
        pageHistory.push(pageName);
        Navigate(pageName);
    }
}

function NavigateBack() {
    var pageFrom = pageHistory[pageHistory.length - 1];

    pageHistory.pop();

    if (pageHistory.length === 0) {
        ExitApp();
    } else {
        var lastPage = pageHistory[pageHistory.length - 1];
        Rehighlight(); //Refresh the current tab
        if (lastPage === "#MyScores" && refreshMyScores) {
            SetLocalScoresUI();
            AlterScoreHeights();
            refreshMyScores = 0;
        }

        if (pageFrom === "#Game")
        {
            var videoElement = document.getElementById("gamevideo");
            videoElement.setAttribute('src', '');
        }

        if (lastPage === "#Game" && refreshGame) {
            PopulateInfoForGame(currentGameNode.id, currentGameNode.innerText);
            refreshGame = 0;
        }

        if (lastPage === "#Category") {
            if (currentTab === 'FRIENDSSCORES' || currentTab === 'ALLSCORES') {
                SetCurrentTab(lastCategoryGamesTab);
            }
        }
        if (lastPage === "#Everything") {
            if (currentTab === 'FRIENDSSCORES' || currentTab === 'ALLSCORES') {
                SetCurrentTab(lastAllGamesTab);
            }
        }

        Navigate(lastPage);

        if (lastPage === "#Category" || lastPage === "#Everything") {
            if (storePosition.topCoordinate !== null) {
                $.mobile.silentScroll(storePosition.topCoordinate - 75);
            }
        }

        if (lastPage === "#MainMenu") {
            $.mobile.silentScroll(0);
        }
    }
}

function CurrentPage() {
    return pageHistory[pageHistory.length - 1];
}

function NavigateBackDeviceButton(e) {
    e.preventDefault();

    if (popupopen === 0) {
        NavigateBack();
    } else {
        ClosePopup();
    }
}

function Navigate(pageName) {
    console.log(pageHistory);
    $.mobile.pageContainer.pagecontainer("change", pageName);
    $(window).trigger('resize');
}