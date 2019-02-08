var latestXHTTP = '';
var hasErrored = false;
var baseUrl = 'https://nvsngzyuq3.execute-api.eu-west-2.amazonaws.com/Beta'; //https://demo2505266.mockable.io

//Used to find a friend in the system
//Will also populate their games and scores
function SideKickOnline_FindFriend(name, message)
{   
    var body =
        {
            'UserNames': name
        };

    CallACOnlineWithBodyAndWait(baseUrl + '/getscore',
        'GET',
        body,
        function () { FriendExists(name); },
        function () { FriendDoesNotExist(); },
        function () { StandardCompleteACOnline()(); },
        message);     
}

//Used to get an individual friends games and scores
function SideKickOnline_GetFriendScores(name, message) {
    
    var body =
        {
            'UserNames': name
        };

    CallACOnlineWithBodyAndWait(baseUrl + '/getscore',
        'GET',
        body,
        function () { FindFriendGames(name); },
        function () { UnsuccessfulOnlineCall(); },
        function () { StandardCompleteACOnline(); NavigateToInternalPage('#FriendsGames'); },
        message);  
}

//Used to retrieve multiple friends games and scores
function SideKickOnline_GetFriendsScores(names, message) {

    var body =
        {
            'UserNames': names
        };

    CallACOnlineWithBodyAndWait(baseUrl + '/getscore',
        'GET',
        body,
        function () { AddGamesToFriends(); ProcessScoresForLeaderboard(); },
        function () { UnsuccessfulOnlineCall(); },
        function () { StandardCompleteACOnline(); },
        message);     
}

//Used to save multiple games to the database
function SideKickOnline_SaveScores(scoreArray) {

    GetItemFromStorageWithCallBack("secret", function (secretValue) {
        var gameNames = [];    
        var games = [];
        var ratings = [];

        for (var game in scoreArray)
        {
            if (scoreArray.hasOwnProperty(game))
            {
                gameNames.push(game);
                games.push({ [game]: scoreArray[game] });
                ratings.push({ [game]: GetRating(game) }); //GET RATING TODO
            }
        }    

        var jwt = CreateJWT(clientUserName, emailAddress, secretValue);

        var body =
            {
                'Username': clientUserName,
                'Games': games,
                'Ratings': ratings
            };

        CallACOnlineWithBodyAndWait(baseUrl + '/savescore',
            'POST',
            body,
            function () { SetGameAsUploaded(gameNames); },
            function () { UnsuccessfulOnlineCall(); },
            function () { SetLocalScoresUI(); AlterScoreHeights(); StandardCompleteACOnline(); },
            "Uploading game data.....",
            jwt);
    });
}

//Used to save a single game to the database
function SideKickOnline_SaveScore(gamename, score, rating) {

    GetItemFromStorageWithCallBack("secret", function (secretValue) {
        var gameNames = [];
        gameNames.push(gamename);

        var games =
            [
                { [gamename]: score }
            ];

        var ratings =
            [
                { [gamename]: rating }
            ];

        var body =
            {
                'Username': clientUserName,
                'Games': games,
                'Ratings': ratings
            };

        var jwt = CreateJWT(clientUserName, emailAddress, secretValue);

        CallACOnlineWithBodyAndWait(baseUrl + '/savescore',
            'POST',
            body,
            function () { SetGameAsUploaded(gameNames); },
            function () { UnsuccessfulOnlineCall(); },
            function () { SetLocalScoresUI(); AlterScoreHeights(); StandardCompleteACOnline(); },
            "Uploading game data.....",
            jwt);
    });
}

//Used to get a rating for a game
function SideKickOnline_GetRating(message)
{
    CallACOnlineWithBodyAndWait(baseUrl + '/getrating?gamename=' + TransformedCurrentGameName(),
        'GET',
        null,
        function () { SuccessfulGetCommunityRating(); },
        function () { UnsuccessfulGetCommunityRating(); },
        function () { CompleteACOnlineWithNavigate("#Game", OnSuccessfulLoadOfGame, GameInfoError); },
        message);
}

//Used to save a single rating to the data
function SideKickOnline_SaveRating(rating, element, id, message)
{
    GetItemFromStorageWithCallBack("secret", function (secretValue) {
        var body =
            {
                'Username': clientUserName,
                'GameName': TransformedCurrentGameName(),
                'Rating': rating
            };

        var jwt = CreateJWT(clientUserName, emailAddress, secretValue);

        CallACOnlineWithBodyAndWait(baseUrl + '/saverating',
            'Post',
            body,
            function () {
                AddStarHighlight(id, element);
                SuccessfulOnClickStar(rating);
            },
            function () { UnsuccessfulOnClickStar(); },
            function () { StandardCompleteACOnline(); },
            message,
            jwt);
    });
}

//function to get my games after a restore or existing username
function SideKickOnline_GetMyGames(username, email, secret)
{
    var authorization = CreateJWT(username, email, secret);

    var myname = [];
    myname.push(clientUserName);

    var body =
        {
            'UserNames': myname
        };

    CallACOnlineWithBodyAndWait(baseUrl + '/getscore',
        'GET',
        body,
        function () { ProcessMyGames(); }, //If we succeed we want to save our secret to the storage
        function () { UnsuccessfulOnlineCall(); },
        function () { StandardCompleteACOnline(); },
        "Restoring data ...");
}

