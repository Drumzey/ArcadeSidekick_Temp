var allScores = [];
var allDetailedScores = [];

var allFriendsScores = [];
var allFriendsDetailedScores = [];

var allClubsScores = [];
var allClubsDetailedScores = [];

var allGlobalScores = [];
var allGlobalDetailedScores = [];

function ProcessDetailedScores(clubOverride)
{
    var response = JSON.parse(latestXHTTP.responseText);

    ClearCurrentData();

    //Firstly do the simple scores and those without settings information
    for (var prop in response.SimpleScores["Unknown"]) {
        if (response.SimpleScores["Unknown"].hasOwnProperty(prop)) {
            if (response.SimpleScores["Unknown"][prop].Score !== "0" &&
                response.SimpleScores["Unknown"][prop].Score !== 0) {
                //If no level has been specified then assume full game
                //I think we always return simple scores as full game, so we can pick the level in here...
                var level = "FULL GAME";
                if (response.SimpleScores["Unknown"][prop].LevelName !== "")
                {
                    level = response.SimpleScores["Unknown"][prop].LevelName;
                }
                allScores.push([response.SimpleScores["Unknown"][prop].UserName, response.SimpleScores["Unknown"][prop].Score, level]);
            }
        }
    }

    for (var categoryProp in response.SimpleScores) {

        if (categoryProp === "Unknown") {
            // If any of the submissions have a level name then we know they have been submitted as default scores
            for (var scoreProp in response.SimpleScores[categoryProp]) {
                if (response.SimpleScores[categoryProp].hasOwnProperty(scoreProp)) {
                    if (response.SimpleScores[categoryProp][scoreProp].Score !== "0" &&
                        response.SimpleScores[categoryProp][scoreProp].Score !== 0) {

                        // if we have a level name we know this was entered as a detailed score under the default category
                        if (response.SimpleScores[categoryProp][scoreProp].LevelName !== "") {
                            //Add to the scoreCategories Array - setting 0 is the default setting
                            allDetailedScores.push([0, response.SimpleScores[categoryProp][scoreProp].UserName, response.SimpleScores[categoryProp][scoreProp].Score, response.SimpleScores[categoryProp][scoreProp].LevelName]);
                        }
                    }
                }
            }
        }
        else if (response.SimpleScores.hasOwnProperty(categoryProp)) {
            for (var scoreProp in response.SimpleScores[categoryProp]) {
                if (response.SimpleScores[categoryProp].hasOwnProperty(scoreProp)) {
                    if (response.SimpleScores[categoryProp][scoreProp].Score !== "0" &&
                        response.SimpleScores[categoryProp][scoreProp].Score !== 0) {

                        //Add to the scoreCategories Array
                        allDetailedScores.push([categoryProp, response.SimpleScores[categoryProp][scoreProp].UserName, response.SimpleScores[categoryProp][scoreProp].Score, response.SimpleScores[categoryProp][scoreProp].LevelName]);

                        //Add to all the scores
                        allScores.push([response.SimpleScores[categoryProp][scoreProp].UserName, response.SimpleScores[categoryProp][scoreProp].Score, response.SimpleScores[categoryProp][scoreProp].LevelName]);
                    }
                }
            }
        }
    }

    //Remove enemies from lists
    allDetailedScores = RemoveEnemies(allDetailedScores, true);
    allScores = RemoveEnemies(allScores, false);

    //Order all the scores
    OrderScores(allDetailedScores);
    OrderScores(allScores);

    //Remove duplicate names from allScores no longer want to remove duplicates,
    //can have different scores for different levels
    //allScores = RemoveDuplicateNames(allScores);

    AssignFriendsScores(allDetailedScores, allScores);
    AssignFriendsSettings(response);
    AssignFriendsLevels(response);
    DisplayFriendsScores();

    AssignClubsScores(allDetailedScores, allScores);
    AssignClubsSettings(response);
    LoadClubLeaderboardUI(); // Load drops downs etc
    AssignClubsLevels(response);
    DisplayClubsScores(clubOverride);

    AssignGlobalScores(allDetailedScores, allScores);
    AssignGlobalSettings(response);
    AssignGlobalLevels(response);
    DisplayGlobalScores();
}

