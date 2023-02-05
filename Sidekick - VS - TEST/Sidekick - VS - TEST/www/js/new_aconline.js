//Used to find a friend in the system
//Will also populate their games and scores
function SideKickOnline_FindFriend(name, message) {

    CallACOnlineWithBodyAndWait(newBaseUrl + 'app/games/simplescore?usernames=' + name,
        'GET',
        null,
        function () {
            FriendExists(name);
        },
        function () {
            FriendDoesNotExist();
        },
        function () { StandardCompleteACOnline(); SaveFriendsOnline();},
        message);
}

//Used to get an individual friends games and scores
function SideKickOnline_GetFriendScores(name, message) {

    CallACOnlineWithBodyAndWait(newBaseUrl + 'app/games/simplescore?usernames=' + name,
        'GET',
        null,
        function () { FindFriendGames(name); },
        function () { UnsuccessfulOnlineCall(); },
        function () {
            var names = DrawFriendsGamesAndScores(friendsGames[name]);
            NavigateToInternalPage('#FriendsGames');
            AlterFriendScoreHeights(names);
            StandardCompleteACOnline();
        },
        message);
}

//Used to retrieve multiple friends games and scores
function SideKickOnline_GetFriendsScores(names, message, processScores) {

    CallACOnlineWithBodyAndWait(newBaseUrl + 'app/games/simplescore?usernames=' + names,
        'GET',
        null,
        function () {
            var response = JSON.parse(latestXHTTP.responseText);
            AddGamesToFriends();

            if (processScores === true) {
                ProcessScoresForLeaderboard();
            }
        },
        function () { UnsuccessfulOnlineCall(); },
        function () { StandardCompleteACOnline(); },
        message);
}

//Used to save multiple games to the database
function SideKickOnline_SaveScores(scoreArray) {

    //GetItemFromStorageWithCallBack("secret", function (secretValue) {
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
            SetLocalScoresUI();
            AlterScoreHeights();
            StandardCompleteACOnline();
            if (popupsOnStartup.length > 0) {
                NextStartupPopup();
            }
            else {
                //Not sure how we would check level on update after startup...
                UpdateDataSubmitted();
            }
        },
        function () { UnsuccessfulOnlineCall(); },
        function () { StandardCompleteACOnline(); },
        "Uploading game data.....",
        jwt);
    //});
}

//Used to save a single game to the database
function SideKickOnline_SaveScore(gamename, score, rating) {
    
    var gameNames = [];
    gameNames.push(gamename);

    var games = {};
    games[gamename] = score;

    var ratings = {};
    ratings[gamename] = rating;

    var body =
        {
            'Username': clientUserName,
            'Games': games,
            'Ratings': ratings
        };

    var jwt = CreateJWT(clientUserName, emailAddress, secret);

    CallACOnlineWithBodyAndWait(newBaseUrl + '/app/games/simplescore',
        'POST',
        body,
        function () {
            SetGameAsUploaded(gameNames);
            UpdateDataSubmitted();
        },
        function () { hasErrored = true; },
        function () {
            onlineCalls--;
            if (onlineCalls < 1) {
                if (hasErrored) {
                    UnsuccessfulOnlineCall();
                    hasErrored = false;
                }
                StandardCompleteACOnline();
            }
            SetLocalScoresUI(); AlterScoreHeights();
        },
        "Uploading game data.....",
        jwt);
}