function SideKickOnline_NewUser(username, email)
{
    var body =
        {
            'Username': username,
            'EmailAddress': email
        };

    CallACOnlineWithBodyAndWait(baseUrl + '/createuser',
        'POST',
        body,
        function () { SuccessfulGetOfNewUser(username, email); },
        function () { UnsuccessfulNewUser();},
        function () { StandardCompleteACOnline(); }, 
        "Checking user name ...");
}

function SideKickOnline_VerifyUser()
{
    GetItemFromStorageWithCallBack("secret", function(secretValue) {
        var jwt = CreateJWT(clientUserName, emailAddress, secretValue);

        var body =
        {
            'Username': clientUserName,
            'EmailAddress': emailAddress
        };

        CallACOnlineWithBodyAndWait(baseUrl + '/verifyuser',
        'POST',
        body,
        function() { SuccessfulVerifyUser(); },
        function() { UnsuccessfulVerifyUser(); },
        function() { StandardCompleteACOnline(); },
        "Verifying user ...",
        jwt);
    });
}    

//Used to re-register a user, say for moving device etc
function SideKickOnline_ReturningUser()
{
    var userName = document.getElementById("myusername_existinguser").value;
    var emailAddress = document.getElementById("myemail_existinguser").value;
    var secret = document.getElementById("myfavouritegame_existinguser").value;

    userName = userName.toUpperCase();
    emailAddress = emailAddress.toLowerCase();    
    
    SideKickOnline_GetMyGames(userName, emailAddress, secret);
}

function CallACOnlineWithBodyAndWait(url, type, body, successCallback, failureCallback, completeCallBack, message, jwt) {
    if (message === '') {
        message = "Loading...";
    }

    $.mobile.loading('show', { theme: themeLetter, text: message, textVisible: "true" });

    if (jwt)
    {
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
            error: function () {
                latestXHTTP = jqxhrWithJwt;
                failureCallback();
            },
            complete: function () {
                completeCallBack();
            }
        });
    }
    else
    {
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
                error: function () {
                    latestXHTTP = jqxhr;
                    failureCallback();
                },
                complete: function () {
                    completeCallBack();
                }
            });
        }
        else
        {
            var getRequest = $.ajax({
                url: url,
                type: type,
                contentType: 'application/json',                
                success: function () {
                    latestXHTTP = getRequest;
                    successCallback();
                },
                error: function () {
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

function CallACOnlineWithWait(url, type, successCallback, failureCallback, completeCallBack, message) {
    
    if (message === '') {
        message = "Loading...";
    }

    $.mobile.loading('show', { theme: themeLetter, text: message, textVisible: "true" });

    var jqxhr = $.ajax({
        url: url,
        type: type,
        success: function () {
            latestXHTTP = jqxhr;
            successCallback();
        },
        error: function () {
            latestXHTTP = jqxhr;
            failureCallback();
        },
        complete: function () {
            completeCallBack();
        }
    });
}

function CompleteWithCounter(useCountPleaseWait, pageToNavigateTo, successCallBack, failureCallBack) {
    if (useCountPleaseWait) {
        if (countPleaseWait === 0) {
            StandardCompleteACOnline();
        }
        else {
            countPleaseWait--;
            CloseMultiplePleaseWait(pageToNavigateTo, successCallBack, failureCallBack);
        }
    }
    else {
        StandardCompleteACOnline();
    }
}

function SuccessfulVerifyUser() {
    SetNextPopUp(successVerify);
    ClosePopup();
    Hide('#verifyuserbutton');
    currentRecord.verified = true;
    SetItemInStorage("my_record", currentRecord);
}

function UnsuccessfulVerifyUser() {
    SetNextPopUp(errorVerify);
    ClosePopup();
}

function UnsuccessfulNewUser() {
    if (latestXHTTP.status === 409) {
        //User already exists
        $('span[id=userErrorText_newuser]').removeClass('ui-screen-hidden');
        document.getElementById("userErrorText_newuser").innerText = "Username already exists, pick another user name";
        //SetNextPopUp(errorNewUser);
        //ClosePopup();     
    }
    else
    {
        UnsuccessfulOnlineCall();
    }      
}

function UnsuccessfulOnlineCall() {
    SetNextPopUp(errorOnlinePopup);
    ClosePopup();    
}

function StandardCompleteACOnline() {    
    $.mobile.loading('hide');
}

function CompleteACOnlineWithNavigate(pageToNavigateTo, successCallBack, failureCallBack) {
    
    if (pageToNavigateTo === "#Game") {
        //Wait for images to preload then navigate
        var array = [];
        array.push("game_banners/" + currentCategoryId + "/" + currentGameName.toLowerCase() + ".png");
        array.push("game_images/" + currentCategoryId + "/" + currentGameName.toLowerCase() + ".gif");
        preloadimages(array).done(function (images) {
            if (CurrentPage() !== pageToNavigateTo) {
                NavigateToInternalPage(pageToNavigateTo);
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

function ErrorWithCounter(useCountPleaseWait, callBack) {
    if (useCountPleaseWait) {
        hasErrored = true;
    }
    else {
        callBack();
    }
}

function ResetACOnline() {
    latestXHTTP = '';
}

function GameInfoError() {
    CreatePopup(errorOnlinePopup);
}

function TopScoreInfoError() {
    CreatePopup(errorOnlinePopup);
}
