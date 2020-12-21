var allGames;

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