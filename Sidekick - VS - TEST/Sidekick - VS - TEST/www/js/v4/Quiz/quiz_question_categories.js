var getDateRegex = /[0-9]{4}/;

function WhatYearWasGameXReleased(game) {

    var questionArray = [];

    if (game.release === '' || game.release === null || game.release === "Unknown") {
        return questionArray;
    }

    questionArray[0] = "What year was " + game.name + " released?";

    var answer = game.release.match(getDateRegex)[0];

    questionArray[1] = parseInt(answer);

    var yearsArray = [];
    yearsArray[0] = parseInt(answer) + 1;
    yearsArray[1] = parseInt(answer) + 2;
    yearsArray[2] = parseInt(answer) + 3;
    yearsArray[3] = parseInt(answer) - 1;
    yearsArray[4] = parseInt(answer) - 2;
    yearsArray[5] = parseInt(answer) - 3;

    var ans1 = 0;
    var ans2 = 0;

    ans1 = Math.floor(Math.random() * 6);

    do {
        ans2 = Math.floor(Math.random() * 6);
    } while (ans2 === ans1);

    questionArray[2] = yearsArray[ans1];
    questionArray[3] = yearsArray[ans2];

    return questionArray;
}

function WhatGameWasReleasedInThisYear(game) {

    var questionArray = [];
    if (game.release === '' || game.release === null || game.release === "Unknown") {
        return questionArray;
    }

    var answerReleaseDate = game.release.match(getDateRegex)[0];
    questionArray[0] = "Which of these games was released in " + answerReleaseDate + "?";

    questionArray[1] = game.name;

    var arrayIndex = 2;
    var answerCollection = [];
    answerCollection.push(answerReleaseDate);

    do {
        var nextAnswer = '';
        var tempGame = GetRandomGame();
        var tempGameRelease = tempGame.release.match(getDateRegex)[0];

        if (answerCollection.indexOf(tempGameRelease) === -1) {
            nextAnswer = tempGame.name;
            questionArray[arrayIndex] = nextAnswer;
            arrayIndex++;
            answerCollection.push(tempGameRelease);
        }
    }
    while (arrayIndex <= 3);

    return questionArray;
}

function WhichGameWasReleasedFirst(game) {
    var questionArray = [];
    if (game.release === '' || game.release === null || game.release === "Unknown") {
        return questionArray;
    }

    var initialGameRelease = game.release.match(getDateRegex)[0];

    var dateCollection = [];
    dateCollection.push(parseInt(initialGameRelease));
    var answerCollection = [];
    answerCollection.push(game.name);

    do {
        var tempGame = GetRandomGame();
        if (tempGame.release !== '' && tempGame.release !== null && tempGame.release !== "Unknown") {
            var tempGameRelease = tempGame.release.match(getDateRegex)[0];

            if (dateCollection.indexOf(parseInt(tempGameRelease)) === -1) {
                dateCollection.push(parseInt(tempGameRelease));
                answerCollection.push(tempGame.name);
            }
        }
    }
    while (dateCollection.length < 3);

    //We have three games selected, need to find the lowest date
    questionArray[0] = "Which of these games was released first?";

    var clone = dateCollection.slice(0).map(n => n).sort();
    var lowestDate = clone[0];
    var middleDate = clone[1];
    var greatestDate = clone[2];

    var lowestDateIndex = dateCollection.indexOf(lowestDate);
    var middleDateIndex = dateCollection.indexOf(middleDate);
    var greatestDateIndex = dateCollection.indexOf(greatestDate);

    questionArray[1] = answerCollection[lowestDateIndex];
    questionArray[2] = answerCollection[middleDateIndex];
    questionArray[3] = answerCollection[greatestDateIndex];

    return questionArray;
}

