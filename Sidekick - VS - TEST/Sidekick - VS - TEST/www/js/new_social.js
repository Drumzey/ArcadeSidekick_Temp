function Share() {
    ShowPopup("#SharePop");
}

function GoToFacebook() {
    window.open('https://www.facebook.com/1416702098595071', '_system');
}

function GoToTwitter() {
    window.open('https://mobile.twitter.com/arcadeclubuk', '_system');
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

    window.plugins.emailComposer.showEmailComposerWithCallback(function (result) {
        console.log("Response -> " + result);
    },
        subject,
        body,
        ["arcade_sidekick@gmail.com"],
        null,
        null,
        false,
        array,
        null);
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

function ShareOnFaceBook() {
    window.plugins.socialsharing.shareViaFacebook(GetSocialMessage(),
        null,
        null,
        GetSocialMessage(),
        console.log('share ok'),
        function (errormsg) { alert(errormsg); });
}

function ShareOnTwitter() {
    window.plugins.socialsharing.shareViaTwitter(GetSocialMessage(), null, null);
}

function ShareOnOther() {
    window.plugins.socialsharing.share(GetSocialMessage(), null, null, null);
}

function ShareOnText() {
    var textLink = document.getElementById("textlink");
    textLink.href = "sms:?body=Come beat my top score on " + currentGameName + " of " + GetScore() + ".";
}

function GetSocialMessage() {
    return "I've just played " + currentGameName + ". I scored " + GetScore();
}