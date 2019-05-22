var latestXHTTP = '';
var hasErrored = false;
var baseUrl = 'https://nvsngzyuq3.execute-api.eu-west-2.amazonaws.com/Beta';
var lastError = '';

function SideKickOnline_GetRecent()
{
    CallACOnlineWithBodyAndWait(baseUrl + '/recent',
        'GET',
        null,
        function () {
            SuccessfulRecentActivity();
        },
        function () {
            UnsuccessfulOnlineCall();
        },
        function () { StandardCompleteACOnline(); },
        'Getting Recent Activity ......');
}

function SideKickOnline_GetTopFifty()
{
    CallACOnlineWithBodyAndWait(baseUrl + '/topfifty',
        'GET',
        null,
        function () {
            SuccessfulArcadeTop50();
        },
        function () {
            UnsuccessfulOnlineCall();
        },
        function () { StandardCompleteACOnline(); },
        'Getting Top 50 Games ......');
}

function SideKickOnline_GetLeaderboard()
{
    CallACOnlineWithBodyAndWait(baseUrl + '/getleaderboard?gamename=' + TransformedCurrentGameName(),
        'GET',
        null,
        function () {
            SuccessfulGetLeaderboard();
        },
        function () {
            UnsuccessfulOnlineCall();
        },
        function () { StandardCompleteACOnline(); },
        'Loading Leaderboard.....');     
}

function SideKickOnline_AllUsers()
{
    CallACOnlineWithBodyAndWait(baseUrl + '/getusers',
        'GET',
        null,
        function () {
            SuccessfulAllUsers();            
        },
        function () {
            UnsuccessfulOnlineCall();
        },
        function () { StandardCompleteACOnline(); },
        'Loading all users.....');     
}

//Used to find a friend in the system
//Will also populate their games and scores
function SideKickOnline_FindFriend(name, message)
{   
    CallACOnlineWithBodyAndWait(baseUrl + '/getscore?usernames=' + name,
        'GET',
        null,
        function ()
        {
            FriendExists(name);
        },
        function ()
        {
            FriendDoesNotExist();
        },
        function () { StandardCompleteACOnline(); },
        message);     
}

