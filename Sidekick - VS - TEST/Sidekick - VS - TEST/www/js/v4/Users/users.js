var usersPage = new AppPage();
usersPage.id = 'setupfriendsTile';
usersPage.pageName = 'ManageFriends';
usersPage.beforeNavigate = function () { SetupFriends(); };
usersPage.afterNavigate = function () { ShowFriendsPopUp(); };

AppPages[usersPage.id] = usersPage;

// Variables used
var friendsGames = [];
var gamesByFriend = [];
var friendData = {};
var firstTimeFriends = '';

// Before Navigation
function SetupFriends() {
    LoadFriends();
    LoadEnemies();
    SetCurrentTab("ALLUSERS");
    LoadUsers();
}

function LoadFriends() {
    if (friendsCollection !== null && friendsCollection.length !== 0) {
        DrawFriendsUI(friendsCollection);
    }
}

function LoadEnemies() {
    if (enemiesCollection !== null && enemiesCollection.length !== 0) {
        DrawEnemiesUI(enemiesCollection);
    }
}

function DrawFriendsUI(userArray) {
    RemoveAllChildren("allfriendsul");
    var friends = [];
    var array = userArray.sort();
    for (var i = 0; i < array.length; i++) {
        if (array[i] !== clientUserName) {
            friends.push([array[i], '<li onclick="FriendGames(this.id)" id="' + array[i] + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;font-size:70%;"><a>' + array[i] + '</a></li>']);
        }
    }

    var nameoutput = [];

    for (var j = 0; j < friends.length; j++) {
        nameoutput.push(friends[j][1]);
    }

    $('#myfriends').children('ul').append(nameoutput.join('')).listview().listview('refresh');
}

function DrawEnemiesUI(userArray) {
    RemoveAllChildren("allenemiesul");
    var nameoutput = GetUserList(userArray);
    $('#myenemies').children('ul').append(nameoutput.join('')).listview().listview('refresh');
}

function GetUserList(userListArray) {
    var userList = [];
    var array = userListArray.sort();
    for (var i = 0; i < array.length; i++) {
        userList.push([array[i], '<li id="' + array[i] + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;font-size:70%;">' + array[i] + '</li>']);
    }

    var nameoutput = [];

    for (var j = 0; j < userList.length; j++) {
        nameoutput.push(userList[j][1]);
    }
    return nameoutput;
}

function SetFriendsName(username) {

    //Need to check whether this user appears in both lists.....

    if (username !== null || username !== '') {
        username = username.toUpperCase();

        if (friendsCollection.indexOf(username) === -1) {

            //Does the name exist in the other list?
            if (enemiesCollection.indexOf(username) !== -1) {
                DeleteEnemy(username);
                DrawEnemiesUI(enemiesCollection);
            }

            try {
                SideKickOnline_FindFriend(username, 'Adding friend');
            }
            catch (err) {
                alert(err.message);
            }
        }
        else {
            DeleteFriend(username);
            LoadUsers();
            DrawFriendsUI(friendsCollection);
        }
    }
}

function SetEnemiesName(username) {

    if (username !== null || username !== '') {
        username = username.toUpperCase();

        if (enemiesCollection.indexOf(username) === -1) {

            //Does the name exist in the other list?
            if (friendsCollection.indexOf(username) !== -1) {
                DeleteFriend(username);
                DrawFriendsUI(friendsCollection);
            }

            enemiesCollection.push(username);
            SetItemInStorage('enemies', enemiesCollection);
        }
        else {
            DeleteEnemy(username);
        }

        LoadUsers();
        DrawEnemiesUI(enemiesCollection);
    }
}

function DeleteFriend(friendName) {

    var index = friendsCollection.indexOf(friendName);
    friendsCollection.splice(index, 1);
    delete friendsGames[friendName];
    SaveFriends();     //Clears the control cache so it will be drawn again.
    SaveFriendsOnline();

    //Need to remove the games related to that friend from the gamesByFriend Colelction
    for (var game in gamesByFriend) {
        if (gamesByFriend.hasOwnProperty(game)) {
            var findex = gamesByFriend[game].indexOf(friendName);
            if (findex !== -1) {
                gamesByFriend[game].splice(findex, 1);
            }
        }
    }
}

function DeleteEnemy(enemyName) {

    var index = enemiesCollection.indexOf(enemyName);
    enemiesCollection.splice(index, 1);
    SaveEnemies();
}

function SaveFriends() {
    var friendsArray = [];
    if (clientUserName !== '') {
        friendsArray.push(clientUserName);
    }

    for (var i = 0; i < friendsCollection.length; i++) {
        if (friendsCollection[i] !== clientUserName) {
            friendsArray.push(friendsCollection[i]);
        }
    }

    SetItemInStorage('friends', friendsArray);
    friendsCollection = friendsArray;
    friendsScores = [];

    //If we have game high scores in our history then we need to refresh
    //our highscores as we have navigated to friends from the game high scores
    var highscores = pageHistory.indexOf("#GameHighScores");
    if (highscores !== -1) {
        refreshHighscores = 1;
    }
    //Clear control cache so game list regenerates
    controlCache = [];
}

function SaveEnemies() {
    SetItemInStorage('enemies', enemiesCollection);
}

function FriendDoesNotExist() {
    ShowPopup('#NoFriendFound');
}

function FindFriendGames(username) {
    if (latestXHTTP.status === 200) {
        if (latestXHTTP.responseText === '' || latestXHTTP.responseText === '[]') {
            UnsuccessfulOnlineCall();
        }
        else {
            AddGamesToFriend(username);
        }
    }
    else {
        UnsuccessfulOnlineCall();
    }
}

function FriendExists(username) {
    if (latestXHTTP.status === 200) {
        var response = JSON.parse(latestXHTTP.responseText);
        if (response.Users.length === 0) {
            FriendDoesNotExist();
        }
        else {
            friendsCollection.push(username);
            DrawFriendsUI(friendsCollection);
            SaveFriends();
            AddGamesToFriend(username);
            ShowAllUsers();
        }
    }
    else {
        UnsuccessfulOnlineCall();
    }
}

var friendsNewData = {};
var newFriendsData = false;

function PopulateFriendsUpdate() {
    RemoveAllChildren('recentfriendscontainer');

    var parentHTML = '<div data-role="collapsible"><h5>{NAME}</h5>{CONTENTS}</div>';
    var newGamesHTML = '<ul data-role="listview" class="ui-listview ui-corner-all"><li style="font-size:70%;white-space: normal;text-overflow: clip;" class="ui-li ui-li-static ui-btn-up-c">Has posted their first scores for</li>{CONTENTS}</ul>';
    var newScoresHTML = '<ul data-role="listview" class="ui-listview ui-corner-all" style="margin-top:{TOP}px"><li style="font-size:70%;white-space: normal;text-overflow: clip;" class="ui-li ui-li-static ui-btn-up-c">Has updated their scores for</li>{CONTENTS}</ul>';

    var template =
        '<li style="white-space: normal;text-overflow: clip;font-size:70%" class="ui-li ui-li-static ui-btn-up-c" onclick="GoToGame(this)" id="{ID}">' +
        '<div class="ui-grid-a">' +
        '<div class="ui-block-a">{CONTENTS}</div>' +
        '<div class="ui-block-b ui-icon-carat-r ui-btn-icon-right">{CONTENTS2}</div>' +
        '</div>' +
        '</li>';

    if (newFriendsData === true) {
        var output = [];

        for (var friendName in friendsNewData) {
            var newGames = friendsNewData[friendName]["new"];
            var gamescontents = [];
            for (var i = 0; i < newGames.length; i++) {
                var split = newGames[i].split(':');
                var gameId = FindGameInCatalog(split[0]);
                gamescontents.push(template.replace("{ID}", gameId).replace("{CONTENTS}", split[0].trim()).replace("{CONTENTS2}", split[1].trim()));
            }

            var newScores = friendsNewData[friendName]["scores"];
            var scorescontents = [];
            for (var j = 0; j < newScores.length; j++) {
                var split2 = newScores[j].split(':');
                var gameId2 = FindGameInCatalog(split2[0]);
                scorescontents.push(template.replace("{ID}", gameId2).replace("{CONTENTS}", split2[0].trim()).replace("{CONTENTS2}", split2[1].trim()));
            }

            var userNewGamesHtml = "";
            if (newGames.length > 0) {
                userNewGamesHtml = newGamesHTML.replace("{CONTENTS}", gamescontents.join(''));
            }

            var userNewScoressHtml = "";
            if (newScores.length > 0) {
                var margin = "-8";
                if (newGames.length > 0) {
                    margin = "8";
                }
                userNewScoressHtml = newScoresHTML.replace("{CONTENTS}", scorescontents.join('')).replace("{TOP}", margin);
            }

            var userNewParentHTML = parentHTML.replace("{NAME}", friendName).replace("{CONTENTS}", userNewGamesHtml + userNewScoressHtml);

            $('#recentfriendscontainer').append(userNewParentHTML);
        }
        popupsOnStartup.push(recentFriendsActivityPopup);
    }
}

function DoFriendScoreComparison(oldFriendData) {
    if (isEmpty(oldFriendData))
        return;

    for (var friend in friendData) {

        var friendsOldGames = [];
        var friendsNewGames = [];

        if (friendData.hasOwnProperty(friend)) {
            friendsOldGames = oldFriendData[friend];
            friendsNewGames = friendData[friend];

            var newGamesPlayed = [];
            var newScoresLogged = [];
            var newBetteredYourScore = [];

            for (var game in friendData[friend]) {
                var gameName = game.replace(/_/g, ' ').toLowerCase();
                var score = friendsNewGames[game];

                if (score === 0 || score === "0") {
                    continue;
                }

                //Transform score if its timed etc
                if (timed.indexOf(game) !== -1) {
                    score = MillisecondsToMinutesSecondsMilliseconds(parseInt(score));
                }
                else {
                    score = addComma(score.toString());
                }

                if (friendsOldGames === undefined) {
                    // This friend didnt have any data previously
                    newGamesPlayed.push(gameName + ": " + score);
                    newFriendsData = true;
                }
                else if (friendsNewGames.hasOwnProperty(game) &&
                    !friendsOldGames.hasOwnProperty(game)) {
                    //We are in new games and not old games
                    newGamesPlayed.push(gameName + ": " + score);
                    newFriendsData = true;
                }
                else {
                    //We are in both, is the score the same?
                    if (friendsNewGames[game] !== friendsOldGames[game]) {
                        newScoresLogged.push(gameName + ": " + score);
                        newFriendsData = true;
                    }

                    //currentRecord.scores
                    //But is the score better than yours now?
                    //was the old one worse and new one better?
                }
            }

            if (newGamesPlayed.length > 0 || newScoresLogged.length > 0) {
                friendsNewData[friend] = {};
                friendsNewData[friend]["new"] = newGamesPlayed;
                friendsNewData[friend]["scores"] = newScoresLogged;
            }
        }
    }
}

function ConstructFriendData() {
    var newData = {};

    //Iterate over friendsGames
    for (var friend in friendsGames) {
        if (friendsGames.hasOwnProperty(friend)) {
            newData[friend] = {};

            for (var game in friendsGames[friend]) {
                if (friendsGames.hasOwnProperty(friend)) {
                    newData[friend][game] = friendsGames[friend][game];
                }
            }
        }
    }

    friendData = newData;
    SetItemInStorage('friendData', friendData);
}

function AddGamesToFriends(friendDetails) {
    controlCache = [];
    for (var i = 0; i < friendDetails.Users.length; i++) {
        friendsGames[friendDetails.Users[i].Username] = friendDetails.Users[i].Games;

        for (var game in friendDetails.Users[i].Games) {
            if (friendDetails.Users[i].Games.hasOwnProperty(game)) {

                if (friendDetails.Users[i].Games[game] !== '' &&
                    friendDetails.Users[i].Games[game] !== '0' &&
                    friendDetails.Users[i].Games[game] !== null &&
                    friendDetails.Users[i].Games[game] !== undefined) {
                    if (gamesByFriend.hasOwnProperty(game)) {
                        gamesByFriend[game].push(friendDetails.Users[i].Username);
                    }
                    else {
                        gamesByFriend[game] = [];
                        gamesByFriend[game].push(friendDetails.Users[i].Username);
                    }
                }
                else {
                    // Game has been played by friend but no score given
                }
            }
        }
    }
    ConstructFriendData();
}

function AddGamesToFriend(username) {
    var filteredGames = [];
    var response = JSON.parse(latestXHTTP.responseText);
    if (response.Users[0]) {

        var games = response.Users[0].Games;

        for (var prop in games) {
            if (games.hasOwnProperty(prop)) {
                //filter out the zero games
                if (games[prop] !== 0 && games[prop] !== "0") {
                    filteredGames[prop] = games[prop];
                }
            }
        }

        friendsGames[username] = filteredGames;
    }
    else {
        friendsGames[username] = [];
    }

    for (var game in filteredGames) {
        if (filteredGames.hasOwnProperty(game)) {
            if (gamesByFriend.hasOwnProperty(game)) {
                gamesByFriend[game].push(username);
            }
            else {
                gamesByFriend[game] = [];
                gamesByFriend[game].push(username);
            }
        }
    }

    ConstructFriendData();
}

function FriendGames(username) {
    document.getElementById("friendGamesTitle").innerText = username;

    if (friendsGames.hasOwnProperty(username)) {
        var names = DrawFriendsGamesAndScores(friendsGames[username]);
        NavigateToInternalPage('#FriendsGames');
        AlterFriendScoreHeights(names);
    }
    else {
        //We have not yet got this friends scores so we need to get them
        SideKickOnline_GetFriendScores(username, "Getting scores...");
    }
}

function DrawFriendsGamesAndScores(games) {
    RemoveAllChildren("allfriendgameblocklocal");
    RemoveAllChildren("allfriendscoresblocklocal");

    //GetTimedGames();

    var nameArray = [];
    var scoreArray = [];
    var names = [];

    for (var property in games) {
        if (games.hasOwnProperty(property)) {
            var gameName = property.replace(/_/g, ' ');

            var score = games[property];

            if (timed.indexOf(property) !== -1) {
                score = MillisecondsToMinutesSecondsMilliseconds(parseInt(score));
            }
            else {
                score = addComma(score.toString());
            }

            nameArray.push([property, '<li name="friend' + property + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;font-size:70%;">' + gameName + '</li>']);
            scoreArray.push([property, '<li name="friend' + property + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;font-size:70%;text-align: right !important">' + score + '</li>']);
            names.push("friend" + property);
        }
    }

    nameArray.sort(SortById);
    scoreArray.sort(SortById);

    var nameoutput = [];
    var scoreoutput = [];

    for (var j = 0; j < nameArray.length; j++) {
        nameoutput.push(nameArray[j][1]);
        scoreoutput.push(scoreArray[j][1]);
    }

    if (nameArray.length === 0) {
        Show("#FriendsNoGames");
    }
    else {
        Hide("#FriendsNoGames");
    }

    $('#friendgameblocklocal').children('ul').append(nameoutput.join('')).listview().listview('refresh');
    $('#friendscoreblocklocal').children('ul').append(scoreoutput.join('')).listview().listview('refresh');

    return names;
}

function LoadFriendsCollection() {
    //GetItemFromStorageWithCallBack('friends', function (value) {
    //    friendsCollection = value;
        var friendsArray = [];

        if (friendsCollection.length > 0) {
            if (friendsCollection[i] !== clientUserName) {
                friendsArray.push(friendsCollection[i]);
            }
            var names = friendsArray.join(",");
            SideKickOnline_GetFriendsScores(names, "Loading friends scores....", false);
        }
    //});
}

var refreshHighscores = 0;
var allUsers = [];

function LoadUsers() {
    //Cache all users so that a restart is required
    if (allUsers.length === 0) {
        SideKickOnline_AllUsers();
    }
    else {
        ShowAllUsers();
    }
}

function ShowAllUsers() {
    RemoveAllChildren('allusersul');

    if (allUsers.length === 0)
        return;

    var names = [];

    for (var i = 0; i < allUsers.length; i++) {
        var name = allUsers[i];

        var userInFriendList = friendsCollection.indexOf(name) !== -1;
        var userInEnemyList = enemiesCollection.indexOf(name) !== -1;

        if (name !== clientUserName) {
            var nameBlock = '<div class="ui-block-a" style="width: 70%;"><span style="font-size:70%;white-space: normal;text-overflow: clip;">' + name.toUpperCase() + '</span></div>';

            var friendBlock = '<a id="' + name.toUpperCase() + '" onclick="SetFriendsName(this.id)" class="ui-btn ui-shadow ui-corner-all ui-icon-check ui-btn-icon-notext" style="margin:0">Friend</a>';
            if (userInFriendList) {
                friendBlock = '<a id="' + name.toUpperCase() + '" onclick="SetFriendsName(this.id)" class="ui-btn ui-shadow ui-corner-all ui-icon-check ui-btn-icon-notext" style="margin:0; background-color:green">Friend</a>';
            }

            var enemyBlock = '<a id="' + name.toUpperCase() + '" onclick="SetEnemiesName(this.id)" class="ui-btn ui-shadow ui-corner-all ui-icon-delete ui-btn-icon-notext" style="margin:0">Enemy</a>';
            if (userInEnemyList) {
                enemyBlock = '<a id="' + name.toUpperCase() + '" onclick="SetEnemiesName(this.id)" class="ui-btn ui-shadow ui-corner-all ui-icon-delete ui-btn-icon-notext" style="margin:0; background-color:red">Enemy</a>';
            }

            var friendEnemyBlock =
                '<div class="ui-block-b" style="width: 15%;">' +
                friendBlock +
                '</div>' +
                '<div class="ui-block-c" style="width: 15%;">' +
                enemyBlock +
                '</div>';

            names.push([name, '<li id="' + name.toUpperCase() + '"><div class="ui-grid-b">' + nameBlock + friendEnemyBlock + '</div></li>']);
        }
    }

    names.sort(SortById);

    var nameoutput = [];

    for (var k = 0; k < names.length; k++) {
        nameoutput.push(names[k][1]);
    }

    $('#allusers').children('ul').append(nameoutput.join('')).listview().listview('refresh');
}

function SuccessfulAllUsers() {
    //Need to turn the result into allUsers.
    if (latestXHTTP.status === 200) {
        var response = JSON.parse(latestXHTTP.responseText);
        allUsers = response;
        ShowAllUsers();
    }
    else {
        UnsuccessfulOnlineCall();
    }
}

// After Navigation
function ShowFriendsPopUp() {
    if (firstTimeFriends !== "no") {
        SetItemInStorage('firstTimeFriends', 'no');
        ShowPopup('#FirstTimeFriends');
    }
}