function LoadGameLeaderboard() {

    if (myfriends === null ||
        myfriends === [] ||
        myfriends.length === 0) {
        ShowPopup('#NoFriends');
    }
    else {
        ClearLeaderboardUI();

        //For each friend make sure we have an entry in the friends games
        var friendsToGet = [];
        for (var i = 0; i < myfriends.length; i++)
        {
            if (myfriends[i] !== clientUserName)
            {
                if (!friendsGames.hasOwnProperty(myfriends[i]))
                {
                    friendsToGet.push(myfriends[i]);
                }
            }
        }

        //Make a call to get the scores for friendsToGet
        if (friendsToGet.length !== 0) {
            SideKickOnline_GetFriendsScores(friendsToGet.join(','), 'Getting scores....');
        }
        else
        {
            //We have all the scores for our friends already
            ProcessScoresForLeaderboard();
        }
    }    
}

function ProcessScoresForLeaderboard()
{
    //Now we have all friends and all scores so we can find each friend that has a score for the 
    //current game.
    var scores = [];

    for (var property in friendsGames) {
        if (friendsGames.hasOwnProperty(property)) {
            var games = friendsGames[property];

            for (var j = 0; j < games.length; j++) {
                var game = games[j];

                for (var gameName in game) {
                    if ((game.hasOwnProperty(gameName)) &&
                        (TransformGameName(gameName) === TransformedCurrentGameName())) {
                        //add the users score to the array
                        scores[property] = game[gameName];
                    }
                }
            }
        }
    }

    //Need to add our score if we have one.        
    for (var sc = 0; sc < currentRecord.scores.length; sc++) {
        var gameid = currentRecord.scores[sc].id;

        if (gameid === TransformedCurrentGameName()) {
            scores[clientUserName] = currentRecord.scores[sc].score;
        }
    }

    var sortable = [];

    for (var username in scores) {
        sortable.push([username, scores[username]]);
    }

    sortable.sort(function (a, b) {
        return b[1] - a[1];
    });

    //Need to show these items and resize ui        
    DisplayAllScores(sortable, "friendsgamepositionblock", "friendsgamealluserblock", "friendsgameallscoresblock",
        "#friendspositionblock", "#friendsuserblock", "#friendsgamescoreblock", "myfriendspositionspan");
    AlterControlHeights(sortable, "");
    NavigateToInternalPage('#GameHighScores');
}

function ClearLeaderboardUI() {
    RemoveAllChildren("friendsgamepositionblock");
    RemoveAllChildren("friendsgamealluserblock");
    RemoveAllChildren("friendsgameallscoresblock");    
}

function DisplayAllScores(sortable, block1, block2, block3, block1Outer, block2Outer, block3Outer, position) {
        
    ClearScoreBlocks(block1, block2, block3);

    var positionArray = [];
    var userNameArray = [];
    var gameScoreArray = [];    
    var myposition = 0;
    var colours = ["#FF0000", "#FFCB0E", "#FFFF00", "#72FF51", "#00CB51", "#00A8F5", "#B9BBE1", "#FFC300", "#F0F117", "#7CFF50"];
    
    for (var i = 0; i < sortable.length; i++)
    {        
        var player = sortable[i][0];
        var score = sortable[i][1];

        if (currentGameType === "time") {
            score = MillisecondsToMinutesSecondsMilliseconds(parseInt(score));
        }
        else {
            score = addComma(score.toString());
        }

        if (player === clientUserName) {
            myposition = (i + 1).toString();
        }

        var positionInTable = (i + 1).toString();
        if (i + 1 === 1 || (positionInTable.endsWith("1") && !positionInTable.endsWith("11")))
        {
            positionInTable += "st";
        }
        else if (i + 1 === 2 || (positionInTable.endsWith("2") && !positionInTable.endsWith("12")))
        {
            positionInTable += "nd";
        }
        else if (i + 1 === 3 || (positionInTable.endsWith("3") && !positionInTable.endsWith("13"))) {
            positionInTable += "rd";
        }
        else
        {
            positionInTable += "th";
        }

        var colourIndex = i % 9;
        var colour = colours[colourIndex];

        positionArray.push('<li name="' + player + '" class="ui-li ui-btn-up-c score" style="font-size:70%;white-space: normal;text-overflow: clip;color: ' + colour + ' !important;">' + positionInTable + '</li>');
        userNameArray.push('<li name="' + player + '" class="ui-li ui-btn-up-c score" style="font-size:70%;white-space: normal;text-overflow: clip;color: ' + colour + ' !important;">' + player + '</li>');
        gameScoreArray.push('<li name="' + player + '" class="ui-li ui-btn-up-c score" style="font-size:70%;white-space: normal;text-overflow: clip;text-align: right !important;color: ' + colour + ' !important;">' + score + '</li>');
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
        if (clientUserName === null || clientUserName === '') {
            mypos.innerText = "No username set. Create a user in settings to submit scores and see what position you are on our leaderboards";
        }
        else {
            mypos.innerText = "You have no highscore registered";
        }
    }
}
