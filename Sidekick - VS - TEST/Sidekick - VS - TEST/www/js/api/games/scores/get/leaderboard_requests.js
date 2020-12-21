function GetDetailedScoreSubmissions(clubOverride) {

    Hide('#friendsScoreSettingsParent');
    Hide('#globalScoreSettingsParent');
    Hide('#clubsScoreSettingsParent');
    GetLeaderboards(clubOverride);
}

function GetLeaderboards(clubOverride)
{
    var url = newBaseUrl + gameUrl + 'detailedscore?gameName=' + TransformedCurrentGameName();

    Call_ArcadeSidekick_Online_Get(
        url,
        function () { ProcessDetailedScores(clubOverride); },
        function (err) { SetNextPopUpId('#ErrorDetailed'); },
        StandardCompleteACOnline,
        'Getting leaderboards...');
}