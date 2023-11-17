var userUrl = 'app/users/';

// When user clicks on update user details
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
    else {
        CreatePopup(pleaseRegisterUpdateUserInfoPopup);
    }
}

// When user clicks update
function PostUpdateOnline() {

    var url = newBaseUrl + userUrl + 'update';

    var handle = document.getElementById('mytwitter_setup').value;
    var dob = document.getElementById('mydob_setup').value;
    var location = document.getElementById('mylocation_setup').value;
    var youtube = document.getElementById('myyoutube_setup').value;

    var body = {
        'Username': clientUserName,
        'TwitterHandle': handle,
        'DOB': dob,
        'Location': location,
        'YouTubeChannel': youtube,
    };

    Call_ArcadeSidekick_Online_Post(
        url,
        body,
        function () { Successful_SideKickOnline_PostUpdate(handle, dob, location, youtube); },
        UnsuccessfulOnlineCall,
        StandardCompleteACOnline,
        'Updating info...');
}

// When update is successful
function Successful_SideKickOnline_PostUpdate(handle, dob, location, youtube) {
    SetNextPopUp(successfulUpdateUserInfoPopup);
    document.getElementById('mytwitterhandlesetup').innerText = 'Twitter ' + handle;
    document.getElementById('mydobsetup').innerText = 'Year of birth ' + dob;
    document.getElementById('mylocationsetup').innerText = 'Country/Location ' + location;
    document.getElementById('myyoutubesetup').innerText = 'YouTube Channel ' + youtube;
    ClosePopup();

    // Set local variables
    playerdob = dob;
    twitterHandle = handle;
    playerlocation = location;
    playeryoutubeChannel = youtube;

    // Update local storage
    SetItemInStorage("twitterHandle", twitterHandle);
    SetItemInStorage("dob", playerdob);
    SetItemInStorage("location", playerlocation);
    SetItemInStorage("youtubechannel", playeryoutubeChannel);
}