function SetExistingUser() {

    retryMode = "EXISTING";

    if (clientUserName !== '' && clientUserName !== null)
        return;

    if (!CheckFieldValid('Username', 'myusername_existinguser', true)) {
        return;
    }

    if (!CheckFieldValid('Email address', 'myemail_existinguser', true))
        return;

    if (!CheckFieldValid('Secret Code', 'myfavouritegame_existinguser', false))
        return;

    SideKickOnline_ReturningUser();
}

function SideKickOnline_ReturningUser() {
    var userName = document.getElementById("myusername_existinguser").value;
    var email = document.getElementById("myemail_existinguser").value;
    var secret = document.getElementById("myfavouritegame_existinguser").value;

    //Needs to make a call to verify user here....
    SideKickOnline_VerifyReturningUser(userName.toUpperCase(), email.toLowerCase(), secret);
}

function SideKickOnline_VerifyReturningUser(userName, email, proposedsecret) {
    var jwt = CreateJWT(userName, email, proposedsecret);

    var url = newBaseUrl + accountUserUrl + 'verify';

    var body =
        {
            'Username': userName,
            'EmailAddress': email
        };

    Call_ArcadeSidekick_Online_Post(
        url,
        body,
        function () {
            clientUserName = userName;
            emailAddress = email;
            secret = proposedsecret;
            SetItemInStorage("userName", userName);
            SetItemInStorage("emailAddress", emailAddress);
            SetItemInStorage("secret", proposedsecret);
            SuccessfulVerificationOnRestoreUser();
        },
        function () {
            StandardCompleteACOnline();
            UnsuccessfulVerifyUser();
        },
        function () { /* DO NOTHING AS WE ARE WAITING ON ANOTHER CALL*/ },
        "Verifying user...",
        jwt);
}

function SuccessfulVerificationOnRestoreUser(userName) {
    // Do we have offline data that needs to be 
    var haveDetailsToUpload = DoWeHaveDetailsToUpload();

    if (haveDetailsToUpload === true) {
        var ratings = GetRatingDataToUpload();
        var simpleScores = GetSimpleDataToUpload();
        var detailedScores = GetDetailedDataToUpload();
        SideKickOnline_PushOffline_WithRestore(ratings, simpleScores, detailedScores);
    }
    else {
        SideKickOnline_RestoreUser();
    }
}

function SideKickOnline_RestoreUser() {
    var url = newBaseUrl + userUrl + 'restore?username=' + clientUserName;

    Call_ArcadeSidekick_Online_Get(
        url,
        function () {
            var response = JSON.parse(latestXHTTP.responseText);
            var myProfile = response.Me;
            var friendsGames = response.Friends;

            ProcessMyDetails(myProfile);
            ProcessFriendsDetails(friendsGames);
            SetNextPopUp(successOnlinePopup);
            ClosePopup();
        },
        UnsuccessfulOnlineCall,
        function () {
            StandardCompleteACOnline();
        },
        'Restoring data...');
}

// The response body here is the http response.Me
function ProcessMyDetails(responseBody) {

    if (latestXHTTP.status !== 200) {
        UnsuccessfulOnlineCall();
        return;
    }

    ProcessGames(responseBody);
    ProcessRestoredDetailedScores(responseBody.DetailedScores, responseBody.DetailedSettings);
    ProcessClubs(responseBody);
    SuccessfulGetProfileStatsFromRestore(responseBody);
    ProcessPersonalDetails(responseBody);
}

function ProcessGames(response) {
    var onlinePlayed = response.Games;

    for (var game in onlinePlayed) {
        if (onlinePlayed.hasOwnProperty(game)) {
            var gameName = game;
            var new_score = response.Games[gameName];
            var rating = response.Ratings[gameName];

            var index = FindGameIndex(TransformGameName(gameName));

            if (index === -1) {
                var playedArray = currentRecord.played;
                playedArray.push(TransformGameName(gameName));
                playedArray.sort();

                var scoreArray = currentRecord.scores;
                var x = new Scores();
                x.id = TransformGameName(gameName);
                x.score = new_score;
                x.uploaded = true;
                scoreArray.push(x);

                var ratingsArray = currentRecord.ratings;
                var y = new Ratings();
                y.id = TransformGameName(gameName);
                y.rating = rating;
                ratingsArray.push(y);

                currentRecord.played = playedArray;
                currentRecord.scores = scoreArray;
                currentRecord.ratings = ratingsArray;
            }
            else {
                var existing_score = currentRecord.scores[index].score;

                if (parseInt(existing_score, 10) < parseInt(new_score, 10)) {
                    currentRecord.scores[index].score = new_score;
                    currentRecord.scores[index].uploaded = true;
                }
                else {
                    //Do nothing, we should have the correct value 
                    //and should be marked as not uploaded
                }
            }
        }
    }

    currentRecord.verified = true;
    SetItemInStorage("my_record", currentRecord);
}

