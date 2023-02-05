function LaunchVerifyUserFromSetup() {
    CreatePopup(secretKeyPopup);
}

function VerifyUser(element) {

    retryMode = "VERIFYSTARTUP";

    if (!CheckFieldValid('Secret Code', 'secretkeyinput', false))
        return;

    var secretvalue = document.getElementById("secretkeyinput").value;
    SideKickOnline_VerifyUser(secretvalue);
}

function SideKickOnline_VerifyUser(secretvalue) {
    var jwt = CreateJWT(clientUserName, emailAddress, secretvalue);

    var body =
        {
            'Username': clientUserName,
            'EmailAddress': emailAddress
        };

    CallACOnlineWithBodyAndWait(newBaseUrl + accountUserUrl + 'verify',
        'POST',
        body,
        function () {
            SetItemInStorage("secret", secretvalue);
            secret = secretvalue;
            SuccessfulVerifyUser();
            StandardCompleteACOnline();
            if (popupsOnStartup.length > 0) {
                NextStartupPopup();
            }
        },
        function () { UnsuccessfulVerifyUser(); StandardCompleteACOnline(); },
        function () {
        },
        "Verifying user ...",
        jwt);
}

function SuccessfulVerifyUser() {
    SetNextPopUp(successVerify);
    ClosePopup();
    Hide('#verifyuserbutton');
    currentRecord.verified = true;
    SetItemInStorage("my_record", currentRecord);
}

function UnsuccessfulVerifyUser() {
    SetNextPopUp(errorVerify);
    ClosePopup();
}