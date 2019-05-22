function SetCategoryGamesTab(name) {
    lastCategoryGamesTab = name;
}

function SetAllGamesTab(name) {
    lastAllGamesTab = name;
}

function SetCurrentTab(name) {
    currentTab = name;
    Rehighlight();
}

function Rehighlight() {

    $('#AllPlayedTab').removeClass('ui-btn-active');
    $('#AllNotPlayedTab').removeClass('ui-btn-active');
    $('#AllAllTab').removeClass('ui-btn-active');

    $('#PlayedTab').removeClass('ui-btn-active');
    $('#NotPlayedTab').removeClass('ui-btn-active');
    $('#AllTab').removeClass('ui-btn-active');

    $('#MYFRIENDS').removeClass('ui-btn-active');
    $('#ALLUSERS').removeClass('ui-btn-active');

    $('#FRIENDSSCORES').removeClass('ui-btn-active');
    $('#ALLSCORES').removeClass('ui-btn-active');
   
    if (currentTab === "AllPlayedTab" || currentTab === "PlayedTab" || currentTab === "MYFRIENDS" || currentTab === "FRIENDSSCORES") {
        $(".tabs").tabs().tabs("option", "active", 0);            
    } else if (currentTab === "AllNotPlayedTab" || currentTab === "NotPlayedTab" || currentTab === "ALLUSERS" || currentTab === "ALLSCORES") {
        $(".tabs").tabs().tabs("option", "active", 1);        
    } else if (currentTab === "AllAllTab" || currentTab === "AllTab") {
        $(".tabs").tabs().tabs("option", "active", 2);        
    }

    $('#' + currentTab).addClass('ui-btn-active');
}

function GoToCategory(category, doNotNavigate) {
    AddAllGames(category, doNotNavigate);
}

function LoadGameInfoWithoutNavigate(node)
{
    currentGameNode = node;    
    var game = gameCatalog[node.id];
    currentCategoryId = game.category;
    SetGameUI(node.id, node.innerText, game);
    LoadOnlyBannerFromLinkTo();    
}

function GoToGame(node) {
    currentGameNode = node;
    storePosition.topCoordinate = $(node).offset().top;
    PopulateInfoForGame(node.id, node.innerText);
    $('#myrecord').parent().addClass('ui-corner-bottom'); 
    $('#myrecordText').parent().addClass('ui-corner-bottom'); 
}

