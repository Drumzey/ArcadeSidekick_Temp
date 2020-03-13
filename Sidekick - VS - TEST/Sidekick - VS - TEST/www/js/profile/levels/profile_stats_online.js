function SideKickOnline_GetProfileStatsOnStartUp() {
    CallACOnlineWithBodyAndWait(baseUrl + '/profile/stats?username=' + clientUserName,
        'GET',
        null,
        function () {
            SuccessfulGetProfileStats();
        },
        function () {
            startuphaserrored = true;
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

function SideKickOnline_SetProfileStats(body) {

    //GetItemFromStorageWithCallBack("secret", function (secretValue) {
    var jwt = CreateJWT(clientUserName, emailAddress, secret);

    CallACOnlineWithBody(baseUrl + '/profile/stats',
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
    //});
}