var profileStats = new ProfileStats();
var localPoints = 0;

function ShowFirstTimeProfilePopUp() {
    if (firstTimeProfile === "yes") {
        if (AllowedOnline()) {
            CreatePopup(firstTimeProfilePopUp);
        }
        else {
            CreatePopup(firstTimeProfilePopUpOffLine);
        }
        firstTimeProfile = "no";
        SetItemInStorage("firstTimeProfile", firstTimeProfile);
    }
}

function SuccessfulGetProfileStatsFromRestore(userData) {
    var points = CalculatePoints(userData);
    var level = CalculateLevel(points);
    currentlevel = level;
    TurnOffImages(level);
    UpdateProfileUI(level, points);
}

function SuccessfulGetProfileStats() {
    if (latestXHTTP.status === 200) {
        var userData = JSON.parse(latestXHTTP.responseText);

        var points = CalculatePoints(userData);
        var level = CalculateLevel(points);
        currentlevel = level;
        TurnOffImages(level);
        UpdateProfileUI(level, points);
    }
}

function UpdateProfileUI(level, points) {
    var titleElement = document.getElementById("leveltitle");
    var levelElement = document.getElementById("level");
    var xpElement = document.getElementById("xp");

    levelElement.innerText = "Level " + level;

    var nextPoints = levels[level + 1];

    xpElement.innerText = points + "/" + nextPoints + "XP";

    if (level === 0) {
        SetImageSrc("profileImage", "img/levels/peter pack rat.png");
        titleElement.innerText = "Peter Pack Rat";
    }
    else {
        var imageName = document.getElementById("imglevel" + level);
        SetImageSrc("profileImage", imageName.getAttribute("src"));

        var levelTitle = document.getElementById("level" + level + "title").innerText;
        titleElement.innerText = levelTitle;
    }

    //How many of each game type do we have?
    var gameCategoryCount = {};
    for (var name in gameCatalog) {
        if (!gameCategoryCount.hasOwnProperty(gameCatalog[name].category)) {
            gameCategoryCount[gameCatalog[name].category] = 0;
        }

        gameCategoryCount[gameCatalog[name].category] += 1;
    }

    //Count the games that ive played in the data and figure out the number 
    var playedGameCategoryCount = {};
    for (var i = 0; i < currentRecord.played.length; i++) {
        var game = currentRecord.played[i];
        console.log(game);

        var gameName = game.replace(/_/g, ' ').toLowerCase();
        var id = FindGameInCatalog(gameName);

        if (id === undefined)
            continue;

        var cat = gameCatalog[id].category;

        if (!playedGameCategoryCount.hasOwnProperty(cat)) {
            playedGameCategoryCount[cat] = 0;
        }

        playedGameCategoryCount[cat] += 1;
    }

    for (var category in gameCategoryCount) {
        if (gameCategoryCount.hasOwnProperty(category)) {

            var played = "0";

            if (playedGameCategoryCount.hasOwnProperty(category)) {
                played = playedGameCategoryCount[category];
            }

            var countElement = document.getElementById(category + "stats");
            if (countElement) {
                countElement.innerText = played + "/" + gameCategoryCount[category];
            }
        }
    }

    //Update head line figures
    document.getElementById("gamesplayed").innerText = profileStats.numPlayed;
    document.getElementById("gamesrated").innerText = profileStats.numRatings;
    document.getElementById("scoresuploaded").innerText = profileStats.numScores;
    document.getElementById("scoresshared").innerText = profileStats.numSocial;
}

//Depending on our current level turn off the images above.
function TurnOffImages(level) {
    //hide all title and description elements
    for (var i = 0; i <= 25; i++) {
        Hide("#level" + i + "description");
        Hide("#level" + i + "title");
        Show("#level" + i + "titlehidden");
        Show("#hiddenlevel" + i);
    }

    //set all image from current level below to 0 as hidden
    for (var i = level; i >= 0; i--) {
        //var hiddenimage = document.getElementById("hiddenlevel" + i);
        Hide("#hiddenlevel" + i);
        Hide("#level" + i + "titlehidden");
        Show("#level" + i + "description");
        Show("#level" + i + "title");
    }

    //Remove all borders
    for (var i = 0; i <= 25; i++) {
        var lev = document.getElementById("level" + i);
        lev.style.border = null;
    }

    //Add a border bound the current level item
    var currentLevel = document.getElementById("level" + level);
    currentLevel.style.border = "thick solid #f8d616";
}

function CalculateLocalPoints() {
    var scores = 0;
    var ratings = 0;

    //Need to look at getting only non zero scores and ratings
    for (var i = 0; i < currentRecord.scores.length; i++) {
        if (currentRecord.scores[i].score !== 0 && currentRecord.scores[i].score !== "0") {
            scores++;
        }

        if (currentRecord.ratings[i].rating !== 0 && currentRecord.ratings[i].rating !== "0") {
            ratings++;
        }
    }

    profileStats.numPlayed = currentRecord.played.length;
    profileStats.numRatings = ratings;
    profileStats.numScores = scores;
    profileStats.numSocial = 0;
    profileStats.numChallengesSet = 0;
    profileStats.numPlayedPoints = profileStats.numPlayed * 2;
    profileStats.numRatingsPoints = profileStats.numRatings * 2;
    profileStats.numScoresPoints = profileStats.numScores * 2;
    profileStats.numSocialPoints = 0;
    profileStats.numChallengesSetPoints = 0;

    localPoints = profileStats.numPlayedPoints + profileStats.numRatingsPoints +
        profileStats.numScoresPoints + profileStats.numSocialPoints +
        profileStats.numChallengesSetPoints;

    return localPoints;
}

