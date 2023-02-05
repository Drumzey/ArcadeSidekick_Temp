var quizPage = new AppPage();
quizPage.id = 'quiz';
quizPage.pageName = 'Quiz';
quizPage.beforeNavigate = function () { QuizBeforeNavigate(); };
quizPage.afterNavigate = function () { QuizAfterNavigate(); };

AppPages[quizPage.id] = quizPage;

var numberOfQuestionTypes = 13;
var currentQuestion = {};
var currentQuestionNo = 1;
var gameControls = [];
var currentQuizBest = 0;
var inARow = 0;
var firstTimeQuiz = 'yes';

function QuizBeforeNavigate() {

    inARow = 0;
    currentQuestionNo = 1;
    currentQuestion = GetNextQuizQuestion();
    PopulateQuiz();
    document.getElementById('inARow').innerText = "Current Score: 0";
    document.getElementById('quizBest').innerText = "Current Record: " + currentQuizBest;
}

function QuizAfterNavigate() {

    if (firstTimeQuiz === 'yes') {
        firstTimeQuiz = 'no';
        SetItemInStorage('firstTimeQuiz', 'no');
        CreatePopup(quizFirstTime);
    }
}

function PopulateQuiz() {
    document.getElementById('questionId').innerText = "Question " + currentQuestionNo;
    document.getElementById('question').innerText = currentQuestion[0];

    var arr = [1, 2, 3];
    ShuffleArray(arr);
    document.getElementById('answer1').innerText = currentQuestion[arr[0]];
    document.getElementById('answer2').innerText = currentQuestion[arr[1]];
    document.getElementById('answer3').innerText = currentQuestion[arr[2]];
}

function ShuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function SubmitAnswer(node) {
    var answerChosen = node.innerText;

    if (answerChosen.toLowerCase() === currentQuestion[1].toString().toLowerCase()) {
        //Right!
        inARow++;
        document.getElementById('inARow').innerText = "Current Score: " + inARow;
        if (inARow > currentQuizBest) {
            currentQuizBest = inARow;
            SetItemInStorage('currentQuizBest', currentQuizBest);
            document.getElementById('quizBest').innerText = "Current Record: " + currentQuizBest;
        }
        CreatePopup(quizCorrect);
    }
    else {
        //Wrong!
        var text = quizWrong;
        text = text.replace("***", "The correct answer was " + currentQuestion[1] + ". You scored " + inARow + ".");
        CreatePopup(text);
    }
}

function ResetQuiz() {
    inARow = 0;
    currentQuestionNo = 0;
    document.getElementById('inARow').innerText = "Current Score: " + inARow;
}

function ShareQuizResults() {
    var message = "I've just played the Arcade Sidekick Arcade Master Quiz and scored " + inARow + ". Why don't you have a go and see if you can beat my score? #ArcadeSidekickQuiz";
    DoQuizTweet(message);
}

function NextQuestion() {
    currentQuestionNo++;
    currentQuestion = GetNextQuizQuestion();
    PopulateQuiz();
}

function GetNextQuizQuestion() {
    var game = GetRandomGame();

    var questionArray = [];

    do {
        var getQuestionType = Math.floor(Math.random() * numberOfQuestionTypes);
        questionArray = GetQuestion(game, getQuestionType);
    }
    while (questionArray.length === 0);

    return questionArray;
}

function GetQuestion(game, getQuestionType) {
    var questionArray = [];

    switch (getQuestionType) {
        case 0:
            questionArray = WhatYearWasGameXReleased(game);
            break;

        case 1:
            questionArray = WhatGameWasReleasedInThisYear(game);
            break;

        case 2:
            questionArray = WhichGameWasReleasedFirst(game);
            break;

        case 3:
            questionArray = WhichGameWasReleasedLast(game);
            break;
        case 4:
            questionArray = WhatTypeOfGameIsX(game);
            break;

        case 5:
            questionArray = WhoDevelopedX(game);
            break;

        case 6:
            questionArray = WhichOfTheseGamesWasDevelopedByX(game);
            break;

        case 7:
            questionArray = WhoPublishedX(game);
            break;

        case 8:
            questionArray = WhichOfTheseGamesWasPublishedByX(game);
            break;

        case 9:
            questionArray = HowIsXControlled(game);
            break;

        case 10:
            questionArray = GameFact(game, 1);
            break;

        case 11:
            questionArray = GameFact(game, 2);
            break;

        case 12:
            questionArray = GameFact(game, 3);
            break;
    }

    return questionArray;
}

function GetRandomControl() {
    var controlNames = Object.keys(gameControls);
    var controlName = controlNames[Math.floor(Math.random() * controlNames.length)];
    var control = gameControls[controlName];
    return control;
}

function GetRandomGame() {
    var gameNames = Object.keys(gameCatalog);
    var gameName = gameNames[Math.floor(Math.random() * gameNames.length)];
    var game = gameCatalog[gameName];

    if (game.category === 'pinball' || game.category === 'vectrex') {
        //We dont want pinball or vectrex games
        return GetRandomGame();
    }
    else {
        return game;
    }
}

var controlPopulated = false;

function PopulateGameControls() {
    if (gameControls.length === 0 && controlPopulated === false) {
        controlPopulated = true;
        for (var game in gameCatalog) {
            if (gameCatalog.hasOwnProperty(game)) {
                if (gameCatalog[game].controls !== '' && gameCatalog[game].controls !== null) {
                    if (gameControls.indexOf(gameCatalog[game].controls) === -1) {
                        gameControls.push(gameCatalog[game].controls);
                    }
                }
            }
        }
    }
}

var allGameNames = [];

function GetGameNames(categoryType) {
    allGameNames = [];

    for (var prop in gameCatalog) {
        if (gameCatalog.hasOwnProperty(prop)) {
            if (gameCatalog[prop].category === categoryType) {
                allGameNames.push(TransformGameName(prop));
            }
        }
    }

    console.log(allGameNames.sort().join("\",\r\n\""));
}

function GetGameNamesWithProperties(property, property2, property3) {
    allGameNames = [];

    for (var prop in gameCatalog) {
        if (gameCatalog.hasOwnProperty(prop)) {
            if (gameCatalog[prop].category !== 'pinball') {
                allGameNames.push('gameCatalog[\'' + gameCatalog[prop].name + "']." + property);

                if (property2)
                    allGameNames.push('gameCatalog[\'' + gameCatalog[prop].name + "']." + property2);

                if (property3)
                    allGameNames.push('gameCatalog[\'' + gameCatalog[prop].name + "']." + property3);
            }
        }
    }

    console.log(allGameNames.sort().join(" = ''\r\n"));
}