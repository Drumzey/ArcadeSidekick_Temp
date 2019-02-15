var defaultBezelScreenWidth = 60;
var defaultBezelTopOffset = 20;
var defaultBezelImage = 'default.png';

var bezelDimensions = [];

//MAZE

var amidarBezel = new Bezel();
amidarBezel.id = 'amidar';
amidarBezel.topOffset = 18;
amidarBezel.leftOffset = 23;
amidarBezel.screenWidth = 56;
amidarBezel.screenHeight = 73;
amidarBezel.image = 'amidar.png';
bezelDimensions['amidar'] = amidarBezel;

var digdug = new Bezel();
digdug.id = 'dig dug';
digdug.screenWidth = 55;
digdug.screenHeight = 61;
digdug.topOffset = 20;
digdug.leftOffset = 24;
digdug.image = 'dig dug.png';
bezelDimensions['dig_dug'] = digdug;

var mspacman = new Bezel();
mspacman.id = 'ms pac-man';
mspacman.topOffset = 20;
mspacman.leftOffset = 24;
mspacman.screenWidth = 52;
mspacman.screenHeight = 60;
mspacman.image = 'ms pac-man.png';
bezelDimensions['ms_pac-man'] = mspacman;

var pacman = new Bezel();
pacman.id = 'pac-man';
pacman.topOffset = 20;
pacman.leftOffset = 22;
pacman.screenWidth = 55;
pacman.screenHeight = 70;
pacman.image = 'pac-man.png';
bezelDimensions['pac-man'] = pacman;

var pacmania = new Bezel(); //????????
pacmania.id = 'pac-mania';
pacmania.topOffset = 20;
pacmania.leftOffset = 20;
pacmania.screenWidth = 63;
pacmania.screenHeight = 60;
pacmania.image = 'pac-mania.png';
bezelDimensions['pac-mania'] = pacmania;

var superpacman = new Bezel();
superpacman.id = 'super pac-man';
superpacman.topOffset = 20;
superpacman.leftOffset = 17;
superpacman.screenWidth = 66;
superpacman.screenHeight = 67;
superpacman.image = 'super pac-man.png';
bezelDimensions['super_pac-man'] = superpacman;

//PLATFORM

var bubble_bobbleBezel = new Bezel();
bubble_bobbleBezel.id = 'bubble bobble';
bubble_bobbleBezel.topOffset = 20;
bubble_bobbleBezel.leftOffset = 22;
bubble_bobbleBezel.screenWidth = 55;
bubble_bobbleBezel.screenHeight = 55;
bubble_bobbleBezel.image = 'bubble bobble.png';

bezelDimensions['bubble_bobble'] = bubble_bobbleBezel;

var burgertime = new Bezel();
burgertime.id = 'burger time';
burgertime.topOffset = 13;
burgertime.leftOffset = 5;
burgertime.screenWidth = 90;
burgertime.screenHeight = 75;
burgertime.image = 'burger time.png';
bezelDimensions['burger_time'] = burgertime;

var crazykong = new Bezel();
crazykong.id = 'crazy kong';
crazykong.topOffset = 39;
crazykong.leftOffset = 23;
crazykong.screenWidth = 54;
crazykong.screenHeight = 49;
crazykong.image = 'crazy kong.png';
bezelDimensions['crazy_kong'] = crazykong;

var donkeykong3 = new Bezel();
donkeykong3.id = 'donkey kong 3';
donkeykong3.topOffset = 10;
donkeykong3.leftOffset = 18;
donkeykong3.screenWidth = 66;
donkeykong3.screenHeight = 66;
donkeykong3.image = 'donkey kong 3.png';
bezelDimensions['donkey_kong_3'] = donkeykong3;

var donkeykongjr = new Bezel();
donkeykongjr.id = 'donkey kong jr';
donkeykongjr.topOffset = 10;
donkeykongjr.leftOffset = 19;
donkeykongjr.screenWidth = 63;
donkeykongjr.screenHeight = 68;
donkeykongjr.image = 'donkey kong jr.png';
bezelDimensions['donkey_kong_jr'] = donkeykongjr;

