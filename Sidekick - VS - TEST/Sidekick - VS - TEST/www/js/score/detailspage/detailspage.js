function ShowDetailedScoresPage()
{
    if (detailedScoreCollection[TransformedCurrentGameName()]) {
        var gameKey = TransformedCurrentGameName();
        var gameName = currentGameName;
        PopulateDetailedScoresPage(gameKey, gameName);
        NavigateToInternalPage('#MyDetailedScores');
        $('#detailedGameScores').children('ul').listview().listview('refresh');
    }
    else
    {
        CreatePopup(noDetailedScoresError);
        return;
    }
}

function PopulateDetailedScoresPage(gamekey, gameName)
{
    RemoveAllChildren('detailedGameScoresUL');
    document.getElementById("detailedGameName").innerText = gameName;

    var scoreCategories = [];
    //for each score get the setting and categorise via setting
    for (i = 0; i < detailedScoreCollection[gamekey].length; i++)
    {
        var settingName = SettingName(detailedScoreCollection[gamekey][i]);
        if (!scoreCategories[settingName])
        {
            //New setting category
            scoreCategories[settingName] = [];
        }

        scoreCategories[settingName].push([detailedScoreCollection[gamekey][i].Date, detailedScoreCollection[gamekey][i].Score, detailedScoreCollection[gamekey][i].LevelName]);
    }

    var output = [];

    for (var key in scoreCategories) {
        if (key === "Unknown settings") //Put unknowns at the end
            continue;

        if (scoreCategories.hasOwnProperty(key)) {
            output = GetDetailedItem(output, scoreCategories, key);
        }
    }

    for (var key in scoreCategories) {
        if (key === "Unknown settings") //Put unknowns at the end
        {
            if (scoreCategories.hasOwnProperty(key)) {
                output = GetDetailedItem(output, scoreCategories, key);
            }
        }
    }

    var outputString = output.join('');
    $('#detailedGameScores').children('ul').append(outputString);
    $('#detailedGameScores').children('ul').listview().listview('refresh');
}

function GetDetailedItem(output, scoreCategories, key)
{
    //Add the listdivider
    output.push('<li data-role="list-divider" style="font-size:70%;white-space: normal;text-overflow: clip;" class="ui-li ui-li-static ui-btn-up-c ui-li-divider ui-bar-inherit">' + key + '</li>');

    //Grab All Levels for this setting
    var levels = [];
    for (i = 0; i < scoreCategories[key].length; i++) {
        if (levels.indexOf(scoreCategories[key][i][2]) === -1)
        {
            if(scoreCategories[key][i][2] !== "FULL GAME")
            {
                levels.push(scoreCategories[key][i][2]);
            }
        }
    }

    //Firstly we need to grab all the FULL GAME scores
    var fullGameScores = GetScoresForLevel(scoreCategories, key, "FULL GAME");
    if(fullGameScores.length > 0)
    {
        output.push('<li data-role="list-divider" style="font-size:70%;white-space: normal;text-overflow: clip;" class="ui-li ui-li-static ui-btn-up-c ui-li-divider ui-bar-inherit">FULL GAME</li>');
        
        var override = IsLevelLeaderboardOverridden(currentGameName, "FULL GAME");
        var timedLevel = false;
        if (timed.indexOf(TransformedCurrentGameName()) === -1)
        {
            if(override)
            {
                timedLevel = true;
            }
        }
        else
        {
            timedLevel = true;
            if(override)
            {
                timedLevel = false;
            }
        }

        output = GetOutPutForLevel(fullGameScores, output, timedLevel);
    }

    //Then for each other level do the scores
    for (l = 0; l < levels.length; l++)
    {
        var scores = GetScoresForLevel(scoreCategories, key, levels[l]);
        output.push('<li data-role="list-divider" style="font-size:70%;white-space: normal;text-overflow: clip;" class="ui-li ui-li-static ui-btn-up-c ui-li-divider ui-bar-inherit">' + levels[l] + '</li>');
        
        var override = IsLevelLeaderboardOverridden(currentGameName, levels[l]);
        var timedLevel = false;
        if (timed.indexOf(TransformedCurrentGameName()) === -1)
        {
            if(override)
            {
                timedLevel = true;
            }
        }
        else
        {
            timedLevel = true;
            if(override)
            {
                timedLevel = false;
            }
        }
        
        output = GetOutPutForLevel(scores, output, timedLevel);
    }

    return output;
}

function GetScoresForLevel(scoreCategories, key, levelName)
{
    var scores = [];
        for (i = 0; i < scoreCategories[key].length; i++) {
            if (scoreCategories[key][i][2] === levelName)
            {
                scores.push([scoreCategories[key][i][0], scoreCategories[key][i][1]]);
            }
        }

    return scores;
}

function GetOutPutForLevel(scores, output, timed)
{
    //If we are a timed level then this needs to be different!
    var orderedList = scores.sort((a, b) => (a[1] > b[1]) ? -1 : 1);
    if (timed)
    {
        orderedList = scores.sort((a, b) => (a[1] > b[1]) ? 1 : -1);
    }

    for (j = 0; j < orderedList.length; j++) {

        var score = '';

        if (timed)
        {
            score = MillisecondsToMinutesSecondsMilliseconds(orderedList[j][1]);
        }
        else
        {
            score = addComma(orderedList[j][1]);
        }

        output.push(' \
                <li style="font-size:70%;white-space: normal;text-overflow: clip;" class="ui-li ui-li-static ui-btn-up-c ui-body-inherit"> \
                <div style="white-space:pre-line;" class="ui-grid-b"> \
                        <div style="width:75%;" class="ui-block-a">' + score + '</div> \
                        <div style="width:25%;" class="ui-block-b">' + orderedList[j][0] + '</div> \
                </div> \
                </li>');
    }

    return output;
}

function SettingName(scoreItem)
{
    var settingString = '';
    var settingParts = [];
    if (scoreItem.Difficulty !== null && scoreItem.Difficulty !== "") {
        settingParts.push('Difficulty: ' + scoreItem.Difficulty);
    }
    if (scoreItem.Lives !== null && scoreItem.Lives !== "") {
        settingParts.push('Lives: ' + scoreItem.Lives);
    }
    if (scoreItem.ExtraLives !== null && scoreItem.ExtraLives !== "") {
        settingParts.push('Extra Live At: ' + scoreItem.ExtraLives);
    }
    if (scoreItem.Credits !== null && scoreItem.Credits !== "") {
        settingParts.push('Credits: ' + scoreItem.Credits);
    }
    if (scoreItem.MameOrPCB !== null && scoreItem.MameOrPCB !== "") {
        settingParts.push(scoreItem.MameOrPCB);
    }

    if (settingParts.length === 0)
    {
        return "Unknown settings";
    }

    return settingParts.join(', ');
}