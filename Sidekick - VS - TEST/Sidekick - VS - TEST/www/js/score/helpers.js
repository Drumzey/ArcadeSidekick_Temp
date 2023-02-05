function DoesGameHaveScores(gameKey) {
    var simpleScore = GameHasSimpleScore(gameKey);
    var detailedScores = GameHasDetailedScores();

    return simpleScore || detailedScores;
}

function GetGameScoreEntry(gameName) {

    var scores = currentRecord.scores;

    for (var i = 0; i < scores.length; i++) {
        var gameid = scores[i].id;

        if (gameid === gameName) {
            return scores[i].score;
        }
    }

    return '0';
}

function IsGameDetailedScoreBetterThanSimple(simpleScore, detailedScore) {

    if (currentGameType === "time") {
        // Assume that all times are lower the better....
        if (parseInt(detailedScore) < parseInt(simpleScore)) {
            return true;
        }
    }
    else {
        if (parseInt(detailedScore) > parseInt(simpleScore)) {
            return true;
        }
    }

    return false;
}

function GetGameTopScore(gameName) {
    var simpleScore = GetGameScoreEntry(gameName);
    var topDetailedScore = GetTopDetailedScore(gameName);

    if (GameIsATimedGame())
    {
        if (simpleScore < topDetailedScore) {
            return simpleScore;
        }
        else {
            return topDetailedScore;
        }
    }
    else
    {
        if (simpleScore > topDetailedScore) {
            return simpleScore;
        }
        else {
            return topDetailedScore;
        }
    }
}

function GetTopDetailedScore(gameName) {
    var topScore = "0";

    if (!gameName) {
        gameName = TransformedCurrentGameName();
    }

    if (detailedScoreCollection[gameName]) {
        //Refresh the game screen to show the highest detailed score
        for (i = 0; i < detailedScoreCollection[gameName].length; i++) {
            var savedScore = detailedScoreCollection[gameName][i];
            //Only pick out a Full Game score
            if (savedScore.LevelName === "FULL GAME") {
                if (GameIsATimedGame()) {
                    if (topScore === "0") {
                        topScore = savedScore.Score;
                    }
                    else {
                        if (parseInt(savedScore.Score) < parseInt(topScore)) {
                            topScore = savedScore.Score;
                        }
                    }
                }
                else {
                    if (parseInt(savedScore.Score) > parseInt(topScore)) {
                        topScore = savedScore.Score;
                    }
                }
            }
        }
    }

    return topScore;
}

function GameIsATimedGame() {
    return currentGameType === "time";
}

function GameHasSimpleScore(gameName) {
    return GetGameScoreEntry(gameName) !== '0';
}

function GameHasDetailedScores() {
    if (detailedScoreCollection.hasOwnProperty(TransformedCurrentGameName())) {
        return detailedScoreCollection[TransformedCurrentGameName()].length > 0;
    }

    return false;
}

function SetGameScore(score) {
    document.getElementById('myrecord').innerText = addComma(score);
}

function GetCurrentGameScore() {
    return document.getElementById('myrecord').innerText;
}