//Used to save multiple ratings in one go, when user transitions from offline to online
function SideKickOnline_SaveRatings() {
    //GetItemFromStorageWithCallBack("secret", function (secretValue) {

    var ratings = [];

    for (var i = 0; i < currentRecord.ratings.length; i++) {
        var ratingJson = {};
        var gameName = currentRecord.ratings[i].id;
        var rating = currentRecord.ratings[i].rating;

        if (rating !== 0) //Only push the rating if its non zero
        {
            ratingJson = {
                'GameName': gameName,
                'Rating': rating
            };

            ratings.push(ratingJson);
        }
    }

    var body =
        {
            'Username': clientUserName,
            'Ratings': ratings
        };

    var jwt = CreateJWT(clientUserName, emailAddress, secret);

    CallACOnlineWithBodyAndWait(newBaseUrl + 'app/games/ratings',
        'Post',
        body,
        function () { },
        function () { UnsuccessfulOnClickStar(); },
        function () { StandardCompleteACOnline(); ClosePopup(); },
        'Uploading ratings...',
        jwt);
    //});
}




var currentURL = '';
var currentBody = '';

function CallACOnlineWithBody(url, type, body, successCallback, failureCallback, completeCallBack, jwt) {
    try {

        currentURL = url;
        currentBody = body;

        if (jwt) {
            var jqxhrWithJwt = $.ajax({
                url: url,
                type: type,
                contentType: 'application/json',
                data: JSON.stringify(body),
                headers: { "Authorization": jwt },
                success: function () {
                    latestXHTTP = jqxhrWithJwt;
                    successCallback();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    var err = new Error();
                    lastError = currentURL + "\r\n" + JSON.stringify(currentBody) + "\r\n" + err.stack + "\r\n" + xhr.status + "\r\n" + thrownError;
                    latestXHTTP = jqxhrWithJwt;
                    failureCallback();
                },
                complete: function () {
                    completeCallBack();
                }
            });
        }
        else {
            if (body) {
                var jqxhr = $.ajax({
                    url: url,
                    type: type,
                    contentType: 'application/json',
                    data: JSON.stringify(body),
                    success: function () {
                        latestXHTTP = jqxhr;
                        successCallback();
                    },
                    error: function (xhr, ajaxOptions, thrownerror) {
                        var err = new Error();
                        lastError = currentURL + "\r\n" + JSON.stringify(currentBody) + "\r\n" + err.stack + "\r\n" + xhr.status + "\r\n" + thrownerror;
                        latestXHTTP = jqxhr;
                        failureCallback();
                    },
                    complete: function () {
                        completeCallBack();
                    }
                });
            }
            else {
                var getRequest = $.ajax({
                    url: url,
                    type: type,
                    contentType: 'application/json',
                    success: function () {
                        latestXHTTP = getRequest;
                        successCallback();
                    },
                    error: function (xhr, ajaxOptions, thrownerror) {
                        var err = new Error();
                        lastError = currentURL + "\r\n" + "\r\n" + err.stack + "\r\n" + xhr.status + "\r\n" + thrownerror;
                        latestXHTTP = getRequest;
                        failureCallback();
                    },
                    complete: function () {
                        completeCallBack();
                    }
                });
            }
        }
    }
    catch (error) {
        //This is a background post so we do not want to show anything        
    }
}

