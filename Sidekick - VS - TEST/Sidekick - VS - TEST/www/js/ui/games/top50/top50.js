var top50ArcadeRatings = [];
var top50PinballRatings = [];
var bottom50ArcadeRatings = [];
var bottom50PinballRatings = [];

// Function that is called from the main menu to access the Top 50
function ArcadeTop50() {
    SideKickOnline_GetTopFifty();
}

function ArcadeBottom50() {
    SideKickOnline_GetBottomFifty();
}

// Function called when the tabs are changed on the top 50 screen to resize the elements
function ResizeTop50() {
    AlterRatingHeights(top50ArcadeRatings, "", "rating");
    AlterRatingHeights(top50PinballRatings, "", "rating");
}

function ResizeBottom50() {
    AlterRatingHeights(bottom50ArcadeRatings, "", "rating");
    AlterRatingHeights(bottom50PinballRatings, "", "rating");
}