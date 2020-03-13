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
    $('#MYENEMIES').removeClass('ui-btn-active');
    $('#ALLUSERS').removeClass('ui-btn-active');

    $('#FRIENDSSCORES').removeClass('ui-btn-active');
    $('#ALLSCORES').removeClass('ui-btn-active');
    $('#CLUBS').removeClass('ui-btn-active');

    $('#ALLRECENT').removeClass('ui-btn-active');
    $('#FRIENDSRECENT').removeClass('ui-btn-active');

    $('#MYCLUBS').removeClass('ui-btn-active');
    $('#ALLCLUBS').removeClass('ui-btn-active');

    $('#ARCADEGAMES').removeClass('ui-btn-active');
    $('#PINBALLGAMES').removeClass('ui-btn-active');
    
    switch (currentTab) {
        case "AllPlayedTab":
        case "PlayedTab":
        case "ALLUSERS":
        case "FRIENDSSCORES":
        case "ALLRECENT":
        case "MYCLUBS":
        case "ARCADEGAMES":
            $(".tabs").tabs().tabs("option", "active", 0);
            break;
        case "AllNotPlayedTab":
        case "NotPlayedTab":
        case "MYFRIENDS":
        case "FRIENDSRECENT":
        case "CLUBS":
        case "ALLCLUBS":
        case "PINBALLGAMES":
            $(".tabs").tabs().tabs("option", "active", 1);
            break;
        default:
            $(".tabs").tabs().tabs("option", "active", 2);
            break;
    }

    $('#' + currentTab).addClass('ui-btn-active');
}

function GoToCategory(category, doNotNavigate) {
    AddAllGames(category, doNotNavigate);
}

