function Share() {
    CreatePopup(sharePopup);    
}

function GoToFacebook() {
    window.open('https://www.facebook.com/', '_system');
}

function GoToTwitter() {
    window.open('https://mobile.twitter.com/ArcadeSidekick', '_system');
}

function Email(body, subject, imageURI) {
    var emailsubject = "Arcade Sidekick - query";

    if (subject) {
        emailsubject = subject;
    }

    var array = [];
    if (imageURI) {
        array.push(imageURI);
    }

    cordova.plugins.email.open({        
        to: ["arcadesidekick@outlook.com"],                
        subject: emailsubject,
        body: body,
        isHtml: false
    });
}

function GoToEmail() {
    Email("", "");
}

function GetScore() {
    var score = '';
    if (currentGameType === "time") {
        score = document.getElementById('minutes').value + ":" + document.getElementById('seconds').value + "." + document.getElementById('micro').value;
    }
    else {
        score = document.getElementById('myrecord').value;
    }
    return score;
}

function ShareSignupOnFaceBook()
{
    window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint(
        GetSignUpMessage(),
        null,
        null,
        'Default message copied to clipboard',
        function () { console.log('share ok'); },
        function (errormsg) {
            SetNextPopUp(errorFacebookPopup);
            ClosePopup();
        });
}

function ShareOnFaceBook() {

    window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint(
        GetSocialMessage(),
        null,
        null,
        'Default message copied to clipboard',
        function () { console.log('share ok'); },
        function (errormsg) {
            //alert(errormsg);
            SetNextPopUp(errorFacebookPopup);
            ClosePopup();                        
        });
}

function ShareSignupOnTwitter() {
    try {
        window.plugins.socialsharing.shareViaTwitter(
            GetSignUpMessage(),
            null,
            'https://sites.google.com/site/arcadesidekickapp/home',
            function () { console.log('share ok'); },
            function (errormsg) {
                //alert(errormsg);
                SetNextPopUp(errorTwitterPopup);
                ClosePopup();
            });
    }
    catch (error) {
        //alert(error);
        SetNextPopUp(errorTwitterPopup);
        ClosePopup();
    }
}

function ShareOnTwitter() {
    try {
        window.plugins.socialsharing.shareViaTwitter(
            GetSocialMessage(),
            null,
            'https://sites.google.com/site/arcadesidekickapp/home',
            function () { console.log('share ok'); },
            function (errormsg) {
                //alert(errormsg);
                SetNextPopUp(errorTwitterPopup);
                ClosePopup();
            });
    }
    catch (error)
    {
        //alert(error);
        SetNextPopUp(errorTwitterPopup);
        ClosePopup();
    }
}

function ShareSignupOnOther() {
    window.plugins.socialsharing.share(GetSignUpMessage(), null, null, null);
}

function ShareOnOther() {
    window.plugins.socialsharing.share(GetSocialMessage(), null, null, null);
}

function ShareOnText() {
    var textLink = document.getElementById("textlink");
    textLink.href = "sms:?body=Come beat my top score on " + currentGameTrueName + " of " + GetScore() + ".";
}

function GetSignUpMessage() {
    return "I've just signed up to @ArcadeSidekick with username " + clientUserName + ". You should do the same and come beat my highscores!";
}

function GetSocialMessage() {
    return "I've just played " + currentGameTrueName + " and scored an incredible " + GetScore() +". Come beat me! Sent from @ArcadeSidekick.";
}