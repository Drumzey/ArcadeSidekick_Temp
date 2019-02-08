var allPlayedGames = [];
var onlineRatingGames = [];
var onlineGameScores = [];

function SynchOnlineAndOffline() {
    if (AllowedOnline()) {        
        GetItemFromStorageWithCallBack("my_record", function (value) {
            currentRecord = value;            
            SynchAllUserData();            
        });
    }
}

function SynchAllUserData() {
    if (AllowedOnline()) {
        var result = CallACOnlineWithWait('http://arcadeclub.azurewebsites.net/user/' + clientUserName + '/synchdata',
            'GET',
            function () {                
                if (latestXHTTP.status === 200) {
                    if (latestXHTTP.responseText !== '' ** latestXHTTP.responseText !== "[]")
                    {
                        SuccessfulSychDataPlayed();                        
                        SuccessfulSychDataRatings();                        
                        SuccessfulSychDataScores();
                    }
                }
                else {
                    UnsuccessfulOnlineCall();
                }
            },
            function () {                
                UnsuccessfulOnlineCall();
            }, 
            function () {
                SuccessfulSychData();
                StandardCompleteACOnline();                
            },
            "Restoring data....");
    }
}

function SuccessfulSychDataPlayed() {
    var onlineDataPlayed = [];
    
    var onlinePlayed = JSON.parse(latestXHTTP.responseText).played;
    for (var i = 0; i < onlinePlayed.length; i++) {
        var obj = onlinePlayed[i];
        var gameName = obj.gameName;
        onlineDataPlayed.push(gameName);
    }
    
    var uniqueArray = arrayUnique(currentRecord.played.concat(onlineDataPlayed));
    uniqueArray.sort();
    allPlayedGames = uniqueArray;        
}

function SuccessfulSychDataRatings() {
    
    var onlineRatings = JSON.parse(latestXHTTP.responseText).ratings;
    for (var i = 0; i < onlineRatings.length; i++) {
        var obj = onlineRatings[i];
        onlineRatingGames[obj.gameName] = obj.rating;
    }    
}

function SuccessfulSychDataScores() {
        
    var response = JSON.parse(latestXHTTP.responseText).scores;

    for (var i = 0; i < response.length; i++) {
        var obj = response[i];
        var gameName = obj.gameName;
        var score = obj.score;

        if (!onlineGameScores.hasOwnProperty(gameName)) {
            onlineGameScores[gameName] = score;
        }
        else {
            if (score > onlineGameScores[gameName]) {
                onlineGameScores[gameName] = score;
            }
        }
    }    
 }

function SuccessfulSychData() {    
    //Merge the collections together 
    //All the games played and sorted
    var playedArray = allPlayedGames;
    playedArray.sort();

    //Need to add in a rating for each game played
    //if the rating exists then thats fine
    //if not we need to add a blank item
    var ratingsArray = [];
    var i = 0;
    for (i = 0; i < playedArray.length; i++) {
        var y = new Ratings();
        y.id = playedArray[i];

        if (onlineRatingGames.hasOwnProperty(playedArray[i])) {
            y.rating = onlineRatingGames[y.id];
        } else {
            y.rating = '0';
        }

        ratingsArray.push(y);
    }

    var currentscores = [];
    //Grab scores from currently set items on the device
    for (i = 0; i < currentRecord.scores.length; i++) {
        currentscores[currentRecord.scores[i].id] = currentRecord.scores[i].score;
    }

    var scoreArray = [];
    for (i = 0; i < playedArray.length; i++) {
        var x = new Scores();
        x.id = playedArray[i];

        var onlineScore = 0;
        var localScore = 0;

        if (onlineGameScores.hasOwnProperty(x.id)) {
            onlineScore = onlineGameScores[x.id];
        }

        if (currentscores.hasOwnProperty(x.id)) {
            localScore = currentscores[x.id];
        }

        if (onlineScore > localScore) {
            x.score = onlineScore;
        }
        else if (onlineScore < localScore) {
            x.score = localScore;
        }
        else {
            x.score = localScore;
        }

        scoreArray.push(x);
    }

    currentRecord.played = playedArray;
    currentRecord.scores = scoreArray;
    currentRecord.ratings = ratingsArray;

    SetItemInStorage("my_record", currentRecord);
}