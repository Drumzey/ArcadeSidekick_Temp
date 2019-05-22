var firstTime = "yes";

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
    if (currentRecord.verified === false && (clientUserName !== '' && clientUserName !== null)) { 
        CreatePopup(verifyLaunchPopup);
    }
}

function WelcomeNewUserClicked() {
    SetNextPopUp(newUserPopup);
    ClosePopup();    
}

function WelcomeExistingUserClicked() {
    SetNextPopUp(existingUserPopup);
    ClosePopup();    
}