function WhichGameWasReleasedLast(game) {
    var questionArray = [];
    if (game.release === '' || game.release === null || game.release === "Unknown") {
        return questionArray;
    }

    var initialGameRelease = game.release.match(getDateRegex)[0];

    var dateCollection = [];
    dateCollection.push(parseInt(initialGameRelease));
    var answerCollection = [];
    answerCollection.push(game.name);

    do {
        var tempGame = GetRandomGame();
        if (tempGame.release !== '' && tempGame.release !== null && tempGame.release !== "Unknown") {
            var tempGameRelease = tempGame.release.match(getDateRegex)[0];

            if (dateCollection.indexOf(parseInt(tempGameRelease)) === -1) {
                dateCollection.push(parseInt(tempGameRelease));
                answerCollection.push(tempGame.name);
            }
        }
    }
    while (dateCollection.length < 3);

    //We have three games selected, need to find the lowest date
    questionArray[0] = "Which of these games was released last?";

    var clone = dateCollection.slice(0).map(n => n).sort();
    var lowestDate = clone[0];
    var middleDate = clone[1];
    var greatestDate = clone[2];

    var lowestDateIndex = dateCollection.indexOf(lowestDate);
    var middleDateIndex = dateCollection.indexOf(middleDate);
    var greatestDateIndex = dateCollection.indexOf(greatestDate);

    questionArray[1] = answerCollection[greatestDateIndex];
    questionArray[2] = answerCollection[middleDateIndex];
    questionArray[3] = answerCollection[lowestDateIndex];

    return questionArray;
}

function WhatTypeOfGameIsX(game) {
    var questionArray = [];
    if (game.category === '' || game.category === null ||
        game.category === "Unknown" || game.category === 'misc' ||
        game.category === "pinball" || game.category === 'vectrex') {
        return questionArray;
    }

    questionArray[0] = "What type of game is " + game.name + "?";
    questionArray[1] = categoryDisplayNameList[categoryList.indexOf(game.category)];

    var ans1 = '';
    var ans2 = '';

    do {
        ans1 = Math.floor(Math.random() * categoryList.length);
        ans1 = categoryDisplayNameList[ans1];
    } while (questionArray[1] === ans1 || ans1 === 'Misc' || ans1 === 'Pinball' || ans1 === 'Vectrex');

    questionArray[2] = ans1;

    do {
        ans2 = Math.floor(Math.random() * categoryList.length);
        ans2 = categoryDisplayNameList[ans2];
    } while (questionArray[1] === ans2 || questionArray[2] === ans2 || ans2 == 'Misc');

    questionArray[3] = ans2;

    return questionArray;
}

function WhoDevelopedX(game) {
    var questionArray = [];
    if (game.developer === '' || game.developer === null ||
        game.developer === "Unknown") {
        return questionArray;
    }

    questionArray[0] = "Who developed " + game.name + "?";
    questionArray[1] = game.developer;

    var arrayIndex = 2;
    var answerCollection = [];
    answerCollection.push(game.developer);

    do {
        var nextAnswer = '';
        var tempGame = GetRandomGame();
        var tempGameDeveloper = tempGame.developer;

        if (tempGame.developer !== '' && tempGame.developer !== null &&
            tempGame.developer !== "Unknown") {
            if (answerCollection.indexOf(tempGameDeveloper) === -1) {
                nextAnswer = tempGame.developer;
                questionArray[arrayIndex] = nextAnswer;
                arrayIndex++;
                answerCollection.push(tempGameDeveloper);
            }
        }
    }
    while (arrayIndex <= 3);

    return questionArray;
}

function WhichOfTheseGamesWasDevelopedByX(game) {
    var questionArray = [];

    if (game.developer === '' || game.developer === null || game.developer === "Unknown") {
        return questionArray;
    }

    var answerDeveloper = game.developer;

    questionArray[0] = "Which of these games was developed by " + answerDeveloper + "?";
    questionArray[1] = game.name;

    var arrayIndex = 2;
    var answerCollection = [];
    answerCollection.push(answerDeveloper);

    do {
        var nextAnswer = '';
        var tempGame = GetRandomGame();
        var tempGameDeveloper = tempGame.developer;

        if (tempGame.developer !== '' && tempGame.developer !== null &&
            tempGame.developer !== "Unknown") {
            if (answerCollection.indexOf(tempGameDeveloper) === -1) {
                nextAnswer = tempGame.name;
                questionArray[arrayIndex] = nextAnswer;
                arrayIndex++;
                answerCollection.push(tempGameDeveloper);
            }
        }
    }
    while (arrayIndex <= 3);

    return questionArray;
}

