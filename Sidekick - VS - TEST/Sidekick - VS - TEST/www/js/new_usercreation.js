//TODO:
//Need to look at the security of the users end point as its getting back email and password.....
//Need to refactor webcalls to do get and creation in one go if possible

var refreshMyScores = 0;
var refreshGame = 0;

//New User

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

    if (email !== emailConfirm)
    {
        $('span[id=userErrorText_newuser]').removeClass('ui-screen-hidden');
        document.getElementById('userErrorText_newuser').innerText = "Emails do not match";
        return;
    }

    var userName = document.getElementById("myusername_newuser").value;
    var emailAddress = document.getElementById("myemail_newuser").value;

    userName = userName.toUpperCase();
    emailAddress = emailAddress.toLowerCase();

    SideKickOnline_NewUser(userName, emailAddress);
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

function SuccessfulGetOfNewUser(userName, email) {
    if (latestXHTTP.status === 200) {
        StandardCompleteACOnline();
        ClosePopup();
        SetNextPopUp(secretKeyPopup);
        SetUserNameAdnEmailInSetup(userName, email);
        clientUserName = userName;
        SetItemInStorage('userName', userName);
        SetItemInStorage('emailAddress', email);          
    }    
    else {        
        UnsuccessfulOnlineCall();
    }
}

function LaunchVerifyUserFromSetup()
{
    CreatePopup(secretKeyPopup);
}

function VerifyUser(element) {    
    var secretvalue = document.getElementById("secretkeyinput").value;
    SideKickOnline_VerifyUser(secretvalue);
}

function SetUserNameAdnEmailInSetup(userName, email) {
    document.getElementById('myusernamesetup').readOnly = true;
    document.getElementById('myemailsetup').readOnly = true;
    clientUserName = userName;
    emailAddress = email;
    document.getElementById('myusernamesetup').innerText = 'Username ' + clientUserName;
    document.getElementById('myemailsetup').innerText = 'Email ' + emailAddress;
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
    else
    {        
        ClosePopup();
    }
}