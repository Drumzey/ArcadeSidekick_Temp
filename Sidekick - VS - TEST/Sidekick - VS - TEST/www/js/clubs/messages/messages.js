var numberOfResults = 0;

$(document).on("pagecreate", "#Clubs", function () {
    $("#selectUsersPopupUL").filterable("option", "filterCallback", function (index, searchValue) {
        if (index === 0) {
            numberOfResults = 0;
        }

        if (searchValue === '') {
            //Return the first three results
            numberOfResults++;
            if (numberOfResults <= 3) {
                return false;
            }
        }

        var currentValue = $(this).text().toLowerCase();
        if (currentValue.indexOf(searchValue.toLowerCase()) !== -1) {
            //Return the first three results that match the filter
            numberOfResults++;
            if (numberOfResults <= 3) {
                return false;
            }
        }
        return true;
    });
});

function ShowSendClubMessage(clubName) {
    currentClub = clubName;
    var message = currentClub + " has invited you to their event xxxxx on xxxxx";
    var popupCode = sendClubMessagePopup;
    popupCode = popupCode.replace('***MESSAGE***', message);
    CreatePopup(popupCode);
}

var inviteMessage = '';

function SendClubMessage() {
    var messageType = $('#clubSendMessageSelect').val();

    if (messageType === "Invite") {
        inviteMessage = document.getElementById('clubEventNewsText').value;

        var users = [];
        RemoveAllChildren('selectUsersPopupUL');

        if (allUsers.length === 0) {
            SideKickOnline_AllUsersWithNoNavigate();
            return;
        }
        else {
            var sorted = allUsers.sort();
            for (var i = 0; i < sorted.length; i++) {
                users.push('<li><a id="' + sorted[i] + '" href="#" onclick="SendInvite(this)">' + sorted[i] + '</a></li>');
            }
        }

        $('#selectUsersPopupUL').append(users.join('')).listview().listview('refresh');

        SetNextPopUpId('#selectUsers');
        ClosePopup();
    }
    else {
        var message = document.getElementById('clubEventNewsText').value;
        SideKickOnline_SendMessage(messageType, message, currentClub);
    }
}

function SendInvite(node) {
    var user = node.id;
    SideKickOnline_SendMessage("Invite", inviteMessage, currentClub, user);
}

function RefreshClubNewsEventText() {
    var messageType = $('#clubSendMessageSelect').val();
    var message = '';
    if (messageType === 'Event') {
        message = currentClub + " has invited you to their event xxxxx on xxxxx";
    }
    else if (messageType === 'News') {
        message = "News from " + currentClub + ", xxxxx.";
    }
    else {
        message = "You have been invited to join the " + currentClub + " club.";
    }
    document.getElementById('clubEventNewsText').value = message;
}