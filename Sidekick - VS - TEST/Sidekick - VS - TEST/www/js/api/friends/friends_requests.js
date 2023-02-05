function SaveFriendsOnline() {

    if (!AllowedOnline()) {
        return;
    }

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
        },
        function (err) {
            alert(err.message);
            UnsuccessfulOnlineCall();
        },
        function () {
            StandardCompleteACOnline();
        },
        'Saving friends...',
        jwt);
}