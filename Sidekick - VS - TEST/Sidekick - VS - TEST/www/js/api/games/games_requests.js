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

//GET Bottom 50
function SideKickOnline_GetBottomFifty() {

    var url = newBaseUrl + gameUrl + 'bottom50';

    Call_ArcadeSidekick_Online_Get(
        url,
        SuccessfulArcadeBottom50,
        UnsuccessfulOnlineCall,
        StandardCompleteACOnline,
        'Getting Worst 50 Games...');
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