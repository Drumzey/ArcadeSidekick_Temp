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
    if (CurrentPage !== pageName) {
        pageHistory.push(pageName);
        Navigate(pageName);
    }
}

function NavigateBack() {
    var pageFrom = pageHistory[pageHistory.length - 1];

    //if (pageFrom === "#Game" && scoreEdited === 1) {
    //    scoreEdited = 0;
    //    if (currentGameType === "time") {
    //        SetTime(1);
    //    }
    //    else {
    //        SetScore(1);
    //    }        
    //    return;
    //}

    pageHistory.pop();

    if (pageHistory.length === 0) {
        ExitApp();
    } else {
        var lastPage = pageHistory[pageHistory.length - 1];
        Navigate(lastPage);

        Rehighlight();        

        if (lastPage === "#MyScores" && refreshMyScores) {            
            SetLocalScoresUI();            
            AlterScoreHeights();
            refreshMyScores = 0;
        }

        if (lastPage === "#Game" && refreshGame) {
            PopulateInfoForGame(currentGameNode.id, currentGameNode.innerText);
            refreshGame = 0;
        }
 
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