function CallACOnlineWithBodyAndWait(url, type, body, successCallback, failureCallback, completeCallBack, message, jwt) {
    try {

        currentURL = url;
        currentBody = body;

        if (message === '') {
            message = "Loading...";
        }

        $.mobile.loading('show', { theme: themeLetter, text: message, textVisible: "true" });

        if (jwt) {
            var jqxhrWithJwt = $.ajax({
                url: url,
                type: type,
                contentType: 'application/json',
                data: JSON.stringify(body),
                headers: { "Authorization": jwt },
                success: function () {
                    latestXHTTP = jqxhrWithJwt;
                    successCallback();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    var err = new Error();
                    lastError = currentURL + "\r\n" + JSON.stringify(currentBody) + "\r\n" + err.stack + "\r\n" + xhr.status + "\r\n" + thrownError;
                    latestXHTTP = jqxhrWithJwt;
                    failureCallback();
                },
                complete: function () {
                    completeCallBack();
                }
            });
        }
        else {
            if (body) {
                var jqxhr = $.ajax({
                    url: url,
                    type: type,
                    contentType: 'application/json',
                    data: JSON.stringify(body),
                    success: function () {
                        latestXHTTP = jqxhr;
                        successCallback();
                    },
                    error: function (xhr, ajaxOptions, thrownerror) {
                        var err = new Error();
                        lastError = currentURL + "\r\n" + JSON.stringify(currentBody) + "\r\n" + err.stack + "\r\n" + xhr.status + "\r\n" + thrownerror;
                        latestXHTTP = jqxhr;
                        failureCallback();
                    },
                    complete: function () {
                        completeCallBack();
                    }
                });
            }
            else {
                var getRequest = $.ajax({
                    url: url,
                    type: type,
                    contentType: 'application/json',
                    success: function () {
                        latestXHTTP = getRequest;
                        successCallback();
                    },
                    error: function (xhr, ajaxOptions, thrownerror) {
                        var err = new Error();
                        lastError = currentURL + "\r\n" + "\r\n" + err.stack + "\r\n" + xhr.status + "\r\n" + thrownerror;
                        latestXHTTP = getRequest;
                        failureCallback();
                    },
                    complete: function () {
                        completeCallBack();
                    }
                });
            }
        }
    }
    catch (error) {
        lastError = error.stack;
        CreatePopup(errorOnlinePopup);
    }
}


function UnsuccessfulNewUser() {
    if (latestXHTTP.status === 409) {
        //User already exists
        var popup = signInUserErrorPopup.replace("***", "Username already exists, pick another");
        SetNextPopUp(popup);
        ClosePopup();
    }
    else {
        UnsuccessfulOnlineCall();
    }
}

var currentGameCategoryId = '';

function LoadOnlyBannerFromLinkTo(tab, clubOverride) {

    currentGameCategoryId = gameCatalog[currentGameName].category;

    var imageName = currentGameName.toLowerCase();
    if (parentGame) {
        imageName = parentGame.toLowerCase();
    }

    var array = [];
    array.push(websiteAddress + "/images/banners/" + currentGameCategoryId + "/" + imageName + ".png");
    preloadimages(array).done(function (images) {
        //WHAT ABOUT CLUB???
        LoadGameLeaderboard(tab,clubOverride);
    });
}

function CompleteACOnlineWithNavigate(pageToNavigateTo, successCallBack, failureCallBack) {

    if (pageToNavigateTo === "#Game") {
        //Wait for images to preload then navigate
        var bezel = GetBezel(TransformedCurrentGameName());
        var array = [];

        var imageName = currentGameName.toLowerCase();
        if (parentGame) {
            imageName = parentGame.toLowerCase();
        }

        array.push(websiteAddress + "/images/banners/" + currentGameCategoryId + "/" + imageName + ".png");
        array.push(websiteAddress + "/images/screens/" + currentGameCategoryId + "/" + imageName + ".gif");

        if (bezel.id === 'default') {
            array.push(websiteAddress + "/images/bezels/" + bezel.image);
        }
        else {
            array.push(websiteAddress + "/images/bezels/" + currentGameCategoryId + "/" + bezel.image);
        }

        preloadimages(array).done(function (images) {
            if (CurrentPage() !== pageToNavigateTo) {
                NavigateToInternalPage(pageToNavigateTo);
                ResizeScreenImage();
            }
            successCallBack();
            $.mobile.loading('hide');
            if (hasErrored) {
                failureCallBack();
                hasErrored = false;
            }
        });
    }
    else {
        if (pageToNavigateTo !== null) {
            if (CurrentPage() !== pageToNavigateTo) {
                NavigateToInternalPage(pageToNavigateTo);
            }
        }
        successCallBack();
        $.mobile.loading('hide');
        if (hasErrored) {
            failureCallBack();
            hasErrored = false;
        }
    }
}

function GameInfoError() {
    CreatePopup(errorOnlinePopup);
}

function TopScoreInfoError() {
    CreatePopup(errorOnlinePopup);
}
