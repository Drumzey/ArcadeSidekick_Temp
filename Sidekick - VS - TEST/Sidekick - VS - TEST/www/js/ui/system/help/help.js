function Help() {
    NavigateToInternalPage("#Help");
}

function Help_Request() {
    Email("", "Help Request");
}

function Forgot_UserName() {
    CreatePopup(enterEmail);
}

function SubmitForgot_Username() {
    var email = document.getElementById('forgetUsernameEmailEntry').value;
    SideKickOnline_ForgotUsername(email.toLowerCase());
}

function Forget_Email() {
    CreatePopup(enterUsername);
}

function SubmitForgot_Email() {
    var username = document.getElementById('forgetEmailUsernameEntry').value;
    SideKickOnline_ForgotEmail(username.toUpperCase());
}

function Forgot_Secret() {
    CreatePopup(enterUsernameAndEmail);
}

function SubmitForgot_Secret() {
    var username = document.getElementById('forgetEmailUsernameEntry').value;
    var email = document.getElementById('forgetUsernameEmailEntry').value;
    SideKickOnline_ForgotSecret(username.toUpperCase(), email.toLowerCase());
}

function SuccessfulForgotUserName() {
    if (latestXHTTP.status === 200) {
        SetNextPopUp(sendUserName);
        ClosePopup();
    }
    else {
        FailedForgotInformation();
    }
}

function SuccessfulForgotEmail() {
    if (latestXHTTP.status === 200) {
        var email = latestXHTTP.responseJSON['message'];
        SetNextPopUp(sendEmail.replace("***", email.toLowerCase()));
        ClosePopup();
    }
    else {
        FailedForgotInformation();
    }
}

function SuccessfulForgotSecret() {
    if (latestXHTTP.status === 200) {
        SetNextPopUp(sendSecret);
        ClosePopup();
    }
    else {
        FailedForgotInformation();
    }
}

function FailedForgotInformation() {
    var err = latestXHTTP.responseJSON['message'];
    SetNextPopUp(forgoterror.replace("***", err));
    ClosePopup();
}