function CalculatePoints(userData) {

    profileStats.numPlayed = userData.NumberOfGamesPlayed;
    profileStats.numRatings = userData.NumberOfRatingsGiven;
    profileStats.numScores = userData.NumberOfScoresUploaded;
    profileStats.numSocial = userData.NumberOfSocialShares;
    profileStats.numChallengesSet = userData.NumberOfChallengesSent;
    profileStats.numPlayedPoints = userData.NumberOfGamesPlayed * 2;
    profileStats.numRatingsPoints = userData.NumberOfRatingsGiven * 2;
    profileStats.numScoresPoints = userData.NumberOfScoresUploaded * 2;
    profileStats.numSocialPoints = userData.NumberOfSocialShares * 2;
    profileStats.numChallengesSetPoints = userData.NumberOfChallengesSent * 2;

    return profileStats.numPlayedPoints + profileStats.numRatingsPoints +
        profileStats.numScoresPoints + profileStats.numSocialPoints +
        profileStats.numChallengesSetPoints;
}

function CalculateLevel(points) {

    var level = 0;

    for (level = 0; level < levels.length; level++) {
        if (points >= levels[level]) {
            continue;
        }
        break;
    }
    return level - 1;
}

function GoToLevelScreen() {
    NavigateToInternalPage("#Level");

    const element = document.getElementById("level" + currentlevel);
    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const middle = absoluteElementTop - (window.innerHeight / 2);
    window.scrollTo(0, middle);
}

function UpdateOnlineStats(update) {
    var body = {};

    switch (update) {
        case "twitter":

            body =
                {
                    'Username': clientUserName,
                    'TweetSent': false,
                    'ChallengeSent': false,
                    'TwitterHandle': twitterHandle
                };

            break;
        case "challenge":

            body =
                {
                    'Username': clientUserName,
                    'TweetSent': false,
                    'ChallengeSent': true,
                    'TwitterHandle': ""
                };

            break;
        case "tweet":

            body =
                {
                    'Username': clientUserName,
                    'TweetSent': true,
                    'ChallengeSent': false,
                    'TwitterHandle': ""
                };

            break;
    }

    //This is an async call with no waiting dialog
    SideKickOnline_SetProfileStats(body);
    //Update local profile with the call for
    UpdateLocalStats(update);
}

function UpdateDataSubmitted() {
    if (latestXHTTP.status === 200) {
        if (latestXHTTP.responseText === '' || latestXHTTP.responseText === "[]") {
            //If we get here then I dont know what has happened
        }
        else {

            var oldPoints = GetPoints();

            var userData = JSON.parse(latestXHTTP.responseText);
            profileStats.numPlayed = userData.NumberOfGamesPlayed;
            profileStats.numPlayedPoints = profileStats.numPlayed * 2;

            profileStats.numRatings = userData.NumberOfRatingsGiven;
            profileStats.numRatingsPoints = profileStats.numRatings * 2;

            profileStats.numScores = userData.NumberOfScoresUploaded;
            profileStats.numScoresPoints = profileStats.numScores * 2;

            var newPoints = GetPoints();

            CheckLevelUp(oldPoints, newPoints);
        }
    }
}

function UpdateLocalSocialShares() {

}

function UpdateLocalGamesRated() {
    if (latestXHTTP.status === 200) {
        if (latestXHTTP.responseText === '' || latestXHTTP.responseText === "[]") {
            //If we get here then I dont know what has happened
        }
        else {

            var oldPoints = GetPoints();

            var ratingresponse = JSON.parse(latestXHTTP.responseText);
            profileStats.numRatings = ratingresponse.NumberOfRatingsForUser;
            profileStats.numRatingsPoints = profileStats.numRatings * 2;

            var newPoints = GetPoints();

            CheckLevelUp(oldPoints, newPoints);
        }
    }
}

//If a challenge is sent or a tweet made then update the values in the local profile
function UpdateLocalStats(updateType) {
    var oldPoints = GetPoints();

    switch (updateType) {
        case "challenge":
            profileStats.numChallengesSet += 1;
            profileStats.numChallengesSetPoints += 2;
            break;
        case "tweet":
            profileStats.numSocial += 1;
            profileStats.numSocialPoints += 2;
            break;
    }

    var newPoints = GetPoints();
    CheckLevelUp(oldPoints, newPoints);
}

function GetPoints() {
    return profileStats.numPlayedPoints + profileStats.numRatingsPoints +
        profileStats.numScoresPoints +
        profileStats.numSocialPoints + profileStats.numChallengesSetPoints;
}

//We will be checking level up from the social sharing
//from challenge settings (not yet implemented)
//from setting ratings
//from uploading scores
function CheckLevelUp(oldPoints, newPoints) {
    var levelup = false;
    var leveldown = false;
    var oldRank = CalculateLevel(oldPoints);
    var newRank = CalculateLevel(newPoints);

    if (oldRank !== newRank) {
        if (newRank > oldRank) {
            levelup = true;
        }
        else {
            leveldown = true;
        }
    }

    var popupCode = '';

    if (levelup) {
        popupCode = levelUpPopUp.replace("***RANK***", levelNames[newRank]);
    }
    else if (leveldown) {
        popupCode = levelDownPopUp.replace("***RANK***", levelNames[newRank]);
    }

    currentlevel = newRank;
    TurnOffImages(newRank);
    UpdateProfileUI(newRank, newPoints);

    //We might already be within a popup.
    //If this is the case we want to set hte next popup to open when this current one has closed
    //otherwise just open a popup.
    if (levelup || leveldown) {
        if (popupopen === 1) {
            SetNextPopUp(popupCode);
        }
        else {
            CreatePopup(popupCode);
        }
    }
}