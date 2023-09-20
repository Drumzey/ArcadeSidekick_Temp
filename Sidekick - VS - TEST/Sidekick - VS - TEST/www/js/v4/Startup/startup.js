var whatsNew = false;
var upload = false;
var newfriendsData = false;
var popupsOnStartup = [];

var onlineCalls = 0;

function init() {

    Hide('#uploadScoresMainMenu');

    // TEST ONLY
    //clientUserName = "HAYLEYVOZ";
    //emailAddress = "hayley.vosvenieks@gmail.com";
    //secret = "29aVbiB4Ek4wdWbJtKxvlO7HYrE60tnX5cYF7z0HH90=";
    //firstTime = "no";
    //currentRecord.verified = true;
    //currentRecord.played.push("amidar");
    //currentRecord.played.push("turtles");
    //currentRecord.played.push("berzerk");
    
    //friendsCollection.push("SHAUNHOLLEY");
    //friendsCollection.push("DRUMZEY");
    //friendsCollection.push("CHARLIEFAR");
    //friendsCollection.push("VIRTVIC");
    //myclubs.push('Ten Pence Arcade');
    //myclubs.push('European Gamers');
    //////////////////////////////////

    navigator.splashscreen.hide();
    SetNewThemeInUI();
    GetTimedGames();
    pageHistory.push("#MainMenu");
    if (CheckForFirstTime()) {
        FindInitialPoints();
        popupsOnStartup.push(firstTimePopup);
        StartupFirstTime();
    }
    else {
        CheckForPopups();
        if (AllowedOnline()) {
            StartupSignedInUser();
        }
        else {
            StartupNonRegisteredUser();
        }

    }
}

function StartupFirstTime() {
    var url = newBaseUrl + systemUrl + 'startup/firsttime';

    Call_ArcadeSidekick_Online_Get(
        url,
        SuccessfulStartUpFirstTime,
        UnsuccessfulStartupOnlineCall,
        CompletedStartUp,
        'Please wait...');
}

function SuccessfulStartUpFirstTime() {

    var responseData = JSON.parse(latestXHTTP.responseText);

    // Clubs
    allClubs = responseData.Clubs;
    GetMyClubAdmins(responseData.Clubs);
    ShowAllClubs();

    // Venues
    for (var i = 0; i < responseData.Venues.length; i++) {
        var location = responseData.Venues[i];
        allVenues.push(location);
    }
}

//If we have downloaded the app but not yet registered our username
//then there are 2 possible calls we need to make.
function StartupNonRegisteredUser() {

    FindInitialPoints();

    if (friendsCollection.length > 0) {
        // We are not registered but we do have online friends

        var friendsArray = [];
        var names = "";

        if (friendsCollection.length > 0) {
            for (var i = 0; i < friendsCollection.length; i++) {
                if (friendsCollection[i] !== clientUserName) {
                    friendsArray.push(friendsCollection[i]);
                }
            }
            names = friendsArray.join(",");
        }

        var url = newBaseUrl + systemUrl + 'startup/unregistereduser?friends=' + names;

        Call_ArcadeSidekick_Online_Get(
            url,
            SuccessfulStartNonRegisteredUser,
            UnsuccessfulStartupOnlineCall,
            CompletedStartUp,
            'Please wait...');
    }
    else {
        // We are essentially a brand new startup user, no online user record
        // and no online friends who we follow
        var url = newBaseUrl + systemUrl + 'startup/firsttime';

        Call_ArcadeSidekick_Online_Get(
            url,
            SuccessfulStartUpFirstTime,
            UnsuccessfulStartupOnlineCall,
            CompletedStartUp,
            'Please wait...');
    }
}

