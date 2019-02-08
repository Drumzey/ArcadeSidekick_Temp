function init() {

    navigator.splashscreen.hide();
    SetNewThemeInUI();
    GetItemFromStorageWithCallBack('userName', function (value) {
        clientUserName = value;
        CheckForFirstTime();
        LoadFriendsCollection();
        LoadCustomGamesCollection();
    });    
    GetItemFromStorageWithCallBack('emailAddress', function (value) {
        emailAddress = value;
    });
}