//Used to get an individual friends games and scores
function SideKickOnline_GetFriendScores(name, message) {
    
    CallACOnlineWithBodyAndWait(baseUrl + '/getscore?usernames=' + name,
        'GET',
        null,
        function () { FindFriendGames(name); },
        function () { UnsuccessfulOnlineCall(); },
        function ()
        {
            var names = DrawFriendsGamesAndScores(friendsGames[name]);
            NavigateToInternalPage('#FriendsGames');
            AlterFriendScoreHeights(names);
            StandardCompleteACOnline();            
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

    GetItemFromStorageWithCallBack("secret", function (secretValue) {
        var gameNames = [];    
        var games = {};
        var ratings = {};
        
        for (var game in scoreArray)
        {
            if (scoreArray.hasOwnProperty(game))
            {
                gameNames.push(game);
                games[game] = scoreArray[game];
                ratings[game] = GetRating(game);
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

//Used to save multiple ratings in one go, when user transitions from offline to online
function SideKickOnline_SaveRatings()
{
    GetItemFromStorageWithCallBack("secret", function (secretValue) {

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

        var jwt = CreateJWT(clientUserName, emailAddress, secretValue);

        CallACOnlineWithBodyAndWait(baseUrl + '/saverating',
            'Post',
            body,
            function () { },
            function () { UnsuccessfulOnClickStar(); },
            function () { StandardCompleteACOnline(); ClosePopup(); },
            'Uploading ratings...',
            jwt);
    });
}

// {\"Username\":\"Drumzey\",\"Ratings\":[{\"GameName\":\"Bubble Bobble\",\"Rating\":10},{\"GameName\":\"Amidar\",\"Rating\":9}]}
//Used to save a single rating to the data
function SideKickOnline_SaveRating(rating, element, id, message)
{
    GetItemFromStorageWithCallBack("secret", function (secretValue) {

        var ratingJson = {
            'GameName': TransformedCurrentGameName(),
            'Rating': rating
        };

        var ratings = [];
        ratings.push(ratingJson);
        
        var body =
            {
                'Username': clientUserName,
                'Ratings': ratings
            };

        var jwt = CreateJWT(clientUserName, emailAddress, secretValue);

        CallACOnlineWithBodyAndWait(baseUrl + '/saverating',
            'Post',
            body,
            function () {
                AddStarHighlight(id, element);
                SuccessfulOnClickStar(rating);
            },
            function () {                
                UnsuccessfulOnClickStar();
            },
            function () { StandardCompleteACOnline(); },
            message,
            jwt);
    });
}

//function to get my games after a restore or existing username
function SideKickOnline_GetMyGames(username, email, secret)
{
    CallACOnlineWithBodyAndWait(baseUrl + '/getscore?usernames=' + username,
        'GET',
        null,
        function ()
        {
            ProcessMyGames();            
            SetNextPopUp(successOnlinePopup); 
            SetUserNameAdnEmailInSetup(username, emailAddress); 
            Hide('#verifyuserbutton'); //Show verified button in setup
        }, //If we succeed we want to save our secret to the storage
        function () { UnsuccessfulOnlineCall(); },
        function () { ClosePopup(); StandardCompleteACOnline(); },
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

function SideKickOnline_VerifyUser(secretvalue)
{
    var jwt = CreateJWT(clientUserName, emailAddress, secretvalue);

    var body =
    {
        'Username': clientUserName,
        'EmailAddress': emailAddress
    };

    CallACOnlineWithBodyAndWait(baseUrl + '/verifyuser',
    'POST',
    body,
    function ()
    {
        SetItemInStorage("secret", secretvalue);   
        SuccessfulVerifyUser();        
    },
    function() { UnsuccessfulVerifyUser(); },
    function() { StandardCompleteACOnline(); },
    "Verifying user ...",
    jwt);    
}    

//Used to re-register a user, say for moving device etc
function SideKickOnline_ReturningUser()
{
    var userName = document.getElementById("myusername_existinguser").value;
    var email = document.getElementById("myemail_existinguser").value;
    var secret = document.getElementById("myfavouritegame_existinguser").value;

    //Needs to make a call to verify user here....
    SideKickOnline_VerifyReturningUser(userName.toUpperCase(), email.toLowerCase(), secret);
}

function SideKickOnline_VerifyReturningUser(userName, email, secret) {    
    var jwt = CreateJWT(userName, email, secret);

    var body =
        {
            'Username': userName,
            'EmailAddress': email
        };

    CallACOnlineWithBodyAndWait(baseUrl + '/verifyuser',
        'POST',
        body,
        function ()
        {
            clientUserName = userName;
            emailAddress = email;
            SetItemInStorage("userName", userName);            
            SetItemInStorage("emailAddress", emailAddress);
            SetItemInStorage("secret", secret);
            SideKickOnline_GetMyGames(userName, emailAddress, secret);            
        },
        function () {
            StandardCompleteACOnline();
            UnsuccessfulVerifyUser();
        },
        function () { /* DO NOTHING AS WE ARE WAITING ON ANOTHER CALL*/},
        "Verifying user ...",
        jwt);    
}  

function SideKickOnline_ForgotUsername(email) {
    CallACOnlineWithBodyAndWait(baseUrl + '/forgot?mode=USERNAME&Email=' + email,
        'GET',
        null,
        function () {            
            SuccessfulForgotUserName();
        },
        function () { FailedForgotInformation(); },
        function () { StandardCompleteACOnline(); },
        "Getting username reminder ...");
}

function SideKickOnline_ForgotEmail(username)
{
    CallACOnlineWithBodyAndWait(baseUrl + '/forgot?mode=EMAIL&Username=' + username,
        'GET',
        null,
        function () {
            SuccessfulForgotEmail();            
        },
        function () { FailedForgotInformation(); },
        function () { StandardCompleteACOnline(); },
        "Getting email reminder ...");   
}

function SideKickOnline_ForgotSecret(username, email) {
    CallACOnlineWithBodyAndWait(baseUrl + '/forgot?mode=SECRET&Username=' + username + '&Email=' + email,
        'GET',
        null,
        function () {
            SuccessfulForgotSecret();
        },
        function () { FailedForgotInformation(); },
        function () { StandardCompleteACOnline(); },
        "Getting secret reminder ...");
}

var currentURL = '';
var currentBody = '';

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
    catch (error)
    {
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


function LoadOnlyBannerFromLinkTo()
{
    var imageName = currentGameName.toLowerCase();
    if (parentGame)
    {
        imageName = parentGame.toLowerCase();
    }

    var array = [];
    array.push("game_banners/" + currentCategoryId + "/" + imageName + ".png");    
    preloadimages(array).done(function (images) {
        //NavigateToInternalPage("#GameHighScores");
        LoadGameLeaderboard();
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

        array.push("game_banners/" + currentCategoryId + "/" + imageName + ".png");
        array.push("game_images/" + currentCategoryId + "/" + imageName + ".gif");
        if (bezel.id === 'default')
        {
            array.push("game_bezels/" + bezel.image);
        }     
        else
        {
            array.push("game_bezels/" + currentCategoryId + "/" + bezel.image);
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
