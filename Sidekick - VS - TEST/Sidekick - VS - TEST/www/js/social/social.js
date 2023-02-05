var sharescreenshot = "";

function Share() {
    CreatePopup(sharePopup);
}

function GoToTwitter() {
    window.open('https://mobile.twitter.com/ArcadeSidekick', '_system');
}

function Email(body, subject, imageURI, emailAddressOverride) {
    var emailsubject = "Arcade Sidekick - query";

    if (subject) {
        emailsubject = subject;
    }

    var array = [];
    if (imageURI) {
        array.push(imageURI);
    }

    var address = "arcadesidekick@outlook.com";

    if (emailAddressOverride) {
        address = emailAddressOverride;
    }

    cordova.plugins.email.open({
        to: [address],
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
    } else {
        score = GetCurrentGameScore();
    }
    return score;
}

function ShareSignup()
{
    DoSignupTweet();
}

function DoQuizTweet(message)
{
    try {

        var options = {
            message: message,
            url: 'https://sites.google.com/site/arcadesidekickapp/home'
        };

        var onSuccess = function (result) {
            console.log('share ok');
        };

        var onError = function (msg) {
            console.log("Sharing failed with message: " + msg);
        };

        window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);

    } catch (error) {
        ClosePopup();
    }    
}

function DoSignupTweet()
{
    try {

        var options = {
            message: GetSignUpMessage(),
            url: 'https://sites.google.com/site/arcadesidekickapp/home'
        };

        var onSuccess = function (result) {            
            console.log('share ok');
        };

        var onError = function (msg) {
            console.log("Sharing failed with message: " + msg);
        };

        window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);

    } catch (error) {        
        ClosePopup();
    }    
}

function DoTweet(image) {
    try {

        var options = {
            message: GetSocialMessage(),
            files: [image],
            url: 'https://sites.google.com/site/arcadesidekickapp/home'
        };

        var onSuccess = function (result) {
            if (AllowedOnline()) {
                UpdateOnlineStats("tweet");
            }
            console.log('share ok');
        };

        var onError = function (msg) {
            console.log("Sharing failed with message: " + msg);
        };

        window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);

    } catch (error) {
        SetNextPopUp(errorTwitterPopup);
        ClosePopup();
    }
}

function TakeScreenshot() {

    console.log('in take screenshot');
    $.mobile.loading('hide');
    $(window).trigger('resize');

    setTimeout(function () {
        //Grab screenshot
        navigator.screenshot.save(function (error, res) {
            if (error) {
                console.log('take screenshot error');
                console.log(error);
                Show("#GameInfo");
                CreatePopup(screenshotPopup);
                sharescreenshot = "no";
                SetItemInStorage("sharescreenshot", sharescreenshot);
                DoTweet(null);
            } else {
                console.log('screenshot taken ok');
                Show("#GameInfo");
                DoTweet(res.filePath);
            }
        });

    }, 200);
}

function ShareOnOther() {
    if (sharescreenshot === "yes") {
        ClosePopup();
        Hide("#GameInfo");
        window.scrollTo(0, 0);
        Toggle();
        $(window).trigger('resize');

        $.mobile.loading('show', {
            theme: themeLetter,
            text: "Please wait...",
            textVisible: "true"
        });

        setTimeout(function () {
            TakeScreenshot();
        }, 500);
    } else {
        DoTweet(null);
    }
}

function ShareOnText() {
    var textLink = document.getElementById("textlink");
    textLink.href = "sms:&body=Come beat my top score on " + currentGameTrueName + " of " + GetScore() + ".";
}

function GetSignUpMessage() {
    return "I've just signed up to @ArcadeSidekick with username " + clientUserName + ". You should do the same and come beat my highscores!";
}

function GetSocialMessage() {
    return "I've just played " + currentGameTrueName + " and scored " + GetScore() + ". Come beat me! Sent from @ArcadeSidekick.";
}