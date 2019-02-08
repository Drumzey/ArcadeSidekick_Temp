var Scores = (function () {
    this.id = '';
    this.score = 0;
    this.notes = '';
    this.uploaded = false;
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