function WhoPublishedX(game) {
    var questionArray = [];

    if (game.publisher === '' || game.publisher === null ||
        game.publisher === "Unknown") {
        return questionArray;
    }

    questionArray[0] = "Who published " + game.name + "?";
    questionArray[1] = game.publisher;

    var arrayIndex = 2;
    var answerCollection = [];
    answerCollection.push(game.publisher);

    do {
        var nextAnswer = '';
        var tempGame = GetRandomGame();
        var tempGamePublisher = tempGame.publisher;

        if (tempGame.publisher !== '' && tempGame.publisher !== null &&
            tempGame.publisher !== "Unknown") {
            if (answerCollection.indexOf(tempGamePublisher) === -1) {
                nextAnswer = tempGame.publisher;
                questionArray[arrayIndex] = nextAnswer;
                arrayIndex++;
                answerCollection.push(tempGamePublisher);
            }
        }
    }
    while (arrayIndex <= 3);

    return questionArray;
}

function WhichOfTheseGamesWasPublishedByX(game) {
    var questionArray = [];

    if (game.publisher === '' || game.publisher === null || game.publisher === "Unknown") {
        return questionArray;
    }

    var answerDeveloper = game.publisher;

    questionArray[0] = "Which of these games was published by " + answerDeveloper + "?";
    questionArray[1] = game.name;

    var arrayIndex = 2;
    var answerCollection = [];
    answerCollection.push(answerDeveloper);

    do {
        var nextAnswer = '';
        var tempGame = GetRandomGame();
        var tempGameDeveloper = tempGame.publisher;

        if (tempGame.publisher !== '' && tempGame.publisher !== null &&
            tempGame.publisher !== "Unknown") {
            if (answerCollection.indexOf(tempGameDeveloper) === -1) {
                nextAnswer = tempGame.name;
                questionArray[arrayIndex] = nextAnswer;
                arrayIndex++;
                answerCollection.push(tempGameDeveloper);
            }
        }
    }
    while (arrayIndex <= 3);

    return questionArray;
}

function HowIsXControlled(game) {
    var questionArray = [];
    PopulateGameControls();

    if (gameControls.length < 3) {
        //If we have less than 3 game controls in our possible answers then
        //We cannot ask the question as cannot provide 3 possible answers
        return questionArray;
    }

    if (game.controls === '' || game.controls === null ||
        game.controls === "Unknown") {
        return questionArray;
    }

    questionArray[0] = "How is " + game.name + " controlled?";
    questionArray[1] = game.controls;

    var arrayIndex = 2;
    var answerCollection = [];
    answerCollection.push(game.controls);

    do {
        var tempGameControls = GetRandomControl();

        if (tempGameControls !== '' && tempGameControls !== null &&
            tempGameControls !== "Unknown") {
            if (answerCollection.indexOf(tempGameControls) === -1) {
                questionArray[arrayIndex] = tempGameControls;
                arrayIndex++;
                answerCollection.push(tempGameControls);
            }
        }
    }
    while (arrayIndex <= 3);

    return questionArray;
}

function GameFact(game, index) {
    var questionArray = [];
    var fact = "";

    if (index === 1) {
        // Quiz fact 1
        if (game.fact1 === '' || game.fact1 === null ||
            game.fact1 === "Unknown") {
            return questionArray;
        }
        fact = game.fact1;
    }
    else if (index === 2) {
        // Quiz fact 2
        if (game.fact2 === '' || game.fact2 === null ||
            game.fact2 === "Unknown") {
            return questionArray;
        }
        fact = game.fact2;
    }
    else if (index === 3) {
        // Quiz fact 3
        if (game.fact3 === '' || game.fact3 === null ||
            game.fact3 === "Unknown") {
            return questionArray;
        }
        fact = game.fact3;
    }

    questionArray[0] = fact.split(',')[0];
    questionArray[1] = fact.split(',')[1];
    questionArray[2] = fact.split(',')[2];
    questionArray[3] = fact.split(',')[3];

    return questionArray;
}