function ProcessClubs(response) {
    //Set my clubs
    if (response.Clubs) {
        myclubs = response.Clubs;
    }
    SetItemInStorage("myclubs", response.Clubs);

    //Add admin clubs
    myAdminClubs = [];
    if (AllowedOnline()) {
        for (var i = 0; i < allClubs.length; i++) {
            if (allClubs[i].AdminUsers.indexOf(clientUserName) !== -1) {
                myAdminClubs.push(allClubs[i].Name);
            }
        }
    }
}

function ProcessPersonalDetails(response) {
    SetUserNameAndEmailInSetup(response.Username, response.EmailAddress, response.TwitterHandle, response.DOB, response.YouTubeChannel, response.Location);
    twitterHandle = response.TwitterHandle;
    playerdob = response.DOB;
    playeryoutubeChannel = response.YouTubeChannel;
    playerlocation = response.Location;

    if (twitterHandle === undefined || twitterHandle === null) {
        twitterHandle = "";
    }

    if (playerdob === undefined || playerdob === null) {
        playerdob = "";
    }

    if (playeryoutubeChannel === undefined || playeryoutubeChannel === null) {
        playeryoutubeChannel = "";
    }

    if (playerlocation === undefined || playerlocation === null) {
        playerlocation = "";
    }

    friendsCollection = response.Friends;
    SetItemsInStorage(response.Username, friendsCollection, twitterHandle, playerdob, playerlocation, playeryoutubeChannel);
}

function SetItemsInStorage(username, friendsCollection, twitterHandle, dob, location, youtube) {
    //Add me back into friends list
    friendsCollection.push(username);
    SetItemInStorage("friends", friendsCollection);
    SetItemInStorage("twitterHandle", twitterHandle);
    SetItemInStorage("dob", dob);
    SetItemInStorage("location", location);
    SetItemInStorage("youtubechannel", youtube);
    Hide('#verifyuserbutton'); //Show verified button in setup
}

function ProcessFriendsDetails(friendsDetails) {
    if (friendsCollection === null) {
        friendsCollection = [];
    }
    else {
        var oldFriendData = JSON.parse(JSON.stringify(friendData));
        AddGamesToFriends(friendsDetails);
        DoFriendScoreComparison(oldFriendData);
        PopulateFriendsUpdate();
    }
}

function ProcessRestoredDetailedScores(games, settings) {
    for (var game in games) {
        if (games.hasOwnProperty(game))
            for (var j = 0; j < games[game].length; j++) {
                var newScore = new DetailedScore();
                newScore.Score = games[game][j].Score;
                newScore.Date = games[game][j].Date;
                newScore.LevelName = games[game][j].LevelName;
                newScore.Location = games[game][j].Location;
                newScore.Event = games[game][j].EventName;

                var setting = GetSetting(game, settings, games[game][j].SettingsId);

                if (setting !== null) {
                    newScore.MameOrPCB = setting.MameOrPCB;
                    newScore.Difficulty = setting.Difficulty;
                    newScore.Lives = setting.Lives;
                    newScore.ExtraLivesAt = setting.ExtraLivesAt;
                    newScore.Credits = setting.Credits;
                    if (!detailedScoreCollection[game]) {
                        detailedScoreCollection[game] = [];
                    }

                    detailedScoreCollection[game].push(newScore);
                }
            }
    }
    SetItemInStorage("detailedScoreCollection", detailedScoreCollection);
}

function GetSetting(game, settings, settingsId) {
    var setting = {};

    for (var i = 0; i < settings[game].length; i++) {
        if (settingsId === settings[game][i].SettingsId) {
            setting.Difficulty = settings[game][i].Difficulty;
            setting.Lives = settings[game][i].Lives;
            setting.ExtraLivesAt = settings[game][i].ExtraLivesAt;
            setting.Credits = settings[game][i].Credits;
            setting.MameOrPCB = settings[game][i].MameOrPCB;

            return setting;
        }
    }

    return null;
}

function FindGameIndex(gameName) {
    for (var i = 0; i < currentRecord.scores.length; i++) {
        if (currentRecord.scores[i].id === gameName) {
            return i;
        }
    }

    return -1;
}