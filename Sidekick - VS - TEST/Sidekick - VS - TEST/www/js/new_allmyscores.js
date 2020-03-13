var timed = [];

function GetTimedGames() {
    if (timed.length === 0) {
        var timedData = $($.parseXML(timegames));
        tg = timedData.find('game');

        tg.each(function () {
            var name = jQuery(this).children('[name="name"]').text();

            var id = name.replace(/'/g, "");
            id = id.replace(/&apos;/g, "");
            id = id.replace(/&amp;/g, "");
            id = id.replace(/&/g, "");
            id = id.replace(/ /g, '_').toLowerCase();

            timed.push(id);
        });
    }
}

function GoToMyScores() {

    GetTimedGames();
    SetLocalScoresUI();
    NavigateToInternalPage("#MyScores");
    AlterScoreHeights();
}

function SetLocalScoresUI() {
    RemoveAllChildren("allgameblocklocal");
    RemoveAllChildren("allscoresblocklocal");
    RemoveAllChildren("allgameblocklocalfriends");
    RemoveAllChildren("allscoresblocklocalfriends");
    RemoveAllChildren("allgameblocklocalcustom");
    RemoveAllChildren("allscoresblocklocalcustom");

    var scorefound = 0;
    var uploadsNeeded = 0;
    var uploadsNeededForPlayed = 0;
    var scores = currentRecord.scores;
    var scoreArray = [];
    var hasCustomGames = false;
    var hasFriendsGames = false;
    var hasMyGames = false;

    for (var i = 0; i < scores.length; i++) {
        var game = scores[i].id;

        var entry = new MyScoreEntry();
        entry.uploaded = scores[i].uploaded;
        scorefound += 1;

        if (scores[i].score !== '' &&
            scores[i].score !== '0' &&
            scores[i].score !== 0) {
            entry.score = scores[i].score;
        }
        else {
            entry.score = "0";
        }
        scoreArray[game] = entry;

        //Uploads are needed for any new game, played or score non zero
        //for stats to update.
        if (scores[i].uploaded === false && entry.score !== "0") {
            uploadsNeeded++;
        }
        else if (scores[i].uploaded === false) {
            //We have played a game but not given it a score
            uploadsNeededForPlayed++;
        }
    }

    if (customGames.length > 0) {
        hasCustomGames = true;
        scorefound++;
    }

    Hide('#uploadScoresMainMenu');
    Hide("#uploadScores");
    Hide("#uploadPlayed");

    if (AllowedOnline() && uploadsNeeded > 0) {
        Show("#uploadScores");
        Show('#uploadScoresMainMenu');
    }
    else if (AllowedOnline() && uploadsNeededForPlayed > 0) {
        Show("#uploadPlayed");
    }

    if (scorefound === 0) {
        Hide('#allscoreslocal');
        Show('#noScoreslocal');
        return;
    }

    Show('#allscoreslocal');
    Hide('#noScoreslocal');

    var gameNameArray = [];
    var gameScoreArray = [];
    var gameNameArrayFriends = [];
    var gameScoreArrayFriends = [];

    for (var property in scoreArray) {
        if (scoreArray.hasOwnProperty(property)) {
            var gameName = property.replace(/_/g, ' ').toLowerCase();
            var score = scoreArray[property].score;
            var uploaded = scoreArray[property].uploaded;

            if (timed.indexOf(property) !== -1) {
                score = MillisecondsToMinutesSecondsMilliseconds(parseInt(score));
            }
            else {
                score = addComma(score.toString());
            }

            var id = FindGameInCatalog(gameName);

            if (gamesByFriend.hasOwnProperty(TransformGameName(gameName)) && gamesByFriend[TransformGameName(gameName)].length !== 0) {
                hasFriendsGames = true;
                gameNameArrayFriends.push([gameName, '<li onclick="GoToGame(this)" id="' + id + '" name="' + gameName + '" class="ui-li ui-btn-up-c" style="font-size:70%;white-space: normal;text-overflow: clip;"><a>' + gameName + '</a></li>']);

                if (uploaded === false && AllowedOnline()) {
                    gameScoreArrayFriends.push([gameName, '<li data-icon="custom" id="cloud" name="' + gameName + '" class="ui-li ui-btn-up-c" style="font-size:70%;white-space: normal;text-overflow: clip;text-align: right !important"><a href="#" id="' + property + '" onclick="UploadSingleGame(this.id,\'' + scoreArray[property].score + '\')">' + score + '</a></li>']);
                }
                else {
                    gameScoreArrayFriends.push([gameName, '<li onclick="LoadGameInfoWithoutNavigate(this);" id="' + id + '" name="' + gameName + '" class="ui-li ui-btn-up-c" style="font-size:70%;white-space: normal;text-overflow: clip;text-align: right !important"><a>' + score + '</a></li>']);
                }
            }
            else {
                hasMyGames = true;
                gameNameArray.push([gameName, '<li onclick="GoToGame(this)" id="' + id + '" name="' + gameName + '" class="ui-li ui-btn-up-c" style="font-size:70%;white-space: normal;text-overflow: clip;"><a>' + gameName + '</a></li>']);

                if (uploaded === false && AllowedOnline()) {
                    gameScoreArray.push([gameName, '<li data-icon="custom" id="cloud" name="' + gameName + '" class="ui-li ui-btn-up-c" style="font-size:70%;white-space: normal;text-overflow: clip;text-align: right !important"><a href="#" id="' + property + '" onclick="UploadSingleGame(this.id,\'' + scoreArray[property].score + '\')">' + score + '</a></li>']);
                }
                else {
                    gameScoreArray.push([gameName, '<li onclick="LoadGameInfoWithoutNavigate(this);" id="' + id + '" name="' + gameName + '" class="ui-li ui-btn-up-c" style="font-size:70%;white-space: normal;text-overflow: clip;text-align: right !important"><a>' + score + '</a></li>']);
                }
            }
        }
    }

    if (hasFriendsGames) {
        Show('#FRIENDSGAMES');
        gameNameArrayFriends.sort(SortById);
        gameScoreArrayFriends.sort(SortById);
        var nameoutputFriends = [];
        var scoreoutputFriends = [];
        for (var j = 0; j < gameNameArrayFriends.length; j++) {
            nameoutputFriends.push(gameNameArrayFriends[j][1]);
            scoreoutputFriends.push(gameScoreArrayFriends[j][1]);
        }
        $('#gameblocklocalfriends').children('ul').append(nameoutputFriends.join('')).listview().listview('refresh');
        $('#scoreblocklocalfriends').children('ul').append(scoreoutputFriends.join('')).listview().listview('refresh');
    }
    else {
        Hide('#FRIENDSGAMES');
    }

    if (hasMyGames) {
        Show('#MYGAMES');
        gameNameArray.sort(SortById);
        gameScoreArray.sort(SortById);

        var nameoutput = [];
        var scoreoutput = [];

        for (var k = 0; k < gameNameArray.length; k++) {
            nameoutput.push(gameNameArray[k][1]);
            scoreoutput.push(gameScoreArray[k][1]);
        }

        $('#gameblocklocal').children('ul').append(nameoutput.join('')).listview().listview('refresh');
        $('#scoreblocklocal').children('ul').append(scoreoutput.join('')).listview().listview('refresh');
    }
    else {
        Hide('#MYGAMES');
    }

    if (hasCustomGames) {
        Show('#CUSTOMGAMES');
        var gameNameArrayCustom = [];
        var gameScoreArrayCustom = [];

        for (var l = 0; l < customGames.length; l++) {
            gameNameArrayCustom.push('<li name="' + customGames[l][0] + '" class="ui-li ui-btn-up-c" style="font-size:70%;white-space: normal;text-overflow: clip;">' + customGames[l][0] + '</li>');
            gameScoreArrayCustom.push('<li name="' + customGames[l][0] + '" class="ui-li ui-btn-up-c" style="font-size:70%;white-space: normal;text-overflow: clip;text-align: right !important">' + customGames[l][1] + '</li>');
        }
        $('#gameblocklocalcustom').children('ul').append(gameNameArrayCustom.sort().join('')).listview().listview('refresh');
        $('#scoreblocklocalcustom').children('ul').append(gameScoreArrayCustom.sort().join('')).listview().listview('refresh');
    }
    else {
        Hide('#CUSTOMGAMES');
    }
}

function UploadScores() {

    var scoresToUpload = [];

    for (var i = 0; i < currentRecord.scores.length; i++) {
        if (!currentRecord.scores[i].uploaded) {
            scoresToUpload[currentRecord.scores[i].id] = currentRecord.scores[i].score;
        }
    }

    //Save the scores and redaw the ui by calling SetLocalScoresUI   
    SideKickOnline_SaveScores(scoresToUpload);
}

function GetRating(gamename) {
    for (var i = 0; i < currentRecord.ratings.length; i++) {
        if (currentRecord.ratings[i].id === gamename) {
            return currentRecord.ratings[i].rating;
        }
    }

    return 0;
}

function UploadSingleGame(gameproperty, score) {
    //Save the score and redaw the ui by calling SetLocalScoresUI    
    SideKickOnline_SaveScore(gameproperty, score, GetRating(gameproperty));
}

function SetGameAsUploaded(gameNames) {
    var scores = currentRecord.scores;
    for (var i = 0; i < scores.length; i++) {
        var gameid = scores[i].id;

        if (gameNames.indexOf(gameid) !== -1) {
            scores[i].uploaded = true;      //Can we break out here when we have seen as many names as we have scores?    
        }
    }
    SetItemInStorage("my_record", currentRecord);
}