var donkeykong = new Bezel();
donkeykong.id = 'donkey kong';
donkeykong.topOffset = 16;
donkeykong.leftOffset = 19;
donkeykong.screenWidth = 63;
donkeykong.screenHeight = 63;
donkeykong.image = 'donkey kong.png';
bezelDimensions['donkey_kong'] = donkeykong;

var foodfight = new Bezel(); // WRONG GENRE???
foodfight.id = 'food fight';
foodfight.topOffset = 28;
foodfight.leftOffset = 25;
foodfight.screenWidth = 50;
foodfight.screenHeight = 50;
foodfight.image = 'food fight.png';
bezelDimensions['food_fight'] = foodfight;

var frogger = new Bezel();
frogger.id = 'frogger';
frogger.screenWidth = 85;
frogger.screenHeight = 57;
frogger.topOffset = 39;
frogger.leftOffset = 8;
frogger.image = 'frogger.png';
bezelDimensions['frogger'] = frogger;

var joust2 = new Bezel();
joust2.id = 'joust 2';
joust2.topOffset = 5;
joust2.leftOffset = 26;
joust2.screenWidth = 48;
joust2.screenHeight = 70;
joust2.image = 'joust 2.png';
bezelDimensions['joust_2'] = joust2;

var joust = new Bezel();
joust.id = 'joust';
joust.topOffset = 14;
joust.leftOffset = 20;
joust.screenWidth = 60;
joust.screenHeight = 60;
joust.image = 'joust.png';
bezelDimensions['joust'] = joust;

var mappy = new Bezel();
mappy.id = 'mappy';
mappy.topOffset = 14;
mappy.leftOffset = 20;
mappy.screenWidth = 60;
mappy.screenHeight = 72;
mappy.image = 'mappy.png';
bezelDimensions['mappy'] = mappy;

var mariobros = new Bezel();
mariobros.id = 'mario-bros';
mariobros.topOffset = 20;
mariobros.leftOffset = 20;
mariobros.screenWidth = 61;
mariobros.screenHeight = 60;
mariobros.image = 'mario-bros.png';
bezelDimensions['mario-bros'] = mariobros;

var popeye = new Bezel();
popeye.id = 'popeye';
popeye.topOffset = 21;
popeye.leftOffset = 20;
popeye.screenWidth = 60;
popeye.screenHeight = 55;
popeye.image = 'popeye.png';
bezelDimensions['popeye'] = popeye;

//Fighting

var karatechamp = new Bezel();
karatechamp.id = 'karatechamp';
karatechamp.topOffset = 13;
karatechamp.leftOffset = 24;
karatechamp.screenWidth = 52;
karatechamp.screenHeight = 66;
karatechamp.image = 'karate champ.png';
bezelDimensions['karate_champ'] = karatechamp;

//guns

var crossbow = new Bezel();
crossbow.id = 'crossbow';
crossbow.topOffset = 10;
crossbow.leftOffset = 10;
crossbow.screenWidth = 80;
crossbow.screenHeight = 69;
crossbow.image = 'crossbow.png';
bezelDimensions['crossbow'] = crossbow;

//misc

var qix = new Bezel();
qix.id = 'qix';
qix.topOffset = 15;
qix.leftOffset = 20;
qix.screenWidth = 60;
qix.screenHeight = 80;
qix.image = 'qix.png';
bezelDimensions['qix'] = qix;

var tapper = new Bezel();
tapper.id = 'tapper';
tapper.topOffset = 19;
tapper.leftOffset = 13;
tapper.screenWidth = 75;
tapper.screenHeight = 65;
tapper.image = 'tapper.png';
bezelDimensions['tapper'] = tapper;

//Puzzle

var qbert = new Bezel();
qbert.id = 'q-bert';
qbert.topOffset = 10;
qbert.leftOffset = 18;
qbert.screenWidth = 66;
qbert.screenHeight = 80;
qbert.image = 'q-bert.png';
bezelDimensions['q-bert'] = qbert;

//racing

var chasehq = new Bezel();
chasehq.id = 'chase h q';
chasehq.topOffset = 16;
chasehq.leftOffset = 15;
chasehq.screenWidth = 70;
chasehq.screenHeight = 67;
chasehq.image = 'chase h q.png';
bezelDimensions['chase_h_q'] = chasehq;

