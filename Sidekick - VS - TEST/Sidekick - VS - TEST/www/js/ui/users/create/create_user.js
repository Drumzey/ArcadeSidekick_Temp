var refreshMyScores = 0;
var refreshGame = 0;

function SetupUserName() {
    if (clientUserName !== '' && clientUserName !== null)
        return;

    TryAndSetupUserName();
}

function TryAndSetupUserName() {

    if (!CheckFieldValid('Username', 'myusername_newuser', true))
        return;

    if (!CheckFieldValid('Email address', 'myemail_newuser', true))
        return;

    if (!CheckFieldValid('Email address', 'myconfirmemail_newuser', true))
        return;
    
    var email = document.getElementById("myemail_newuser").value.toLowerCase();
    var emailConfirm = document.getElementById("myconfirmemail_newuser").value.toLowerCase();

    if (email !== emailConfirm) {
        $('span[id=userErrorText_newuser]').removeClass('ui-screen-hidden');
        document.getElementById('userErrorText_newuser').innerText = "Emails do not match";
        return;
    }

    var userName = document.getElementById("myusername_newuser").value;
    var emailAddress = document.getElementById("myemail_newuser").value;
    var twitter = document.getElementById("mytwitter_newuser").value;

    if (/\s/.test(twitter)) {
        $('span[id=userErrorText_newuser]').removeClass('ui-screen-hidden');
        document.getElementById('userErrorText_newuser').innerText = "Twitter Handle must not contain spaces";
        return;
    }

    userName = userName.toUpperCase();
    emailAddress = emailAddress.toLowerCase();
    twitter = twitter.toLowerCase();

    SideKickOnline_NewUser(userName, emailAddress, twitter);
}

function CheckFieldValid(name, id, doSpaceCheck) {

    var field = document.getElementById(id).value;

    if (field === '') {
        $('span[id=userErrorText_newuser]').removeClass('ui-screen-hidden');
        document.getElementById("userErrorText_newuser").innerText = name + " cannot be blank";
        return false;
    }

    if (doSpaceCheck) {
        if (field.indexOf(' ') !== -1) {
            $('span[id=userErrorText_newuser]').removeClass('ui-screen-hidden');
            document.getElementById(userErrorText).innerText = name + " cannot include spaces";
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

function LaunchVerifyUserFromSetup() {
    CreatePopup(secretKeyPopup);
}

function VerifyUser(element) {
    var secretvalue = document.getElementById("secretkeyinput").value;
    SideKickOnline_VerifyUser(secretvalue);
}

function SetUserNameAndEmailInSetup(userName, email, twitter, dob, youtube, location) {
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

// EXISTING USER
function SetExistingUser() {

    if (clientUserName !== '' && clientUserName !== null)
        return;

    if (!CheckFieldValid('Username', 'myusername_existinguser', true))
        return;

    if (!CheckFieldValid('Email address', 'myemail_existinguser', true))
        return;

    if (!CheckFieldValid('Secret Code', 'myfavouritegame_existinguser', false))
        return;

    SideKickOnline_ReturningUser();
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

function PostSignup(showshare) {
    if (showshare === true) {
        SetNextPopUp(shareSignup);
    }

    if (pushRatings === true) {
        SideKickOnline_SaveRatings();
    }
    else {
        ClosePopup();
    }
}