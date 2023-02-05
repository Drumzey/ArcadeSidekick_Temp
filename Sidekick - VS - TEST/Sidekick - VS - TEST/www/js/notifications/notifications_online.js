function SideKickOnline_MyMessages() {

    CallACOnlineWithBodyAndWait(
        newBaseUrl + accountUserUrl + 'messages?username=' + clientUserName + '&clear=true',
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