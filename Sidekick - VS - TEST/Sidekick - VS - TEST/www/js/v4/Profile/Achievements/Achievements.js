var achievementPage = new AppPage();
achievementPage.id = 'achievements';
achievementPage.pageName = 'Achievements';
achievementPage.beforeNavigate = function () { ProcessAchievements(); };
achievementPage.afterNavigate = function () { ShowFirstTimeAchievementsPopUp(); };

AppPages[achievementPage.id] = achievementPage;

var Achievements = [];
var firstTimeAchievements = '';

var Achievement = (function () {
    this.shortName = "";
    this.longName = "";
    this.badge = "";
    this.numberRequired = "";
    this.category = "";
    this.type = "";
    this.got = false;
    this.secret = false;
});

function ShowFirstTimeAchievementsPopUp() {
    if (firstTimeAchievements === "yes") {
        CreatePopup(firstTimeAchievementsPopup);
        firstTimeAchievements = "no";
        SetItemInStorage("firstTimeAchievements", firstTimeAchievements);
    }
}

function ProcessAchievements() {

    for (var i = 0; i < Achievements.length; i++)
    {
        var cheevo = Achievements[i];

        var valueGot = 0;

        switch (cheevo.type) {

            case "level":
                if (currentlevel >= cheevo.numberRequired) {
                    cheevo.got = true;
                }
                break;

            case "ratingsValue":
                var result = GetRatingNumberWithValue(cheevo.numberRequired);
                if (result === true) {
                    cheevo.got = true;
                }
                break;

            case "played":
                valueGot = GetPlayedNumberFromCategory(cheevo.category);
                if (valueGot > cheevo.numberRequired) {
                    cheevo.got = true;
                }

                break;

            case "ratings":
                valueGot = GetRatingsNumberFromCategory(cheevo.category);
                if (valueGot > cheevo.numberRequired) {
                    cheevo.got = true;
                }

                break;

            case "scores":
                valueGot = GetScoresNumberFromCategory(cheevo.category);
                if (valueGot > cheevo.numberRequired) {
                    cheevo.got = true;
                }

                break;

            default:
        }
    }

    DrawAchievements();
}

function GetRatingNumberWithValue(value) {

    for (var i = 0; i < currentRecord.ratings.length; i++) {
        if (currentRecord.ratings[i].rating == value) {
            return true;
        }
    }

    return false;
}

function GetPlayedNumberFromCategory(categoryName) {

    switch (categoryName) {
        case "all":
            return currentRecord.played.length;
        default:
            return 0;
    }
}

function GetRatingsNumberFromCategory(categoryName) {

    switch (categoryName) {
        case "all":
            return currentRecord.ratings.length;
        default:
            return 0;
    }
}

function GetScoresNumberFromCategory(categoryName) {

    switch (categoryName) {
        case "all":
            return currentRecord.scores.length;
        default:
            return 0;
    }
}

function DrawAchievements() {
    var template =
        '<li data-icon="false" style="padding: 0em !important">' +
        '<a style="padding-left: 5.5em;padding-right:3em;" href="#" class="MEDALCLASS">' +
        '<img style="background: white;" src="img/medals/MEDALGIF.gif">' +
        '<h2 style="white-space: normal;margin:0;padding:0;font-size:80%">MEDALNAME</h2>' +
        '<p style="white-space: normal;font-size:60%;margin:0">MEDALDESCRIPTION</p>' +
        '</a>' +
        '</li>';

    var achievementsOutput = [];

    for (var i = 0; i < Achievements.length; i++) {
        var cheevo = Achievements[i];
        var cheevoOutput = template;

        if (cheevo.got === true) {
            cheevoOutput = cheevoOutput.replace("MEDALGIF", cheevo.badge);
            cheevoOutput = cheevoOutput.replace("MEDALNAME", cheevo.shortName);
            cheevoOutput = cheevoOutput.replace("MEDALDESCRIPTION", cheevo.longName);
        }
        else {
            cheevoOutput = cheevoOutput.replace("MEDALCLASS", "disabledAchievement");
            if (cheevo.secret === true) {
                cheevoOutput = cheevoOutput.replace("MEDALGIF", "secret");
                cheevoOutput = cheevoOutput.replace("MEDALNAME", "???????");
                cheevoOutput = cheevoOutput.replace("MEDALDESCRIPTION", "???????");
            }
            else {
                cheevoOutput = cheevoOutput.replace("MEDALGIF", "secret");
                cheevoOutput = cheevoOutput.replace("MEDALNAME", cheevo.shortName);
                cheevoOutput = cheevoOutput.replace("MEDALDESCRIPTION", cheevo.longName);
            }
        }

        achievementsOutput.push(cheevoOutput);
    }

    RemoveAllChildren('achievementsUl');

    $('#achievementsUl').append(achievementsOutput.join('')).listview().listview('refresh');
}

