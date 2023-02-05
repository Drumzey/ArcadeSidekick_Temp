function DoWeHaveDetailsToUpload() {

    var hasDetails = false;

    for (var i = 0; i < currentRecord.ratings.length; i++) {
        var rating = currentRecord.ratings[i].rating;

        if (rating !== 0) //Only push the rating if its non zero
        {
            hasDetails = true;
            break;
        }
    }

    for (var i = 0; i < currentRecord.scores.length; i++) {
        var score = currentRecord.scores[i].score;

        if (score !== 0)
        {
            hasDetails = true;
            break;
        }
    }

    return hasDetails;
}

function GetRatingDataToUpload() {
    var ratings = {};

    for (var i = 0; i < currentRecord.ratings.length; i++) {
        var gameName = currentRecord.ratings[i].id;
        var rating = currentRecord.ratings[i].rating;

        if (rating !== 0) //Only push the rating if its non zero
        {
            ratings[gameName] = rating;
        }
    }

    return ratings;
}

function GetSimpleDataToUpload() {
    var simpleScores = {};

    for (var i = 0; i < currentRecord.scores.length; i++) {
        var gameName = currentRecord.scores[i].id;
        var score = currentRecord.scores[i].score;

        if (score !== 0 || score !== "0") //Only push the scores if its non zero
        {
            simpleScores[gameName] = score;
        }
    }

    return simpleScores;
}

function GetDetailedDataToUpload() {
    var detailedScores = {};

    for (var gameKey in detailedScoreCollection) {
        if (detailedScoreCollection.hasOwnProperty(gameKey)) {
            detailedScores[gameKey] = [];
            for (i = 0; i < detailedScoreCollection[gameKey].length; i++) {
                detailedScores[gameKey].push(detailedScoreCollection[gameKey][i]);
            }
        }
    }

    return detailedScores;
}

function PostSignup() {
    //We have just signed up so we want to show the share signup popup
    SetNextPopUp(shareSignup);

    var haveDetailsToUpload = DoWeHaveDetailsToUpload();

    if (haveDetailsToUpload === true) {
        var ratings = GetRatingDataToUpload();
        var simpleScores = GetSimpleDataToUpload();
        var detailedScores = GetDetailedDataToUpload();
        SideKickOnline_PushOffline(ratings, simpleScores, detailedScores);
    }
    else {
        ClosePopup();
    }
}

function SideKickOnline_PushOffline(ratings, simpleScores, detailedScores) {

    var body =
        {
            'UserName': clientUserName,
            'Ratings': ratings,
            'SimpleScores': simpleScores,
            'DetailedScores': detailedScores
        };

    var jwt = CreateJWT(clientUserName, emailAddress, secret);

    CallACOnlineWithBodyAndWait(newBaseUrl + 'app/games/uploaddetailedscores',
        'Post',
        body,
        function () {
        },
        function () {
        },
        function () { StandardCompleteACOnline(); ClosePopup(); },
        'Uploading data...',
        jwt);
}

function SideKickOnline_PushOffline_WithRestore(ratings, simpleScores, detailedScores) {

    var body =
        {
            'UserName': clientUserName,
            'Ratings': ratings,
            'SimpleScores': simpleScores,
            'DetailedScores': detailedScores
        };

    var jwt = CreateJWT(clientUserName, emailAddress, secret);

    CallACOnlineWithBodyAndWait(newBaseUrl + 'app/games/uploaddetailedscores',
        'Post',
        body,
        function () {
            // Once we uploaded all our data on top of what was there previously
            // we can now restore the user and blank the currentRecord ready for restore
            currentRecord = new Record();
            detailedScoreCollection = [];
            SideKickOnline_RestoreUser();
        },
        function () {
        },
        function () { StandardCompleteACOnline(); ClosePopup(); },
        'Uploading data...',
        jwt);
}