var allGames;
var categoryList = ["beatemup", "fighting", "guns", "hackandslash", "maze", "misc", "platformer", "puzzle", "racing", "runandgun", "shooter", "sports", "rhythm"];
var categoryDisplayNameList = ["Beat-em-up", "Fighting", "Light Guns", "Hack and Slash", "Maze", "Misc", "Platformer", "Puzzle", "Racing", "Run and gun", "Shooter", "Sports", "Rhythm"];

function ReturnCorrectData(categoryName) {
    data = '<?xml version="1.0" encoding="utf-8"?><database name="GAMES">';

    if (categoryName === 'beatemup') {
        data = data + beatemup;
    } else if (categoryName === 'fighting') {
        data = data + fighting;
    } else if (categoryName === 'guns') {
        data = data + guns;
    } else if (categoryName === 'hackandslash') {
        data = data + hackandslash;
    } else if (categoryName === 'maze') {
        data = data + maze;
    } else if (categoryName === 'misc') {
        data = data + misc;
    } else if (categoryName === 'platformer') {
        data = data + platformer;
    } else if (categoryName === 'puzzle') {
        data = data + puzzle;
    } else if (categoryName === 'racing') {
        data = data + racing;
    } else if (categoryName === 'runandgun') {
        data = data + runandgun;
    } else if (categoryName === 'shooter') {
        data = data + shooter;
    } else if (categoryName === 'sports') {
        data = data + sports;
    } else if (categoryName === 'rhythm') {
        data = data + rhythm;
    }

    data = data + '</database>';
}