var loadGlobalLeaderboard = true;

function LoadGlobalLeaderboard() {
    if (loadGlobalLeaderboard) {
        SideKickOnline_GetLeaderboard();
        loadGlobalLeaderboard = false;
    }
}

function SuccessfulGetLeaderboard() {

    var scores = GetScores(latestXHTTP.responseText);
    scores = RemoveEnemies(scores);
    OrderScores(scores);

    DisplayAllScores(scores, "allgamepositionblock", "allgamealluserblock", "allgameallscoresblock",
        "#allpositionblock", "#alluserblock", "#allscoreblock", "myAllpositionspan");
    AlterControlHeights(scores, "", "");
}