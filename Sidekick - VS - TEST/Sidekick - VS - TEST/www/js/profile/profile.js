var points = 0;
var levels = [0, 10, 50, 125, 250, 400, 600, 850, 1150, 1450, 1800, 2200, 2650, 3150, 3650, 4200, 4800, 5500, 6150, 6850, 7600, 8400, 9250, 10000, 11000, 12000];
var levelNames = ['Peter Pack Rat', 'berzerk', 'dragons lair', 'jungle hunt', 'missile command', 'popeye', 'nba jam', 'dig dug', 'robotron 2084', 'mortal kombat', 'pole position', 'q*bert', 'mortal kombat ii', 'tempest', 'mr do!', 'donkey kong jr.', 'out run', 'galaxian', 'centipede', 'defender', 'asteroids', 'ms.pac-man', 'donkey kong', 'street fighter ii', 'space invaders', 'pac-man'];
var currentlevel = 0;
var firstTimeProfile = '';

function GotoProfile() {
    NavigateToInternalPage("#Profile");
    ShowFirstTimeProfilePopUp();
}

function FindInitialPoints() {
    var points = CalculateLocalPoints();
    var level = CalculateLevel(points);
    currentlevel = level;
    TurnOffImages(level);
    UpdateProfileUI(level, points);
}

function CalculateLocalStatistics() {
    var oldPoints = localPoints;

    var points = CalculateLocalPoints();
    var level = CalculateLevel(points);
    currentlevel = level;
    TurnOffImages(level);
    UpdateProfileUI(level, points);

    CheckLevelUp(oldPoints, points);
}