function SideKickOnline_SetProfileStats(body) {

    var jwt = CreateJWT(clientUserName, emailAddress, secret);

    CallACOnlineWithBody(newBaseUrl + accountUserUrl + 'profile',
        'POST',
        body,
        function () {
            //On success we are not going to do anything
        },
        function () {
            //We might fail but its a background update so we are not too bothered by this
        },
        function () {
        },
        jwt);
}