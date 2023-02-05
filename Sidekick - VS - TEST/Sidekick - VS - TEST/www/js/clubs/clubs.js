var allClubs = [];
var myclubs = [];
var privateClubs = [];
var firstTimeClubs = '';
var myAdminClubs = [];

//When we goto clubs we have already got all the clubs from the startup procedure
function GotoClubs() {
    if (myclubs.length + myAdminClubs.length === 0) {
        SetCurrentTab('ALLCLUBS');
    }
    else {
        SetCurrentTab("MYCLUBS");
    }
    
    ShowAllClubs(allClubs);
    NavigateToInternalPage("#Clubs");
    ShowFirstTimeClubsPopUp();
}

//If we cannot connect to the online clubs images then we can just get the default one from the img folder
function SetDefaultClubImage(club) {
    club.src = 'img/clubs/default.png';
}

//On startup if you are a current user
//On restore of user if you are an existing user
function GetMyClubAdmins(clubData) {
    myAdminClubs = [];
    if (AllowedOnline()) {
        for (var i = 0; i < clubData.length; i++) {
            if (clubData[i].AdminUsers.indexOf(clientUserName) !== -1) {
                myAdminClubs.push(clubData[i].Name);
            }
        }
    }
}

function ShowAllClubs() {
    try {
        AddAllClubs();
        AddMyClubs();
    }
    catch (err) {
        alert(err);
    }
}

function AddAllClubs() {
    privateClubs = [];
    RemoveAllChildren('allclubsul');

    var clubHeaderTemplate = '<li data-role="list-divider" id="info" style="white-space: normal;text-overflow: clip;" class="ui-li ui-btn-up-c">***SECTION***</li>';

    var template =
        '<li style="padding: 0em !important">' +
        '<a style="padding-left: 5.5em;padding-right:3em;margin-right: 2em;" href="#" onclick="GotoClub(\'CLUBNAME\')">' +
        '<img style="background: white;" src="' + clubImageUrl + '/CLUBNAME.png" onerror="SetDefaultClubImage(this);" >' +
        '<h2 style="white-space: normal;margin:0;padding:0;font-size:80%">CLUBNAME</h2>' +
        '<p style="white-space: normal;font-size:60%;margin:0">***DESCRIPTION***</p>' +
        '<span class="ui-li-count">***MEMBERCOUNT***</span>' +
        '</a>' +
        '<a href="#" onclick="ChangeClubStatus(\'CLUBNAME\')" class="***CLASS***">Join Club</a>' +
        '</li>';

    var clubsoutput = [];

    for (var i = 0; i < allClubs.length; i++) {
        var name = allClubs[i].Name;
        var description = allClubs[i].ShortDescription;
        var members = allClubs[i].Members;

        var club = '';

        club = template.replace(new RegExp('CLUBNAME', 'g'), name);
        club = club.replace("***DESCRIPTION***", description);
        club = club.replace("***MEMBERCOUNT***", members.length);

        if (myclubs.indexOf(name) !== -1 || myAdminClubs.indexOf(name) !== - 1) {
            club = club.replace("***CLASS***", 'member');
        } else {
            club = club.replace("***CLASS***", '');
        }

        if (allClubs[i].Secret) {
            privateClubs.push(name);
        }
        else {
            clubsoutput.push(club);
        }
    }

    $('#allclubsul').append(clubsoutput.join('')).listview().listview('refresh');
}

