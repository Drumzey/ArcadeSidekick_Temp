var detailedScoreCollection = [];
var setPresentation = false;

function AddDetailedScore()
{
    //Show the existing settings section
    Show('#ExistingSettings');

    //Show or hide the club event dropdowns
    if (DoClubsHaveEvents()) {
        Show('#ClubEvent');
    }
    else
    {
        Hide('#ClubEvent');
    }

    //Set text fields
    document.getElementById('score').value = '';
    document.getElementById('minutesDetailed').value = '';
    document.getElementById('secondsDetailed').value = '';
    document.getElementById('microDetailed').value = '';
    document.getElementById('levelname').value = '';
    document.getElementById('difficulty').value = '';
    document.getElementById('lives').value = '';
    document.getElementById('extralives').value = '';
    document.getElementById('credits').value = '';

    //Set drop downs
    $("#location").val($("#location option:first").val());
    $("#mameorpcb").val($("#mameorpcb option:first").val());
    $("#events").val($("#events option:first").val());
    $("#clubs").val($("#clubs option:first").val());

    //Populate the existing settings for this game in the drop down
    //then show the popup.
    PopulateExistingSettings();    
}

function SetGameLevel()
{
    var selectedLevel = $("#existinglevels option:selected").val();
    if (selectedLevel === 'NEW LEVEL') {
        Show('#levelnamediv');
    }
    else {
        Hide('#levelnamediv');
    }

    //If our level a level that has a different type that the main game? i.e track and field 100M?
    //If we are a timed game we want to show the timed div, otherwise normal
    var override = IsLevelLeaderboardOverridden(currentGameName, selectedLevel);
    if (timed.indexOf(TransformedCurrentGameName()) === -1)
    {
        //We are not a timed game, but what if the level is?
        if(override)
        {
            Show('#detailedTimedDiv');
            Hide('#detailedScoreDiv');
        }
        else
        {
            Hide('#detailedTimedDiv');
            Show('#detailedScoreDiv');
        }
    }
    else
    {
        //We are a timed game, but what if the level is?
        if(override)
        {
            Hide('#detailedTimedDiv');
            Show('#detailedScoreDiv');
        }
        else
        {
            Hide('#detailedScoreDiv');
            Show('#detailedTimedDiv');
        }
    }
}

function SetArcadeLocation()
{
    detailedLocation = $("#location option:selected").val();

    if (detailedLocation === "Select Venues")
    {
        GotoVenues();
    }
    else if (detailedLocation !== 'Home Arcade') {
        Hide('#ExistingSettings');
    }
    else {
        Show('#ExistingSettings');
    }  
}

var detailedScore = '';
var detailedLocation = '';
var detailedDate = '';
var detailedDifficulty = '';
var detailedLives = '';
var detailedExtraLivesAt = '';
var detailedLevelName = '';
var detailedCredits = '';
var detailedMameOrPCB = '';
var detailedEvent = '';

var clubsWithEvents = [];
function DoClubsHaveEvents()
{
    clubsWithEvents = [];
    var returnValue = false;
    //If you are a member of any clubs, and if that club has registered events then you can select them here
    for (var i = 0; i < allClubs.length; i++)
    {
        if (myclubs.indexOf(allClubs[i].Name) !== -1)
        {
            //We are a member of this club
            //Now does this club have any events active?
            if (allClubs[i].Events !== undefined && allClubs[i].Events !== null && allClubs[i].Events.length > 0)
            {
                //This club has an event that you might want to log a score for
                clubsWithEvents[allClubs[i].Name] = allClubs[i].Events;
                returnValue = true;
            }
        }
    }    

    return returnValue;
}

function DetailedScoreSubmit()
{
    var selectedLevel = $("#existinglevels option:selected").val();
    if (selectedLevel === 'NEW LEVEL') {
        detailedLevelName = document.getElementById('levelname').value;
    }
    else
    {
        detailedLevelName = selectedLevel;
    }

    var override = IsLevelLeaderboardOverridden(currentGameName, detailedLevelName);
    if (timed.indexOf(TransformedCurrentGameName()) === -1)
    {
        //We are not a timed game
        if (override)
        {
            detailedScore = GetDetailedTime();
        }
        else
        {
            detailedScore = document.getElementById('score').value;
        }
    }
    else
    {
        //We are a timed game but are override to be a score level
        if (override)
        {
            detailedScore = document.getElementById('score').value;
        }
        else
        {
            detailedScore = GetDetailedTime();
        }
    }
    
    detailedLocation = $("#location option:selected").val();
    
    var setting = $("#existingsetting option:selected").val();
    if (setting === "I dont know") {
        detailedDifficulty = '';
        detailedLives = '';
        detailedExtraLivesAt = '';
        detailedCredits = '';
        detailedMameOrPCB = '';
    }
    else {
        detailedDifficulty = document.getElementById('difficulty').value;
        detailedLives = document.getElementById('lives').value;
        detailedExtraLivesAt = document.getElementById('extralives').value;
        detailedCredits = document.getElementById('credits').value;
        detailedMameOrPCB = $("#mameorpcb option:selected").val();
    }      

    var dateObject = $('#detailedDateBox').datebox('getTheDate'),
        theDate = $('#detailedDateBox').datebox('callFormat', '%m/%d/%Y', dateObject);
    detailedDate = theDate;

    //Pre-pend the name of the club to the event
    detailedEvent = $("#clubsSelect option:selected").val() + "___" + $("#clubsevents option:selected").val();
    Submit();
}

