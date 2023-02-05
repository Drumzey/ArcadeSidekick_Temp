function DeleteDetailedScoreSubmission(body) {

    var url = newBaseUrl + gameUrl + 'detailedscore';

    Call_ArcadeSidekick_Online_Delete(
        url,
        body,
        function (err) { SuccessfulDeleteScore(); },
        function (err) { UnsuccessfulOnlineCall(); },
        function (err) { StandardCompleteACOnline(); },
        'Deleting Score...');
}

function DeleteDetailedScoreSubmissionAndReplaceWithNextHighest(body) {

    var url = newBaseUrl + gameUrl + 'detailedscore';

    Call_ArcadeSidekick_Online_Delete(
        url,
        body,
        function (err) {
            // Delete the detailed score
            SuccessfulDeleteScore();
            // Redraw the high scores on this page
            PopulateDetailedScoresPage(TransformedCurrentGameName(), currentGameName);
            // Grab the next highest score
            var nextHighestScore = ReplaceScoreWithNextHighest();
            // Set the current simple record to have that high score
            SetGameScoreEntry(TransformedCurrentGameName(), nextHighestScore);
            // Set the main game UI to have the new simple score
            if (GameIsATimedGame()) {
              // We do this in the above methods
            }
            else {
                SetGameScore(nextHighestScore);
            }
        },
        function (err) {
            UnsuccessfulOnlineCall();
        },
        function (err) {
            StandardCompleteACOnline();
        },
        'Deleting Score...');
}