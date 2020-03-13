var firstTime = '';

//Do we show the welcome screen on start up?
function CheckForFirstTime() {

    if (firstTime !== "no") {
        SetItemInStorage('firstTime', 'no');
        $('#userErrorText').addClass('ui-screen-hidden');
        return true;
    }

    return false;
}

function CheckForVerified() {

    if (clientUserName === '' || clientUserName === null) {
        return false;
    }

    if (currentRecord.verified === false) {
        popupsOnStartup.push(verifyLaunchPopup);
        return false;
    }

    return true;
}

function WelcomeNewUserClicked() {
    SetNextPopUp(newUserPopup);
    ClosePopup();
}

function WelcomeExistingUserClicked() {
    SetNextPopUp(existingUserPopup);
    ClosePopup();
}