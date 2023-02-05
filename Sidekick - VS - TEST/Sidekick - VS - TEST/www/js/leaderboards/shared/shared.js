//Take the response from teh API call and get an array of players and scores
function GetScores(responseText) {
    var response = JSON.parse(responseText);
    var scores = [];

    for (var prop in response) {
        if (response.hasOwnProperty(prop)) {
            if (response[prop] !== "0" && response[prop] !== 0) {
                scores.push([prop, response[prop]]);
            }
        }
    }

    return scores;
}

//Taking in an array of scores if that score is an enemies score then remove them
function RemoveEnemies(scores, withCategories) {
    if (enemiesCollection.length === 0)
        return scores;

    var processedScores = [];

    for (var i = 0; i < scores.length; i++) {

        if (withCategories) {
            var category = scores[i][0];
            var username = scores[i][1];
            var score = scores[i][2];

            if (enemiesCollection.indexOf(username) === -1) {
                processedScores.push([category, username, score]);
            }
        }
        else
        {
            var username = scores[i][0];
            var score = scores[i][1];

            if (enemiesCollection.indexOf(username) === -1) {
                processedScores.push([username, score]);
            }
        }
    }

    return processedScores;
}

function RemoveNonFriends(scores, withCategories) {
    if (friendsCollection.length === 0)
        return [];

    var processedScores = [];

    for (var i = 0; i < scores.length; i++) {

        if (withCategories) {
            var category = scores[i][0];
            var username = scores[i][1];
            var score = scores[i][2];
            var level = scores[i][3];

            if (friendsCollection.indexOf(username) !== -1) {
                processedScores.push([category, username, score, level]);
            }
        }
        else {
            var username = scores[i][0];
            var score = scores[i][1];
            var level = scores[i][2];

            if (friendsCollection.indexOf(username) !== -1) {
                processedScores.push([username, score, level]);
            }
        }
    }

    return processedScores;
}

function SortTimes(scores, withCategories)
{
    if (withCategories) {
        scores.sort(function (a, b) {
            return a[2] - b[2];
        });
    }
    else {
        scores.sort(function (a, b) {
            return a[1] - b[1];
        });
    }

    return scores;
}

function SortScores(scores, withCategories)
{
    if (withCategories) {
        scores.sort(function (a, b) {
            return b[2] - a[2];
        });
    }
    else {
        scores.sort(function (a, b) {
            return b[1] - a[1];
        });
    }

    return scores;
}

function OrderScores(scores, withCategories, levelName) {
    var oppositeToMainGame = false;
    if (levelName)
    {
        oppositeToMainGame = IsLevelLeaderboardOverridden(currentGameName, levelName);
    }

    if (timed.indexOf(TransformedCurrentGameName()) === -1 ||
        (timed.indexOf(TransformedCurrentGameName()) === 1 && oppositeToMainGame)) {

        SortScores(scores, withCategories);
    }
    else if (timed.indexOf(TransformedCurrentGameName()) !== -1 ||
        (timed.indexOf(TransformedCurrentGameName()) === -1 && oppositeToMainGame))
    {
        SortTimes(scores, withCategories);
    }
}

function RemoveDuplicateNames(scores)
{
    var namesFound = [];
    var scoresToReturn = [];

    for (var i = 0; i < scores.length; i++) {

        if (namesFound.indexOf(scores[i][0]) === -1)
        {
            namesFound.push(scores[i][0]);
            scoresToReturn.push([scores[i][0], scores[i][1]]);
        }
    }

    return scoresToReturn;
}

function PopulateLeaderboardScoreSettingDropDown(settings, section)
{
    var dropdown = '';

    switch(section)
    {
        case "global":
            dropdown = '#globalScoreSettings';
            break;
        case "friends":
            dropdown = '#friendsScoreSettings';
            break;
        case "clubs":
            dropdown = '#clubsScoreSettings';
            break;
    }

    $(dropdown).find('option').remove();

    $(dropdown).append($('<option>', {
        value: "Unknown",
        text: "All"
    }));

    for (var i = 0; i < settings.length; i++) {
        $(dropdown).append($('<option>', {
            value: settings[i][0],
            text: settings[i][1]
        }));
    }

    $(dropdown).selectmenu('refresh', true);
    $(dropdown + '-listbox-popup').find('a').addClass('multilineLi');

    $(dropdown).val($(dropdown + " option:first").val());
}

