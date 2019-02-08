var friends = 0;
var friendsHistory = 0;

var friendsGames = [];

function SetupFriends() {
    ClearFriends();
    LoadFriends();        
    NavigateToInternalPage("#ManageFriends");
    //Check for first time friends
    GetItemFromStorageWithCallBack('firstTimeFriends', function (value) {
        if (value !== "no") {           
            SetItemInStorage('firstTimeFriends', 'no');                        
            ShowPopup('#FirstTimeFriends');
        } 
    });
}

function ClearFriends() {
    friends = 0;
    friendsHistory = 0;
    RemoveAllChildren("friendsList");
}

function SetFriendsName(username) {
    
    if (username !== null || username !== '') {
        username = username.toUpperCase();
        
        SideKickOnline_FindFriend(username, 'Adding friend');
    }
}

function AddNewFriend()
{
    document.getElementById("newfriend").value = '';
    ShowPopup("#AddFriend");
}

function AddExistingFriend(name) {
    friends++;
    friendsHistory++;
    var content =
        "<div id='divfriend" + friendsHistory + "'>" +
        "<div id='collapse" + friendsHistory + "' data-role='collapsible' data-collapsed='true'><h5 id='hfriend" + friendsHistory + "'>" + name + "</h5><input id='friend" + friendsHistory + "' name='friendName' title='3-15 characters A-Z 0-9 only' pattern='[A-Za-z0-9]{3,15}' type='text' value='" + name + "' style='text-transform:uppercase'/>" +        
        "<div class='ui-grid-a'>" +
        "<div class='ui-block-a' style='width:50%'>" +
        "<ul data-role='listview' data-inset='true' class='ui-listview ui-listview-inset ui-corner-all ui-shadow'>" +
        "<li onclick='DeleteFriend(this.id)' id='deleteFriend" + friendsHistory + "' style='white-space: normal;text-overflow: clip;' class='ui-li ui-li-static ui-btn-up-c'>" +
        "<span style='font-size:70%;white-space: normal;text-overflow: clip' ;>Remove</span>" +
        "</li>" +
        "</ul>" +
        "</div>" +
        "<div class='ui-block-b' style='width:50%'>" +
        "<ul data-role='listview' data-inset='true' class='ui-listview ui-listview-inset ui-corner-all ui-shadow'>" +
        "<li onclick='FriendGames(this.id)' id='friendGames" + friendsHistory + "' style='white-space: normal;text-overflow: clip;' class='ui-li ui-li-static ui-btn-up-c'>" +
        "<span style='font-size:70%;white-space: normal;text-overflow: clip' ;>Games</span>" +
        "</li>" +
        "</ul>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";

    $(content).appendTo("#friendsList").enhanceWithin();
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
        if (latestXHTTP.responseText === '' || latestXHTTP.responseText === '[]') {
            FriendDoesNotExist();
        }
        else {
            friendsCollection.push(username);
            DrawFriendsUI();
            SaveFriends();    
            AddGamesToFriend(username);
        }
    }
    else {
        UnsuccessfulOnlineCall();
    }
}

//Used to add all the games for all the friends received
function AddGamesToFriends()
{
    var response = JSON.parse(latestXHTTP.responseText);
    for (var i = 0; i < response.Users.length; i++)
    {
        friendsGames[response.Users[i].Username] = response.Users[i].Games;
    }
}

function AddGamesToFriend(username)
{
    var response = JSON.parse(latestXHTTP.responseText);
    friendsGames[username] = response.Users[0].Games;
}

function AddFriend() {
    var newfriend = document.getElementById("newfriend").value;    
    SetFriendsName(newfriend);
}

function DeleteFriend(id) {
    var newId = id.replace('deleteFriend', 'friend');
    var container = document.getElementById("div" + newId);
    container.parentNode.removeChild(container);    
    SaveFriends();
}

function FriendGames(id) {
    var message = 'Getting games';
    var newId = id.replace('friendGames', 'friend');
    var name = document.getElementById(newId).value;

    if (friendsGames.hasOwnProperty(name)) {
        DrawFriendsGamesAndScores(friendsGames[name]);
        document.getElementById("friendGamesTitle").innerText = name;
        NavigateToInternalPage('#FriendsGames');       
    }
    else {
        //We have not yet got this friends scores so we need to get them
        SideKickOnline_GetFriendScores(name, message);
    }
}

