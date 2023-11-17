var nextClub = '';

$(document).on('pageshow', "div[data-role='page']", function () {
    //We are navigating back from a page to the clubs tab on the leaderboards
    if (CurrentPage() === "#GameHighScores" && currentTab === 'CLUBS') {
        
        ////NextClub comes from the links in the notifications
        ////If this is set then we will navigate to a non default (1st place)
        ////club and automatically show the results for that club.
        //if (nextClub && nextClub !== '') {
        //    //TODO WHAT
        //    LoadClubLeaderboard(nextClub);
        //    nextClub = '';
        //}
        //else {
        //    LoadClubLeaderboardUI();
        //}
    }
});

function LoadClubLeaderboard(clubOverride) {
    if (myclubs.length === 0) {
        Show('#noclubmembership');
        Hide('#clubleaderboards');
        Hide('#club-select');
        Hide('#mypositionClub');
        Hide('#clubsScoreSettingsParent');
        return;
    }

    Show('#clubsScoreSettingsParent');
    Hide('#noclubmembership');
    Show('#clubleaderboards');

    PopulateClubsDropDown();
    Show('#club-select');
    ChangeLeaderboardClub(clubOverride);
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

function ChangeLeaderboardClub(clubOverride) {
    var clubName = $("#select-clubs :selected").val();

    if (clubOverride)
    {
        clubName = clubOverride;
    }

    //We are changing the club
    //Get all the scores for that club
    var allScores = GetClubScores(allClubsScores, clubName, false);
    //var detailedScores = GetClubScores(allClubsDetailedScores, clubName, true);
    //Find out what settings Id's are used for this club
    //HideSettings(allClubsDetailedScores, clubName);
    //Change the drop down to All
    $('#clubsScoreSettings').val($('#clubsScoreSettings option:first').val());
    $('#clubsScoreSettings').selectmenu("refresh", true);
    $('#clubsScoreSettings-listbox-popup').find('a').addClass('multilineLi');
    //Display Scores
    HideLevels(allClubsDetailedScores, clubName);
    $('#clubsScoreLevels').val($('#clubsScoreLevels option:first').val());
    $('#clubsScoreLevels').selectmenu("refresh", true);
    $('#clubsScoreLevels-listbox-popup').find('a').addClass('multilineLi');
    var levelScores = GetLevelScores(allScores, "FULL GAME");
    OrderScores(levelScores, false);
    levelScores = RemoveDuplicateNames(levelScores);

    //By default we show all the scores first
    DisplayAllScores(levelScores, "clubpositionblockul", "clubuserblockul", "clubscoreblockul",
        "#clubpositionblock", "#clubuserblock", "#clubscoreblock", "mypositionClubspan");
    AlterControlHeights(levelScores, "", "");
}