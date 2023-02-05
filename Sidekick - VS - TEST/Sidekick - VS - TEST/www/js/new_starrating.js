function SuccessfulGetCommunityRating(onSave) {
    if (latestXHTTP.status === 200) {
        Show('#communityrating');
        if (latestXHTTP.responseText === '' || latestXHTTP.responseText === "[]") {
            document.getElementById("averagerating").innerText = "Game not yet rated. You can be the first";
        }
        else {
            var ratingresponse = JSON.parse(latestXHTTP.responseText);

            var average = 0;
            var numberOfRatings = 0;
            var weightedAverage = 0;

            if (onSave === true)
            {
                average = ratingresponse.Games[TransformedCurrentGameName()].Average.toFixed(2);
                numberOfRatings = ratingresponse.Games[TransformedCurrentGameName()].NumberOfRatings;
                weightedAverage = ratingresponse.Games[TransformedCurrentGameName()].WeightedAverage.toFixed(2);
            }
            else
            {
                average = ratingresponse.Average.toFixed(2);
                numberOfRatings = ratingresponse.NumberOfRatings;
                weightedAverage = ratingresponse.WeightedAverage.toFixed(2);
            }            

            if (ratingresponse.ratings === 0 || ratingresponse.total === 0) {
                document.getElementById("averagerating").innerText = "Game not yet rated. You can be the first";
            }
            else if (ratingresponse.ratings === 1) {
                document.getElementById("averagerating").innerText = "Average Rating " + average + " based upon " + numberOfRatings + " vote " +
                    "with a weighted average of " + weightedAverage;
            }
            else {
                document.getElementById("averagerating").innerText = "Average Rating " + average + " based upon " + numberOfRatings + " votes " +
                    "with a weighted average of " + weightedAverage;
            }
        }
    }
    else {
        UnsuccessfulGetCommunityRating();
    }
}

function UnsuccessfulGetCommunityRating() {
    hasErrored = true;
    Hide('#communityrating');
}

function GetCommunityRating() {
    SideKickOnline_GetRating("Getting community rating...");
}

function ClearRating(rating) {
    try {
        var element = $('#datavote' + rating);
        var id = element.parent().attr("id");

        $("#" + id + ".rating a").each(function (i, v) {
            $(v).removeClass("rated");
        });
    }
    catch (err) {
        //This hosuldnt erro but in case it does.
    }
}

function LoadRating() {
    var ratings = currentRecord.ratings;
    var rating = '0';

    for (var i = 0; i < ratings.length; i++) {
        var gameid = ratings[i].id;

        if (gameid === TransformedCurrentGameName()) {
            rating = ratings[i].rating;
            break;
        }
    }

    if (rating !== '0' && rating !== 0) {
        var element = $('#datavote' + rating);
        var id = element.parent().attr("id");

        $("#" + id + ".rating a").each(function (i, v) {
            $(v).removeClass("rated");
        });

        element.prevAll().each(function (i, v) {
            $(v).addClass("rated");
        });

        element.addClass("rated");
    }
}

function SuccessfulOnClickStar(rating) {
    if (latestXHTTP.status === 200) {
        var ratings = currentRecord.ratings;
        for (var i = 0; i < ratings.length; i++) {
            var gameid = ratings[i].id;

            if (gameid === TransformedCurrentGameName()) {
                ratings[i].rating = rating;
                SetItemInStorage("my_record", currentRecord);

                var imageName = 'img/ratings/star' + rating + '.png';

                //There are multiple items
                var imageElements = document.getElementsByName(gameid + 'rating');
                for (var j = 0; j < imageElements.length; j++) {
                    imageElements[j].setAttribute("src", imageName);
                }

                var imageforrating = document.getElementById(gameid + 'rating');

                //It is possible that we have come from the all category here in which case we do not have the element created for the image so
                //only perform the update if the item is present
                if (imageforrating) {
                    imageforrating.src = imageName;
                }

                //Latest response has the new averages in.
                SuccessfulGetCommunityRating(true);
                break;
            }
        }

        //Latest Response has the number of Games That user has now rated in
        UpdateLocalGamesRated();
    }
    else {
        UnsuccessfulOnClickStar();
    }
}

function UnsuccessfulOnClickStar() {
    CreatePopup(errorOnlinePopup);
}

function AddStarHighlight(id, element) {
    $("#" + id + ".rating a").each(function (i, v) {
        $(v).removeClass("rated");
    });

    element.prevAll().each(function (i, v) {
        $(v).addClass("rated");
    });

    element.addClass("rated");
}

function OnClickStar(datavote) {

    var element = $('#' + datavote);
    var id = element.parent().attr("id");
    var rating = element.data("vote");

    if (AllowedOnline()) {
        SideKickOnline_SaveRating(rating, element, id, "Updating rating...");
    }
    else {
        var ratings = currentRecord.ratings;
        AddStarHighlight(id, element);
        for (var i = 0; i < ratings.length; i++) {
            var gameid = ratings[i].id;

            if (gameid === TransformedCurrentGameName()) {
                ratings[i].rating = rating;
                SetItemInStorage("my_record", currentRecord);

                var imageName = 'img/ratings/star' + rating + '.png';

                var indexInNewGames = newGames.indexOf(currentGameName);

                //Update existing element
                //Add new rating, but also remove class for new game if on new game list!
                var elements = document.getElementsByName(gameid + 'rating');
                var j;
                for (j = 0; j < elements.length; j++) {
                    elements[j].src = imageName;
                    if (indexInNewGames !== -1) {
                        elements[j].closest('a').classList.remove("ui-shadow");
                        elements[j].closest('a').classList.remove("ui-corner-all");
                        elements[j].closest('a').classList.remove("ui-icon-star");
                        elements[j].closest('a').classList.remove("ui-btn-icon-left");
                    }
                }

                //update item in control cache
                //Remove from new games if new
                if (indexInNewGames !== -1)
                {
                    newGames.splice(indexInNewGames, 1);
                }

                var newControls = [];
                var game = gameCatalog[currentGameName];
                CreateGameListItem(game, gameCache[game.category], newControls);

                for (j = 0; j < newControls.length; j++) {
                    gameControlArray[newControls[j][0]] = newControls[j][1];
                }
                break;
            }
        }

        CalculateLocalStatistics();
    }
}