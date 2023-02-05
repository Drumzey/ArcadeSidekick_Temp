﻿function PostDetailedScoreSubmission() {

    var url = newBaseUrl + gameUrl + 'detailedscore';

    var body = {
        'GameName': TransformedCurrentGameName(),
        'UserName': clientUserName,
        'Score': detailedScore,
        'Date': detailedDate,
        'Location': detailedLocation,
        'LevelName': detailedLevelName,
        'EventName': detailedEvent,
        'Difficulty': detailedDifficulty,
        'Lives': detailedLives,
        'ExtraLivesAt': detailedExtraLivesAt,
        'MameOrPCB': detailedMameOrPCB,
        'Credits': detailedCredits
    };

    Call_ArcadeSidekick_Online_Post(
        url,
        body,
        function (err) { },
        function (err) { hasErrored = true; },
        function (err) {
            onlineCalls--;
            if (onlineCalls < 1) {
                if (hasErrored) {
                    UnsuccessfulOnlineCall();
                    StandardCompleteACOnline();
                    hasErrored = false;
                }
                else {
                    StandardCompleteACOnline();
                }
            }
        }                ,
        'Posting Score...');
}