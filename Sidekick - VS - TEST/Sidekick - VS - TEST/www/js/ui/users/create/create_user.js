var refreshMyScores = 0;
var refreshGame = 0;
var retryMode = "";

function SetupUserName() {
    if (clientUserName !== '' && clientUserName !== null)
        return;

    TryAndSetupUserName();
}

function TryAndSetupUserName() {

    retryMode = "NEW";

    if (!CheckFieldValid('Username', 'myusername_newuser', true))
        return;

    if (!CheckFieldValid('Email address', 'myemail_newuser', true))
        return;

    if (!CheckFieldValid('Email address', 'myconfirmemail_newuser', true))
        return;
    
    var email = document.getElementById("myemail_newuser").value.toLowerCase();
    var emailConfirm = document.getElementById("myconfirmemail_newuser").value.toLowerCase();

    if (email !== emailConfirm) {
        var popup = signInUserErrorPopup.replace("***", "Emails do not match.");
        SetNextPopUp(popup);
        ClosePopup();
        return;
    }

    var userName = document.getElementById("myusername_newuser").value;
    var emailAddress = document.getElementById("myemail_newuser").value;
    var twitter = document.getElementById("mytwitter_newuser").value;

    if (twitter.indexOf(' ') !== -1) {
        var popup = signInUserErrorPopup.replace("***", "Twitter handle cannot include spaces");
        SetNextPopUp(popup);
        ClosePopup();
        return false;
    }

    userName = userName.toUpperCase();
    emailAddress = emailAddress.toLowerCase();
    twitter = twitter.toLowerCase();

    SideKickOnline_NewUser(userName, emailAddress, twitter);
}

function CheckFieldValid(name, id, doSpaceCheck) {

    var field = document.getElementById(id).value;

    if (field === '') {
        var popup = signInUserErrorPopup.replace("***", name + " cannot be blank");
        SetNextPopUp(popup);
        ClosePopup();
        return false;
    }

    if (doSpaceCheck) {
        if (field.indexOf(' ') !== -1) {
            var popup = signInUserErrorPopup.replace("***", name + " cannot include spaces");
            SetNextPopUp(popup);
            ClosePopup();
            return false;
        }
    }

    return true;
}

function SuccessfulGetOfNewUser(userName, email, twitter) {
    if (latestXHTTP.status === 200) {
        StandardCompleteACOnline();
        ClosePopup();
        SetNextPopUp(secretKeyPopup);
        clientUserName = userName;
        emailAddress = email;
        twitterHandle = twitter;
        SetUserNameAndEmailInSetup(userName, email, twitter);        
        SetItemInStorage('userName', userName);
        SetItemInStorage('emailAddress', email);
        SetItemInStorage('twitterHandle', twitter);
    }
    else {
        UnsuccessfulOnlineCall();
    }
}

function SetUserNameAndEmailInSetup(userName, email, twitter, dob, youtube, location) {
    if (twitter === undefined || twitter === null) {
        twitter = "";
    }
    if (dob === undefined || dob === null) {
        dob = "";
    }
    if (youtube === undefined || youtube === null) {
        youtube = "";
    }
    if (location === undefined || location === null) {
        location = "";
    }

    document.getElementById('myusernamesetup').readOnly = true;
    document.getElementById('myemailsetup').readOnly = true;
    document.getElementById('mytwitterhandlesetup').readOnly = true;
    document.getElementById('mydobsetup').readOnly = true;
    document.getElementById('myyoutubesetup').readOnly = true;
    document.getElementById('mylocationsetup').readOnly = true;
    
    document.getElementById('myusernamesetup').innerText = 'Username ' + clientUserName;
    document.getElementById('myemailsetup').innerText = 'Email ' + emailAddress;
    document.getElementById('mytwitterhandlesetup').innerText = 'Twitter Handle ' + twitter;
    document.getElementById('mydobsetup').innerText = 'Year of brith ' + dob;
    document.getElementById('myyoutubesetup').innerText = 'YouTube Channel ' + youtube;
    document.getElementById('mylocationsetup').innerText = 'Country/Location ' + location;
    Hide('#newuserbutton');
    Hide('#existinguserbutton');
    Show('#verifyuserbutton'); //Show verified button in setup
}

function RetryUser() {

    if (retryMode === "NEW") {
        SetNextPopUp(newUserPopup);
    }
    else if (retryMode === "EXISTING") {
        SetNextPopUp(existingUserPopup);
    }
    else if (retryMode === "VERIFYSTARTUP") {
        // So we did something bad on the secret key verify...
        // But for now we wont retry it...
    }
    ClosePopup();
}

// You have reregistered an existing user through setup
// If game or myscores are in the history then we need to refresh those pages
function RefreshGame() {
    var game = pageHistory.indexOf("#Game");
    if (game !== -1) {
        refreshGame = 1;
    }

    var me = pageHistory.indexOf("#MyScores");
    if (me !== -1) {
        refreshMyScores = 1;
    }
}

function PostRestoreUser() {
    ClosePopup();
}