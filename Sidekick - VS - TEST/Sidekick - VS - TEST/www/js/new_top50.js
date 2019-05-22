function ArcadeTop50() {
    SideKickOnline_GetTopFifty();
}

function SuccessfulArcadeTop50() {
    if (latestXHTTP.status === 200) {
        var response = JSON.parse(latestXHTTP.responseText);

        var ratings = [];

        for (var i = 0; i < response.length; i++) {
            var obj = response[i];
            var gameName = obj.Name;
            var rating = obj.Rating;

            ratings.push([gameName, rating]);
        }
        PopulateTop50(ratings);
        NavigateToInternalPage("#TopFifty");
        AlterRatingHeights(ratings, "", "rating");
    }
    else {
        UnsuccessfulOnlineCall();
    }
}

function PopulateTop50(ratings) {    
    RemoveAllChildren("allratinggameblock");
    RemoveAllChildren("allratingscoresblock");

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

        $('#ratinggameblock').children('ul').append(gameNameArray.join('')).listview().listview('refresh');
        $('#ratingscoreblock').children('ul').append(gameRatingArray.join('')).listview().listview('refresh');
    }
}

function AlterRatingHeights(array, idPrefix, idPostFix) {
    for (var i = 0; i < array.length; i++) {
        var obj = array[i];
        var gameName = obj[0].replace(/_/g, ' ');

        GetHeights(idPrefix + gameName + idPostFix);
    }
}