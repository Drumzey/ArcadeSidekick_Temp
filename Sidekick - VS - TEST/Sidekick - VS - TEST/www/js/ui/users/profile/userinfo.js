//Function to update user information (twitter handle etc)
function UpdateUserInfo() {
    if (AllowedOnline()) {
        CreatePopup(updateUserInfoPopup);
    }
    else
    {
        CreatePopup(pleaseRegisterUpdateUserInfoPopup);
    }
}