function LoadGameInfoWithoutNavigate(node, tab, clubOverride) {
    currentGameNode = node;
    var game = gameCatalog[node.id];

    //if game is undefined it could be because the capialisation is wrong...
    //Total bodge fix here, find the property whos lower case matches compeltely and use
    //that. Caused by lower case letter in game key
    if (!game)
    {
        for (var prop in gameCatalog)
        {
            if (prop.toLowerCase() === node.id.toLowerCase())
            {
                game = gameCatalog[prop];
                break;
            }
        }
    }

    SetGameUI(node.id, node.innerText, game);
    LoadOnlyBannerFromLinkTo(tab, clubOverride);
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
    Hide("#uploadscorebtn");
    Hide('#detailedScoreButton');

    if (gameData) {
        var release = gameData.release;
        var developer = gameData.developer;
        var players = gameData.players;
        var type = gameData.type;
        var order = gameData.order;

        if (release === 'Unknown') {
            SetGameSection('', 'release');
        }
        else {
            SetGameSection(release, 'release');
        }

        SetGameSection(developer, 'developer');
        SetGameSection(gameData.version, 'version');

        if (players === '') {
            SetGameSection('', 'players');
        }
        else if (players === "1") {
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
                    Show('#detailedScoreButton');
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
    currentGameCategoryId = game.category;

    //load video or game image
    if (game.videoURL)
    {
        Show("#gamevideo");
        Hide("#gameimage");

        var videoElement = document.getElementById("gamevideo");
        videoElement.setAttribute('src', game.videoURL);
    }
    else
    {
        Hide("#gamevideo");
        Show("#gameimage");
    }

    SetGameUI(nameOfGame, trueName, game);
    LoadOnlineGameInformation();
}

function RemoveAllChildrenFromGameList() {

    RemoveAllChildren("gamelistul");
    RemoveAllChildren("gamelistplayedul");
    RemoveAllChildren("gamelistnotplayedul");
}

var myRatings = [];

function ConstructRatingArray()
{
    for (var i = 0; i < currentRecord.ratings.length; i++) {
        if (currentRecord.ratings[i].rating !== "" &&
            currentRecord.ratings[i].rating !== 0 &&
            currentRecord.ratings[i].rating !== "0") {
            myRatings[currentRecord.ratings[i].id] = currentRecord.ratings[i].rating;
        }
    }
}

function CreateGameRow(name, alternativeName, displayName, alternative, names, array)
{
    if (myRatings.length === 0)
    {
        ConstructRatingArray();
    }

    if (name === '')
    {
        return;
    }

    var id = name.replace(/'/g, "");
    id = id.replace(/&apos;/g, "");
    id = id.replace(/&amp;/g, "");
    id = id.replace(/&/g, "");

    if (displayName === '') {
        displayName = name;
    }    

    if (alternativeName !== '') {
        displayName = name + " / " + alternativeName;
    }

    var lefticon = "";
    var leftimage = '';
    var righticon = "ui-icon-carat-r";

    var key = TransformGameName(name);
    var recordId = id;
    if (alternative === true)
    {
        key = TransformGameName(alternativeName);
        recordId = alternativeName.replace(/'/g, "");
        recordId = recordId.replace(/&apos;/g, "");
        recordId = recordId.replace(/&amp;/g, "");
        recordId = recordId.replace(/&/g, "");
    }

    if (gamesByFriend.hasOwnProperty(TransformGameName(key)) && gamesByFriend[TransformGameName(key)].length !== 0) {
        righticon = "ui-icon-user";
    }

    if (newGames.indexOf(recordId) !== -1) {
        lefticon = "ui-btn ui-shadow ui-corner-all ui-icon-star ui-btn-icon-left";
    }
    else if (key in myRatings)
    {
        lefticon = '';
        leftimage = 'img/ratings/star' + myRatings[key] + '.png';
    }

    array.push([id, '<li data-icon="false" onclick="GoToGame(this)" id="' + recordId + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;"><a class="' + lefticon + '"><img name="' + key + 'rating" id="' + key + 'rating" src="' + leftimage + '" class="ui-li-icon ui-corner-none ui-li-thumb"><span style=\"font-size:70%;white-space: normal;text-overflow: clip;\" class=\"ui-corner-all ' + righticon + ' ui-btn-icon-right\">' + displayName + '</span></a></li>']);

    names[id.replace(/ /g, '_').toLowerCase()] = name;

    return array.length - 1;
}

function CreateGameListItem(game, names, array)
{
    var indexes = [];
    var i = CreateGameRow(game.name, game.alternativeName, game.displayName, false, names, array);
    var j = CreateGameRow(game.alternativeName, game.name, game.displayName, true, names, array);

    if (i >= 0) {
        indexes.push(i);
    }

    if (j) {
        indexes.push(j);
    }

    return indexes;
}

function CreateGameListControls(categoryName, gamesInCategory) {

    var output = [];
    var array = [];
    var names = [];

    for (var i = 0; i < gamesInCategory.length; i++) {

        var game = gamesInCategory[i];
        CreateGameListItem(game, names, array);
    }

    array.sort(SortById);

    for (var j = 0; j < array.length; j++) {
        output.push(array[j][1]);
    }

    controlCache.push([categoryName, output]);
    gameCache[categoryName] = names;
    $('#gamelist').children('ul').append(output.join('')).listview().listview('refresh');

    AddCollapseIcon('#gamelist');
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
                AddCollapseIcon('#gamelist');
                found = 1;
                break;
            }
        }

        if (found === 0) {
            CreateGameListControls(categoryName, gamesInCategory);
        }
    }
}

var gameControlArray = [];

function DisplayEveryGame() {
    
    currentCategoryId = 'all';

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

    if (!gameCache['all']) {
        gameCache['all'] = [];
    }

    for (var game in gameCatalog) {
        if (gameCatalog.hasOwnProperty(game)) {
            if (gameCatalog[game].category === 'pinball')
                continue;

            if (!gameCache[gameCatalog[game].category]) {
                gameCache[gameCatalog[game].category] = [];
            }

            var indexes = CreateGameListItem(gameCatalog[game], gameCache[gameCatalog[game].category], array);
            
            var id = gameCatalog[game].name.replace("'", "");
            id = id.replace("&apos;", "");
            id = id.replace("&amp;", "");
            id = id.replace("&", "");
            id = id.replace(/ /g, '_');
            id = id.toLowerCase();

            if ($.inArray(id, currentRecord.played) !== -1) {
                for (var i = 0; i < indexes.length; i++) {
                    arrayPlayed.push([array[indexes[i]][0], array[indexes[i]][1]]);
                }
            } else {
                for (var j = 0; j < indexes.length; j++) {
                    arrayNot.push([array[indexes[j]][0], array[indexes[j]][1]]);
                }
            }

            for (var k = 0; k < indexes.length; k++) {
                gameControlArray[array[indexes[k]][0]] = array[indexes[k]][1];
            }
        }
    }

    for (var category in gameCache)
    {
        if (category !== 'all')
        {
            for (game in gameCache[category]) {
                gameCache['all'][game] = gameCache[category][game];
            }
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
    AddCollapseIcon('#allGames');
    AddCollapseIcon('#allgamelistplayed');
    AddCollapseIcon('#allgamelistnotplayed');

    NavigateToInternalPage("#Everything");
}

function Clone(src) {
    return Object.assign({}, src);
}

function UpdatePlayedAndNotPlayed() {

    var played = 'allgamelistplayed';
    var notplayed = 'allgamelistnotplayed';

    if (currentCategoryId !== 'all') {
        played = "gamelistplayed";
        notplayed = "gamelistnotplayed";
    }
     
    RemoveAllChildren(played + 'ul');
    RemoveAllChildren(notplayed + 'ul');

    var output = [];
    var outputNP = [];
    var array = [];
    var arrayNP = [];

    //clone the control array
    var clone = Clone(gameControlArray);

    //for each game in the gots, find its record in the drawing cache and and draw it in the right place.
    for (var j = 0; j < currentRecord.played.length; j++) {
        game = currentRecord.played[j];
        var id = TransformGameName(game);
        if (gameCache[currentCategoryId].hasOwnProperty(id)) {
            var displayName = gameCache[currentCategoryId][id];
            var gameListItem = clone[displayName];
            if (gameListItem) {
                array.push([id, gameListItem]);
                delete clone[displayName];
            }

            //What if the game in the catalog has an alternative name? need to add that one in as well.
            if (gameCatalog[gameCache[currentCategoryId][id]].alternativeName) {
                var alternativeName = gameCatalog[gameCache[currentCategoryId][id]].alternativeName;
                var altid = TransformGameName(alternativeName);
                var gameListItem2 = clone[alternativeName];
                if (gameListItem2) {
                    array.push([altid, gameListItem2]);
                    delete clone[alternativeName];
                }
            }
        }        
    }

    array.sort(SortById);

    for (var l = 0; l < array.length; l++) {
        output.push(array[l][1]);
    }

    //Construct this from the remaining items in clone.
    //But only if the item has the same genre as the current category
    for (var game in clone)
    {
        if (currentCategoryId === 'all') {
            arrayNP.push([TransformGameName(game), clone[game]]);
        }
        else
        {
            if (TransformGameName(game) in gameCache[currentCategoryId])
            {
                arrayNP.push([TransformGameName(game), clone[game]]);
            }
        }
        
    }

    arrayNP.sort(SortById);

    for (var l = 0; l < arrayNP.length; l++) {
        outputNP.push(arrayNP[l][1]);
    }

    $('#' + played).children('ul').append(output.join('')).listview().listview('refresh');
    $('#' + notplayed).children('ul').append(outputNP.join('')).listview().listview('refresh');
    AddCollapseIcon('#' + played);
    AddCollapseIcon('#' + notplayed);
}

function AddGamesControls(name, id, doNotNavigate) {
    currentCategoryName = name;
    currentCategoryId = id;

    document.getElementById('GameCollection').innerText = name;
    RemoveAllChildrenFromGameList();

    var output = [];
    var outputPlayed = [];
    var outputNot = [];
    var array = [];
    var arrayPlayed = [];
    var arrayNot = [];

    if (!gameCache['all']) {
        gameCache['all'] = [];
    }    

    if (currentCategoryId in gameCache)
    {
        //We have the games we need in the cache which means the controls will exist in the gameControlArray
        //so need to construct what we have and havent played etc
        var alreadyAdded = [];
        for (var game in gameCache[currentCategoryId])
        {
            var gameName = gameCache[currentCategoryId][game];

            if (alreadyAdded.indexOf(gameName) !== -1)
                continue;

            var id = TransformGameName(gameName);
            var gameListItem = gameControlArray[gameName];
            if (gameListItem) {
                array.push([id, gameListItem]);
            }            

            if ($.inArray(id, currentRecord.played) !== -1) {
                arrayPlayed.push([id, gameListItem]);
            } else {
                arrayNot.push([id, gameListItem]);
            }

            alreadyAdded.push(gameName);

            //If the game has an alternative name then add it too
            if (gameCatalog[gameName].alternativeName) {
                var altid = TransformGameName(gameCatalog[gameName].alternativeName);
                var gameListItem2 = gameControlArray[gameCatalog[gameName].alternativeName];
                if (gameListItem2) {
                    array.push([altid, gameListItem2]);                    
                }

                if ($.inArray(id, currentRecord.played) !== -1) {
                    arrayPlayed.push([altid, gameListItem2]);
                } else {
                    arrayNot.push([altid, gameListItem2]);
                }

                alreadyAdded.push(gameCatalog[gameName].alternativeName);
            }
        }
    }
    else
    {
        //We havent seen these games before and so we will need to construct the elements for the controls
        for (var game in gameCatalog) {
            if (gameCatalog.hasOwnProperty(game)) {
                if (gameCatalog[game].category !== currentCategoryId)
                    continue;

                if (!gameCache[currentCategoryId]) {
                    gameCache[currentCategoryId] = [];
                }

                var indexes = CreateGameListItem(gameCatalog[game], gameCache[currentCategoryId], array);
                //var indexes = CreateGameListItem(gameCatalog[game], currentCategoryId, array);

                var id = gameCatalog[game].name.replace("'", "");
                id = id.replace("&apos;", "");
                id = id.replace("&amp;", "");
                id = id.replace("&", "");
                id = id.replace(/ /g, '_');
                id = id.toLowerCase();

                if ($.inArray(id, currentRecord.played) !== -1) {
                    for (var i = 0; i < indexes.length; i++) {
                        arrayPlayed.push([array[indexes[i]][0], array[indexes[i]][1]]);
                    }
                } else {
                    for (var i = 0; i < indexes.length; i++) {
                        arrayNot.push([array[indexes[i]][0], array[indexes[i]][1]]);
                    }
                }

                for (var i = 0; i < indexes.length; i++) {
                    gameControlArray[array[indexes[i]][0]] = array[indexes[i]][1];
                }
            }
        }

        for (var category in gameCache) {
            if (currentCategoryId === 'pinball') //Dont add pinball to the all games space
                continue;

            for (game in gameCache[category]) {
                gameCache['all'][game] = gameCache[category][game];
            }
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

    $('#gamelist').children('ul').append(output.join('')).listview().listview('refresh');
    $('#gamelistplayed').children('ul').append(outputPlayed.join('')).listview().listview('refresh');
    $('#gamelistnotplayed').children('ul').append(outputNot.join('')).listview().listview('refresh');
    AddCollapseIcon('#gamelist');
    AddCollapseIcon('#gamelistplayed');
    AddCollapseIcon('#gamelistnotplayed');

    SetCategoryGamesTab("AllTab");
    SetCurrentTab("AllTab");

    if (doNotNavigate !== 1) {
        NavigateToInternalPage("#Category");
    }
    $.mobile.loading('hide');
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

    if (!AllowedOnline()) {
        CalculateLocalStatistics();
    }
}

function GameIndex(array, game) {
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

    if (!AllowedOnline()) {
        CalculateLocalStatistics();
    }
    else
    {
        //When saying you have no longer played a game we need to make sure that 
        //your score is wiped from the online database
        //Setting the value to 0 will remove it from any online leaderboards
        //However we need to tell the database to remove the score....
        UploadSingleGame(TransformedCurrentGameName(), "0");
    }

    ClosePopup();
}

function UpdatePlayed() {
    var scoreElement = document.getElementById('myrecord');
    $('#myrecord').parent().addClass('ui-corner-bottom');
    $('#myrecordText').parent().addClass('ui-corner-bottom');
    $('#GameInfo').listview('refresh');
    $('#ScoreInfo').listview('refresh');
    $('#ScoreInfoTime').listview('refresh');
    $('#NoteInfo').listview('refresh');
    UpdatePlayedAndNotPlayed();
}

function SuccessfulAddPlayed() {
    AddToPlayed();

    if (currentGameType === "time") {
        Show('#myrecordtimecontainer');
    } else {
        Show('#detailedScoreButton');
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
        CreatePopup(removeGamePopup);
    }
}

function UndoRemovePlayed() {
    set_jqm_radio_button_off("radio-view", "notplayed");
    set_jqm_radio_button("radio-view", "played");
}