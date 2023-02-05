var uploadsNeeded = '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
                       <h3>Uploads needed</h3> \
                       <h6>In order to use the new version of Sidekick and the score submission system you need to upload all your existing scores.</h6> \
                       <a onclick="UploadNow(this.id)" id="SECTION" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all ui-btn-text">Upload Now</span></a> \
                       <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all ui-btn-text">Cancel</span></a> \
                     </div>';

function CheckForUploads() {
    var uploadsNeeded = false;

    if (AllowedOnline()) {
        for (var i = 0; i < currentRecord.scores.length; i++) {
            if (!currentRecord.scores[i].uploaded) {
                uploadsNeeded = true;
                break;
            }
        }

        return uploadsNeeded;
    }
    else {
        return false;
    }
}

function UploadNow(section) {

    var scoreArray = [];

    for (var i = 0; i < currentRecord.scores.length; i++) {
        if (!currentRecord.scores[i].uploaded) {
            scoreArray[currentRecord.scores[i].id] = currentRecord.scores[i].score;
        }
    }

    var gameNames = [];
    var games = {};
    var ratings = {};

    for (var game in scoreArray) {
        if (scoreArray.hasOwnProperty(game)) {
            gameNames.push(game);
            games[game] = scoreArray[game];
            ratings[game] = GetRating(game);
        }
    }

    var jwt = CreateJWT(clientUserName, emailAddress, secret);

    var body =
        {
            'Username': clientUserName,
            'Games': games,
            'Ratings': ratings
        };

    CallACOnlineWithBodyAndWait(newBaseUrl + '/app/games/simplescore',
        'POST',
        body,
        function () {
            SetGameAsUploaded(gameNames);
            UpdateDataSubmitted();
            ClosePopup();
            CompleteNavigation(section);
        },
        function () {
            UnsuccessfulOnlineCall();
        },
        function () {
            StandardCompleteACOnline();
        },
        "Uploading game data.....",
        jwt);
}