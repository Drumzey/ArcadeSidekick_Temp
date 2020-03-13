function SideKickOnline_GetLeaderboard() {
    CallACOnlineWithBodyAndWait(baseUrl + '/getleaderboard?gamename=' + TransformedCurrentGameName(),
        'GET',
        null,
        function () {
            SuccessfulGetLeaderboard();
        },
        function () {
            CreatePopup(errorOnlinePopup);
        },
        function () { StandardCompleteACOnline(); },
        'Loading Leaderboard.....');
}