function DrawFriendsGamesAndScores(games)
{
    RemoveAllChildren("allfriendgameblocklocal");
    RemoveAllChildren("allfriendscoresblocklocal");

    var nameArray = [];
    var scoreArray = [];
    var names = [];    

    for (var i = 0; i < games.length; i++) {  
        var game = games[i];
        for (var property in game) {
            if (game.hasOwnProperty(property)) {
                var gameName = property.replace(/_/g, ' ');

                var score = game[property];

                if (timed.indexOf(property) !== -1) {
                    score = MillisecondsToMinutesSecondsMilliseconds(parseInt(score));
                }
                else {
                    score = addComma(score.toString());
                }

                nameArray.push('<li name="friend' + property + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;font-size:70%;">' + gameName + '</li>');       
                scoreArray.push('<li name="friend' + property + '" class="ui-li ui-btn-up-c score" style="white-space: normal;text-overflow: clip;font-size:70%;text-align: right !important">' + score + '</li>');       
                names.push("friend" + property);
            }
        }        
    }

    $('#friendgameblocklocal').children('ul').append(nameArray.sort().join('')).listview().listview('refresh');
    $('#friendscoreblocklocal').children('ul').append(scoreArray.sort().join('')).listview().listview('refresh');

    AlterFriendScoreHeights(names);
}

//function SuccessFriendGames(name) {
//    //call to find the games that friend has played    
//    var title = document.getElementById("friendGamesTitle");
//    title.innerText = name;

//    var array = [];
//    var output = [];

//    if (latestXHTTP.status === 200) {
//        if (latestXHTTP.responseText === '' || latestXHTTP.responseText === '[]') {
//            document.getElementById("friendNoGame").innerText = name[1];
//            ShowPopup('#FriendsGamesNoGames');
//            return;
//        }

//        RemoveAllChildren('friendGameListUL');

//        var response = JSON.parse(latestXHTTP.responseText);

//        for (var i = 0; i < response.length; i++) {
//            var obj = response[i];
//            var gameName = obj.gameName.replace(/_/g, ' ');

//            array.push([gameName, '<li class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;"><span style="font-size:70%;white-space: normal;text-overflow: clip;">' + gameName + '</span></li>']);
//        }

//        array.sort(SortById);

//        for (var j = 0; j < array.length; j++) {
//            output.push(array[j][1]);
//        }

//        $('#friendGameList').children('ul').append(output.join('')).listview().listview('refresh');
//        NavigateToInternalPage('#FriendsGames');        
//    }
//    else {
//        UnsuccessfulOnlineCall();
//    }
//}

function LoadFriendsCollection() {
    GetItemFromStorageWithCallBack('friends', function (value) {
        friendsCollection = value;
    });
}

function LoadFriends() {
    GetItemFromStorageWithCallBack('friends', function (value) {        
        friendsCollection = value;
        if (friendsCollection === null || friendsCollection.length === 0) {
            //We have no friends to show
        }
        else {
            DrawFriendsUI();
        }
    });
}

function DrawFriendsUI()
{
    ClearFriends();
    for (var i = 0; i < friendsCollection.length; i++) {
        if (friendsCollection[i] !== clientUserName) {
            AddExistingFriend(friendsCollection[i]);
        }
    }
}

var refreshHighscores = 0;
var myfriends = [];

function SaveFriends() {
    var friendsArray = [];
    if (clientUserName !== '') {
        friendsArray.push(clientUserName);
    }

    for (var i = 1; i <= friendsHistory; i++) {
        var nameElement = document.getElementById("friend" + i);
        if (nameElement) {
            friendsArray.push(nameElement.value.toUpperCase());
        }
    }

    SetItemInStorage('friends', friendsArray);
    myfriends = friendsArray;
    friendsScores = [];

    //If we have game high scores in our history then we need to refresh
    //our highscores as we have navigated to friends from the game high scores
    var highscores = pageHistory.indexOf("#GameHighScores");
    if (highscores !== -1) {
        refreshHighscores = 1;
    }
}