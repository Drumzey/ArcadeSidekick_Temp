function FindGameIndex(gameName) {
    for (var i = 0; i < currentRecord.scores.length; i++) {
        if (currentRecord.scores[i].id === gameName) {
            return i;
        }
    }

    return -1;
}

var pushRatings = false;

function ProcessMyGames() {
    if (latestXHTTP.status === 200) {

        if (currentRecord.ratings.length !== 0) {
            //We have ratings that we have not pushed online
            //ie they are in our offline profile and so want
            //to push them up.
            pushRatings = true;
        }

        //Get games played from response
        var response = JSON.parse(latestXHTTP.responseText);
        var onlinePlayed = response.Games;

        for (var game in onlinePlayed) {
            if (onlinePlayed.hasOwnProperty(game)) {
                var gameName = game;
                var new_score = response.Games[gameName];
                var rating = response.Ratings[gameName];

                var index = FindGameIndex(TransformGameName(gameName));

                if (index === -1) {
                    var playedArray = currentRecord.played;
                    playedArray.push(TransformGameName(gameName));
                    playedArray.sort();

                    var scoreArray = currentRecord.scores;
                    var x = new Scores();
                    x.id = TransformGameName(gameName);
                    x.score = new_score;
                    x.uploaded = true;
                    scoreArray.push(x);

                    var ratingsArray = currentRecord.ratings;
                    var y = new Ratings();
                    y.id = TransformGameName(gameName);
                    y.rating = rating;
                    ratingsArray.push(y);

                    currentRecord.played = playedArray;
                    currentRecord.scores = scoreArray;
                    currentRecord.ratings = ratingsArray;
                }
                else {
                    var existing_score = currentRecord.scores[index].score;

                    if (parseInt(existing_score, 10) < parseInt(new_score, 10)) {
                        currentRecord.scores[index].score = new_score;
                        currentRecord.scores[index].uploaded = true;
                    }
                    else {
                        //Do nothing, we should have the correct value 
                        //and should be marked as not uploaded
                    }
                }
            }
        }

        currentRecord.verified = true;
        SetItemInStorage("my_record", currentRecord);
        if (response.Clubs) {
            myclubs = response.Clubs;
        }
        SetItemInStorage("myclubs", response.Clubs);
        if (AllowedOnline() && test === false) {            
            try {
                AppCenter.setUserId(clientUserName);
            }
            catch (err)
            {
                alert(err);
            }
        }
    }
    else {
        UnsuccessfulOnlineCall();
    }
}

function ProcessRestoredDetailedScores(games, settings) {
    for (var game in games)
    {
        if (games.hasOwnProperty(game))
        for (var j = 0; j < games[game].length; j++) {
            var newScore = new DetailedScore();
            newScore.Score = games[game][j].Score;
            newScore.Date = games[game][j].Date;
            newScore.LevelName = games[game][j].LevelName;
            newScore.Location = games[game][j].Location;
            newScore.Event = games[game][j].EventName;

            var setting = GetSetting(game, settings, games[game][j].SettingsId);

            if (setting !== null) {
                newScore.MameOrPCB = setting.MameOrPCB;
                newScore.Difficulty = setting.Difficulty;
                newScore.Lives = setting.Lives;
                newScore.ExtraLives = setting.ExtraLivesAt;
                newScore.Credits = setting.Credits;
                if (!detailedScoreCollection[game]) {
                    detailedScoreCollection[game] = [];
                }

                detailedScoreCollection[game].push(newScore);
            }
        }
    }
    SetItemInStorage("detailedScoreCollection", detailedScoreCollection);
}

function GetSetting(game, settings, settingsId)
{
    var setting = {};

    for (var i = 0; i < settings[game].length; i++)
    {
        if (settingsId === settings[game][i].SettingsId)
        {
            setting.Difficulty = settings[game][i].Difficulty;
            setting.Lives = settings[game][i].Lives;
            setting.ExtraLivesAt = settings[game][i].ExtraLivesAt;
            setting.Credits = settings[game][i].Credits;
            setting.MameOrPCB = settings[game][i].MameOrPCB;

            return setting;
        }
    }

    return null;
}