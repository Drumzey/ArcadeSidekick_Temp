function SideKickOnline_GetClubLeaderboard(clubName) {
    CallACOnlineWithBodyAndWait(baseUrl + '/getleaderboard?gamename=' + TransformedCurrentGameName()
        + '&clubname=' + clubName,
        'GET',
        null,
        function () {
            SuccessfulGetClubLeaderboard();
        },
        function () {
            CreatePopup(errorOnlinePopup);
        },
        function () { Show('#mypositionClub'); StandardCompleteACOnline(); },
        'Loading Leaderboard.....');
}