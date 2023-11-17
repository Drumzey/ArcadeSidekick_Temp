function ShowDetailedScoresPage()
{
    var gameKey = TransformedCurrentGameName();
    var gameName = currentGameName;

    if (DoesGameHaveScores(gameKey)) {
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

function PopulateDetailedScoresPage(gameKey, gameName)
{
    RemoveAllChildren('detailedGameScoresUL');
    document.getElementById("detailedGameName").innerText = gameName;

    var output = [];

    //Firstly Add the Top Score
    output = AddTopScoreToDetailsPage(output, gameKey);

    //Then add any detailed scores if we have them including their settings
    if (GameHasDetailedScores()) {
        output = AddDetailedScores(output, gameKey);
    }

    var outputString = output.join('');
    $('#detailedGameScores').children('ul').append(outputString);
    $('#detailedGameScores').children('ul').listview().listview('refresh');
}

function AddTopScoreToDetailsPage(output, gameName) {

    var topScore = '';

    if (GameIsATimedGame()) {
        topScore = MillisecondsToMinutesSecondsMilliseconds(GetGameTopScore(gameName));
    }
    else {
        topScore = addComma(GetGameTopScore(gameName));
    }

    output.push('<li data-role="list-divider" style="font-size:70%;white-space: normal;text-overflow: clip;" class="ui-li ui-li-static ui-btn-up-c ui-li-divider ui-bar-inherit">Top Score</li>');
    output.push('<li style="font-size:70%;white-space: normal;text-overflow: clip;" class="ui-li ui-li-static ui-btn-up-c ui-body-inherit">' + topScore + '</li>');
    return output;
}

function AddDetailedScores(output, gamekey) {
    var scoreCategories = [];
    //for each score get the setting and categorise via setting
    for (i = 0; i < detailedScoreCollection[gamekey].length; i++) {
        var settingName = SettingName(detailedScoreCollection[gamekey][i]);
        if (!scoreCategories[settingName]) {
            //New setting category
            scoreCategories[settingName] = [];
        }

        scoreCategories[settingName].push([detailedScoreCollection[gamekey][i].Date, detailedScoreCollection[gamekey][i].Score, detailedScoreCollection[gamekey][i].LevelName]);
    }

    for (var key in scoreCategories) {
        if (key === "Default settings") {
            if (scoreCategories.hasOwnProperty(key)) {
                output = GetDetailedItem(output, scoreCategories, "Default settings");
            }
        }
    }

    for (var key in scoreCategories) {
        if (key === "Default settings")
            continue;

        if (scoreCategories.hasOwnProperty(key)) {
            output = GetDetailedItem(output, scoreCategories, key);
        }
    }    

    return output;
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

        output = GetOutPutForLevel(fullGameScores, output, timedLevel, "FULL GAME");
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
        
        output = GetOutPutForLevel(scores, output, timedLevel, levels[l]);
    }

    return output;
}

function GetScoresForLevel(scoreCategories, key, levelName)
{
    // The data here is used as the key to the data when we want to delete it
    // so we want to include as much info in our scores as possible
    var scores = [];
        for (i = 0; i < scoreCategories[key].length; i++) {
            if (scoreCategories[key][i][2] === levelName)
            {
                var score = scoreCategories[key][i][0];
                var date = scoreCategories[key][i][1];
                var difficulty = FromSettingString(key)[0] !== "" ? FromSettingString(key)[0] : "NA";
                var lives = FromSettingString(key)[1] !== "" ? FromSettingString(key)[1] : "NA";
                var extra = FromSettingString(key)[2] !== "" ? FromSettingString(key)[2] : "NA";
                var credits = FromSettingString(key)[3] !== "" ? FromSettingString(key)[3] : "NA";
                var emulated = FromSettingString(key)[4] !== "" ? FromSettingString(key)[4] : "NA";
                scores.push([score, date, difficulty, lives, extra, credits, emulated]);
            }
        }

    return scores;
}

function GetOutPutForLevel(scores, output, timed, level)
{
    //If we are a timed level then this needs to be different!
    var orderedList = scores.sort((a, b) => (a[1] > b[1]) ? -1 : 1);
    if (timed)
    {
        orderedList = scores.sort((a, b) => (a[1] > b[1]) ? 1 : -1);
    }

    for (j = 0; j < orderedList.length; j++) {

        var score = '';
        var key = '';

        if (timed)
        {
            score = MillisecondsToMinutesSecondsMilliseconds(orderedList[j][1]);
            key = orderedList[j][1];
        }
        else
        {
            score = addComma(orderedList[j][1]);
            key = addComma(orderedList[j][1]);
        }

        var id = key + "__" + orderedList[j][0] + "__" + level + "__" + orderedList[j][2] + "__" + orderedList[j][3] + "__" + orderedList[j][4] + "__" + orderedList[j][5] + "__" + orderedList[j][6];

        output.push(' \
                <li style="font-size:70%;white-space: normal;text-overflow: clip;" class="ui-li ui-li-static ui-btn-up-c ui-body-inherit"> \
                  <div style="white-space:pre-line;" class="ui-grid-b"> \
                    <div style="width:65%;" class="ui-block-a">' + score + '</div> \
                    <div style="width:25%;" class="ui-block-b">' + orderedList[j][0] + '</div> \
                    <div style="width:10%;" class="ui-block-c"> \
                      <a id="' + id + '" onclick="DeleteHighscorePrompt(this.id)" class="ui-btn ui-shadow ui-corner-all ui-icon-delete ui-btn-icon-notext" style="margin:0"></a> \
                    </div > \
                </div> \
                </li>');
    }

    return output;
}

var keyToRemove = '';
var scoreToRemove = '';

function DeleteHighscorePrompt(key) {

    keyToRemove = key;
    var score = FindDetailedScore(keyToRemove);

    var topScore = GetGameTopScore(TransformedCurrentGameName());
    if (topScore === score.Score) {
        // If we are deleting the top score then we need to find the next biggest detailed score
        // to set to the simple score.
        CreatePopup(deleteTopScore);
    }
    else {
        CreatePopup(deleteDetailedScore);
    }
}

function DeleteHighscore(replaceWithNextHighest) {

    var score = FindDetailedScore(keyToRemove);

    if (score === '') {
        // We couldnt find the score so we cant delete it
        SetNextPopUp(errorOnDelete);
        ClosePopup();
        return;
    }

    scoreToRemove = score;

    if (AllowedOnline()) {
        var body = {
            'GameName': TransformedCurrentGameName(),
            'UserName': clientUserName,
            'Score': score.Score,
            'Date': score.Date,
            'Location': score.Location,
            'LevelName': score.LevelName,
            'EventName': score.Event,
            'Difficulty': score.Difficulty,
            'Lives': score.Lives,
            'ExtraLivesAt': score.ExtraLivesAt,
            'MameOrPCB': score.MameOrPCB,
            'Credits': score.Credits
        };

        if (replaceWithNextHighest) {
            DeleteDetailedScoreSubmissionAndReplaceWithNextHighest(body);
        }
        else {
            DeleteDetailedScoreSubmission(body);
        }
    }
    else {
        // Remove locally and set simple score to be next highest score
        RemoveDetailedScoreLocally();
        if (replaceWithNextHighest) {
            ReplaceScoreWithNextHighest();
        }
    }
}

function ReplaceScoreWithNextHighest() {
    // We are removing a previous score and now want to replace it with the next highest
    // This next highest score is going to be a detailed score as if this was our highest score
    // then the simple score would have been replaced by it.
    var score = GetTopDetailedScore(TransformedCurrentGameName());
    SetGameScoreEntry(TransformedCurrentGameName(), score);
    if (GameIsATimedGame()) {
        var timescore = MillisecondsToMinutesSecondsMilliseconds(score);
        var split = timescore.split(":");
        var local_minutes = split[0];
        split = split[1].split(".");
        var local_seconds = ("00" + split[0]).slice(-2);
        var local_micro = ("000" + split[1]).slice(-3);
        document.getElementById('minutes').innerText = local_minutes;
        document.getElementById('seconds').innerText = local_seconds;
        document.getElementById('micro').innerText = local_micro;
        SaveLocalTime(true);
    }
    else {
        SetGameScore(score);
    }
    PopulateDetailedScoresPage(TransformedCurrentGameName(), currentGameName);
    return score;
}

function SetGameScoreEntry(gameName, newScore) {

    var scores = currentRecord.scores;

    for (var i = 0; i < scores.length; i++) {
        var gameid = scores[i].id;

        if (gameid === gameName) {
            scores[i].score = newScore;
        }
    }

    SetItemInStorage("my_record", currentRecord);
}

function RemoveDetailedScoreLocally() {
    var index = FindDetailedScoreIndex(scoreToRemove);

    if (index === -1) {
        SetNextPopUp(errorOnDelete);
        ClosePopup();
    }
    else {
        detailedScoreCollection[TransformedCurrentGameName()].splice(index, 1);
        SetItemInStorage("detailedScoreCollection", detailedScoreCollection);

        var gameKey = TransformedCurrentGameName();
        var gameName = currentGameName;
        PopulateDetailedScoresPage(gameKey, gameName);
        $('#detailedGameScores').children('ul').listview().listview('refresh');
        ClosePopup();
    }
}

function FindDetailedScoreIndex() {
    var scoresForGame = detailedScoreCollection[TransformedCurrentGameName()];

    for (i = 0; i < scoresForGame.length; i++) {

        if (scoresForGame[i].Score === scoreToRemove.Score &&
            scoresForGame[i].Date === scoreToRemove.Date &&
            scoresForGame[i].Location === scoreToRemove.Location &&
            scoresForGame[i].LevelName === scoreToRemove.LevelName &&
            scoresForGame[i].Event === scoreToRemove.Event &&
            scoresForGame[i].Difficulty === scoreToRemove.Difficulty &&
            scoresForGame[i].Lives === scoreToRemove.Lives &&
            scoresForGame[i].ExtraLivesAt === scoreToRemove.ExtraLivesAt &&
            scoresForGame[i].MameOrPCB === scoreToRemove.MameOrPCB &&
            scoresForGame[i].Credits === scoreToRemove.Credits) {
            return i;
        }
    }

    return -1;
}

function FindDetailedScore(key) {

    var score = key.split("__")[0].replace(new RegExp(',', 'g'), '');
    var date = key.split("__")[1];
    var level = key.split("__")[2];
    var difficulty = key.split("__")[3] !== "NA" ? key.split("__")[3] : "";
    var lives = key.split("__")[4] !== "NA" ? key.split("__")[4] : "";
    var extra = key.split("__")[5] !== "NA" ? key.split("__")[5] : "";
    var credits = key.split("__")[6] !== "NA" ? key.split("__")[6] : "";
    var emulated = key.split("__")[7] !== "NA" ? key.split("__")[7] : "";

    var scoresForGame = detailedScoreCollection[TransformedCurrentGameName()];
    var matchingScore = scoresForGame.filter(el =>
        el.Score === score &&
        el.Date === date &&
        el.LevelName === level &&
        el.Difficulty === difficulty &&
        el.Lives === lives &&
        el.ExtraLivesAt === extra &&
        el.Credits === credits &&
        el.MameOrPCB === emulated);

    if (matchingScore.length === 0) {
        // We cant find the score.... ERROR
        return '';
    }
    else if (matchingScore.length === 1) {
        // We have one score that matches our current one
        return matchingScore[0];
    }
    else {
        // We have multiple scores that match
        // So we have scored the exact same score on the same game settings on the same day twice....
        // unlikely but could be user error.
        return matchingScore[0];
    }
}

function SuccessfulDeleteScore() {
    RemoveDetailedScoreLocally();
    ClosePopup();
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
    if (scoreItem.ExtraLivesAt !== null && scoreItem.ExtraLivesAt !== "") {
        settingParts.push('Extra Lives At: ' + scoreItem.ExtraLivesAt);
    }
    if (scoreItem.Credits !== null && scoreItem.Credits !== "") {
        settingParts.push('Credits: ' + scoreItem.Credits);
    }
    if (scoreItem.MameOrPCB !== null && scoreItem.MameOrPCB !== "") {
        settingParts.push(scoreItem.MameOrPCB);
    }

    if (settingParts.length === 0)
    {
        return "Default settings";
    }

    return settingParts.join(' - ');
}