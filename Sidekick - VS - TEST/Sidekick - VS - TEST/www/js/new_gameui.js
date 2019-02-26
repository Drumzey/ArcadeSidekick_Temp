function SetCurrentTab(name) {
    currentTab = name;
}

function Rehighlight() {

    $('#AllPlayedTab').removeClass('ui-btn-active');
    $('#AllNotPlayedTab').removeClass('ui-btn-active');
    $('#AllAllTab').removeClass('ui-btn-active');

    $('#PlayedTab').removeClass('ui-btn-active');
    $('#NotPlayedTab').removeClass('ui-btn-active');
    $('#AllTab').removeClass('ui-btn-active');

    if (currentTab === "AllPlayedTab" || currentTab === "PlayedTab") {
        $(".tabs").tabs().tabs("option", "active", 0);        
    } else if (currentTab === "AllNotPlayedTab" || currentTab === "NotPlayedTab") {
        $(".tabs").tabs().tabs("option", "active", 1);        
    } else if (currentTab === "AllAllTab" || currentTab === "AllTab") {
        $(".tabs").tabs().tabs("option", "active", 2);        
    }

    $('#' + currentTab).addClass('ui-btn-active');
}

function GoToCategory(category, doNotNavigate) {
    AddAllGames(category, doNotNavigate);
}

function GoToGame(node) {
    currentGameNode = node;
    storePosition.topCoordinate = $(node).offset().top;
    PopulateInfoForGame(node.id, node.innerText);
}

function GoToGameFromAll(node, category, gameId, gameName) {
    currentCategoryId = category;
    ReturnCorrectData(currentCategoryId);
    data = $($.parseXML(data));

    GetItemFromStorageWithCallBack("my_record", function (value) {
        currentRecord = value;
        storePosition.topCoordinate = $(node).offset().top;
        PopulateInfoForGame(gameId, gameName);
    });
}

