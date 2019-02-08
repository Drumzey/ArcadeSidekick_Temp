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
        SetItemInStorage('userName', clientUserName);  
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
    var value = document.getElementById("secretkeyinput").value;
    SetItemInStorageWithCallBack("secret", value, function (result) {
        SideKickOnline_VerifyUser();
    }); 
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

function SuccessfulSetOfExistingUser(userName, emailAddress, favouriteGame) {
    if ((latestXHTTP.responseText === '' || latestXHTTP.responseText === "[]") && latestXHTTP.status === 200) {
        //User does not exists
        $('span[id=userErrorText_existinguser]').removeClass('ui-screen-hidden');
        document.getElementById('userErrorText_existinguser').innerText = "Username not found, try again.";
    }
    else if (latestXHTTP.status === 200) {
        //user exists online        

        var response = JSON.parse(latestXHTTP.responseText);
        var recordEmail = response.emailAddress;
        var recordGame = response.favouriteGame;

        //Does password and email match user details?
        if (emailAddress.toLowerCase() !== recordEmail.toLowerCase() || favouriteGame.toLowerCase() !== recordGame.toLowerCase()) {
            $('span[id=userErrorText_existinguser]').removeClass('ui-screen-hidden');
            document.getElementById('userErrorText_existinguser').innerText = "Details do not match, try again.";
        }
        else {
            ClosePopup();
            SetUserNameInSetup(userName);
            RefreshGame();   
            SetItemInStorage('userName', clientUserName);            
            SetNextPopUp(successOnlinePopup);
        }
    }
    else {
        UnsuccessfulOnlineCall();
    }
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

//When creating a new user what do we do?
function PostSignup() {  

    //If we have entered any scores these are fine
    //they appear in the list of scores and have the uploiad button next to them
    //and the bulk update at the top

    //If you have rated any games then we have an issue...
    //Those ratings 




    //If we have some game information present then

    //if (HasExistingData()) {
    //    UploadBulkDataAndPullDownStoredData();
    //}
    //else {
    //    SynchOnlineAndOffline();
    //}
}

function UploadBulkDataAndPullDownStoredData() {

    //If we have data in our current record we need to do a mass update of that data
    CallACOnlineWithBodyAndWait('http://arcadeclub.azurewebsites.net/user/' + clientUserName + '/bulk',
        'POST',
        GetExistingData(),
        function () {            
            if (latestXHTTP.status === 200)
            {
                if (latestXHTTP.responseText !== '' && latestXHTTP.responseText !== "[]")
                {
                    SuccessfulSychDataPlayed();
                    SuccessfulSychDataRatings();
                    SuccessfulSychDataScores();
                }
            }
            else {
                UnsuccessfulOnlineCall();
            }
        },
        function () { UnsuccessfulOnlineCall(); },
        function () { SuccessfulSychData(); StandardCompleteACOnline(); },
        'Uploading current data'
    );        
}

function HasExistingData() {

    var played = currentRecord.played;
    var scores = currentRecord.scores;
    var ratings = currentRecord.ratings;

    var data = false;

    if (played.length !== 0) {
        data = true;
    }

    if (ratings.length !== 0) {
        data = true;
    }

    if (scores.length !== 0) {
        data = true;
    }

    return data;
}

function GetExistingData() {

    var body = {
        'played': currentRecord.played,
        'ratings': currentRecord.ratings,
        'scores': currentRecord.scores
    };

    return body;
}

function ResetUserCreation() {
}