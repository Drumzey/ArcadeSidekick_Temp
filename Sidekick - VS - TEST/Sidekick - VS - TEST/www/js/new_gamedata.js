var allGames;
var categoryList = ["beatemup", "fighting", "guns", "hackandslash", "maze", "misc", "platformer", "puzzle", "racing", "runandgun", "shooter", "sports", "rhythm", "pinball"];
var categoryDisplayNameList = ["Beat-em-up", "Fighting", "Light Guns", "Hack and Slash", "Maze", "Misc", "Platformer", "Puzzle", "Racing", "Run and gun", "Shooter", "Sports", "Rhythm", "Pinball"];

function ReturnCorrectData(categoryName) {

    var categoryGames = [];

    for (var game in gameCatalog) {
        if (gameCatalog.hasOwnProperty(game)) {
            if (gameCatalog[game].category === categoryName) {
                categoryGames.push(gameCatalog[game]);
            }
        }
    }

    return categoryGames;
}