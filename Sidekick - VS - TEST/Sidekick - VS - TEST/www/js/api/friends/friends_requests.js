function SaveFriendsOnline() {

    var url = newBaseUrl + userUrl + 'update';

    var jwt = CreateJWT(clientUserName, emailAddress, secret);

    var body = {
        'Username': clientUserName,
        'TwitterHandle': twitterHandle,
        'Friends': friendsCollection
    };

    CallACOnlineWithBodyAndWait(url,
        'POST',
        body,
        function () {
            SetNextPopUp(successfulUpdateFriendsPopup);
            ClosePopup();
        },
        function (err) {
            UnsuccessfulOnlineCall();
        },
        function () {
            StandardCompleteACOnline();
        },
        'Saving friends...',
        jwt);
}