function ClearCurrentData()
{
    allDetailedScores = [];
    allScores = [];
    allFriendsScores = [];
    allFriendsDetailedScores = [];
    allClubsScores = [];
    allClubsDetailedScores = [];
    allGlobalScores = [];
    allGlobalDetailedScores = [];
}

function AssignFriendsScores(currentGameDetailedScores, currentGameAllScores)
{
    //Remove all players who are not friends from lists
    allFriendsDetailedScores = RemoveNonFriends(currentGameDetailedScores, true);
    allFriendsScores = RemoveNonFriends(currentGameAllScores, false);
}

function AssignClubsScores(currentGameDetailedScores, currentGameAllScores)
{
    var tempAllClubsScores = [];
    var tempAllClubsDetailedScores = [];
    var allClubNames = [];

    for (var h = 0; h < allClubs.length; h++) {
        allClubNames.push(allClubs[h].Name);
    }

    // For each club that the user is a member of
    for (var i = 0; i < myclubs.length; i++)
    {
        var clubIndex = allClubNames.indexOf(myclubs[i]);
        if (clubIndex === -1)
            continue; //Possible that a club has been discontinued and no longer available

        var clubUsers = allClubs[clubIndex].Members;

        for (var j = 0; j < currentGameDetailedScores.length; j++)
        {
            if (clubUsers.indexOf(currentGameDetailedScores[j][1]) !== -1)
            {
                //We are a member of this club and need to assign our score into our new array
                tempAllClubsDetailedScores.push([currentGameDetailedScores[j][0],
                    currentGameDetailedScores[j][1], currentGameDetailedScores[j][2], currentGameDetailedScores[j][3], myclubs[i]]);
            }
        }

        for (var k = 0; k < currentGameAllScores.length; k++) {
            if (clubUsers.indexOf(currentGameAllScores[k][0]) !== -1) {
                //We are a member of this club and need to assign our score into our new array
                tempAllClubsScores.push([currentGameAllScores[k][0],
                    currentGameAllScores[k][1], currentGameAllScores[k][2], myclubs[i]]);
            }
        }
        
    }

    allClubsScores = tempAllClubsScores.slice();
    allClubsDetailedScores = tempAllClubsDetailedScores.slice();
}

function AssignGlobalScores(currentGameDetailedScores, currentGameAllScores) {
    allGlobalDetailedScores = currentGameDetailedScores.slice();
    allGlobalScores = currentGameAllScores.slice();
}

function AssignFriendsSettings(response)
{
    AssignSettings(response, allFriendsDetailedScores, '#friendsScoreSettingsParent', 'friends');
}

function AssignClubsSettings(response)
{
    AssignSettings(response, allClubsDetailedScores, '#clubsScoreSettingsParent', 'clubs');
}

function AssignGlobalSettings(response) {
    AssignSettings(response, allGlobalDetailedScores, '#globalScoreSettingsParent', 'global');
}

function AssignFriendsLevels(response)
{
    AssignLevels(response, allFriendsDetailedScores, '#friendsScoreLevelsParent', 'friends');
}

function AssignClubsLevels(response) {
    AssignLevels(response, allClubsDetailedScores, '#clubsScoreLevelsParent', 'clubs');
}

function AssignGlobalLevels(response) {
    AssignLevels(response, allGlobalDetailedScores, '#globalScoreLevelsParent', 'global');
}

