function SuccessfulArcadeTop50() {
    if (latestXHTTP.status === 200) {
        var response = JSON.parse(latestXHTTP.responseText);

        top50ArcadeRatings = GetRatings(response.Arcade);
        top50PinballRatings = GetRatings(response.Pinball);
        
        SetCurrentTab("ARCADEGAMES");
        PopulateTop50Arcade(top50ArcadeRatings);
        PopulateTop50Pinball(top50PinballRatings);
        NavigateToInternalPage("#TopFifty");
        AlterRatingHeights(top50ArcadeRatings, "", "rating");
        AlterRatingHeights(top50PinballRatings, "", "rating");
    }
    else {
        UnsuccessfulOnlineCall();
    }
}

function SuccessfulArcadeBottom50() {
    if (latestXHTTP.status === 200) {
        var response = JSON.parse(latestXHTTP.responseText);

        bottom50ArcadeRatings = GetRatings(response.Arcade);
        bottom50PinballRatings = GetRatings(response.Pinball);

        SetCurrentTab("ARCADEGAMESBOTTOM");
        PopulateBottom50Arcade(bottom50ArcadeRatings);
        PopulateBottom50Pinball(bottom50PinballRatings);
        NavigateToInternalPage("#BottomFifty");
        AlterRatingHeights(bottom50ArcadeRatings, "", "rating");
        AlterRatingHeights(bottom50PinballRatings, "", "rating");
    }
    else {
        UnsuccessfulOnlineCall();
    }
}

function GetRatings(ratings)
{
    var result = [];

    for (var i = 0; i < ratings.length; i++) {
        var obj = ratings[i];
        var gameName = obj.Name;
        var rating = obj.Rating;

        result.push([gameName, rating]);
    }

    return result;
}

function PopulateTop50Pinball(ratings) {

    PopulateTop50(
        "allpinballratinggameblock",
        "allpinballratingscoresblock",
        "pinballratinggameblock",
        "pinballratingscoreblock",
        ratings
    );
}

function PopulateTop50Arcade(ratings) {

    PopulateTop50(
        "allratinggameblock",
        "allratingscoresblock",
        "ratinggameblock",
        "ratingscoreblock",
        ratings
    );
}

function PopulateBottom50Pinball(ratings) {

    PopulateTop50(
        "allpinballratinggameblockbottom",
        "allpinballratingscoresblockbottom",
        "pinballratinggameblockbottom",
        "pinballratingscoreblockbottom",
        ratings
    );
}

function PopulateBottom50Arcade(ratings) {

    PopulateTop50(
        "allratinggameblockbottom",
        "allratingscoresblockbottom",
        "ratinggameblockbottom",
        "ratingscoreblockbottom",
        ratings
    );
}

function PopulateTop50(allgameblock, allscoresblock, gameblock, ratingblock, ratings)
{
    RemoveAllChildren(allgameblock);
    RemoveAllChildren(allscoresblock);

    if (ratings.length !== 0) {

        var gameNameArray = [];
        var gameRatingArray = [];

        for (var i = 0; i < ratings.length; i++) {
            var obj = ratings[i];
            var id = obj[0].replace(/_/g, ' ').toLowerCase();
            id = FindGameInCatalog(id);
            var gameName = obj[0].replace(/_/g, ' ').toLowerCase();
            var rating = obj[1];

            gameNameArray.push('<li onclick="GoToGame(this)" id="' + id + '" name="' + gameName + 'rating" class="ui-li ui-btn-up-c ui-icon-carat-r ui-btn-icon-right" style="white-space: normal;text-overflow: clip;"><span style="font-size:70%;white-space: normal;text-overflow: clip;">' + gameName + '</span></li>');
            gameRatingArray.push('<li name="' + gameName + 'rating" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;text-align: center !important"><span style="width:100%; font-size:70%;white-space: normal;text-overflow: clip; text-align: center !important">' + rating + '</span></li>');
        }

        $('#' + gameblock).children('ul').append(gameNameArray.join('')).listview().listview('refresh');
        $('#' + ratingblock).children('ul').append(gameRatingArray.join('')).listview().listview('refresh');
    }
}