function SuccessfulGetCommunityRating() {
    if (latestXHTTP.status === 200) {        
        Show('#communityrating');
        if (latestXHTTP.responseText === '' || latestXHTTP.responseText === "[]") {
            document.getElementById("averagerating").innerText = "Game not yet rated. You can be the first";
        }
        else {
            var ratingresponse = JSON.parse(latestXHTTP.responseText);
            var average = ratingresponse.Games[TransformedCurrentGameName()].Average;
            var numberOfRatings = ratingresponse.Games[TransformedCurrentGameName()].NumberOfRatings;

            if (ratingresponse.ratings === 0 || ratingresponse.total === 0) {
                document.getElementById("averagerating").innerText = "Game not yet rated. You can be the first";
            }
            else if (ratingresponse.ratings === 1) {
                document.getElementById("averagerating").innerText = "Average Rating " + average + " based upon " + numberOfRatings + " vote";
            }
            else {
                document.getElementById("averagerating").innerText = "Average Rating " + average + " based upon " + numberOfRatings + " votes";
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

function ClearRating() {
    $("#ratings.rating a").each(function (i, v) {
        $(v).removeClass("rated");
    });
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

    if (rating !== '0') {
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
    else {        
        ClearRating();
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

                var imageName = 'img/star' + rating + '.png';

                var imageforrating = document.getElementById(gameid + 'rating');

                //It is possible that we have come from the all category here in which case we do not have the element created for the image so
                //only perform the update if the item is present
                if (imageforrating) {
                    imageforrating.src = imageName;
                }

                //Latest response has the new averages in.
                SuccessfulGetCommunityRating();                
                break;
            }
        }
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
        AddStarHighlight(id, element);
        var ratings = currentRecord.ratings;
        for (var i = 0; i < ratings.length; i++) {
            var gameid = ratings[i].id;

            if (gameid === TransformedCurrentGameName()) {
                ratings[i].rating = rating;
                SetItemInStorage("my_record", currentRecord);

                var imageName = 'img/star' + rating + '.png';

                var imageforrating = document.getElementById(gameid + 'rating');
                
                if (imageforrating) {
                    imageforrating.src = imageName;
                }                
                break;
            }
        }
    }    
}