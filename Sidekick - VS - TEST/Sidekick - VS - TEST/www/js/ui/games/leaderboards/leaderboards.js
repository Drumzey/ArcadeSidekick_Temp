//By default we will get all score submissions in one call
//and then navigate to the friends leaderboard if you have friends or the global if you do not
function LoadGameLeaderboard(tabOverride, clubOverride) {

    var tab = 'FRIENDSSCORES';

    if (friendsCollection === null ||
        friendsCollection === [] ||
        friendsCollection.length === 0) {
        tab = 'ALLSCORES';
    }

    if (tabOverride)
    {
        tab = tabOverride;
    }

    GetDetailedScoreSubmissions(clubOverride);

    if (friendsCollection === null ||
        friendsCollection === [] ||
        friendsCollection.length === 0) {

        ClearLeaderboardUI();
        document.getElementById('myfriendspositionspan').innerText = "You have no friends";
        SetCurrentTab(tab);
        NavigateToInternalPage('#GameHighScores');
    }
    else
    {
        SetCurrentTab(tab);
        NavigateToInternalPage('#GameHighScores');
    }
}

function ChangeLeaderboardSettings(section) {
    var dropdown = '';
    var settingDropdown = '';
    var block1 = '';
    var block2 = '';
    var block3 = '';
    var block4 = '';
    var block5 = '';
    var block6 = '';
    var block7 = '';
    var scores = [];
    var scoresDetailed = [];

    switch (section) {
        case "global":
            dropdown = '#globalScoreLevels';
            settingDropdown = '#globalScoreSettings';
            block1 = 'allgamepositionblock';
            block2 = 'allgamealluserblock';
            block3 = 'allgameallscoresblock';
            block4 = '#allpositionblock';
            block5 = '#alluserblock';
            block6 = '#allscoreblock';
            block7 = 'myAllpositionspan';
            scores = allGlobalScores.slice();
            scoresDetailed = allGlobalDetailedScores.slice();
            break;
        case "friends":
            dropdown = '#friendsScoreLevels';
            settingDropdown = '#friendsScoreSettings';
            block1 = 'friendsgamepositionblock';
            block2 = 'friendsgamealluserblock';
            block3 = 'friendsgameallscoresblock';
            block4 = '#friendspositionblock';
            block5 = '#friendsuserblock';
            block6 = '#friendsgamescoreblock';
            block7 = 'myfriendspositionspan';
            scores = allFriendsScores.slice();
            scoresDetailed = allFriendsDetailedScores.slice();
            break;
        case "clubs":
            dropdown = '#clubsScoreLevels';
            settingDropdown = '#clubsScoreSettings';
            block1 = 'clubpositionblockul';
            block2 = 'clubuserblockul';
            block3 = 'clubscoreblockul';
            block4 = '#clubpositionblock';
            block5 = '#clubuserblock';
            block6 = '#clubscoreblock';
            block7 = 'mypositionClubspan';
            // We need to find the scores for the actual club we have selected
            var clubName = $("#select-clubs :selected").val();
            scores = GetClubScores(allClubsScores.slice(), clubName, false);
            scoresDetailed = GetClubScores(allClubsDetailedScores.slice(), clubName, true);
            break;
    }

    var setting = $(settingDropdown + " option:selected").val();

    //The setting is unknown, i.e no details or i dont know
    if (setting === "Unknown") {

        var levels = $(dropdown + " option:selected").val();
        var levelScores = GetLevelScores(scores, levels);
        OrderScores(levelScores, false, levels);
        levelScores = RemoveDuplicateNames(levelScores);
        //By default we show all the scores first
        var overrideScoreDisplay = false;
        if (levels)
        {
            var oppositeToMainGame = IsLevelLeaderboardOverridden(currentGameName, levels);
            if (currentGameType !== "time" && oppositeToMainGame)
            {
                //We are a non time game but with a time level
                overrideScoreDisplay = true;
            }
            else if (currentGameType === "time" && oppositeToMainGame)
            {
                overrideScoreDisplay = true;
            }
        }

        DisplayAllScores(levelScores, block1, block2, block3,
            block4, block5, block6, block7, overrideScoreDisplay);
        AlterControlHeights(levelScores, "", "");
        return;
    }

    //Not an unknown setting - default or otherwise
    var scoresForNewSetting = [];

    for (var i = 0; i < scoresDetailed.length; i++) {
        if (scoresDetailed[i][0] == setting) {

            // Only add Home Arcade Scores to any list. If the location is any particular venue then we
            // probably dont know the settings so only want to show it on the All leaderboard
            if (scoresDetailed[i][4] === "Home Arcade") {
                scoresForNewSetting.push([scoresDetailed[i][1], scoresDetailed[i][2], scoresDetailed[i][3]]);
            }
        }
    }

    var levelValue = $(dropdown + " option:selected").val();
    var levelScores = GetLevelScores(scoresForNewSetting, levelValue);
    OrderScores(levelScores, false, levelValue);
    levelScores = RemoveDuplicateNames(levelScores);

    var overrideScoreDisplay = false;
    if (levels)
    {
        var oppositeToMainGame = IsLevelLeaderboardOverridden(currentGameName, levels);
        if (currentGameType !== "time" && oppositeToMainGame)
        {
            //We are a non time game but with a time level
            overrideScoreDisplay = true;
        }
        else if (currentGameType === "time" && oppositeToMainGame)
        {
            overrideScoreDisplay = true;
        }
    }

    DisplayAllScores(levelScores, block1, block2, block3,
        block4, block5, block6, block7);
    AlterControlHeights(levelScores, "", "");
}