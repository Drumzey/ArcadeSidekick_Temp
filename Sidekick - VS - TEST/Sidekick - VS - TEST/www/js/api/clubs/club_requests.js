// Available endpoints
// app/clubs/all - Get All Clubs
// app/clubs/events - Send a club event message to all members of the club
// app/clubs/invite - Send a club invite message to a user
// app/clubs/join - Join a club
// app/clubs/leave - Leave a club
// app/clubs/news - Send a club news message to all members of the club
// app/clubs/request' - NOT YET AVAILABLE

var clubUrl = 'app/clubs/';

// Request to join a club
function SideKickOnline_JoinClub(clubName, password) {

    var url = newBaseUrl + clubUrl + 'join';

    var body = {
        'Username': clientUserName,
        'Clubname': clubName,
        'Password': password
    };

    Call_ArcadeSidekick_Online_Post(
        url,
        body,
        function () { Successful_SideKickOnline_JoinClub(clubName); },
        Failed_SideKickOnline_LeaveClub,
        StandardCompleteACOnline,
        'Joining club...');
}

//Request to leave a club
function SideKickOnline_LeaveClub(clubName) {

    var url = newBaseUrl + clubUrl + 'leave';

    var body = {
        'Username': clientUserName,
        'Clubname': clubName
    };

    Call_ArcadeSidekick_Online_Post(
        url,
        body,
        function () { Successful_SideKickOnline_LeaveClub(clubName); },
        UnsuccessfulOnlineCall,
        StandardCompleteACOnline,
        'Leaving club...');
}

//Request to send a club message
function SideKickOnline_SendMessage(messageType, message, currentClub, user) {

    var url = newBaseUrl + clubUrl;
    var pleaseWaitMessage = '';
    var successCallback = null;

    switch (messageType) {
        case 'Event':
            url += 'events';
            pleaseWaitMessage = 'Sending events...';
            successCallback = SuccessfulEvent;
            break;
        case 'News':
            url += 'news';
            pleaseWaitMessage = 'Sending news.';
            successCallback = SuccessfulNews;
            break;
        case 'Invite':
            url += 'invite';
            pleaseWaitMessage = 'Sending invites...';
            successCallback = SuccessfulInvite;
            break;
        default:
            UnsuccessfulOnlineCall();
            return;
    }

    var body = {
        'From': currentClub,
        'Message': message,
        'Type': messageType,
        'InviteList': user
    };

    Call_ArcadeSidekick_Online_Post(
        url,
        body,
        successCallback,
        UnsuccessfulOnlineCall,
        StandardCompleteACOnline,
        pleaseWaitMessage);
}