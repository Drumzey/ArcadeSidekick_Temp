var ClubDetailsHeaderTemplate = '<li data-role="list-divider" id="info" style="white-space: normal;text-overflow: clip;font-size: 70%"" class="ui-li ui-btn-up-c">***NAME***</li>';
var ClubDetailsItemTemplate = '<li style="white-space: normal;text-overflow: clip;font-size: 70%" class="ui-li ui-li-static ui-btn-up-c ui-body-inherit">***NAME***</li>';
var ClubDetailsItemLinkTemplate = '<li style="white-space: normal;text-overflow: clip;font-size: 70%" class="ui-li ui-li-static ui-btn-up-c"><a href="NAME">NAME</a></li>';
var ClubDetailsMemberTemplate = '<li style="white-space: normal;text-overflow: clip;font-size: 70%"" class="ui-li ui-li-static ui-btn-up-c ui-body-inherit">***NAME***</li>';

var currentClubName = '';

function GotoClub(clubname) {
    if (myclubs.indexOf(clubname) === -1) {
        Show('#joinClub');
    }
    else {
        Hide('#joinClub');
    }

    currentClubName = clubname;
    PopulateClubDetails(clubname);
    NavigateToInternalPage('#ClubDetails');
}

function JoinCurrentClub() {
    JoinClub(currentClubName);
}

function PopulateClubDetails(clubname) {
    var description = '';
    var website = '';
    var twitter = '';
    var facebook = '';
    var instagram = '';
    var admins = [];
    var members = [];

    for (var i = 0; i < allClubs.length; i++) {

        //Populate members list
        if (allClubs[i].Name === clubname) {
            description = allClubs[i].LongDescription;
            website = allClubs[i].Link;
            twitter = allClubs[i].TwitterHandle;
            facebook = allClubs[i].Facebook;
            instagram = allClubs[i].instagram;
            admins = allClubs[i].AdminUsers;
            members = allClubs[i].Members;
            break;
        }
    }

    ChangePageTitleAndImage(clubname);
    AppendClubDescription(description, website, twitter, facebook, instagram);
    AppendMembers(admins, members);
}

function ChangePageTitleAndImage(clubname) {
    document.getElementById('MembersTitle').innerText = clubname;
    document.getElementById('clubimage').src = clubImageUrl + '/' + clubname + '.png';
}

function AppendClubDescription(description, website, twitter, facebook, instagram) {

    RemoveAllChildren('clubsDescriptionul');

    var output = [];
    output.push(ClubDetailsItemTemplate.replace('***NAME***', description));

    if (website !== undefined && website !== '' && website !== ' ') {
        Show('#clubWebsite');
        document.getElementById('clubWebsite').href = website;
        document.getElementById('clubWebsite').innerText = website;
    }
    else {
        Hide('#clubWebsite');
    }

    if (twitter !== undefined && twitter !== '' && twitter !== ' ') {
        Show('#clubTwitter');
        document.getElementById('clubTwitter').href = twitter;
        document.getElementById('clubTwitter').innerText = "Twitter";
    }
    else {
        Hide('#clubTwitter');
    }

    if (facebook !== undefined && facebook !== '' && facebook !== ' ') {
        Show('#clubFacebook');
        document.getElementById('clubFacebook').href = facebook;
        document.getElementById('clubFacebook').innerText = "Facebook";
    }
    else {
        Hide('#clubFacebook');
    }

    if (instagram !== undefined && instagram !== '' && instagram !== ' ') {
        Show('#clubInstagram');
        document.getElementById('clubInstagram').href = instagram;
        document.getElementById('clubInstagram').innerText = "Instagram";
    }
    else {
        Hide('#clubInstagram');
    }

    var outputString = output.join('');

    $('#clubsDescriptionul').html(outputString).enhanceWithin();
}

function AppendMembers(admins, members) {
    var output = [];

    admins = admins.sort();
    members = members.sort();

    if (admins.length > 0) {
        output.push(ClubDetailsHeaderTemplate.replace('***NAME***', 'Admins'));
        for (var i = 0; i < admins.length; i++) {
            output.push(ClubDetailsMemberTemplate.replace('***NAME***', admins[i]));
        }
    }

    if (members.length > 0) {
        output.push(ClubDetailsHeaderTemplate.replace('***NAME***', 'Members'));
        for (var j = 0; j < members.length; j++) {
            output.push(ClubDetailsMemberTemplate.replace('***NAME***', members[j]));
        }
    }

    var outputString = output.join('');
    $('#clubsMembersul').html(outputString).promise().done(function () {
        $(this).listview().listview("refresh");
        $(this).trigger("create");
    });
}