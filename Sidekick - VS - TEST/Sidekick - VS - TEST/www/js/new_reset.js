function ResetData() {
    CallACOnlineWithWait('http://arcadeclub.azurewebsites.net/user/' + clientUserName + '/delete',
        'POST',
        function () {
            SuccessfulResetData();
        },
        function () {
            UnsuccessfulOnlineCall();
        },
        function () {
            DoNothing();
        },
        "Removing user records...");
}

function SuccessfulResetData() {
    if (latestXHTTP.status === 200) {

        //Clear everything from local storage
        ClearStorage();

        //Set up generic notifications in local storage and pushbots config
        SetItemInStorage('firstTime', 'no');
        SetItemInStorage('firstTimeSubmit', 'no');
        SetItemInStorage('notify', 'on');
        TurnOnNotifications();        

        ResetScores();
        ResetACOnline();
        ResetStarRating();
        ResetUserCreation();

        pageHistory = new Array();
        //Refresh the UI and Number of games played
        SetNewThemeInUI();
        init();

        CloseReset();
    } else {
        UnsuccessfulOnlineCall();
    }
}