var whatsNew = false;
var upload = false;
var newfriendsData = false;
var popupsOnStartup = [];

var onlineCalls = 0;
var startuphaserrored = false;

function init() {

    Hide('#uploadScoresMainMenu');

    //TEST ONLY
    //clientUserName = "DRUMZEY";
    //firstTime = "no";
    //currentRecord.verified = true;    

    //var playedArray = currentRecord.played;
    //playedArray.push("amidar");
    //playedArray.sort();

    //var scoreArray = currentRecord.scores;
    //var x = new Scores();
    //x.id = "amidar";
    //x.score = "1000";
    //x.uploaded = true;
    //scoreArray.push(x);

    //var ratingsArray = currentRecord.ratings;
    //var y = new Ratings();
    //y.id = "amidar";
    //y.rating = 10;
    //ratingsArray.push(y);

    //currentRecord.played = playedArray;
    //currentRecord.scores = scoreArray;
    //currentRecord.ratings = ratingsArray;

    //friendsCollection.push("SHAUNHOLLEY");
    //myclubs.push('Ten Pence Arcade');
    //myclubs.push('European Gamers');
    //////////////////////////////////

    navigator.splashscreen.hide();
    SetNewThemeInUI();
    pageHistory.push("#MainMenu");
    if (CheckForFirstTime()) {
        CreatePopup(firstTimePopup);
        FindInitialPoints();
    }
    else {
        CallOnlineOnStartUp();

        if (!AllowedOnline()) {
            FindInitialPoints();
        }

        CheckForPopups();

        if (onlineCalls === 0) {
            if (popupsOnStartup.length > 0) {
                CompletedStartUp();
            }
        }
    }
}

function CallOnlineOnStartUp() {
    //Calculate how many calls to online we need to make.        
    if (friendsCollection !== null && friendsCollection.length !== 0) {
        onlineCalls++;
    }
    if (AllowedOnline()) {
        onlineCalls++; //Get Stats
        onlineCalls++; //Get Messages
    }
    onlineCalls++; //GetClubsOnStartup

    if (onlineCalls > 0) {
        //only call friends scores if we have friends
        if (friendsCollection !== null && friendsCollection.length !== 0) {
            LoadFriendsGames();
        }

        if (AllowedOnline()) {
            SideKickOnline_GetProfileStatsOnStartUp();
            SideKickOnline_MyMessagesStartup();
        }
        SideKickOnline_AllClubsStartup();
    }
}

function CheckForPopups() {
    if (currentVersion !== appVersion) {
        whatsNew = true;
        popupsOnStartup.push(whatsNewPopup);
    }

    if (newGames.length > 0)
    {
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

function LoadFriendsGames() {
    var friendsArray = [];

    if (friendsCollection.length > 0) {
        for (var i = 0; i < friendsCollection.length; i++) {
            if (friendsCollection[i] !== clientUserName) {
                friendsArray.push(friendsCollection[i]);
            }
        }
        var names = friendsArray.join(",");
        SideKickOnline_GetFriendsScoresOnStartUp(names, "Please wait....");
    }
}

function PostWhatsNew() {
    SetItemInStorage("version", appVersion);
}

