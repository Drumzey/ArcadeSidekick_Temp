function SideKickOnline_MyMessages() {
    CallACOnlineWithBodyAndWait(baseUrl + '/notifications?username=' + clientUserName + '&clear=true',
        'GET',
        null,
        function () {
            SuccessfulGetMyMessages();
        },
        function () {
            UnsuccessfulOnlineCall();
        },
        function () {
            StandardCompleteACOnline();
        },
        'Please wait.....');
}

function SideKickOnline_MyMessagesStartup() {
    CallACOnlineWithBodyAndWait(baseUrl + '/notifications?username=' + clientUserName + '&clear=false',
        'GET',
        null,
        function () {
            SuccessfulGetMyMessagesOnStartup();
        },
        function () {
            UnsuccessfulOnlineCall();
        },
        function () {
            onlineCalls--;

            if (onlineCalls === 0) {
                if (startuphaserrored) {
                    UnsuccessfulOnlineCall();
                    StandardCompleteACOnline();
                }
                else {
                    CompletedStartUp();
                }
            }
        },
        'Please wait.....');
}

function SuccessfulGetMyMessagesOnStartup() {
    if (latestXHTTP.status === 200) {
        var messageData = JSON.parse(latestXHTTP.responseText);
        myNotifications = messageData.New;
        myOldNotifications = messageData.Old;
        if (myNotifications.length === 0) {
            $('#notifications').attr('data-badge', '');
        }
        else {
            $('#notifications').attr('data-badge', myNotifications.length);
        }
    };
}

function SuccessfulGetMyMessages() {
    if (latestXHTTP.status === 200) {
        var messageData = JSON.parse(latestXHTTP.responseText);
        myNotifications = messageData.New;
        myOldNotifications = messageData.Old;
        PopulateNotifications();
        NavigateToInternalPage("#Notifications");
        if (firstTimeNotification === "yes") {
            CreatePopup(firstTimeNotificationPopup);
            firstTimeNotification = "no";
            SetItemInStorage("firstTimeNotification", firstTimeNotification);
        }
    }
    else {
        CreatePopup(errorOnlinePopup);
    }
}