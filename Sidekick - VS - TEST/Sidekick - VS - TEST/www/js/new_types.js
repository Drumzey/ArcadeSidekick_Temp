var Scores = (function () {
    this.id = '';
    this.score = 0;
    this.notes = '';
    this.uploaded = false;
});

var Bezel = (function () {
    this.id = '';
    this.screenWidth = 60;
    this.screenHeight = 60;
    this.topOffset = 20;
    this.leftOffset = 20;
    this.image = '';
});

var MyScoreEntry = (function () {
    this.score = 0;
    this.uploaded = false;
});

var Ratings = (function () {
    this.id = '';
    this.rating = 0;
});

var Record = (function () {
    this.verified = false;
    this.played = new Array();
    this.scores = new Array();
    this.ratings = new Array();
});

var ProfileStats = (function () {
    this.numPlayed = 0;
    this.numRatings = 0;
    this.numScores = 0;
    this.numSocial = 0;
    this.numChallengesSet = 0;
    this.numPlayedPoints = 0;
    this.numRatingsPoints = 0;
    this.numScoresPoints = 0;
    this.numSocialPoints = 0;
    this.numChallengesSetPoints = 0;
});

var DetailedScore = (function () {
    this.Score = 0;
    this.Date = '';
    this.LevelName = '';
    this.Difficulty = '';
    this.Lives = 0;
    this.ExtraLivesAt = '';
    this.Credits = 0;
    this.Location = '';
    this.Event = '';
    this.Clubs = '';
    this.MameOrPCB = '';
});