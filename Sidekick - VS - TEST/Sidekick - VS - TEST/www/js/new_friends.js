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

        if (friendsCollection.indexOf(username) === -1) {            
            SideKickOnline_FindFriend(username, 'Adding friend');
        }
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
        "<div id='collapse" + friendsHistory + "' data-role='collapsible' data-collapsed='true'><h5 name='" + name + "' id='hfriend" + friendsHistory + "'>" + name + "</h5>" +        
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
        var response = JSON.parse(latestXHTTP.responseText);
        if (response.Users.length === 0) {
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
    if (response.Users[0]) {
        friendsGames[username] = response.Users[0].Games;
    }
    else
    {
        friendsGames[username] = [];
    }
}

function AddFriend() {
    var newfriend = document.getElementById("newfriend").value;    
    SetFriendsName(newfriend);
}

function DeleteFriend(id) {
    var newId = id.replace('deleteFriend', 'hfriend');
    var friendName = document.getElementById(newId).getAttribute('name');    

    var container = document.getElementById("div" + newId);
    container.parentNode.removeChild(container);   
    //
    var index = friendsCollection.indexOf(friendName);
    friendsCollection.splice(index, 1);
    delete friendsGames[friendName];
    SaveFriends();
}

function FriendGames(id) {
    var message = 'Getting games';
    var newId = id.replace('friendGames', 'hfriend');
    var name = document.getElementById(newId).getAttribute('name');
    document.getElementById("friendGamesTitle").innerText = name;

    if (friendsGames.hasOwnProperty(name)) {
        var names = DrawFriendsGamesAndScores(friendsGames[name]);                
        NavigateToInternalPage('#FriendsGames');       
        AlterFriendScoreHeights(names);
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

    GetTimedGames();

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

            nameArray.push([property,'<li name="friend' + property + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;font-size:70%;">' + gameName + '</li>']);       
            scoreArray.push([property,'<li name="friend' + property + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;font-size:70%;text-align: right !important">' + score + '</li>']);       
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

    $('#friendgameblocklocal').children('ul').append(nameoutput.join('')).listview().listview('refresh');
    $('#friendscoreblocklocal').children('ul').append(scoreoutput.join('')).listview().listview('refresh');

    return names;
}

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
        var nameElement = document.getElementById("hfriend" + i);
        if (nameElement) {
            friendsArray.push(nameElement.getAttribute("name").toUpperCase());
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