function SuccessfulStartNonRegisteredUser() {

    var responseData = JSON.parse(latestXHTTP.responseText);

    // Clubs
    allClubs = responseData.Clubs;
    GetMyClubAdmins(responseData.Clubs);
    ShowAllClubs();

    // Venues
    for (var i = 0; i < responseData.Venues.length; i++) {
        var location = responseData.Venues[i];
        allVenues.push(location);
    }    

    // Friends
    var oldFriendData = JSON.parse(JSON.stringify(friendData));
    AddGamesToFriends(responseData.Friends);
    DoFriendScoreComparison(oldFriendData);
    PopulateFriendsUpdate();
}

function StartupSignedInUser() {
    var friendsArray = [];
    var names = "";

    if (friendsCollection.length > 0) {
        for (var i = 0; i < friendsCollection.length; i++) {
            if (friendsCollection[i] !== clientUserName) {
                friendsArray.push(friendsCollection[i]);
            }
        }
        names = friendsArray.join(",");
    }
    else {
        names = clientUserName;
    }

    var url = newBaseUrl + systemUrl + 'startup/registereduser?username=' + clientUserName + '&friends=' + names + '&clear=false';

    Call_ArcadeSidekick_Online_Get(
        url,
        SuccessfulStartUpSignedInUser,
        UnsuccessfulStartupOnlineCall,
        CompletedStartUp,
        'Please wait...');
}

function SuccessfulStartUpSignedInUser() {

    var responseData = JSON.parse(latestXHTTP.responseText);

    // Clubs
    allClubs = responseData.Clubs;
    GetMyClubAdmins(responseData.Clubs);
    ShowAllClubs();

    // Venues
    for (var i = 0; i < responseData.Venues.length; i++) {
        var location = responseData.Venues[i];
        allVenues.push(location);
    }

    // Messages
    myNotifications = responseData.NewMessages;
    myOldNotifications = responseData.OldMessages;
    if (myNotifications.length === 0) {
        $('#notifications').attr('data-badge', '');
    }
    else {
        $('#notifications').attr('data-badge', myNotifications.length);
    }

    // Stats
    var userData = responseData.Stats;
    var points = CalculatePoints(userData);
    var level = CalculateLevel(points);
    currentlevel = level;
    TurnOffImages(level);
    UpdateProfileUI(level, points);

    // Friends
    var oldFriendData = JSON.parse(JSON.stringify(friendData));
    AddGamesToFriends(responseData.Friends);
    DoFriendScoreComparison(oldFriendData);
    PopulateFriendsUpdate();
}

function CheckForPopups() {
    if (currentVersion !== appVersion) {
        whatsNew = true;
        popupsOnStartup.push(whatsNewPopup);
    }

    if (newGames.length > 0) {
        popupsOnStartup.push(newGamesPopup);
    }

    //If this isnt the first time we have launched the app
    //then we want to check whether we are verified or not
    if (CheckForVerified()) {
        //We are verified so we could have scores that need uploading!
        var scores = currentRecord.scores;
        //var uploadsNeeded = false;
        for (var i = 0; i < scores.length; i++) {

            if (scores[i].uploaded === false &&
                scores[i].score !== '' &&
                scores[i].score !== '0' &&
                scores[i].score !== 0) {
                popupsOnStartup.push(scoresToUploadPopup);
                Show('#uploadScoresMainMenu');
                break;
            }
        }
    }
}

var popupIndex = 0;

function CompletedStartUp() {
    StandardCompleteACOnline();
    //We now have our items that need to show popups and can 1 at a time call them     
    if (popupsOnStartup.length > 0) {
        CreatePopup(popupsOnStartup[popupIndex]);
    }
}

function NextStartupPopup() {
    popupIndex++;
    //Want to set the next popup if there is one.
    if (popupIndex === popupsOnStartup.length) //our index is equal to our length, therefor we have just closed the last popup
    {
        popupsOnStartup = [];
        ClosePopup();
    }
    else {
        SetNextPopUp(popupsOnStartup[popupIndex]);
        ClosePopup();
    }
}

function PostWhatsNew() {
    SetItemInStorage("version", appVersion);
}