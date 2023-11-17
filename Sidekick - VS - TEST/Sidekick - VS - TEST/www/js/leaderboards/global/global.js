var loadGlobalLeaderboard = true;
var currentGameDetailedScores = [];
var currentGameAllScores = [];

function LoadGlobalLeaderboard() {
    if (loadGlobalLeaderboard) {
        GetDetailedScoreSubmissions();
        loadGlobalLeaderboard = false;
    }
}

//function SuccessfulGetDetailedScoresLeaderboard()
//{
//    var response = JSON.parse(latestXHTTP.responseText);

//    //Clear out of current game detailed scores
//    currentGameDetailedScores = [];
//    currentGameAllScores = [];

//    //Firstly do the simple scores and those without settings information
//    for (var prop in response.SimpleScores["Unknown"])
//    {
//        if (response.SimpleScores["Unknown"].hasOwnProperty(prop))
//        {
//            if (response.SimpleScores["Unknown"][prop].Score !== "0" ||
//                response.SimpleScores["Unknown"][prop].Score !== 0)
//            {
//                currentGameAllScores.push([response.SimpleScores["Unknown"][prop].UserName, response.SimpleScores["Unknown"][prop].Score]);
//            }
//        }
//    }

//    for (var categoryProp in response.SimpleScores) {

//        //If we are the unknown category then skip as we have done these already
//        if (categoryProp === "Unknown")
//            continue;

//        if (response.SimpleScores.hasOwnProperty(categoryProp)) {
//            for (var scoreProp in response.SimpleScores[categoryProp]) {
//                if (response.SimpleScores[categoryProp].hasOwnProperty(scoreProp)) {
//                    if (response.SimpleScores[categoryProp][scoreProp].Score !== "0" ||
//                        response.SimpleScores[categoryProp][scoreProp].Score !== 0) {

//                        //Add to the scoreCategories Array
//                        currentGameDetailedScores.push([categoryProp, response.SimpleScores[categoryProp][scoreProp].UserName, response.SimpleScores[categoryProp][scoreProp].Score]);

//                        //Add to all the scores
//                        currentGameAllScores.push([response.SimpleScores[categoryProp][scoreProp].UserName, response.SimpleScores[categoryProp][scoreProp].Score]);
//                    }
//                }
//            }
//        }
//    }

//    //Remove enemies from lists
//    currentGameDetailedScores = RemoveEnemies(currentGameDetailedScores, true);
//    currentGameAllScores = RemoveEnemies(currentGameAllScores, false);

//    //Order all the scores
//    OrderScores(currentGameDetailedScores);
//    OrderScores(currentGameAllScores);

//    //Remove duplicate names from allScores
//    currentGameAllScores = RemoveDuplicateNames(currentGameAllScores);

//    //If we have more than 1 setting we need to show the drop down
//    var numberOfSettings = 0;
//    var settingDescriptions = [];
//    for (var settingProp in response.Setting)
//    {
//        if (response.Setting.hasOwnProperty(settingProp)) {
//            //We have a setting
//            numberOfSettings++;

//            //"SettingsId": "0",
//            //"Difficulty": null,
//            //"Lives": "3",
//            //"ExtraLivesAt": "30k, every 70k",
//            //"Credits": "3",
//            //"MameOrPCB": "PCB"

//            var description = ToSettingString(response.Setting[settingProp]);

//            settingDescriptions.push([response.Setting[settingProp].SettingsId, description]);
//        }
//    }

//    //Populate or remove the settings drop down box from the global leaderboards.
//    if (numberOfSettings === 0) {
//        Hide('#globalScoreSettingsParent');
//    }
//    else {
//        Show('#globalScoreSettingsParent');
//        PopulateLeaderboardScoreSettingDropDown(settingDescriptions, "global");
//    }

//    //By default we show all the scores first
//    DisplayAllScores(currentGameAllScores, "allgamepositionblock", "allgamealluserblock", "allgameallscoresblock",
//        "#allpositionblock", "#alluserblock", "#allscoreblock", "myAllpositionspan");
//    AlterControlHeights(currentGameAllScores, "", "");
//}