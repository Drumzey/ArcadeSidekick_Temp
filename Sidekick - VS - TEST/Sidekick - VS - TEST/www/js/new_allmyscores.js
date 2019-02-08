var timed = [];

function GoToMyScores() {

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

    SetLocalScoresUI();
    NavigateToInternalPage("#MyScores");
    AlterScoreHeights();
}

function SetLocalScoresUI() {
    RemoveAllChildren("allgameblocklocal");
    RemoveAllChildren("allscoresblocklocal");

    var scorefound = 0;
    var uploadsNeeded = 0;
    var scores = currentRecord.scores;
    var scoreArray = [];
    var hasCustomGames = false;

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
        else
        {
            entry.score = "0";
        }
        scoreArray[game] = entry;

        if (scores[i].uploaded === false) {
            uploadsNeeded++;
        }
    }

    for (var customGameName in customGames) {
        if (customGames.hasOwnProperty(customGameName)) {
            hasCustomGames = true;
            scorefound++;
        }
    }

    Hide("#uploadScores");

    if (AllowedOnline() && uploadsNeeded > 0) {
        Show("#uploadScores");
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
                        
            gameNameArray.push([ gameName, '<li name="' + gameName + '" class="ui-li ui-btn-up-c" style="font-size:70%;white-space: normal;text-overflow: clip;">' + gameName + '</li>' ]);

            if (uploaded === false) {                
                gameScoreArray.push([ gameName, '<li data-icon="custom" id="cloud" class="ui-li ui-btn-up-c" style="font-size:70%;white-space: normal;text-overflow: clip;text-align: right !important"><a name="' + gameName + '" href="#" id="' + property + '" onclick="UploadSingleGame(this.id,\'' + scoreArray[property].score + '\')">' + score + '</a></li>' ]);
            }
            else {
                gameScoreArray.push([ gameName, '<li name="' + gameName + '" class="ui-li ui-btn-up-c" style="font-size:70%;white-space: normal;text-overflow: clip;text-align: right !important">' + score + '</li>' ]);
            }
        }
    }

    gameNameArray.sort(SortById);
    gameScoreArray.sort(SortById);

    var nameoutput = [];
    var scoreoutput = [];

    for (var j = 0; j < gameNameArray.length; j++) {
        nameoutput.push(gameNameArray[j][1]);
        scoreoutput.push(gameScoreArray[j][1]);
    }    
    
    $('#gameblocklocal').children('ul').append(nameoutput.join('')).listview().listview('refresh');
    $('#scoreblocklocal').children('ul').append(scoreoutput.join('')).listview().listview('refresh');

    if (hasCustomGames) {

        gameNameArray = [];
        gameScoreArray = [];

        for (var customGame in customGames) {
            if (customGames.hasOwnProperty(customGame)) {
                gameNameArray.push('<li name="' + customGame + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;"><span style="font-size:70%;white-space: normal;text-overflow: clip;">' + customGame + '</span></li>');
                gameScoreArray.push('<li name="' + customGame + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;text-align: right !important"><span style="width:100%;font-size:70%;white-space: normal;text-overflow: clip; text-align: right !important;">' + customGames[customGame] + '</span></li>');
            }
        }

        var divider = '<li name="customDiv" data-role="list-divider" style="font-size:70%;white-space: normal;text-overflow: clip;" class="ui-li ui-li-static ui-btn-up-c">Custom</li>';
        var dividerBlank = '<li name="customDiv" data-role="list-divider" style="font-size:70%;white-space: normal;text-overflow: clip;" class="ui-li ui-li-static ui-btn-up-c"></li>';

        $('#gameblocklocal').children('ul').append(divider).listview().listview('refresh');
        $('#scoreblocklocal').children('ul').append(dividerBlank).listview().listview('refresh');

        $('#gameblocklocal').children('ul').append(gameNameArray.sort().join('')).listview().listview('refresh');
        $('#scoreblocklocal').children('ul').append(gameScoreArray.sort().join('')).listview().listview('refresh');
    }
}

function UploadScores() {

    var scoresToUpload = [];

    for (var i = 0; i < currentRecord.scores.length; i++)
    {
        if (!currentRecord.scores[i].uploaded) {
            scoresToUpload[currentRecord.scores[i].id] = currentRecord.scores[i].score;
        }
    }

    //Save the scores and redaw the ui by calling SetLocalScoresUI
    SideKickOnline_SaveScores(scoresToUpload);
}

function GetRating(gamename)
{
    for (var i = 0; i < currentRecord.ratings.length; i++)
    {
        if (currentRecord.ratings[i].id === gamename)
        {
            return currentRecord.ratings[i].rating;
        }
    }

    return 0;
}

function UploadSingleGame(gameproperty,score)
{
    //Save the score and redaw the ui by calling SetLocalScoresUI    
    SideKickOnline_SaveScore(gameproperty, score, GetRating(gameproperty));
}

function SetGameAsUploaded(gameNames)
{
    var scores = currentRecord.scores;
    for (var i = 0; i < scores.length; i++) {
        var gameid = scores[i].id;

        if (gameNames.indexOf(gameid) !== -1)
        {
            scores[i].uploaded = true;      //Can we break out here when we have seen as many names as we have scores?    
        }
    }
    SetItemInStorage("my_record", currentRecord);
}