var played1Game = new Achievement();
played1Game.shortName = "Played a game";
played1Game.longName = "Played your first game";
played1Game.numberRequired = 1;
played1Game.category = "all";
played1Game.type = "played";
played1Game.badge = "played1Game";
Achievements.push(played1Game);

var played5Games = new Achievement();
played5Games.shortName = "Played 5 games";
played5Games.longName = "Played 5 games";
played5Games.numberRequired = 5;
played5Games.category = "all";
played5Games.type = "played";
played5Games.badge = "played5Games";
Achievements.push(played5Games);

var played10Games = new Achievement();
played10Games.shortName = "Played 10 games";
played10Games.longName = "Played 10 games";
played10Games.numberRequired = 10;
played10Games.category = "all";
played10Games.type = "played";
played10Games.badge = "played10Games";
Achievements.push(played10Games);

var played25Games = new Achievement();
played25Games.shortName = "Played 25 games";
played25Games.longName = "Played 25 games";
played25Games.numberRequired = 25;
played25Games.category = "all";
played25Games.type = "played";
played25Games.badge = "played25Games";
Achievements.push(played25Games);

var played50Games = new Achievement();
played50Games.shortName = "Played 50 games";
played50Games.longName = "Played 50 games";
played50Games.numberRequired = 50;
played50Games.category = "all";
played50Games.type = "played";
played50Games.badge = "played50Games";
Achievements.push(played50Games);

var played100Games = new Achievement();
played100Games.shortName = "Played 100 games";
played100Games.longName = "Played 100 games";
played100Games.numberRequired = 100;
played100Games.category = "all";
played100Games.type = "played";
played100Games.badge = "played100Games";
Achievements.push(played100Games);

var played250Games = new Achievement();
played250Games.shortName = "Played 250 games";
played250Games.longName = "Played 250 games";
played250Games.numberRequired = 250;
played250Games.category = "all";
played250Games.type = "played";
played250Games.badge = "played250Games";
Achievements.push(played250Games);

var played500Games = new Achievement();
played500Games.shortName = "Played 500 games";
played500Games.longName = "Played 500 games";
played500Games.numberRequired = 500;
played500Games.category = "all";
played500Games.type = "played";
played500Games.badge = "played500Games";
Achievements.push(played500Games);

var rated1Game = new Achievement();
rated1Game.shortName = "Rated a game";
rated1Game.longName = "Rated your first game";
rated1Game.numberRequired = 1;
rated1Game.category = "all";
rated1Game.type = "ratings";
rated1Game.badge = "ratings1Game";
Achievements.push(rated1Game);

var rated5Games = new Achievement();
rated5Games.shortName = "Rated 5 games";
rated5Games.longName = "Rated 5 games";
rated5Games.numberRequired = 5;
rated5Games.category = "all";
rated5Games.type = "ratings";
rated5Games.badge = "ratings5Games";
Achievements.push(rated5Games);

var rated10Games = new Achievement();
rated10Games.shortName = "Rated 10 games";
rated10Games.longName = "Rated 10 games";
rated10Games.numberRequired = 10;
rated10Games.category = "all";
rated10Games.type = "ratings";
rated10Games.badge = "ratings10Games";
Achievements.push(rated10Games);

