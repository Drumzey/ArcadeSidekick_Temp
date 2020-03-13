var gameUrl = 'app/games/';
//var detailedhaserrored = false;

//GET TOP 50
function SideKickOnline_GetTopFifty() {

    var url = newBaseUrl + gameUrl + 'top50';

    Call_ArcadeSidekick_Online_Get(
        url,
        SuccessfulArcadeTop50,
        UnsuccessfulOnlineCall,
        StandardCompleteACOnline,
        'Getting Top 50 Games...');
}

//Used to get a rating for a game
function SideKickOnline_GetRating(message) {

    var url = newBaseUrl + gameUrl + 'ratingsweighted?gameName=' + TransformedCurrentGameName();

    Call_ArcadeSidekick_Online_Get(
        url,
        SuccessfulGetCommunityRating,
        UnsuccessfulGetCommunityRating,
        function () { CompleteACOnlineWithNavigate("#Game", OnSuccessfulLoadOfGame, GameInfoError); },
        message);
}

function SideKickOnline_SaveRating(rating, element, id, message) {

    var url = newBaseUrl + gameUrl + 'ratings';

    var ratingJson = {
        'GameName': TransformedCurrentGameName(),
        'Rating': rating
    };

    var ratings = [];
    ratings.push(ratingJson);

    var body =
        {
            'Username': clientUserName,
            'Ratings': ratings
        };

    Call_ArcadeSidekick_Online_Post(
        url,
        body,
        function () {
            AddStarHighlight(id, element);
            SuccessfulOnClickStar(rating);
        },
        function () {
            UnsuccessfulOnClickStar();
        },
        StandardCompleteACOnline,
        message);    

    //CallACOnlineWithBodyAndWait(baseUrl + '/saverating',
    //    'Post',
    //    body,
    //    function () {
    //        AddStarHighlight(id, element);
    //        SuccessfulOnClickStar(rating);
    //    },
    //    function () {
    //        UnsuccessfulOnClickStar();
    //    },
    //    function () { StandardCompleteACOnline(); },
    //    message,
    //    jwt);
    //});
}

function GetExistingLevels() {

    var url = newBaseUrl + gameUrl + 'knownlevels?gameName=' + TransformedCurrentGameName();

    Call_ArcadeSidekick_Online_Get(
        url,
        Successful_SidekickOnline_GetKnownLevels,
        UnsuccessfulOnlineMultiCall,
        function () { FinalErrorForOnlineMultiCall('#SubmitDetailedScore', DoPresentationChange); },
        'Getting details...');
}

function GetExistingSettings() {

    var url = newBaseUrl + gameUrl + 'knownsettings?gameName=' + TransformedCurrentGameName();

    Call_ArcadeSidekick_Online_Get(
        url,
        Successful_SidekickOnline_GetExistingSettings,
        UnsuccessfulOnlineMultiCall,
        function () { FinalErrorForOnlineMultiCall('#SubmitDetailedScore', DoPresentationChange); },
        'Getting details...');
}

function PostDetailedScoreSubmission() {

    var url = newBaseUrl + gameUrl + 'detailedscore';

    var body = {
        'GameName': TransformedCurrentGameName(),
        'UserName': clientUserName,
        'Score': detailedScore,
        'Date': detailedDate,
        'Location': detailedLocation,
        'LevelName': detailedLevelName,
        'EventName': detailedEvent,
        'Difficulty': detailedDifficulty,
        'Lives': detailedLives,
        'ExtraLivesAt': detailedExtraLivesAt,
        'MameOrPCB': detailedMameOrPCB,
        'Credits': detailedCredits
    };

    Call_ArcadeSidekick_Online_Post(
        url,
        body,
        function (err) { },
        function (err) { SetNextPopUpId('#ErrorDetailed'); },
        StandardCompleteACOnline,
        'Posting Score...');
}