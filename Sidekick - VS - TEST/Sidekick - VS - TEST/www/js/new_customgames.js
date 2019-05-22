var customGames = {};

function HasCustomGames() {
    for (var customGameName in customGames) {
        if (customGames.hasOwnProperty(customGameName)) {
            return true;
        }
    }

    return false;
}

function LoadCustomGamesCollection() {
    GetItemFromStorageWithCallBack("customGames", function (value) {
        customGames = value;
        PopulateCustomGames();
        NavigateToInternalPage("#Custom");
        CheckForFirstTimeCustom();    
    });
}

function CustomGames() {   
    LoadCustomGamesCollection();    
}

function CheckForFirstTimeCustom() {
    GetItemFromStorageWithCallBack('firstTimeCustom', function (firstTime) {
        if (firstTime !== "no") {           
            SetItemInStorage('firstTimeCustom', 'no');
            ShowPopup('#FirstTimeCustom');
        }
    });
}

function AddCustomGame() {
    document.getElementById("newCustomGameName").value = '';
    document.getElementById("newCustomGameScore").value = '';
    ShowPopup("#NewCustomGame");
}

function ValidateCustomGameInput() {
    var name = document.getElementById("newCustomGameName").value;
    if (customGames.hasOwnProperty(name)) {
        document.getElementById("customGameError").innerText = 'Game already exists';
    }
    else {
        document.getElementById("customGameError").innerText = '';
    }
}

function SaveNewCustomGame() {
    var name = document.getElementById("newCustomGameName").value;
    var score = document.getElementById("newCustomGameScore").value;

    if (customGames.hasOwnProperty(name)) {        
        document.getElementById("customGameError").innerText = 'Game already exists';
        return false;
    }
    
    document.getElementById("newCustomGameName").value = '';
    document.getElementById("newCustomGameScore").value = '';
    customGames[name] = score;
    SetItemInStorage("customGames", customGames);
    PopulateCustomGames();

    return false;
}

function PopulateCustomGames() {
        
    var customgameList = document.getElementById("customgamelist");
    while (customgameList.firstChild) {
        customgameList.removeChild(customgameList.firstChild);
    }

    var customgameListUIArray = [];

    for (property in customGames) {        
        if (customGames.hasOwnProperty(property)) {
            customgameListUIArray.push('<li name="' + property + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;"><a onclick="EditCustomGame(\'' + property + '\')" style="font-size:70%;white-space: normal;text-overflow: clip;">' + property + ' - ' + customGames[property] + '</a><a onclick="DeleteCustomGame(\'' + property + '\')"></a></li>');        
        }
    }

    $('#customGameBlock').children('ul').append(customgameListUIArray.join('')).listview().listview('refresh');
}

var currentCustomGame = '';

function EditCustomGame(gameName) {
    currentCustomGame = gameName;
    document.getElementById("customGameTitle").innerText = gameName;
    document.getElementById("customGameScore").value = customGames[gameName];
    ShowPopup("#EditCustomGame");
}

function SaveCustomScore() {
    customGames[currentCustomGame] = document.getElementById("customGameScore").value;
    SetItemInStorage("customGames", customGames);
    PopulateCustomGames();
}

function DeleteCustomGame(gameName) {    
    delete customGames[gameName];

    SetItemInStorage("customGames", customGames);
    PopulateCustomGames();
}

function SendGameRequest() {
    Email("", "Arcade Sidekick - Game Request");
}