function SaveFriendsOnline()
{
    var jwt = CreateJWT(clientUserName, emailAddress, secret);

    var body = {
        'Username': clientUserName,
        'TwitterHandle': twitterHandle,
        'Friends': friendsCollection
    };

    CallACOnlineWithBodyAndWait(baseUrl + '/users/update',
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