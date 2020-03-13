function SideKickOnline_PostChallenge(from, to, club, message) {
    var jwt = CreateJWT(clientUserName, emailAddress, secret);

    var body = {
        'From': from,
        'To': to,
        'ToClubMembers': club,
        'GameName': currentGameName,
        'Message': message
    };

    CallACOnlineWithBodyAndWait(baseUrl + '/challenges',
        'POST',
        body,
        function () {
            SetNextPopUp(successfulChallengeSetPopup);
            ClosePopup();
        },
        function (err) {
            UnsuccessfulOnlineCall();
        },
        function () {
            StandardCompleteACOnline();
        },
        'Posting Challenge...',
        jwt);
}