function GetDetailedTime()
{
    var minutes = document.getElementById('minutesDetailed').value;
    var seconds = document.getElementById('secondsDetailed').value;
    var micro = document.getElementById('microDetailed').value;

    if (minutes === '') {
        minutes = '0';
    }

    if (seconds === '') {
        seconds = '00';
    }

    if (micro === '') {
        micro = '000';
    }

    var score = parseInt(micro) + (parseInt(seconds) * 1000) + (parseInt(minutes) * 60000);
    return score;
}

function Submit()
{
    if (!ValidateScoreSubmission())
    {
        CreatePopup(detailedScoreError);
        return;
    }

    SaveScoreLocally();
    if (AllowedOnline()) {
        PostDetailedScoreSubmission();
    }

    PopulateHighestDetailedScoreInGame();
    NavigateBack();
}

function PopulateHighestDetailedScoreInGame()
{
    var topScore = GetTopDetailedScore();
    document.getElementById('topDetailedScore').value = addComma(topScore);
}

function GetTopDetailedScore(gameName)
{
    var topScore = "0";

    if (!gameName)
    {
        gameName = TransformedCurrentGameName();
    }

    if (detailedScoreCollection[gameName]) {
        //Refresh the game screen to show the highest detailed score
        for (i = 0; i < detailedScoreCollection[gameName].length; i++) {
            var savedScore = detailedScoreCollection[gameName][i];
            //Only pick out a Full Game score
            if (savedScore.LevelName === "FULL GAME")
            {
                if (parseInt(savedScore.Score) > parseInt(topScore)) {
                    topScore = savedScore.Score;
                }
            }
        }
    }

    return topScore;
}

function ValidateScoreSubmission()
{
    // If the score is blank then the submission is not valid - detailedScore
    if (detailedScore === null || detailedScore === '')
    {
        return false;
    }

    var parsed = parseInt(detailedScore);
    if (isNaN(parsed))
    {
        return false;
    }

    if (parsed <= 0)
    {
        return false;
    }

    return true;
}

function ToSettingString(setting)
{
    var settingString = '';
    var settingParts = [];
    if (setting.Difficulty !== null) {
        settingParts.push('Difficulty: ' + setting.Difficulty);
    }
    if (setting.Lives !== null) {
        settingParts.push('Lives: ' + setting.Lives);
    }
    if (setting.ExtraLivesAt !== null) {
        settingParts.push('Extra Lives At: ' + setting.ExtraLivesAt);
    }
    if (setting.Credits !== null) {
        settingParts.push('Credits: ' + setting.Credits);
    }
    if (setting.MameOrPCB !== null) {
        settingParts.push(setting.MameOrPCB);
    }

    return settingParts.join(' - ');
}

function FromSettingString(string)
{
    var str = string.split(' - ');

    var diff = '';
    var lives = '';
    var ext = '';
    var credits = '';
    var mame = '';

    for (var i = 0; i < str.length; i++)
    {
        if (str[i].startsWith("Difficulty: ")) {
            diff = str[i].replace("Difficulty: ", "");
        }
        if (str[i].startsWith("Lives: ")) {
            lives = str[i].replace("Lives: ", "");
        }
        if (str[i].startsWith("Extra Lives At: ")) {
            ext = str[i].replace("Extra Lives At: ", "");
        }
        if (str[i].startsWith("Credits: ")) {
            credits = str[i].replace("Credits: ", "");
        }
        if (str[i] === "EMULATED" || str[i] === "PCB") {
            mame = str[i];
        }
    }
    
    return [diff,lives,ext,credits,mame];
}

function PopulateExistingSettings()
{
    //Remove all existing options    
    $('#existinglevels').find('option').remove();
    $('#existingsetting').find('option').remove();
    $('#location').find('option').remove();
    $('#mameorpcb').find('option').remove();
    onlineCalls = 2;
    detailedhaserrored = false;
    PopulateMameOrPCB();
    PopulateClubs();
    PopulateVenues();
    GetExistingLevels();
    GetExistingSettings();
    
    //If we are a timed game we want to show the timed div, otherwise normal
    if (timed.indexOf(TransformedCurrentGameName()) === -1)
    {
        Hide('#detailedTimedDiv');
        Show('#detailedScoreDiv');
    }
    else
    {
        Hide('#detailedScoreDiv');
        Show('#detailedTimedDiv');
    }
}

