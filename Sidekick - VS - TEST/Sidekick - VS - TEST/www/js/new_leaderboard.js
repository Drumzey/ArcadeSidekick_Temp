function LoadGameLeaderboard() {

    loadGlobalLeaderboard = true;

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
        for (var i = 0; i < friendsCollection.length; i++) {
            if (friendsCollection[i] !== clientUserName) {
                friendsToGet.push(friendsCollection[i]);
            }
        }

        //Make a call to get the most upto date scores for all friends
        if (friendsToGet.length !== 0) {
            SideKickOnline_GetFriendsScores(friendsToGet.join(','), 'Getting scores....', true);
        }
        else {
            //We have all the scores for our friends already            
            ProcessScoresForLeaderboard();
        }
    }
}

function ProcessScoresForLeaderboard() {
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

    if (timed.indexOf(TransformedCurrentGameName()) === -1) {
        sortable.sort(function (a, b) {
            return b[1] - a[1];
        });
    }
    else {
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