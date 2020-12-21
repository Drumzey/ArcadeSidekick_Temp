function UnsuccessfulOnlineCall() {
    //Quit the current pop up routine if there is one
    if (popupopen === 1) {
        popupsOnStartup = [];
        SetNextPopUp(errorOnlinePopup);
        ClosePopup();
    }
    else {
        CreatePopup(errorOnlinePopup);
    }
}

function StandardCompleteACOnline() {
    $.mobile.loading('hide');
}

function UnsuccessfulOnlineMultiCall() {
    multiCallHasFailed = true;
}

function FinalErrorForOnlineMultiCall(navigateTo, callback) {
    onlineCalls--;

    if (onlineCalls === 0) {
        if (multiCallHasFailed) {
            ShowPopup('#ErrorDetailed');
            StandardCompleteACOnline();
        }
        else {
            StandardCompleteACOnline();
            NavigateToInternalPage(navigateTo);
            callback();
        }
    }
}