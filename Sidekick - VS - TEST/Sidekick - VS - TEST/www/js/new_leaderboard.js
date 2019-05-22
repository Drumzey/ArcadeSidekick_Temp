var loadAllScores = true;

function LoadGameLeaderboard() {

    loadAllScores = true;

    if (friendsCollection === null ||
        friendsCollection === [] ||
        friendsCollection.length === 0) {        

        ClearLeaderboardUI();

        if (friendsCollection === null ||
            friendsCollection === [] ||
            friendsCollection.length === 0) {
            document.getElementById('myfriendspositionspan').innerText = "You have no friends";
            SetCurrentTab('FRIENDSSCORES');
            NavigateToInternalPage('#GameHighScores');
            return;
        }

    }
    else {
        //For each friend make sure we have an entry in the friends games that is up to date.        
        var friendsToGet = [];
        for (var i = 0; i < friendsCollection.length; i++)
        {
            if (friendsCollection[i] !== clientUserName)
            {
                //if (!friendsGames.hasOwnProperty(friendsCollection[i]))
                //{
                    friendsToGet.push(friendsCollection[i]);
                //}
            }
        }

        //Make a call to get the most upto date scores for all friends
        if (friendsToGet.length !== 0) {            
            SideKickOnline_GetFriendsScores(friendsToGet.join(','), 'Getting scores....', true);
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
    GetTimedGames();    
    //Now we have all friends and all scores so we can find each friend that has a score for the 
    //current game.
    var scores = [];

    for (var property in friendsGames) {
        if (friendsGames.hasOwnProperty(property)) {
            var games = friendsGames[property];

            for (var gameName in games) {
                if ((games.hasOwnProperty(gameName)) &&
                    (TransformGameName(gameName) === TransformedCurrentGameName())) {
                    //add the users score to the array only if its non zero
                    if (games[gameName] !== 0 && games[gameName] !== "0") {
                        scores[property] = games[gameName];
                    }
                    break;
                }
            }
        }
    }
    
    //Need to add our score if we have one.        
    for (var sc = 0; sc < currentRecord.scores.length; sc++) {
        var gameid = currentRecord.scores[sc].id;        

        if (gameid === TransformedCurrentGameName()) {

            var myscore = currentRecord.scores[sc].score;
            if (myscore !== 0 && myscore !== "0") {
                if (clientUserName === '') {
                    scores["me"] = myscore;
                }
                else {
                    scores[clientUserName] = myscore;
                }
            }

            break;
        }
    }

    var sortable = [];    
    for (var username in scores) {
        sortable.push([username, scores[username]]);
    }

    if (timed.indexOf(TransformedCurrentGameName()) === -1)
    {
        sortable.sort(function (a, b) {
            return b[1] - a[1];
        });
    }
    else
    {
        sortable.sort(function (a, b) {
            return a[1] - b[1];
        });
    }    

    DisplayAllScores(sortable, "friendsgamepositionblock", "friendsgamealluserblock", "friendsgameallscoresblock",
        "#friendspositionblock", "#friendsuserblock", "#friendsgamescoreblock", "myfriendspositionspan");    
    AlterControlHeights(sortable, "");
    SetCurrentTab('FRIENDSSCORES');
    NavigateToInternalPage('#GameHighScores');
}

function ClearLeaderboardUI() {
    RemoveAllChildren("friendsgamepositionblock");
    RemoveAllChildren("friendsgamealluserblock");
    RemoveAllChildren("friendsgameallscoresblock");    
    RemoveAllChildren("allgamepositionblock");
    RemoveAllChildren("allgamealluserblock");
    RemoveAllChildren("allgameallscoresblock");    
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

        if (player === clientUserName || player === "me") {
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

var leaderboards = [];

function LoadGlobalLeaderboard() {
    //Do not cache the leaderboards for the games....
    //This means that the leaderboards could be different between
    //firends nad global (i.e freinds cached, global not)
    if (loadAllScores) {
        SideKickOnline_GetLeaderboard();
        loadAllScores = false;
    }
}

function SuccessfulGetLeaderboard() {

    var response = JSON.parse(latestXHTTP.responseText);

    var scores = [];

    for (var prop in response)
    {
        if (response.hasOwnProperty(prop))
        {
            if (response[prop] !== "0" && response[prop] !== 0) {
                scores.push([prop, response[prop]]);
            }
        }
    }

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

    DisplayAllScores(scores, "allgamepositionblock", "allgamealluserblock", "allgameallscoresblock",
        "#allpositionblock", "#alluserblock", "#allscoreblock", "myAllpositionspan");
    AlterControlHeights(scores, "");    
}
