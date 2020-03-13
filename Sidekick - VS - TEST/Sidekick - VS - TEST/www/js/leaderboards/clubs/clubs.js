var nextClub = '';

$(document).on('pageshow', "div[data-role='page']", function () {
    //We are navigating back from a page to the clubs tab on the leaderboards
    if (CurrentPage() === "#GameHighScores" && currentTab === 'CLUBS') {
        //NextClub comes from the links in the notifications
        //If this is set then we will navigate to a non default (1st place)
        //club and automatically show the results for that club.
        if (nextClub && nextClub !== '') {
            LoadClubLeaderboard(nextClub);
            nextClub = '';
        }
        else {
            LoadClubLeaderboard();
        }
    }
});

function LoadClubLeaderboard(clubOverride) {
    if (myclubs.length === 0) {
        Show('#noclubmembership');
        Hide('#clubleaderboards');
        Hide('#club-select');
        Hide('#mypositionClub');
        return;
    }

    Hide('#noclubmembership');
    Show('#clubleaderboards');

    PopulateClubsDropDown();
    Show('#club-select');
    RefreshClubLeaderboard(clubOverride);
}

function PopulateClubsDropDown() {
    var toAppend = [];

    for (var i = 0; i < myclubs.length; i++) {
        toAppend.push("<option style='margin: 0em;border - radius:0.6em;' value='" + myclubs[i] + "'>" + myclubs[i] + "</option>");
    }

    RemoveAllChildren('select-clubs');
    $('#select-clubs').append(toAppend.join(''));
    $('#select-clubs').selectmenu("refresh", true);
}

function RefreshClubLeaderboard(clubOverride) {
    var clubName = $("#select-clubs :selected").val();

    if (clubOverride) {
        var index = myclubs.indexOf(clubOverride);

        if (index !== -1) {
            clubName = clubOverride;
            var myselect = $('#select-clubs');
            myselect.prop('selectedIndex', index);
            myselect.selectmenu("refresh");
        }
    }
    //If we had to load a new page to show the list of clubs
    //then we need to set the nextclub so that it doesnt refresh on startup
    nextClub = clubName;
    SideKickOnline_GetClubLeaderboard(clubName);
}

function SuccessfulGetClubLeaderboard() {

    var scores = GetScores(latestXHTTP.responseText);
    scores = RemoveEnemies(scores);
    OrderScores(scores);

    DisplayAllScores(scores, "clubpositionblockul", "clubuserblockul", "clubscoreblockul",
        "#clubpositionblock", "#clubuserblock", "#clubscoreblock", "mypositionClubspan");
    AlterControlHeights(scores, "", "");
}