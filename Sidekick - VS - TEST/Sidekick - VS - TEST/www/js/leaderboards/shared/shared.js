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
function RemoveEnemies(scores) {
    if (enemiesCollection.length === 0)
        return scores;

    var processedScores = [];

    for (var i = 0; i < scores.length; i++) {
        var username = scores[i][0];
        var score = scores[i][1];

        if (enemiesCollection.indexOf(username) === -1) {
            processedScores.push([username, score]);
        }
    }

    return processedScores;
}

function OrderScores(scores) {
    if (timed.indexOf(TransformedCurrentGameName()) === -1) {
        scores.sort(function (a, b) {
            return b[1] - a[1];
        });
    }
    else {
        scores.sort(function (a, b) {
            return a[1] - b[1];
        });
    }
}

function DisplayAllScores(sortable, block1, block2, block3, block1Outer, block2Outer, block3Outer, position) {

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
            score = MillisecondsToMinutesSecondsMilliseconds(parseInt(score));
        }
        else {
            score = addComma(score.toString());
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