var rated25Games = new Achievement();
rated25Games.shortName = "Rated 25 games";
rated25Games.longName = "Rated 25 games";
rated25Games.numberRequired = 25;
rated25Games.category = "all";
rated25Games.type = "ratings";
rated25Games.badge = "ratings25Games";
Achievements.push(rated25Games);

var rated50Games = new Achievement();
rated50Games.shortName = "Rated 50 games";
rated50Games.longName = "Rated 50 games";
rated50Games.numberRequired = 50;
rated50Games.category = "all";
rated50Games.type = "ratings";
rated50Games.badge = "ratings50Games";
Achievements.push(rated50Games);

var rated100Games = new Achievement();
rated100Games.shortName = "Rated 100 games";
rated100Games.longName = "Rated 100 games";
rated100Games.numberRequired = 100;
rated100Games.category = "all";
rated100Games.type = "ratings";
rated100Games.badge = "ratings100Games";
Achievements.push(rated100Games);

var rated250Games = new Achievement();
rated250Games.shortName = "Rated 250 games";
rated250Games.longName = "Rated 250 games";
rated250Games.numberRequired = 250;
rated250Games.category = "all";
rated250Games.type = "ratings";
rated250Games.badge = "ratings250Games";
Achievements.push(rated250Games);

var rated500Games = new Achievement();
rated500Games.shortName = "Rated 500 games";
rated500Games.longName = "Rated 500 games";
rated500Games.numberRequired = 500;
rated500Games.category = "all";
rated500Games.type = "ratings";
rated500Games.badge = "ratings500Games";
Achievements.push(rated500Games);

var ratedAGameWith1 = new Achievement();
ratedAGameWith1.shortName = "Is it really that bad?";
ratedAGameWith1.longName = "You gave a game 1 out of 10? Was it Peter Packrat? Is it really that bad?";
ratedAGameWith1.numberRequired = 1;
ratedAGameWith1.category = "all";
ratedAGameWith1.type = "ratingsValue";
ratedAGameWith1.badge = "ratingsMinScore";
ratedAGameWith1.secret = true;
Achievements.push(ratedAGameWith1);

var ratedAGameWith10 = new Achievement();
ratedAGameWith10.shortName = "Best game E.V.E.R!";
ratedAGameWith10.longName = "You gave a game 10 out of 10. What does everyone else think?";
ratedAGameWith10.numberRequired = 10;
ratedAGameWith10.category = "all";
ratedAGameWith10.type = "ratingsValue";
ratedAGameWith10.badge = "ratingsMaxScore";
ratedAGameWith10.secret = true;
Achievements.push(ratedAGameWith10);

var score1Game = new Achievement();
score1Game.shortName = "Submitted a score";
score1Game.longName = "Submitted a score for your first game";
score1Game.numberRequired = 1;
score1Game.category = "all";
score1Game.type = "scores";
score1Game.badge = "scores1Game";
Achievements.push(score1Game);

var scored5Games = new Achievement();
scored5Games.shortName = "Submitted 5 scores";
scored5Games.longName = "Submitted 5 scores";
scored5Games.numberRequired = 5;
scored5Games.category = "all";
scored5Games.type = "scores";
scored5Games.badge = "scores5Games";
Achievements.push(scored5Games);

var scored10Games = new Achievement();
scored10Games.shortName = "Submitted 10 scores";
scored10Games.longName = "Submitted 10 scores";
scored10Games.numberRequired = 10;
scored10Games.category = "all";
scored10Games.type = "scores";
scored10Games.badge = "scores10Games";
Achievements.push(scored10Games);

var scored25Games = new Achievement();
scored25Games.shortName = "Submitted 25 scores";
scored25Games.longName = "Submitted 25 scores";
scored25Games.numberRequired = 25;
scored25Games.category = "all";
scored25Games.type = "scores";
scored25Games.badge = "scores25Games";
Achievements.push(scored25Games);

var scored50Games = new Achievement();
scored50Games.shortName = "Submitted 50 scores";
scored50Games.longName = "Submitted 50 scores";
scored50Games.numberRequired = 50;
scored50Games.category = "all";
scored50Games.type = "scores";
scored50Games.badge = "scores50Games";
Achievements.push(scored50Games);