function AssignSettings(response, detailedScores, section, key) {
    var settingsFound = [];
    //Get settings for friends games
    for (var i = 0; i < detailedScores.length; i++) {

        var settingId = detailedScores[i][0];
        if (settingsFound.indexOf(settingId) === -1) {
            settingsFound.push(settingId);
        }
    }

    //If we have more than 1 setting we need to show the drop down
    var numberOfAdditionalSettings = 0;
    var settingDescriptions = [];
    for (var settingProp in response.Setting) {
        if (response.Setting.hasOwnProperty(settingProp)) {
            //Do any of our friends scores have this settingId?
            var settingProperty = settingProp;
            if (settingProp === "Unknown")
            {
                settingProperty = 0;
            }

            if (settingsFound.indexOf(settingProperty) === -1) {
                continue;
            }

            //We have a setting that is non default
            numberOfAdditionalSettings++;

            // If we have an unknown setting then we must have a score submitted with that setting
            if (settingProp === "Unknown") {
                settingDescriptions.unshift([response.Setting["Unknown"].SettingsId, "Default"]);
            }
            else {
                var description = ToSettingString(response.Setting[settingProp]);
                settingDescriptions.push([response.Setting[settingProp].SettingsId, description]);
            }
        }
    }

    //Populate or remove the settings drop down box from the global leaderboards.
    if (numberOfAdditionalSettings === 0) {
        Hide(section);
    }
    else {
        Show(section);
        PopulateLeaderboardScoreSettingDropDown(settingDescriptions, key);
    }
}

function AssignLevels(response, detailedScores, section, key) {

    var levelsFound = [];
    levelsFound.push("FULL GAME");
    //Get levels for scores
    for (var i = 0; i < detailedScores.length; i++) {

        var level = detailedScores[i][3]; // NEED THE CORRECT INDEX FOR LEVEL HERE
        if (level === "FULL GAME")
            continue;

        if (levelsFound.indexOf(level) === -1) {
            levelsFound.push(level);
        }
    }

    //Populate or remove the levels drop down box from the global leaderboards.
    if (levelsFound.length === 1 && levelsFound[0] === "FULL GAME") {
        Hide(section);
        PopulateLeaderboardScoreLevelDropDown(levelsFound, key);
    }
    else {
        //We have 1 or more levels
        Show(section);
        PopulateLeaderboardScoreLevelDropDown(levelsFound, key);
    }
}

function DisplayFriendsScores()
{
    //We are showing all scores which means no distinction between difficulty
    //However we do want to show the correct levels here
    //We have a drop down for the levels present
    var scores = GetLevelScores(allFriendsScores, "FULL GAME");

    scores = OrderScores(allFriendsScores, false);
    scores = RemoveDuplicateNames(allFriendsScores);

    //By default we show all the scores first
    DisplayAllScores(scores, "friendsgamepositionblock", "friendsgamealluserblock", "friendsgameallscoresblock",
        "#friendspositionblock", "#friendsuserblock", "#friendsgamescoreblock", "myfriendspositionspan");
    AlterControlHeights(scores, "", "");
}

function GetLevelScores(scores, levelName, detailed)
{
    var tempScores = [];
    for (var i = 0; i < scores.length; i++) {

        if (detailed) {
            if (scores[i][3] === levelName) {
                tempScores.push([scores[i][0], scores[i][1], scores[i][2]]);
            }
        }
        else {
            if (scores[i][2] === levelName) {
                tempScores.push([scores[i][0], scores[i][1]]);
            }
        }
    }
    return tempScores;
}

function DisplayClubsScores(clubOverride) {
    //If we are not a member of any clubs then return
    if (myclubs.length === 0)
        return;

    //Pick the first club on the list
    var firstClub = myclubs[0];
    if (clubOverride) // Unless the override has been used
    {
        firstClub = clubOverride;
        //Select the club
        var clu = $('#select-clubs');
        // Select the relevant option, de-select any others
        clu.val(firstClub).attr('selected', true).siblings('option').removeAttr('selected');
        // jQM refresh
        clu.selectmenu("refresh", true);
    }

    //Get all scores for the first club
    var clubScores = GetClubScores(allClubsScores, firstClub, false);
    //Get settings for the first clubs scores
    //HideSettings(allClubsDetailedScores, firstClub);

    //Only Full game scores
    var scores = GetLevelScores(clubScores, "FULL GAME");
    scores = OrderScores(clubScores, false);
    scores = RemoveDuplicateNames(clubScores);

    //By default we show all the scores first
    DisplayAllScores(scores, "clubpositionblockul", "clubuserblockul", "clubscoreblockul",
        "#clubpositionblock", "#clubuserblock", "#clubscoreblock", "mypositionClubspan");
    AlterControlHeights(scores, "", "");
}

