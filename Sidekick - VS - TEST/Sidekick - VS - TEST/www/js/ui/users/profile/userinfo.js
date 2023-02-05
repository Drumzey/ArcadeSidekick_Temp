//Function to update user information (twitter handle etc)
function UpdateUserInfo() {
    if (AllowedOnline()) {
        // Need to populate information in the popup
        var popupText = updateUserInfoPopup;
        popupText = popupText.replace("*DOB*", playerdob);
        popupText = popupText.replace("*TWITTER*", twitterHandle);
        popupText = popupText.replace("*LOCATION*", playerlocation);
        popupText = popupText.replace("*YOUTUBE*", playeryoutubeChannel);
        CreatePopup(popupText);
    }
    else
    {
        CreatePopup(pleaseRegisterUpdateUserInfoPopup);
    }
}