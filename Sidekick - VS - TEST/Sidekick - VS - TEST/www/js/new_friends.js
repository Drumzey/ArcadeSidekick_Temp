var friends = 0;
var friendsHistory = 0;

var friendsGames = [];
var gamesByFriend = [];

function SetupFriends() {
    ClearFriends();
    LoadFriends();
    SetCurrentTab("MYFRIENDS");    
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
            try {
                SideKickOnline_FindFriend(username, 'Adding friend');
            }
            catch (err)
            {
                alert(err.message);
            }
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
        "<li onclick='FriendGames(this.id)' id='friendGames" + friendsHistory + "' style='white-space: normal;text-overflow: clip;' class='ui-li ui-li-static ui-btn-up-c'>" +
        "<span style='font-size:70%;white-space: normal;text-overflow: clip' ;>Games</span>" +
        "</li>" +
        "</ul>" +
        "</div>" +
        "<div class='ui-block-b' style='width:50%'>" +
        "<ul data-role='listview' data-inset='true' class='ui-listview ui-listview-inset ui-corner-all ui-shadow'>" +
        "<li onclick='DeleteFriend(this.id)' id='deleteFriend" + friendsHistory + "' style='white-space: normal;text-overflow: clip;' class='ui-li ui-li-static ui-btn-up-c'>" +
        "<span style='font-size:70%;white-space: normal;text-overflow: clip' ;>Remove</span>" +
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
            ShowAllUsers();
        }
    }
    else {
        UnsuccessfulOnlineCall();
    }
}

//Used to add all the games for all the friends received
function AddGamesToFriends()
{
    controlCache = [];

    var response = JSON.parse(latestXHTTP.responseText);
    for (var i = 0; i < response.Users.length; i++)
    {
        friendsGames[response.Users[i].Username] = response.Users[i].Games;

        for (var game in response.Users[i].Games) {
            if (response.Users[i].Games.hasOwnProperty(game)) {

                if (gamesByFriend.hasOwnProperty(game)) {
                    gamesByFriend[game].push(response.Users[i].Username);
                }
                else {
                    gamesByFriend[game] = [];
                    gamesByFriend[game].push(response.Users[i].Username);
                }
            }
        }
    }
}

function AddGamesToFriend(username)
{
    var filteredGames = [];
    var response = JSON.parse(latestXHTTP.responseText);
    if (response.Users[0]) {

        var games = response.Users[0].Games;        

        for (var prop in games)
        {
            if (games.hasOwnProperty(prop))
            {
                //filter out the zero games
                if (games[prop] !== 0 && games[prop] !== "0")
                {
                    filteredGames[prop] = games[prop];
                }
            }
        }

        friendsGames[username] = filteredGames;
    }
    else
    {
        friendsGames[username] = [];
    }

    for (var game in filteredGames)
    {
        if (filteredGames.hasOwnProperty(game))
        {
            if (gamesByFriend.hasOwnProperty(game)) {
                gamesByFriend[game].push(username);
            }
            else
            {
                gamesByFriend[game] = [];
                gamesByFriend[game].push(username);
            }
        }
    }
}

function AddFriend() {
    var newfriend = document.getElementById("newfriend").value;        
    SetFriendsName(newfriend);    
}

function DeleteFriend(id) {
    var newId = id.replace('deleteFriend', 'hfriend');
    var friendName = document.getElementById(newId).getAttribute('name');    

    var divfriend = id.replace('deleteFriend', 'friend');
    var container = document.getElementById("div" + divfriend);
    container.parentNode.removeChild(container);   
    
    var index = friendsCollection.indexOf(friendName);
    friendsCollection.splice(index, 1);
    delete friendsGames[friendName];
    SaveFriends();     //Clears the control cachec so it will be drawn again.

    //Need to remove the games related to that friend from the gamesByFriend Colelction
    for (var game in gamesByFriend)
    {
        if (gamesByFriend.hasOwnProperty(game)) {
            var findex = gamesByFriend[game].indexOf(friendName);            
            if (findex !== -1)
            {
                gamesByFriend[game].splice(findex, 1);
            }
        }
    }
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

    if (nameArray.length === 0)
    {
        Show("#FriendsNoGames");
    }
    else
    {
        Hide("#FriendsNoGames");
    }

    $('#friendgameblocklocal').children('ul').append(nameoutput.join('')).listview().listview('refresh');
    $('#friendscoreblocklocal').children('ul').append(scoreoutput.join('')).listview().listview('refresh');

    return names;
}

function LoadFriendsCollection() {
    GetItemFromStorageWithCallBack('friends', function (value) {
        friendsCollection = value;
        var friendsArray = [];        

        if (friendsCollection.length > 0)
        {
            if (friendsCollection[i] !== clientUserName) {
                friendsArray.push(friendsCollection[i]);
            }
            var names = friendsArray.join(",");
            SideKickOnline_GetFriendsScores(names, "Loading friends scores....", false);
        }
    });
}

function LoadFriends() {
    if (friendsCollection === null || friendsCollection.length === 0)
    {
        //
    }
    else {
        DrawFriendsUI();
    }    
}

function DrawFriendsUI()
{
    ClearFriends();
    var array = friendsCollection.sort();
    for (var i = 0; i < array.length; i++) {
        if (array[i] !== clientUserName) {
            AddExistingFriend(array[i]);
        }
    }
}

var refreshHighscores = 0;

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

var allUsers = [];

function LoadUsers()
{
    if (allUsers.length === 0)
    {
        SideKickOnline_AllUsers();
    }
    else
    {
        ShowAllUsers();
    }    
}

function ShowAllUsers()
{
    RemoveAllChildren('allusersul');

    if (allUsers.length === 0)
        return;

    var names = [];

    for (var i = 0; i < allUsers.length; i++)
    {
        var name = allUsers[i];
        if (friendsCollection.indexOf(name) === -1 && name !== clientUserName)
        {
            //This user is not in our friendscollection and isnt us so add it to our list
            names.push([name,'<li onclick="SetFriendsName(this.id);" id="' + name.toUpperCase() + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;"><a><span style="font-size:70%;white-space: normal;text-overflow: clip;">' + name + '</span></a></li>']);
        }
    }

    names.sort(SortById);

    var nameoutput = [];
    
    for (var k = 0; k < names.length; k++) {
        nameoutput.push(names[k][1]);        
    }

    $('#allusers').children('ul').append(nameoutput.join('')).listview().listview('refresh');
}

function SuccessfulAllUsers()
{
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