function DisplayGlobalScores() {

    var scores = GetLevelScores(allGlobalScores, "FULL GAME");
    scores = OrderScores(allGlobalScores, false);
    scores = RemoveDuplicateNames(allGlobalScores);
    //By default we show all the scores first
    DisplayAllScores(scores, "allgamepositionblock", "allgamealluserblock", "allgameallscoresblock",
        "#allpositionblock", "#alluserblock", "#allscoreblock", "myAllpositionspan");
    AlterControlHeights(scores, "", "");
}

function LoadClubLeaderboardUI()
{
    if (myclubs.length === 0) {
        Show('#noclubmembership');
        Hide('#clubleaderboards');
        Hide('#club-select');
        Hide('#mypositionClub');
        //Hide('#clubsScoreSettingsParent');
        return;
    }

    //Show('#clubsScoreSettingsParent');
    Hide('#noclubmembership');
    Show('#clubleaderboards');

    PopulateClubsDropDown();
    Show('#club-select');
}

function GetClubScores(scores, club, detailed)
{
    var tempScores = [];
    for (var i = 0; i < scores.length; i++) {

        if (detailed) {
            if (scores[i][4] === club) {
                tempScores.push([scores[i][0], scores[i][1], scores[i][2], scores[i][3]]);
            }
        }
        else {
            if (scores[i][3] === club) {
                tempScores.push([scores[i][0], scores[i][1], scores[i][2]]);
            }
        }
    }
    return tempScores;
}

function HideSettings(scores, clubName)
{
    var tempScore = GetClubScores(scores, clubName, true);
    var settings = [];

    if (tempScore.length === 0)
    {
        //Set the drop down to All
        $('#clubsScoreSettings').val($('#clubsScoreSettings option:first').val());
        //We have no specific settings so can hide the drop down
        Hide('#clubsScoreSettingsParent');
        return;
    }

    //We have specific settings
    for (var i = 0; i < tempScore.length; i++)
    {
        if (settings.indexOf(tempScore[i][0]) === -1)
        {
            settings.push(tempScore[i][0]);
        }
    }

    Show('#clubsScoreSettingsParent');

    $('#clubsScoreSettings').find('option').each(function (index, element) {

        if (element.value !== "Unknown") {
            if (settings.indexOf(element.value) === -1) {
                //We dont have this setting so should hide it
                element.classList.add("ui-screen-hidden");
            }
            else {
                //We have this setting for this club and want to show it
                element.classList.remove("ui-screen-hidden");
            }
        }
    });
}

function HideLevels(scores, clubName)
{
    var tempScore = GetClubScores(scores, clubName, true);
    var levels = [];

    if (tempScore.length === 0)
    {
        //Set the drop down to FULL GAME
        $('#clubsScoreLevels').val($('#clubsScoreLevels option:first').val());
        //We have no specific levels so can hide the drop down
        Hide('#clubsScoreLevelsParent');
        return;
    }

    //We have specific levels
    for (var i = 0; i < tempScore.length; i++)
    {
        if (levels.indexOf(tempScore[i][3]) === -1)
        {
            levels.push(tempScore[i][3]);
        }
    }

    if (levels.length === 1) {
        //Set the drop down to FULL GAME
        $('#clubsScoreLevels').val($('#clubsScoreLevels option:first').val());
        Hide('#clubsScoreLevelsParent');
        return;
    }

    Show('#clubsScoreLevelsParent');

    $('#clubsScoreLevels').find('option').each(function (index, element) {

        if (element.value !== "FULL GAME") {
            if (levels.indexOf(element.value) === -1) {
                //We dont have this setting so should hide it
                element.classList.add("ui-screen-hidden");
            }
            else {
                //We have this setting for this club and want to show it
                element.classList.remove("ui-screen-hidden");
            }
        }
    });
}