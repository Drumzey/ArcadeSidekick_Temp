var firstTimeNotification = '';
var myNotifications = [];
var myOldNotifications = [];

var HeaderTemplate = '<li data-role="list-divider" id="info" style="white-space: normal;text-overflow: clip;" class="ui-li ui-btn-up-c">***NAME***</li>';
var simpleItemTemplate = '<li style="white-space: normal;text-overflow: clip;font-size:70%" class="ui-li ui-li-static ui-btn ui-btn-up-c">***TEXT***</li>';
var linkedItemTemplate = '<li id="***ID***" onclick="***ONCLICK***" style="white-space: normal;text-overflow: clip;" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;"><a style="font-size:70%;white-space: normal;text-overflow: clip;">***TEXT***</a></li>';

var scoreBeatenNotification = [];
var challengeNotification = [];
var clubChallengeNotification = [];
var generalNewsNotification = [];
var clubEventsNotification = [];
var clubNewsNotification = [];
var clubInviteNotification = [];
var clubJoinNotification = [];
var otherNotification = [];

var notificationsSeen = false;

function GoToNotifications() {
    if (!AllowedOnline()) {
        CreatePopup(cannotReceiveNotificationsPopup);
        return;
    }

    //Set icon to 0 notifications
    $('#notifications').attr('data-badge', '');
    //Get notifications again before we load the page incase any new ones have come in between the time
    //we launched the app, and the time we open the notifications menu
    if (notificationsSeen === false) {
        notificationsSeen = true;
        SideKickOnline_MyMessages();
    }
    else {
        PopulateNotifications();
        NavigateToInternalPage("#Notifications");
    }
}

function PopulateNotifications() {
    scoreBeatenNotification = [];
    challengeNotification = [];
    clubChallengeNotification = [];
    generalNewsNotification = [];
    clubEventsNotification = [];
    clubNewsNotification = [];
    clubInviteNotification = [];
    clubJoinNotification = [];
    otherNotification = [];

    RemoveAllChildren('notifications_ul');

    Hide('#No_Notifications');
    if (myNotifications.length === 0) {
        Show('#No_Notifications');
    }
    else {
        //Draw new notifications        
        GetNotificationCategories();
        DrawNotifications(generalNewsNotification);
        DrawNotifications(scoreBeatenNotification);
        DrawNotifications(challengeNotification);
        DrawNotifications(clubChallengeNotification);
        DrawNotifications(clubEventsNotification);
        DrawNotifications(clubNewsNotification);
        DrawNotifications(clubInviteNotification);
        DrawNotifications(clubJoinNotification);
        DrawNotifications(otherNotification);
    }

    //Draw old notifications
    DrawNotifications(myOldNotifications, true);
}

function DrawNotifications(array, old) {
    if (array.length === 0)
        return;

    var output = [];
    var links = 0;

    var headerValue = '';

    if (old) {
        headerValue = 'Previous Notifications';
    }
    else {
        headerValue = array[0].MessageType;
        switch (headerValue) {
            case 0:
                links = 1;
                headerValue = "Scores beaten";
                break;
            case 1:
                links = 2;
                headerValue = "Challenges";
                break;
            case 2:
                links = 3;
                headerValue = "Club challenges";
                break;
            case 3:
                headerValue = "News from the Sidekick";
                break;
            case 4:
                headerValue = "Club events";
                break;
            case 5:
                headerValue = "Club news";
                break;
            case 6:
                links = 4;
                headerValue = "Club invites";
                break;
            case 7:
                headerValue = "New Members";
                break;
            default:
                headerValue = "News";
                break;
        }
    }

    output.push(HeaderTemplate.replace('***NAME***', headerValue));

    for (var i = 0; i < array.length; i++) {
        var item = '';

        if (old) {
            links = 0;
            switch (array[i].MessageType) {
                case 0:
                    links = 1;
                    break;
                case 1:
                    links = 2;
                    break;
                case 2:
                    links = 3;
                    break;
                case 6:
                    links = 4;
                    break;
            }
        }

        switch (links) {
            case 1:
            case 2:
            case 3:
            case 4:
                item = linkedItemTemplate;
                var linkText = GetLink(links, array[i].Data);
                item = item.replace("***ONCLICK***", linkText);
                item = SetIdIfNeccessary(links, array[i].Data, item);
                break;
            default:
                item = simpleItemTemplate;
                break;
        }

        item = item.replace("***TEXT***", array[i].Text);

        output.push(item);
    }

    $('#notifications_ul').append(output.join('')).listview().listview('refresh');

}

function SetIdIfNeccessary(links, data, item) {
    switch (links) {
        case 1:
        case 2:
        case 3:
            item = item.replace("***ID***", data["Game"]);
            break;
    }

    return item;
}

function GetLink(links, data) {

    var club = '';

    switch (links) {
        case 1:
            currentGameName = data["GameKey"];
            return "LoadGameInfoWithoutNavigate(this,'ALLSCORES');";
        case 2:
            currentGameName = data["GameKey"];
            var challenger = data["Challenger"];
            if (friendsCollection.indexOf(challenger) !== -1) {
                return "LoadGameInfoWithoutNavigate(this);";
            }
            else {
                return "LoadGameInfoWithoutNavigate(this,'ALLSCORES');";
            }
        case 3:
            currentGameName = data["GameKey"];
            club = data["Club"];
            if (myclubs.indexOf(club) !== -1) {
                return "LoadGameInfoWithoutNavigate(this,'CLUBS','" + club + "');";
            }
            else {
                return "LoadGameInfoWithoutNavigate(this,'ALLSCORES');";
            }
        case 4:
            club = data["Club"];
            return "GotoClub('" + club + "')";
    }

    return '';
}

function GetNotificationCategories() {
    for (var i = 0; i < myNotifications.length; i++) {
        switch (myNotifications[i].MessageType) {
            case 0:
                scoreBeatenNotification.push(myNotifications[i]);
                break;
            case 1:
                challengeNotification.push(myNotifications[i]);
                break;
            case 2:
                clubChallengeNotification.push(myNotifications[i]);
                break;
            case 3:
                generalNewsNotification.push(myNotifications[i]);
                break;
            case 4:
                clubEventsNotification.push(myNotifications[i]);
                break;
            case 5:
                clubNewsNotification.push(myNotifications[i]);
                break;
            case 6:
                clubInviteNotification.push(myNotifications[i]);
                break;
            case 7:
                clubJoinNotification.push(myNotifications[i]);
                break;
            default:
                otherNotification.push(myNotifications[i]);
                break;
        }
    }
}