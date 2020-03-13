//Used to find a friend in the system
//Will also populate their games and scores
function SideKickOnline_FindFriend(name, message) {
    CallACOnlineWithBodyAndWait(baseUrl + '/getscore?usernames=' + name,
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

    CallACOnlineWithBodyAndWait(baseUrl + '/getscore?usernames=' + name,
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

function SideKickOnline_GetFriendsScoresOnStartUp(names, message) {
    CallACOnlineWithBodyAndWait(baseUrl + '/getscore?usernames=' + names,
        'GET',
        null,
        function () {
            var oldFriendData = JSON.parse(JSON.stringify(friendData));
            AddGamesToFriends();
            DoFriendScoreComparison(oldFriendData);
            PopulateFriendsUpdate();
        },
        function () {
            startuphaserrored = true;
        },
        function () {
            onlineCalls--;

            if (onlineCalls === 0) {
                if (startuphaserrored) {
                    UnsuccessfulOnlineCall();
                    StandardCompleteACOnline();
                }
                else {
                    CompletedStartUp();
                }
            }
        },
        message);
}

//Used to retrieve multiple friends games and scores
function SideKickOnline_GetFriendsScores(names, message, processScores) {

    CallACOnlineWithBodyAndWait(baseUrl + '/getscore?usernames=' + names,
        'GET',
        null,
        function () {
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

    CallACOnlineWithBodyAndWait(baseUrl + '/savescore/test',
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
        function () { UnsuccessfulOnlineCall(); StandardCompleteACOnline(); },
        function () {
        },
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

    CallACOnlineWithBodyAndWait(baseUrl + '/savescore/test',
        'POST',
        body,
        function () {
            SetGameAsUploaded(gameNames);
            Hide("#uploadscorebtn");
            UpdateDataSubmitted();
        },
        function () { UnsuccessfulOnlineCall(); },
        function () { SetLocalScoresUI(); AlterScoreHeights(); StandardCompleteACOnline(); },
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

    CallACOnlineWithBodyAndWait(baseUrl + '/saverating',
        'Post',
        body,
        function () { },
        function () { UnsuccessfulOnClickStar(); },
        function () { StandardCompleteACOnline(); ClosePopup(); },
        'Uploading ratings...',
        jwt);
    //});
}

function SideKickOnline_VerifyUser(secretvalue) {
    var jwt = CreateJWT(clientUserName, emailAddress, secretvalue);

    var body =
        {
            'Username': clientUserName,
            'EmailAddress': emailAddress
        };

    CallACOnlineWithBodyAndWait(baseUrl + '/verifyuser',
        'POST',
        body,
        function () {
            SetItemInStorage("secret", secretvalue);
            secret = secretvalue;
            SuccessfulVerifyUser();
            StandardCompleteACOnline();
            if (popupsOnStartup.length > 0) {
                NextStartupPopup();
            }
        },
        function () { UnsuccessfulVerifyUser(); StandardCompleteACOnline(); },
        function () {
        },
        "Verifying user ...",
        jwt);
}

//Used to re-register a user, say for moving device etc
function SideKickOnline_ReturningUser() {
    var userName = document.getElementById("myusername_existinguser").value;
    var email = document.getElementById("myemail_existinguser").value;
    var secret = document.getElementById("myfavouritegame_existinguser").value;

    //Needs to make a call to verify user here....
    SideKickOnline_VerifyReturningUser(userName.toUpperCase(), email.toLowerCase(), secret);
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

function SuccessfulVerifyUser() {
    SetNextPopUp(successVerify);
    ClosePopup();
    Hide('#verifyuserbutton');
    currentRecord.verified = true;
    SetItemInStorage("my_record", currentRecord);
    if (AllowedOnline() && test === false) {
        AppCenter.SetUserId(clientUserName);
    }
}

function UnsuccessfulVerifyUser() {
    SetNextPopUp(errorVerify);
    ClosePopup();
}

function UnsuccessfulNewUser() {
    if (latestXHTTP.status === 409) {
        //User already exists
        $('span[id=userErrorText_newuser]').removeClass('ui-screen-hidden');
        document.getElementById("userErrorText_newuser").innerText = "Username already exists, pick another";
    }
    else {
        UnsuccessfulOnlineCall();
    }
}

var currentGameCategoryId = '';

function LoadOnlyBannerFromLinkTo(tab, clubOverride) {

    if (currentGameCategoryId === "")
    {
        currentGameCategoryId = gameCatalog[currentGameName].category;
    }

    var imageName = currentGameName.toLowerCase();
    if (parentGame) {
        imageName = parentGame.toLowerCase();
    }

    var array = [];
    array.push(websiteAddress + "/images/banners/" + currentGameCategoryId + "/" + imageName + ".png");
    preloadimages(array).done(function (images) {
        if (tab === 'ALLSCORES') {
            SetCurrentTab('ALLSCORES');
            NavigateToInternalPage("#GameHighScores");
            loadGlobalLeaderboard = true;
            LoadGlobalLeaderboard();
        }
        else if (tab === 'CLUBS') {
            SetCurrentTab('CLUBS');
            nextClub = clubOverride;
            //Navigation to gamehighscores with tab set to clubs automatically loads leaderboard
            NavigateToInternalPage("#GameHighScores");
            //LoadClubLeaderboard(clubOverride);
        }
        else {
            LoadGameLeaderboard(true);
        }
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

        //array.push("game_banners/" + currentCategoryId + "/" + imageName + ".png");
        //array.push("game_images/" + currentCategoryId + "/" + imageName + ".gif");

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