function SetGameUI(nameOfGame, trueName, xml) {
    
    currentGameType = 'score';
    timeOrder = '';
    currentGameName = nameOfGame;
    currentGameTrueName = trueName;    
    document.getElementById('myrecord').value = '0';

    if (xml) {
        var release = xml.attr("release");
        var developer = xml.attr("developer");
        var players = xml.attr("players");        
        var myrecord = xml.attr("myrecord");        
        var type = xml.attr("type");
        var order = xml.attr("order");

        SetGameSection(release, 'release');
        SetGameSection(developer, 'developer');
        
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
            Hide('#micro');
            Hide('#seconds');
            Hide('#minutes');
        }

        var gots = currentRecord.played;
        var foundgame = 0;
        Hide('#ratings');
        
        if (myrecord !== null) //A record can be stored for this game denoted by the empty attribute myrecord in the xml data
        {
            for (var i = 0; i < gots.length; i++) {
                var game = gots[i];

                var testName = nameOfGame.replace(/'/g, "");
                testName = testName.replace(/&apos;/g, "");
                testName = testName.replace(/&amp;/g, "");
                testName = testName.replace(/&/g, "");
                testName = testName.replace(/ /g, '_').toLowerCase();
                
                if (testName === game) {
                    foundgame = 1;
                    Show('#mrdivider');
                    LoadNotes();
                    Show('#myrecordnotes');
                    Show('#myrecordnotescontents');

                    if (type === "time") {
                        Show('#myrecordtimecontainer');
                        Hide('#myrecordcontainer');
                    } else {
                        Hide('#myrecordtimecontainer');
                        Show('#myrecordcontainer');
                    }
                    
                    $('#ratings').removeClass('ui-screen-hidden');                        
                    LoadRating();
                    $('#postgame').removeClass('ui-screen-hidden');
                    break;
                }
            }
        }

        if (foundgame === 0) {
            ClearRating();
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
    var game = data.find(currentCategoryId + "[name='" + nameOfGame + "']");        
    SetGameUI(nameOfGame, trueName, game);    
    LoadOnlineGameInformation();    
}

function RemoveAllChildrenFromGameList() {

    RemoveAllChildren("gamelistul");
    RemoveAllChildren("gamelistplayedul");
    RemoveAllChildren("gamelistnotplayedul");
}

function CreateGameListControls(categoryName) {
    data = $($.parseXML(data));

    allGames = data.find(categoryName);

    var output = [];
    var array = [];
    var names = [];

    allGames.each(function () {
        var name = jQuery(this).children('[name="name"]').text();

        var id = name.replace(/'/g, "");
        id = id.replace(/&apos;/g, "");
        id = id.replace(/&amp;/g, "");
        id = id.replace(/&/g, "");

        if (gamesByFriend.hasOwnProperty(TransformGameName(name))) {
            //A friend has played this game
            //user a different icon
            array.push([id, '<li data-icon="user" onclick="GoToGame(this)" id="' + id + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;"><a><span style="font-size:70%;white-space: normal;text-overflow: clip;">' + name + '</span></a></li>']);
        }
        else {
            array.push([id, '<li onclick="GoToGame(this)" id="' + id + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;"><a><span style="font-size:70%;white-space: normal;text-overflow: clip;">' + name + '</span></a></li>']);
        }

        names[id.replace(/ /g, '_').toLowerCase()] = name;
    });

    array.sort(SortById);

    for (var j = 0; j < array.length; j++) {
        output.push(array[j][1]);
    }

    controlCache.push([categoryName, output]);
    gameCache[categoryName] = names;
    $('#gamelist').children('ul').append(output.join('')).listview().listview('refresh');
}

function PopulateListOfGamesForCategory(categoryName) {
    ReturnCorrectData(categoryName);
    RemoveAllChildrenFromGameList();

    if (controlCache.length === 0) {
        CreateGameListControls(categoryName);
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
            CreateGameListControls(categoryName);
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

    for (var i = 0; i < categoryList.length; i++) {
        var categoryName = categoryList[i];
        var names = [];

        ReturnCorrectData(categoryName);

        data = $($.parseXML(data));
        allGames = data.find(categoryName);

        allGames.each(function () {
            var name = jQuery(this).children('[name="name"]').text();

            var id = name.replace("'", "");
            id = id.replace("&apos;", "");
            id = id.replace("&amp;", "");
            id = id.replace("&", "");

            var valueToPush = '';

            if (gamesByFriend.hasOwnProperty(TransformGameName(name))) {
                valueToPush = '<li data-icon="user" onclick="GoToGameFromAll(this,\'' + categoryName + '\',\'' + id + '\',\'' + name + '\')" id="' + id + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;"><a><span style="font-size:70%;white-space: normal;text-overflow: clip;">' + name + '</span></a></li>';                
            }
            else {
                valueToPush = '<li onclick="GoToGameFromAll(this,\'' + categoryName + '\',\'' + id + '\',\'' + name + '\')" id="' + id + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;"><a><span style="font-size:70%;white-space: normal;text-overflow: clip;">' + name + '</span></a></li>';                
            }

            array.push([id, valueToPush]);

            names[id.replace(/ /g, '_').toLowerCase()] = name;

            if ($.inArray(id.replace(/ /g, '_').toLowerCase(), currentRecord.played) !== -1) {
                arrayPlayed.push([id, valueToPush]);
            } else {
                arrayNot.push([id, valueToPush]);
            }
        });

        gameCache[categoryName] = names;
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

                array.push([id, '<li onclick="GoToGame(this)" id="' + gameName + '" class="ui-li ui-btn-up-c"><a><img id="' + id + 'rating" src="' + imageName + '" class="ui-li-icon ui-corner-none ui-li-thumb"><span class"link" style="font-size:70%;white-space: normal;text-overflow: clip;">' + gameName + '</span></a></li>']);
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
    ReturnCorrectData(currentCategoryId);
    RemoveAllChildren("gamelistnotplayedul");

    data = $($.parseXML(data));
    allGames = data.find(currentCategoryId);

    var output = [];
    var array = [];

    var gots = currentRecord.played;

    allGames.each(function () {

        var game = jQuery(this).children('[name="name"]').text();
        var gameid = game.replace(/'/g, "");
        gameid = gameid.replace(/&apos;/g, "");
        gameid = gameid.replace(/&amp;/g, "");
        gameid = gameid.replace(/&/g, "");
        gameid = gameid.replace(/ /g, '_').toLowerCase();

        var haveWeGotTheGame = 0;

        for (var i = 0; i < gots.length; i++) {
            var gotgame = gots[i];

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

            array.push([id, '<li onclick="GoToGame(this)" id="' + id + '" class="ui-li ui-btn-up-c"><a><span style="font-size:70%;white-space: normal;text-overflow: clip;">' + game + '</span></a></li>']);
        }
    });

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

        currentTab = "AllTab";
        Rehighlight();

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

function RemoveFromPlayed() {
    var array = currentRecord.played;
    var ratings = currentRecord.ratings;
    var scores = currentRecord.scores;
    var index = array.indexOf(TransformedCurrentGameName());

    if (index > -1) {
        array.splice(index, 1);
        ratings.splice(index, 1);
        scores.splice(index, 1);
    }

    currentRecord.played = array;
    currentRecord.ratings = ratings;
    currentRecord.scores = scores;

    SetItemInStorage("my_record", currentRecord);
}

function UpdatePlayed() {
    PopulateListOfGamesIHavePlayed();
    PopulateListOfGamesIHaveNotPlayed();
    $('#GameInfo').listview('refresh');
}

function SuccessfulAddPlayed() {
    AddToPlayed(UpdatePlayed);

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
        SuccessfulRemovePlayed();                    
    }
}