function PopulateLeaderboardScoreLevelDropDown(levels, section) {
    var dropdown = '';

    switch (section) {
        case "global":
            dropdown = '#globalScoreLevels';
            break;
        case "friends":
            dropdown = '#friendsScoreLevels';
            break;
        case "clubs":
            dropdown = '#clubsScoreLevels';
            break;
    }

    $(dropdown).find('option').remove();

    $(dropdown).append($('<option>', {
        value: "FULL GAME",
        text: "FULL GAME"
    }));

    for (var i = 0; i < levels.length; i++) {
        if(levels[i] === "FULL GAME")
            continue;

        $(dropdown).append($('<option>', {
            value: levels[i],
            text: levels[i]
        }));
    }

    $(dropdown).selectmenu('refresh', true);
    $(dropdown + '-listbox-popup').find('a').addClass('multilineLi');

    $(dropdown).val($(dropdown + " option:first").val());
}

function DisplayAllScores(sortable, block1, block2, block3, block1Outer, block2Outer, block3Outer, position, overrideScoreDisplay) {

    ClearScoreBlocks(block1, block2, block3);

    var positionArray = [];
    var userNameArray = [];
    var gameScoreArray = [];
    var myposition = 0;
    var colours = ["#FF0000", "#FFCB0E", "#FFFF00", "#72FF51", "#00CB51", "#00A8F5", "#B9BBE1", "#FFC300", "#F0F117", "#7CFF50"];

    for (var i = 0; i < sortable.length; i++) {
        var player = sortable[i][0];
        var score = sortable[i][1];

        if (currentGameType === "time") {
            if(overrideScoreDisplay) //We are timed but a score level
            {
                score = addComma(score.toString());
            }
            else
            {
                score = MillisecondsToMinutesSecondsMilliseconds(parseInt(score));
            }
        }
        else {
            if(overrideScoreDisplay) //We are a score game but a timed level
            {
                score = MillisecondsToMinutesSecondsMilliseconds(parseInt(score));
            }
            else
            {
                score = addComma(score.toString());
            }
        }

        if (player === clientUserName || player === "me") {
            myposition = (i + 1).toString();
        }

        var positionInTable = (i + 1).toString();
        if (i + 1 === 1 || (positionInTable.endsWith("1") && !positionInTable.endsWith("11"))) {
            positionInTable += "st";
        }
        else if (i + 1 === 2 || (positionInTable.endsWith("2") && !positionInTable.endsWith("12"))) {
            positionInTable += "nd";
        }
        else if (i + 1 === 3 || (positionInTable.endsWith("3") && !positionInTable.endsWith("13"))) {
            positionInTable += "rd";
        }
        else {
            positionInTable += "th";
        }

        var colourIndex = i % 9;
        var colour = colours[colourIndex];

        positionArray.push('<li name="' + player + '" class="ui-li ui-btn-up-c score" style="font-size:60%;white-space: normal;text-overflow: clip;color: ' + colour + ' !important;">' + positionInTable + '</li>');
        userNameArray.push('<li name="' + player + '" class="ui-li ui-btn-up-c score" style="font-size:60%;white-space: normal;text-overflow: clip;color: ' + colour + ' !important;">' + player + '</li>');
        gameScoreArray.push('<li name="' + player + '" class="ui-li ui-btn-up-c score" style="font-size:60%;white-space: normal;text-overflow: clip;text-align: right !important;color: ' + colour + ' !important;">' + score + '</li>');
    }

    AddScoresToBlocks(block1Outer, block2Outer, block3Outer, positionArray, userNameArray, gameScoreArray);
    SetMyPosition(position, myposition, sortable.length);
}

function ClearScoreBlocks(block1, block2, block3) {
    RemoveAllChildren(block1);
    RemoveAllChildren(block2);
    RemoveAllChildren(block3);
}

function AddScoresToBlocks(block1Outer, block2Outer, block3Outer,
    positionArray, userNameArray, gameScoreArray) {

    $(block1Outer).children('ul').append(positionArray.join('')).listview().listview('refresh');
    $(block2Outer).children('ul').append(userNameArray.join('')).listview().listview('refresh');
    $(block3Outer).children('ul').append(gameScoreArray.join('')).listview().listview('refresh');
}

function SetMyPosition(position, myposition, scoresArraySize) {
    var mypos = document.getElementById(position);

    if (myposition !== 0) {
        mypos.innerText = "Position " + myposition + "/" + scoresArraySize;
    }
    else if (scoresArraySize === 0) {
        mypos.innerText = "There are no highscores registered for this game";
    }
    else {
        mypos.innerText = "You have no highscore registered";
    }
}