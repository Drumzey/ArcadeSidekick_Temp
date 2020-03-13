var customGames = {};
var firstTimeCustom = '';

function HasCustomGames() {

    if (customGames.length > 0) {
        return true;
    }

    return false;
}

function CustomGames() {
    GetItemFromStorageWithCallBack("customGames", function (value) {
        customGames = value;
        PopulateCustomGames();
        NavigateToInternalPage("#Custom");
        CheckForFirstTimeCustom();
    });
}

function CheckForFirstTimeCustom() {

    if (firstTimeCustom !== "no") {
        SetItemInStorage('firstTimeCustom', 'no');
        ShowPopup('#FirstTimeCustom');
    }
}

function AddCustomGame() {
    document.getElementById("newCustomGameName").value = '';
    ShowPopup("#NewCustomGame");
}

function ValidateCustomGameInput() {
    var name = document.getElementById("newCustomGameName").value;

    for (var i = 0; i < customGames.length; i++) {
        if (customGames[i][0] === name) {
            document.getElementById("customGameError").innerText = 'Game already exists';
            return;
        }
    }

    document.getElementById("customGameError").innerText = '';
}

function SaveNewCustomGame() {
    var name = document.getElementById("newCustomGameName").value;

    if (name === "" || name === null) {
        document.getElementById("customGameError").innerText = 'Enter a game name';
        return false;
    }

    for (var i = 0; i < customGames.length; i++) {
        if (customGames[i][0] === name) {
            document.getElementById("customGameError").innerText = 'Game already exists';
            return false;
        }
    }

    document.getElementById("newCustomGameName").value = '';

    customGames.push([name, 0]);
    SetItemInStorage("customGames", customGames);
    PopulateCustomGames();

    return false;
}

//Functions for popup from game screen
function SaveCustomGameFromGameScreen() {
    var name = document.getElementById("newCustomGameName2").value;

    if (name === "" || name === null) {
        document.getElementById("customGameError2").innerText = 'Enter a game name';
        return false;
    }

    for (var i = 0; i < customGames.length; i++) {
        if (customGames[i][0] === name) {
            document.getElementById("customGameError2").innerText = 'Game already exists';
            return false;
        }
    }

    document.getElementById("newCustomGameName2").value = '';

    customGames.push([name, 0]);
    SetItemInStorage("customGames", customGames);
}

function ValidateCustomGameInput2() {
    var name = document.getElementById("newCustomGameName2").value;

    for (var i = 0; i < customGames.length; i++) {
        if (customGames[i][0] === name) {
            document.getElementById("customGameError2").innerText = 'Game already exists';
            return;
        }
    }

    document.getElementById("customGameError2").innerText = '';
}

//************************************************

function PopulateCustomGames() {

    var customgameList = document.getElementById("customgamelist");
    while (customgameList.firstChild) {
        customgameList.removeChild(customgameList.firstChild);
    }

    var customgameListUIArray = [];

    for (var i = 0; i < customGames.length; i++) {
        customgameListUIArray.push([customGames[i][0], '<li name="' + customGames[i][0] + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;"><a onclick="EditCustomGame(\'' + customGames[i][0] + '\')" style="font-size:70%;white-space: normal;text-overflow: clip;">' + customGames[i][0] + ' - ' + customGames[i][1] + '</a><a onclick="DeleteCustomGame(\'' + customGames[i][0] + '\')"></a></li>']);
    }

    customgameListUIArray.sort(SortById);

    var customgameListUIArrayOutput = [];

    for (var j = 0; j < customgameListUIArray.length; j++) {
        customgameListUIArrayOutput.push(customgameListUIArray[j][1]);
    }

    $('#customGameBlock').children('ul').append(customgameListUIArrayOutput.join('')).listview().listview('refresh');
}

var currentCustomGame = '';

function EditCustomGame(gameName) {
    currentCustomGame = gameName;
    document.getElementById("customGameTitle").innerText = gameName;
    document.getElementById("customGameScore").value = customGames[gameName];
    ShowPopup("#EditCustomGame");
}

function SaveCustomScore() {
    for (var i = 0; i < customGames.length; i++) {
        if (customGames[i][0] === currentCustomGame) {
            customGames[i][1] = document.getElementById("customGameScore").value;
            break;
        }
    }

    SetItemInStorage("customGames", customGames);
    PopulateCustomGames();
}

function DeleteCustomGame(gameName) {

    var index = -1;

    for (var i = 0; i < customGames.length; i++) {
        if (customGames[i][0] === gameName) {
            index = i;
        }
    }

    if (index !== -1) {
        delete customGames.splice(index, 1);

        SetItemInStorage("customGames", customGames);
        PopulateCustomGames();
    }
}

function SendGameRequest() {
    var customGameList = "";
    customGameList = GetCustomGames();
    Email(customGameList, "Arcade Sidekick - Game Request");
}

function GetCustomGames() {
    var body = "Hi, my current list of custom games is as follows\n\n";
    for (var i = 0; i < customGames.length; i++) {
        body += customGames[i][0] + "\n";
    }

    body += "\nPlease can you add them to a future update?";

    return body;
}