function ShowDetailedScoresPage(gameKey, gameName)
{
    PopulateDetailedScoresPage(gameKey, gameName);
    NavigateToInternalPage('#MyDetailedScores');
}

function PopulateDetailedScoresPage(gamekey, gameName)
{
    document.getElementById("detailedGameName").innerText = gameName;

    var scoreCategories = [];
    //for each score get the setting and categorise via setting
    for (i = 0; i < detailedScoreCollection[gamekey].length; i++)
    {
        var settingname = SettingName(detailedScoreCollection[gamekey][i]);
        if (scoreCategories.indexOf(settingname) === -1)
        {
            //New setting category
            scoreCategories[settingName] = [];
        }

        scoreCategories[settingName].push([detailedScoreCollection[gamekey][i].Date, detailedScoreCollection[gamekey][i].Score]);
    }

    var output = [];

    for (var key in scoreCategories) {
        if (scoreCategories.hasOwnProperty(key)) {
            //Add the listdivider
            output.push('<li data-role="list-divider" style="font-size:70%;white-space: normal;text-overflow: clip;" class="ui-li ui-li-static ui-btn-up-c">' + key + '</li>');
            //Add the detailed scores
            for (j = 0; j < scoreCategories[key].length; j++)
            {
                var entry = scoreCategories[key][0] + " " + addComma(scoreCategories[key][1]);
                output.push('<li style="font-size:70%;white-space: normal;text-overflow: clip;" class="ui-li ui-li-static ui-btn-up-c">' + entry + '</li>');
            }
        }
    }

    var outputString = output.join('');
    $('#detailedGameScoresUL').html(outputString).promise().done(function () {
        $(this).listview().listview("refresh");
        $(this).trigger("create");
    });
}

function SettingName(scoreItem)
{
    var settingString = '';
    var settingParts = [];
    if (scoreItem.Difficulty !== null) {
        settingParts.push('Difficulty: ' + scoreItem.Difficulty);
    }
    if (scoreItem.Lives !== null) {
        settingParts.push('Lives: ' + scoreItem.Lives);
    }
    if (scoreItem.ExtraLivesAt !== null) {
        settingParts.push('Extra Live At: ' + scoreItem.ExtraLivesAt);
    }
    if (scoreItem.Credits !== null) {
        settingParts.push('Credits: ' + scoreItem.Credits);
    }
    if (scoreItem.MameOrPCB !== null) {
        settingParts.push('Mame Or PCB: ' + scoreItem.MameOrPCB);
    }

    return settingParts.join(', ');
}