function PopulateVenues()
{
    $('#location').append($('<option>', {
        value: 'Home Arcade',
        text: 'Home Arcade'
    }));

    if (myVenues.length === 0) {
        var location = myVenues[i];
        $('#location').append($('<option>', {
            value: "Select Venues",
            text: "Select Venues"
        }));
    }
    else {
        for (var i = 0; i < myVenues.length; i++) {
            var location = myVenues[i];
            $('#location').append($('<option>', {
                value: location,
                text: location
            }));
        }
    }
}

function PopulateMameOrPCB() {
    $('#mameorpcb').append($('<option>', {
        value: "EMULATED",
        text: "EMULATED"
    }));

    $('#mameorpcb').append($('<option>', {
        value: "PCB",
        text: "PCB"
    }));
}

function PopulateClubs()
{
    $('#clubsSelect').append($('<option>', {
        value: "N/A",
        text: "N/A"
    }));

    for (var property in clubsWithEvents)    
    {
        if (clubsWithEvents.hasOwnProperty(property)) {
            $('#clubsSelect').append($('<option>', {
                value: property,
                text: property
            }));
        }
    }    

    PopulateEvents("N/A");
}

function ClubSelected()
{
    var selectedClub = $("#clubsSelect option:selected").val();
    PopulateEvents(selectedClub);
}

function PopulateEvents(selectedClub)
{
    if (selectedClub === "N/A")
    {
        Hide('#ClubEventSelect');
    }
    else
    {
        Show('#ClubEventSelect');
        for (var property in clubsWithEvents)
        {
            if (property === selectedClub) {
                for (var i = 0; i < clubsWithEvents[property].length; i++) {
                    $('#clubsevents').append($('<option>', {
                        value: clubsWithEvents[property][i],
                        text: clubsWithEvents[property][i]
                    }));
                }
            }
        }
    }
}

function SetSettingValues()
{
    var setting = $("#existingsetting option:selected").val();
    var mame = $('#mameorpcb');

    if (setting === "I dont know")
    {
        Hide('#SettingsGroup');
        return;
    }

    Show('#SettingsGroup');

    if (setting === "New Setting")
    {
        document.getElementById('difficulty').value = '';
        document.getElementById('lives').value = '';
        document.getElementById('extralives').value = '';
        document.getElementById('credits').value = '';         
        mame.val('EMULATED').attr('selected', true).siblings('option').removeAttr('selected');
        mame.selectmenu("refresh", true);
        document.getElementById('difficulty').disabled = false;
        document.getElementById('lives').disabled = false;
        document.getElementById('extralives').disabled = false;        
        document.getElementById('credits').disabled = false;
        document.getElementById('mameorpcbinput').disabled = false;        
        Hide('#mameorpcbinputparent');
        Show('#mameorpcbparent');
        return;
    }

    Show('#mameorpcbinputparent');
    Hide('#mameorpcbparent');

    var values = FromSettingString(setting);
    //Set the values of the other items
    document.getElementById('difficulty').value = values[0];
    document.getElementById('lives').value = values[1];
    document.getElementById('extralives').value = values[2];
    document.getElementById('credits').value = values[3];
    document.getElementById('mameorpcbinput').value = values[4];
    mame.val(values[4]).attr('selected', true).siblings('option').removeAttr('selected');
    //mame.selectmenu("refresh", true);

    //Put them in readonly
    document.getElementById('difficulty').disabled = true;
    document.getElementById('lives').disabled = true;
    document.getElementById('extralives').disabled = true;    
    document.getElementById('credits').disabled = true;
    document.getElementById('mameorpcbinput').disabled = true;
    //$("#mameorpcb").prop("disabled", true);
    //$("#mameorpcb").attr('disabled', true);
}

function SaveScoreLocally()
{
    var newScore = new DetailedScore();
    newScore.Score = detailedScore;
    newScore.Date = detailedDate;
    newScore.LevelName = detailedLevelName;
    newScore.Difficulty = detailedDifficulty;
    newScore.Lives = detailedLives;
    newScore.ExtraLives = detailedExtraLivesAt;
    newScore.Credits = detailedCredits;
    newScore.Location = detailedLocation;
    newScore.Event = detailedEvent;
    newScore.MameOrPCB = detailedMameOrPCB;

    if (!detailedScoreCollection[TransformedCurrentGameName()])
    {
        detailedScoreCollection[TransformedCurrentGameName()] = [];
    }

    detailedScoreCollection[TransformedCurrentGameName()].push(newScore);
    SetItemInStorage("detailedScoreCollection", detailedScoreCollection);
}