function SetGameUI(nameOfGame, trueName, gameData) {
    
    currentGameType = 'score';
    timeOrder = '';
    currentGameName = nameOfGame;
    parentGame = gameData.parent;
    currentGameTrueName = trueName;    
    document.getElementById('myrecord').value = '0';
    ClearNotes();
    ClearRating('10');

    if (gameData) {
        var release = gameData.release;
        var developer = gameData.developer;
        var players = gameData.players;        
        var type = gameData.type;
        var order = gameData.order;

        SetGameSection(release, 'release');
        SetGameSection(developer, 'developer');
        SetGameSection(gameData.version, 'version');

        if (players === "1") {
            SetGameSection(players + " player", 'players');
        } else {
            SetGameSection(players + " players", 'players');
        }

        if (type === "time") {
            timeOrder = order;
            currentGameType = "time";
            Hide('#myrecord');
            Show('#micro');
            Show('#seconds');
            Show('#minutes');
        } else {
            Show('#myrecord');
            $('#myrecord').parent().addClass('ui-corner-bottom');
            $('#myrecordText').parent().addClass('ui-corner-bottom'); 
            Hide('#micro');
            Hide('#seconds');
            Hide('#minutes');
        }

        var gots = currentRecord.played;
        var foundgame = 0;
        Hide('#ratings');
       
            for (var i = 0; i < gots.length; i++) {
                var game = gots[i];

                var testName = nameOfGame.replace(/'/g, "");
                testName = testName.replace(/&apos;/g, "");
                testName = testName.replace(/&amp;/g, "");
                testName = testName.replace(/&/g, "");
                testName = testName.replace(/ /g, '_').toLowerCase();
                
                if (testName === game) {
                    foundgame = 1;
                    LoadNotes();                    
                    Show('#myrecordnotes');
                    Show('#myrecordnotescontents');

                    if (type === "time") {
                        Hide('#mrdivider');
                        Show('#mrtimedivider');
                        Show('#myrecordtimecontainer');
                        Hide('#myrecordcontainer');
                    } else {
                        Show('#mrdivider');
                        Hide('#mrtimedivider');
                        Hide('#myrecordtimecontainer');
                        Show('#myrecordcontainer');
                    }
                    
                    $('#ratings').removeClass('ui-screen-hidden');  
                    LoadRating();
                    $('#postgame').removeClass('ui-screen-hidden');
                    break;
                }
            }
        
        if (foundgame === 0) {                     
            document.getElementById('myrecord').value = '0';
            document.getElementById('minutes').value = '-';
            document.getElementById('seconds').value = '-';
            document.getElementById('micro').value = '-';
            Hide('#myrecordcontainer');
            Hide('#myrecordtimecontainer');
            Hide('#myrecordnotes');
            Hide('#myrecordnotescontents');
            Hide('#mrdivider');
            Hide('#ratings');
            Hide('#postgame');
        }

        $('#GameInfo').listview().listview('refresh');

        var array = currentRecord.played;
        var index = array.indexOf(TransformedCurrentGameName());

        if (index > -1) {
            set_jqm_radio_button_off("radio-view", "notplayed");
            set_jqm_radio_button("radio-view", "played");
        } else {
            set_jqm_radio_button_off("radio-view", "played");
            set_jqm_radio_button("radio-view", "notplayed");
        }        
    }
}

function PopulateInfoForGame(nameOfGame, trueName) {
    var game = gameCatalog[nameOfGame];
    currentCategoryId = game.category;    
    SetGameUI(nameOfGame, trueName, game);    
    LoadOnlineGameInformation();    
}

function RemoveAllChildrenFromGameList() {

    RemoveAllChildren("gamelistul");
    RemoveAllChildren("gamelistplayedul");
    RemoveAllChildren("gamelistnotplayedul");
}

function CreateGameListControls(categoryName, gamesInCategory) {
    
    var output = [];
    var array = [];
    var names = [];

    for (var i = 0; i < gamesInCategory.length; i++)
    {
        var name = gamesInCategory[i].name;

        var id = name.replace(/'/g, "");
        id = id.replace(/&apos;/g, "");
        id = id.replace(/&amp;/g, "");
        id = id.replace(/&/g, "");

        var displayName = name;
        if (gamesInCategory[i].alternativeName !== '') {
            displayName = name + " / " + gamesInCategory[i].alternativeName;
        }

        if (gamesByFriend.hasOwnProperty(TransformGameName(name)) && gamesByFriend[TransformGameName(name)].length !== 0) {
            //A friend has played this game
            //user a different icon
            array.push([id, '<li data-icon="user" onclick="GoToGame(this)" id="' + id + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;"><a><span style="font-size:70%;white-space: normal;text-overflow: clip;">' + displayName + '</span></a></li>']);
        }
        else {
            array.push([id, '<li onclick="GoToGame(this)" id="' + id + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;"><a><span style="font-size:70%;white-space: normal;text-overflow: clip;">' + displayName + '</span></a></li>']);
        }

        names[id.replace(/ /g, '_').toLowerCase()] = name;

        if (gamesInCategory[i].alternativeName !== '')
        {
            var altDisplayName = gamesInCategory[i].alternativeName + " / " + name;

            var altid = gamesInCategory[i].alternativeName.replace(/'/g, "");
            altid = altid.replace(/&apos;/g, "");
            altid = altid.replace(/&amp;/g, "");
            altid = altid.replace(/&/g, "");

            //Add the game in again as its alternative name
            if (gamesByFriend.hasOwnProperty(TransformGameName(name)) && gamesByFriend[TransformGameName(name)].length !== 0) {
                //A friend has played this game
                //user a different icon
                array.push([altid, '<li data-icon="user" onclick="GoToGame(this)" id="' + id + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;"><a><span style="font-size:70%;white-space: normal;text-overflow: clip;">' + altDisplayName + '</span></a></li>']);
            }
            else {
                array.push([altid, '<li onclick="GoToGame(this)" id="' + id + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;"><a><span style="font-size:70%;white-space: normal;text-overflow: clip;">' + altDisplayName + '</span></a></li>']);
            }

            names[altid.replace(/ /g, '_').toLowerCase()] = name;
        }
    };

    array.sort(SortById);

    for (var j = 0; j < array.length; j++) {
        output.push(array[j][1]);
    }

    controlCache.push([categoryName, output]);
    gameCache[categoryName] = names;
    $('#gamelist').children('ul').append(output.join('')).listview().listview('refresh');
}

function PopulateListOfGamesForCategory(categoryName) {
    var gamesInCategory = ReturnCorrectData(categoryName);
    RemoveAllChildrenFromGameList();

    if (controlCache.length === 0) {
        CreateGameListControls(categoryName, gamesInCategory);
    } else {
        var found = 0;

        for (var i = 0; i < controlCache.length; i++) {
            if (controlCache[i][0] === categoryName) {
                $('#gamelist').children('ul').append(controlCache[i][1].join('')).listview().listview('refresh');
                found = 1;
                break;
            }
        }

        if (found === 0) {
            CreateGameListControls(categoryName, gamesInCategory);
        }
    }
}

function DisplayEveryGame() {

    RemoveAllChildren("allGamesul");
    RemoveAllChildren("allgamelistnotplayedul");
    RemoveAllChildren("allgamelistplayedul");

    var output = [];
    var outputPlayed = [];
    var outputNot = [];
    var array = [];
    var arrayPlayed = [];
    var arrayNot = [];

    var allGames = gameCatalog;

    for (var game in gameCatalog)
    {
        if (gameCatalog.hasOwnProperty(game))
        {
            var name = gameCatalog[game].name;
            
            var id = name.replace("'", "");
            id = id.replace("&apos;", "");
            id = id.replace("&amp;", "");
            id = id.replace("&", "");

            var valueToPush = '';

            var displayName = name;
            if (gameCatalog[game].alternativeName !== '') {
                displayName = name + " / " + gameCatalog[game].alternativeName;
            }

            if (gamesByFriend.hasOwnProperty(TransformGameName(name))) {
                //valueToPush = '<li data-icon="user" onclick="GoToGameFromAll(this,\'' + categoryName + '\',\'' + id + '\',\'' + name + '\')" id="' + id + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;"><a><span style="font-size:70%;white-space: normal;text-overflow: clip;">' + name + '</span></a></li>';
                valueToPush = '<li data-icon="user" onclick="GoToGame(this)" id="' + id + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;"><a><span style="font-size:70%;white-space: normal;text-overflow: clip;">' + displayName + '</span></a></li>';
            }
            else {
                //valueToPush = '<li onclick="GoToGameFromAll(this,\'' + categoryName + '\',\'' + id + '\',\'' + name + '\')" id="' + id + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;"><a><span style="font-size:70%;white-space: normal;text-overflow: clip;">' + name + '</span></a></li>';
                valueToPush = '<li onclick="GoToGame(this)" id="' + id + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;"><a><span style="font-size:70%;white-space: normal;text-overflow: clip;">' + displayName + '</span></a></li>';
            }

            array.push([id, valueToPush]);

            if ($.inArray(id.replace(/ /g, '_').toLowerCase(), currentRecord.played) !== -1) {
                arrayPlayed.push([id, valueToPush]);
            } else {
                arrayNot.push([id, valueToPush]);
            }

            if (!gameCache[gameCatalog[game].category]) {
                gameCache[gameCatalog[game].category] = [];                
            }
            gameCache[gameCatalog[game].category][id.replace(/ /g, '_').toLowerCase()] = name;
        }
    }

    array.sort(SortById);
    arrayPlayed.sort(SortById);
    arrayNot.sort(SortById);

    for (var j = 0; j < array.length; j++) {
        output.push(array[j][1]);
    }
    for (var k = 0; k < arrayPlayed.length; k++) {
        outputPlayed.push(arrayPlayed[k][1]);
    }
    for (var l = 0; l < arrayNot.length; l++) {
        outputNot.push(arrayNot[l][1]);
    }

    $('#allGames').children('ul').append(output.join('')).listview().listview('refresh');
    $('#allgamelistplayed').children('ul').append(outputPlayed.join('')).listview().listview('refresh');
    $('#allgamelistnotplayed').children('ul').append(outputNot.join('')).listview().listview('refresh');

    NavigateToInternalPage("#Everything");
}

function PopulateListOfGamesIHavePlayed() {

    RemoveAllChildren("gamelistplayedul");

    var gots = currentRecord.played;
    var ratings = currentRecord.ratings;

    var output = [];
    var array = [];
    var orderedRatings = [];
    var game = 0;
    var rating = '0';

    for (var i = 0; i < ratings.length; i++) {

        game = ratings[i].id;
        if (gameCache[currentCategoryId] !== null) {
            if (gameCache[currentCategoryId].hasOwnProperty(game)) {
                rating = ratings[i].rating;
                orderedRatings.push([game, rating]);
            }
        }
    }

    orderedRatings.sort(SortById);

    for (var j = 0; j < gots.length; j++) {
        game = gots[j];

        if (gameCache[currentCategoryId] !== null) {
            if (gameCache[currentCategoryId].hasOwnProperty(game)) {
                rating = '0';

                for (var k = 0; k < orderedRatings.length; k++) {
                    if (orderedRatings[k][0] === game) {
                        rating = orderedRatings[k][1];
                        break;
                    }
                }

                if (rating === '0') {
                    rating = '';
                }

                var gameName = gameCache[currentCategoryId][game];
                var imageName = 'img/star' + rating + '.png';
                var id = game;

                var displayName = gameName;
                               
                if (gameCatalog[gameName].alternativeName !== '') {
                    displayName = gameName + " / " + gameCatalog[gameName].alternativeName;
                    var altDisplayName = gameCatalog[gameName].alternativeName + " / " + gameName;
                    var altid = gameCatalog[gameName].alternativeName.replace(/'/g, "");
                    altid = altid.replace(/&apos;/g, "");
                    altid = altid.replace(/&amp;/g, "");
                    altid = altid.replace(/&/g, "");
                    array.push([altid, '<li onclick="GoToGame(this)" id="' + gameName + '" class="ui-li ui-btn-up-c"><a><img id="' + id + 'rating" src="' + imageName + '" class="ui-li-icon ui-corner-none ui-li-thumb"><span class"link" style="font-size:70%;white-space: normal;text-overflow: clip;">' + altDisplayName + '</span></a></li>']);
                }

                array.push([id, '<li onclick="GoToGame(this)" id="' + gameName + '" class="ui-li ui-btn-up-c"><a><img id="' + id + 'rating" src="' + imageName + '" class="ui-li-icon ui-corner-none ui-li-thumb"><span class"link" style="font-size:70%;white-space: normal;text-overflow: clip;">' + displayName + '</span></a></li>']);
            }
        }
    }

    array.sort(SortById);

    for (var l = 0; l < array.length; l++) {
        output.push(array[l][1]);
    }

    $('#gamelistplayed').children('ul').append(output.join('')).listview().listview('refresh');
}

function PopulateListOfGamesIHaveNotPlayed() {
    var gamesInCategory = ReturnCorrectData(currentCategoryId);
    RemoveAllChildren("gamelistnotplayedul");

    var output = [];
    var array = [];

    var gots = currentRecord.played;

    for (var i = 0; i < gamesInCategory.length; i++)
    {    
        var game = gamesInCategory[i].name;
        var gameid = game.replace(/'/g, "");
        gameid = gameid.replace(/&apos;/g, "");
        gameid = gameid.replace(/&amp;/g, "");
        gameid = gameid.replace(/&/g, "");
        gameid = gameid.replace(/ /g, '_').toLowerCase();

        var haveWeGotTheGame = 0;

        for (var k = 0; k < gots.length; k++) {
            var gotgame = gots[k];

            if (gotgame === gameid) {
                haveWeGotTheGame = 1;
                break;
            }
        }

        if (haveWeGotTheGame === 0) {
            var id = game.replace("'", "");
            id = id.replace("&apos;", "");
            id = id.replace("&amp;", "");
            id = id.replace("&", "");

            var displayName = game;

            if (gameCatalog[game].alternativeName !== '') {
                displayName = game + " / " + gameCatalog[game].alternativeName;
                var altDisplayName = gamesInCategory[i].alternativeName + " / " + game;
                var altid = gamesInCategory[i].alternativeName.replace(/'/g, "");
                altid = altid.replace(/&apos;/g, "");
                altid = altid.replace(/&amp;/g, "");
                altid = altid.replace(/&/g, "");
                array.push([altid, '<li onclick="GoToGame(this)" id="' + id + '" class="ui-li ui-btn-up-c"><a><span style="font-size:70%;white-space: normal;text-overflow: clip;">' + altDisplayName + '</span></a></li>']);
            }

            array.push([id, '<li onclick="GoToGame(this)" id="' + id + '" class="ui-li ui-btn-up-c"><a><span style="font-size:70%;white-space: normal;text-overflow: clip;">' + displayName + '</span></a></li>']);
        }
    };

    array.sort(SortById);

    for (var j = 0; j < array.length; j++) {
        output.push(array[j][1]);
    }

    $('#gamelistnotplayed').children('ul').append(output.join('')).listview().listview('refresh');
}

function AddGamesControls(name, id, doNotNavigate) {
    currentCategoryName = name;
    currentCategoryId = id;

    GetItemFromStorageWithCallBack("my_record", function (value) {
        currentRecord = value;

        document.getElementById('GameCollection').innerText = name;
        PopulateListOfGamesForCategory(id);
        PopulateListOfGamesIHavePlayed();
        PopulateListOfGamesIHaveNotPlayed();

        SetCategoryGamesTab("AllTab");
        SetCurrentTab("AllTab");

        if (doNotNavigate !== 1) {
            NavigateToInternalPage("#Category");
        }
        $.mobile.loading('hide');

        return;
    });
}

function AddAllGames(category, doNotNavigate) {

    $.mobile.loading('show', {
        theme: themeLetter,
        text: "Loading...",
        textVisible: "true"
    });
    currentCategoryId = category.id;
    var name = categoryDisplayNameList[$.inArray(currentCategoryId, categoryList)];

    GetItemFromStorageWithCallBack("my_record", function (value) {
        currentRecord = value;
        if (currentRecord === null || currentRecord === "[]") {
            var category = new Record();
            SetItemInStorageWithCallBack("my_record", category, function (result) {
                AddGamesControls(name, currentCategoryId, doNotNavigate);
            });
        } else {
            AddGamesControls(name, currentCategoryId, doNotNavigate);
        }
    });
}

function AddToPlayed() {
    var playedArray = currentRecord.played;
    playedArray.push(TransformedCurrentGameName());
    playedArray.sort();
    
    //Need to add the score and ratings here
    var scoreArray = currentRecord.scores;
    var x = new Scores();
    x.id = TransformedCurrentGameName();
    x.score = '0';
    scoreArray.push(x);

    var ratingsArray = currentRecord.ratings;
    var y = new Ratings();
    y.id = TransformedCurrentGameName();
    y.rating = '0';
    ratingsArray.push(y);

    currentRecord.played = playedArray;
    currentRecord.scores = scoreArray;
    currentRecord.ratings = ratingsArray;

    SetItemInStorageWithCallBack("my_record", currentRecord, UpdatePlayed);
}

function GameIndex(array, game)
{
    for (var i = 0; i < array.length; i++) {
        var gameid = array[i].id;

        if (gameid === TransformedCurrentGameName()) {
            return i;            
        }
    }

    return -1;
}

function RemoveFromPlayed() {
    var played = currentRecord.played;
    var ratings = currentRecord.ratings;
    var scores = currentRecord.scores;

    var playedIndex = played.indexOf(TransformedCurrentGameName());    
    var ratingIndex = GameIndex(ratings, TransformedCurrentGameName());
    var scoreIndex = GameIndex(scores, TransformedCurrentGameName());

    if (playedIndex > -1) {
        played.splice(playedIndex, 1);        
    }

    if (ratingIndex > -1) {
        ratings.splice(ratingIndex, 1);
    }

    if (scoreIndex > -1) {
        scores.splice(scoreIndex, 1);
    }

    currentRecord.played = played;
    currentRecord.ratings = ratings;
    currentRecord.scores = scores;

    SetItemInStorage("my_record", currentRecord);
}

function UpdatePlayed() {
    var scoreElement = document.getElementById('myrecord');
    $('#myrecord').parent().addClass('ui-corner-bottom');      
    $('#myrecordText').parent().addClass('ui-corner-bottom'); 
    $('#GameInfo').listview('refresh');
    $('#ScoreInfo').listview('refresh');
    $('#ScoreInfoTime').listview('refresh');
    $('#NoteInfo').listview('refresh');
    PopulateListOfGamesIHavePlayed();
    PopulateListOfGamesIHaveNotPlayed();    
}

function SuccessfulAddPlayed() {    
    AddToPlayed();

    if (currentGameType === "time") {
        Show('#myrecordtimecontainer');
    } else {
        Show('#myrecordcontainer');
    }

    Show('#myrecordnotes');   
    Show('#myrecordnotescontents');
    Show('#myrecord');
    Show('#mrdivider');
    OnSuccessfulLoadOfGame();    
    Show('#ratings');
    Show('#postgame');
    UpdatePlayed();
}

function SuccessfulRemovePlayed() {    
    RemoveFromPlayed();
    PopulateListOfGamesIHavePlayed();
    PopulateListOfGamesIHaveNotPlayed();

    Hide('#myrecordcontainer');
    Hide('#myrecordtimecontainer');
    Hide('#myrecord');
    Hide('#mrdivider');
    Hide('#myrecordnotes');  
    Hide('#myrecordnotescontents');
    Hide('#ratings');
    Hide('#postgame');
    UpdatePlayed();
}

function CompleteChangeGameStatus() {
    StandardCompleteACOnline();
}

function UnsuccessfulChangeGameStatus() {
    ShowPopup('#UnknownErrorGameSave');
}

function ChangeGameStatus() {
    var choice;

    $("input[id*=gndw-]:checked").each(function () {
        choice = $(this).val();
    });

    if (choice === "played" && $.inArray(TransformedCurrentGameName(), currentRecord.played) === -1) {        
        SuccessfulAddPlayed();                    
    }

    if (choice === "notplayed") {  
        ShowPopup('#RemoveGame');
    }
}

function UndoRemovePlayed()
{
    set_jqm_radio_button_off("radio-view", "notplayed");
    set_jqm_radio_button("radio-view", "played");    
}