var superbug = new Bezel();
superbug.id = 'super bug';
superbug.topOffset = 15;
superbug.leftOffset = 10;
superbug.screenWidth = 79;
superbug.screenHeight = 70;
superbug.image = 'super bug.png';
bezelDimensions['super_bug'] = superbug;

//Shooter

var centipede = new Bezel();
centipede.id = 'centipede';
centipede.topOffset = 21;
centipede.leftOffset = 19;
centipede.screenWidth = 62;
centipede.screenHeight = 62;
centipede.image = 'centipede.png';
bezelDimensions['centipede'] = centipede;

var defender = new Bezel();
defender.id = 'defender';
defender.topOffset = 15;
defender.leftOffset = 20;
defender.screenWidth = 60;
defender.screenHeight = 62;
defender.image = 'defender.png';
bezelDimensions['defender'] = defender;

var galaga = new Bezel();
galaga.id = 'galaga';
galaga.topOffset = 20;
galaga.leftOffset = 22;
galaga.screenWidth = 55;
galaga.screenHeight = 70;
galaga.image = 'galaga.png';
bezelDimensions['galaga'] = galaga;

var galaxian = new Bezel();
galaxian.id = 'galaxian';
galaxian.topOffset = 19;
galaxian.leftOffset = 21;
galaxian.screenWidth = 58;
galaxian.screenHeight = 70;
galaxian.image = 'galaxian.png';
bezelDimensions['galaxian'] = galaxian;

var junofirst = new Bezel();
junofirst.id = 'juno first';
junofirst.topOffset = 13;
junofirst.leftOffset = 20;
junofirst.screenWidth = 60;
junofirst.screenHeight = 75;
junofirst.image = 'juno first.png';
bezelDimensions['juno_first'] = junofirst;

var moonpatrol = new Bezel();
moonpatrol.id = 'moon patrol';
moonpatrol.topOffset = 15;
moonpatrol.leftOffset = 16;
moonpatrol.screenWidth = 68;
moonpatrol.screenHeight = 60;
moonpatrol.image = 'moon patrol.png';
bezelDimensions['moon_patrol'] = moonpatrol;

var robotron = new Bezel();
robotron.id = 'robotron 2084';
robotron.topOffset = 28;
robotron.leftOffset = 15;
robotron.screenWidth = 70;
robotron.screenHeight = 65;
robotron.image = 'robotron 2084.png';
bezelDimensions['robotron_2084'] = robotron;

var sinistar = new Bezel();
sinistar.id = 'sinistar';
sinistar.topOffset = 18;
sinistar.leftOffset = 23;
sinistar.screenWidth = 53;
sinistar.screenHeight = 65;
sinistar.image = 'sinistar.png';
bezelDimensions['sinistar'] = sinistar;

var spacezap = new Bezel();
spacezap.id = 'space zap';
spacezap.topOffset = 11;
spacezap.leftOffset = 17;
spacezap.screenWidth = 66;
spacezap.screenHeight = 75;
spacezap.image = 'space zap.png';
bezelDimensions['space_zap'] = spacezap;

var tron = new Bezel();
tron.id = 'tron';
tron.topOffset = 15;
tron.leftOffset = 17;
tron.screenWidth = 60;
tron.screenHeight = 70;
tron.image = 'tron.png';
bezelDimensions['tron'] = tron;

var warlords = new Bezel();
warlords.id = 'warlords';
warlords.topOffset = 5;
warlords.leftOffset = 8;
warlords.screenWidth = 84;
warlords.screenHeight = 65;
warlords.image = 'warlords.png';
bezelDimensions['warlords'] = warlords;

function GetBezel(gamename) {

    if (bezelDimensions.hasOwnProperty(gamename))
    {
        return bezelDimensions[gamename];
    }

    var defaultB = new Bezel();
    defaultB.id = 'default';
    defaultB.screenWidth = defaultBezelScreenWidth;
    defaultB.topOffset = defaultBezelTopOffset;
    defaultB.image = defaultBezelImage;

    return defaultB;
}