var scored100Games = new Achievement();
scored100Games.shortName = "Submitted 100 scores";
scored100Games.longName = "Submitted 100 scores";
scored100Games.numberRequired = 100;
scored100Games.category = "all";
scored100Games.type = "scores";
scored100Games.badge = "scores100Games";
Achievements.push(scored100Games);

var scored250Games = new Achievement();
scored250Games.shortName = "Submitted 250 scores";
scored250Games.longName = "Submitted 250 scores";
scored250Games.numberRequired = 250;
scored250Games.category = "all";
scored250Games.type = "scores";
scored250Games.badge = "scores250Games";
Achievements.push(scored250Games);

var scored500Games = new Achievement();
scored500Games.shortName = "Submitted 500 scores";
scored500Games.longName = "Submitted 500 scores";
scored500Games.numberRequired = 500;
scored500Games.category = "all";
scored500Games.type = "scores";
scored500Games.badge = "scores500Games";
Achievements.push(scored500Games);

var level1 = new Achievement();
level1.shortName = "Level 1";
level1.longName = "You reached Level 1 Berzerk";
level1.numberRequired = 1;
level1.category = "all";
level1.type = "level";
level1.badge = "level1";
level1.secret = true;
Achievements.push(level1);

var level2 = new Achievement();
level2.shortName = "Level 2";
level2.longName = "You reached Level 2 Dragons Lair";
level2.numberRequired = 2;
level2.category = "all";
level2.type = "level";
level2.badge = "level2";
level2.secret = true;
Achievements.push(level2);

var level3 = new Achievement();
level3.shortName = "Level 3";
level3.longName = "You reached Level 3 Jungle Hunt";
level3.numberRequired = 3;
level3.category = "all";
level3.type = "level";
level3.badge = "level3";
level3.secret = true;
Achievements.push(level3);

var level4 = new Achievement();
level4.shortName = "Level 4";
level4.longName = "You reached Level 4 Missile Command";
level4.numberRequired = 3;
level4.category = "all";
level4.type = "level";
level4.badge = "level4";
level4.secret = true;
Achievements.push(level4);

var level5 = new Achievement();
level5.shortName = "Level 5";
level5.longName = "You reached Level 5 Popeye";
level5.numberRequired = 5;
level5.category = "all";
level5.type = "level";
level5.badge = "level5";
level5.secret = true;
Achievements.push(level5);

var level6 = new Achievement();
level6.shortName = "Level 6";
level6.longName = "You reached Level 6 NBA Jam";
level6.numberRequired = 6;
level6.category = "all";
level6.type = "level";
level6.badge = "level6";
level6.secret = true;
Achievements.push(level6);

var level7 = new Achievement();
level7.shortName = "Level 7";
level7.longName = "You reached Level 7 Dig Dug";
level7.numberRequired = 7;
level7.category = "all";
level7.type = "level";
level7.badge = "level7";
level7.secret = true;
Achievements.push(level7);

var level8 = new Achievement();
level8.shortName = "Level 8";
level8.longName = "You reached Level 8 Robotron 2084";
level8.numberRequired = 8;
level8.category = "all";
level8.type = "level";
level8.badge = "level8";
level8.secret = true;
Achievements.push(level8);

var level9 = new Achievement();
level9.shortName = "Level 9";
level9.longName = "You reached Level 9 Mortal Kombat";
level9.numberRequired = 9;
level9.category = "all";
level9.type = "level";
level9.badge = "level9";
level9.secret = true;
Achievements.push(level9);

var level10 = new Achievement();
level10.shortName = "Level 10";
level10.longName = "You reached Level 10 Pole Position";
level10.numberRequired = 10;
level10.category = "all";
level10.type = "level";
level10.badge = "level10";
level10.secret = true;
Achievements.push(level10);

