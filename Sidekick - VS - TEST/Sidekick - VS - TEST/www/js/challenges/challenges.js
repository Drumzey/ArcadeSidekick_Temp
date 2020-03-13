function Challenge() {

    //What if we have no friends and no admin groups?
    if (!AllowedOnline()) {
        CreatePopup(cannotSetChallengeNoUser);
        return;
    }

    if (friendsCollection.length === 0 && myAdminClubs.length === 0) {
        CreatePopup(cannotSetChallengeNoFriends);
        return;
    }

    if (myAdminClubs.length > 0) {
        if (friendsCollection.length === 0) {
            var popupCode = GetClubChallengePopup();
            CreatePopup(popupCode);
        }
        else {
            CreatePopup(setChallengeAsAdminOrUserPopup);
            return;
        }
    }
    else {
        var popupCode = GetUserChallengePopup();
        CreatePopup(popupCode);
        return;
    }
}

function GetClubChallengePopup() {
    var output = [];
    myAdminClubs.sort();
    var template = '<option value="NAME" style="background: white">NAME</option>';
    for (var i = 0; i < myAdminClubs.length; i++) {
        output.push(template.replace(new RegExp("NAME", 'g'), myAdminClubs[i]));
    }

    var popupCode = sendChallengeToClubPopup;
    popupCode = popupCode.replace('***', output.join(''));

    popupCode = SetPopupMessage(popupCode, true);

    return popupCode;
}

function ClubChallenge() {
    var popupCode = GetClubChallengePopup();
    SetNextPopUp(popupCode);
    ClosePopup();
}

function GetUserChallengePopup() {
    var output = [];
    friendsCollection.sort();
    var template = '<option value="NAME" style="background: white">NAME</option>';
    for (var i = 0; i < friendsCollection.length; i++) {
        output.push(template.replace(new RegExp("NAME", 'g'), friendsCollection[i]));
    }

    var popupCode = sendChallengeToUserPopup;
    popupCode = popupCode.replace('***', output.join(''));

    popupCode = SetPopupMessage(popupCode, false);

    return popupCode;
}

function UserChallenge() {
    var popupCode = GetUserChallengePopup();
    SetNextPopUp(popupCode);
    ClosePopup();
}

function SetPopupMessage(popupCode, club) {
    var message = '';

    if (club) {
        message = clientUserName + " from the '" + myAdminClubs[0] + "' club has challenged you to play " + currentGameName + " and set a new personal best.";
    }
    else {
        message = clientUserName + " has challenged you to beat their score on " + currentGameName;
    }

    popupCode = popupCode.replace('***MESSAGE***', message);

    return popupCode;
}

function RefreshClubChallengeText() {
    var to = $('#clubChallengeSelect').val();
    var message = clientUserName + " from the '" + to + "' club has challenged you to play " + currentGameName + " and set a new personal best.";
    document.getElementById('clubChallengeText').value = message;
}

function SendChallenge(club) {

    var from = clientUserName;
    var to = '';
    var message = '';

    if (club) {
        to = $('#clubChallengeSelect').val();
        from = to;
        message = document.getElementById('clubChallengeText').value;
    }
    else {
        to = $('#userChallengeSelect').val();
        message = document.getElementById('userChallengeText').value;
    }

    //Once we have selected the user/club we can send the challenge
    SideKickOnline_PostChallenge(from, to, club, message);
}