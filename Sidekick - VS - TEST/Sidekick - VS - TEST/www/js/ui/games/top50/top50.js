var top50ArcadeRatings = [];
var top50PinballRatings = [];

// Function that is called from the main menu to access the Top 50
function ArcadeTop50() {
    SideKickOnline_GetTopFifty();
}

// Function called when the tabs are changed on the top 50 screen to resize the elements
function ResizeTop50() {
    AlterRatingHeights(top50ArcadeRatings, "", "rating");
    AlterRatingHeights(top50PinballRatings, "", "rating");
}