var level11 = new Achievement();
level11.shortName = "Level 11";
level11.longName = "You reached Level 11 QBert";
level11.numberRequired = 11;
level11.category = "all";
level11.type = "level";
level11.badge = "level11";
level11.secret = true;
Achievements.push(level11);

var level12 = new Achievement();
level12.shortName = "Level 12";
level12.longName = "You reached Level 12 Mortal Kombat II";
level12.numberRequired = 12;
level12.category = "all";
level12.type = "level";
level12.badge = "level12";
level12.secret = true;
Achievements.push(level12);

var level13 = new Achievement();
level13.shortName = "Level 13";
level13.longName = "You reached Level 13 Tempest";
level13.numberRequired = 13;
level13.category = "all";
level13.type = "level";
level13.badge = "level13";
level13.secret = true;
Achievements.push(level13);

var level14 = new Achievement();
level14.shortName = "Level 14";
level14.longName = "You reached Level 14 Mr Do!";
level14.numberRequired = 14;
level14.category = "all";
level14.type = "level";
level14.badge = "level14";
level14.secret = true;
Achievements.push(level14);

var level15 = new Achievement();
level15.shortName = "Level 15";
level15.longName = "You reached Level 15 Donkey Kong Jr";
level15.numberRequired = 15;
level15.category = "all";
level15.type = "level";
level15.badge = "level15";
level15.secret = true;
Achievements.push(level15);

var level16 = new Achievement();
level16.shortName = "Level 16";
level16.longName = "You reached Level 16 Out Run";
level16.numberRequired = 16;
level16.category = "all";
level16.type = "level";
level16.badge = "level16";
level16.secret = true;
Achievements.push(level16);

var level17 = new Achievement();
level17.shortName = "Level 17";
level17.longName = "You reached Level 17 Galaxian";
level17.numberRequired = 17;
level17.category = "all";
level17.type = "level";
level17.badge = "level17";
level17.secret = true;
Achievements.push(level17);

var level18 = new Achievement();
level18.shortName = "Level 18";
level18.longName = "You reached Level 18 Centipede";
level18.numberRequired = 18;
level18.category = "all";
level18.type = "level";
level18.badge = "level18";
level18.secret = true;
Achievements.push(level18);

var level19 = new Achievement();
level19.shortName = "Level 19";
level19.longName = "You reached Level 19 Defender";
level19.numberRequired = 19;
level19.category = "all";
level19.type = "level";
level19.badge = "level19";
level19.secret = true;
Achievements.push(level19);

var level20 = new Achievement();
level20.shortName = "Level 20";
level20.longName = "You reached Level 20 Asteroids";
level20.numberRequired = 20;
level20.category = "all";
level20.type = "level";
level20.badge = "level20";
level20.secret = true;
Achievements.push(level20);

var level21 = new Achievement();
level21.shortName = "Level 21";
level21.longName = "You reached Level 21 Ms Pacman";
level21.numberRequired = 21;
level21.category = "all";
level21.type = "level";
level21.badge = "level21";
level21.secret = true;
Achievements.push(level21);

var level22 = new Achievement();
level22.shortName = "Level 22";
level22.longName = "You reached Level 22 Donkey Kong";
level22.numberRequired = 22;
level22.category = "all";
level22.type = "level";
level22.badge = "level22";
level22.secret = true;
Achievements.push(level22);

var level23 = new Achievement();
level23.shortName = "Level 23";
level23.longName = "You reached Level 23 Street Fighter II";
level23.numberRequired = 23;
level23.category = "all";
level23.type = "level";
level23.badge = "level23";
level23.secret = true;
Achievements.push(level23);

var level24 = new Achievement();
level24.shortName = "Level 24";
level24.longName = "You reached Level 24 Space Invaders";
level24.numberRequired = 24;
level24.category = "all";
level24.type = "level";
level24.badge = "level24";
level24.secret = true;
Achievements.push(level24);

var level25 = new Achievement();
level25.shortName = "Level 25";
level25.longName = "You reached Level 25 Pacman";
level25.numberRequired = 25;
level25.category = "all";
level25.type = "level";
level25.badge = "level25";
level25.secret = true;
Achievements.push(level25);