function init() {    
    navigator.splashscreen.hide();
    SetNewThemeInUI();
    pageHistory.push("#MainMenu");    
    if (CheckForFirstTime())
    {
        CreatePopup(firstTimePopup);
    }
    else
    {
        if (currentVersion !== appVersion) {
            ShowWhatsNew();            
        }
        else {
            //If this isnt the first time we have launched the app
            //then we want to check whether we are verified or not
            CheckForVerified();
            LoadFriendsGames();
        }
    }
}

function LoadFriendsGames()
{   
    var friendsArray = [];

    if (friendsCollection.length > 0) {         
        for (var i = 0; i < friendsCollection.length; i++) {
            if (friendsCollection[i] !== clientUserName) {
                friendsArray.push(friendsCollection[i]);
            }
        }
        var names = friendsArray.join(",");        
        SideKickOnline_GetFriendsScores(names, "Loading friends scores....", false);
    }
}

function ShowWhatsNew()
{
    var popUp = 
     '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Whats new!?</h3> \
        <h6>New Games! Around 30 new games added and alternative version of existing games (Berzek slow bullets, pac-man speed up hack etc).<h6> \
        <h6>Some bug fixes including friends list in alphabetical order and alternative game names included on played and not played list.<h6> \
        <h6>UI improvements around existing forms, greying out backgrounds on popups and button order.<h6> \
        <a onclick="PostWhatsNew();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
     </div>';

    CreatePopup(popUp);
}

function PostWhatsNew()
{
    SetItemInStorage("version", appVersion);
    if (currentRecord.verified === false && (clientUserName !== '' && clientUserName !== null)) {
        SetNextPopUp(verifyLaunchPopup);        
    }    
    ClosePopup();
    LoadFriendsGames();
}