function AddMyClubs() {
    RemoveAllChildren('myclubsul');

    var clubHeaderTemplate = '<li data-role="list-divider" id="info" style="white-space: normal;text-overflow: clip;" class="ui-li ui-btn-up-c">***SECTION***</li>';

    var adminTemplate =
        '<li style="padding: 0em !important">' +
        '<a style="padding-left: 5.5em;padding-right:3em;margin-right: 2em;" href="#" onclick="GotoClub(\'CLUBNAME\')">' +
        '<img style="background: white;" src="' + clubImageUrl + '/CLUBNAME.png" onerror="SetDefaultClubImage(this);" >' +
        '<h2 style="white-space: normal;margin:0;padding:0;font-size:80%">CLUBNAME</h2>' +
        '<p style="white-space: normal;font-size:60%;margin:0">***DESCRIPTION***</p>' +
        '<span class="ui-li-count">***MEMBERCOUNT***</span>' +
        '</a>' +
        '<a href="#" onclick="ShowSendClubMessage(\'CLUBNAME\')" class="ui-btn ui-btn-icon-notext ui-icon-mail">Send Message</a>' +
        '</li>';

    var template =
        '<li style="padding: 0em !important">' +
        '<a style="padding-left: 5.5em;padding-right:3em;margin-right: 2em;" href="#" onclick="GotoClub(\'CLUBNAME\')">' +
        '<img style="background: white;" src="' + clubImageUrl + '/CLUBNAME.png" onerror="SetDefaultClubImage(this);" >' +
        '<h2 style="white-space: normal;margin:0;padding:0;font-size:80%">CLUBNAME</h2>' +
        '<p style="white-space: normal;font-size:60%;margin:0">***DESCRIPTION***</p>' +
        '<span class="ui-li-count">***MEMBERCOUNT***</span>' +
        '</a>' +
        '<a href="#" onclick="ChangeClubStatus(\'CLUBNAME\')" class="***CLASS***">Join Club</a>' +
        '</li>';

    var myadminclubsoutput = [];
    var myclubsoutput = [];

    for (var i = 0; i < allClubs.length; i++) {
        var name = allClubs[i].Name;

        if (myclubs.indexOf(name) === -1 && myAdminClubs.indexOf(name) === - 1) {
            //We are not admins or members
            continue;
        }

        var description = allClubs[i].ShortDescription;
        var members = allClubs[i].Members;

        var club = '';

        if (myAdminClubs.indexOf(name) !== - 1) {
            club = adminTemplate.replace(new RegExp('CLUBNAME', 'g'), name);
        }
        else {
            club = template.replace(new RegExp('CLUBNAME', 'g'), name);
        }

        club = club.replace("***DESCRIPTION***", description);
        club = club.replace("***MEMBERCOUNT***", members.length);

        if (myAdminClubs.indexOf(name) !== - 1) {
            myadminclubsoutput.push(club);
        }
        else {
            club = club.replace("***CLASS***", 'member');
            myclubsoutput.push(club);
        }
    }

    if (myadminclubsoutput.length > 0) {
        var adminheader = clubHeaderTemplate.replace("***SECTION***", 'ADMIN');
        $('#myclubsul').append(adminheader).listview().listview('refresh');
        $('#myclubsul').append(myadminclubsoutput.join('')).listview().listview('refresh');
    }

    if (myclubsoutput.length > 0) {
        var memberheader = clubHeaderTemplate.replace("***SECTION***", 'MEMBER');
        $('#myclubsul').append(memberheader).listview().listview('refresh');
        $('#myclubsul').append(myclubsoutput.join('')).listview().listview('refresh');
    }
}

function ShowFirstTimeClubsPopUp() {
    if (firstTimeClubs !== "no") {
        firstTimeClubs = 'no';
        SetItemInStorage('firstTimeClubs', 'no');
        CreatePopup(clubsFirstTimePopUp);
    }
}

function ChangeClubStatus(clubName) {
    if (myclubs.indexOf(clubName) === -1) {
        JoinClub(clubName);
        return;
    }

    LeaveClub(clubName);
}

var currentClub = '';

function JoinPrivateClub(clubName) {
    if (!AllowedOnline()) {
        CreatePopup(cannotJoinClubPopup);
        return;
    }

    CreatePopup(joinPrivateClubPopup);
    if (clubName)
    {
        document.getElementById("clubname").value = clubName;
    }
}

function JoinClubFromPopUp() {

    var clubname = document.getElementById("clubname").value;
    var password = document.getElementById("clubpassword").value;
    SideKickOnline_JoinClub(clubname, password);
}

function JoinClub(clubName) {
    if (!AllowedOnline()) {
        CreatePopup(cannotJoinClubPopup);
        return;
    }

    if (privateClubs.indexOf(clubName) !== -1) {
        JoinPrivateClub(clubName);
    }
    else {
        SideKickOnline_JoinClub(clubName);
    }
}

function LeaveClub(clubName) {
    if (!AllowedOnline()) {
        CreatePopup(cannotJoinClubPopup);
        return;
    }

    SideKickOnline_LeaveClub(clubName);
}

function SendClubRequest() {
    var emailContents = '';

    emailContents += "Please include the following details with your submission:\n\n";
    emailContents += "Name:\n";
    emailContents += "Short Description:\n";
    emailContents += "Long description:\n";
    emailContents += "Website link (optional):\n";
    emailContents += "Club Logo or image (optional):\n";
    emailContents += "Do you want the club to be public or private (i.e password protected):\n";
    emailContents += "Any Admin user names:\n";

    Email(emailContents, "Arcade Sidekick - Club Request");
}

function SuccessfulInvite() {
    SetNextPopUpId('#inviteUsersSuccess');
    ClosePopupWithNextPopoup();
}

function SuccessfulNews() {
    SetNextPopUp(newsSentPopup);
    ClosePopup();
}

function SuccessfulEvent() {
    SetNextPopUp(eventSentPopup);
    ClosePopup();
}