var numberOfQuestionTypes = 13;

var currentQuestion = {};
var currentQuestionNo = 1;
var gameControls = [];
var currentQuizBest = 0;
var inARow = 0;

var firstTimeQuiz = 'yes';

function GotoQuiz()
{
    currentQuestionNo = 1;
    currentQuestion = GetNextQuizQuestion();
    PopulateQuiz();
    document.getElementById('inARow').innerText = "Current Score: 0";
    document.getElementById('quizBest').innerText = "Current Record: " + currentQuizBest;
    NavigateToInternalPage('#Quiz');
    if (firstTimeQuiz === 'yes')
    {
        firstTimeQuiz = 'no';
        SetItemInStorage('firstTimeQuiz', 'no');
        CreatePopup(quizFirstTime);
    }
}

function PopulateQuiz()
{
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

function SubmitAnswer(node)
{
    var answerChosen = node.innerText;

    if (answerChosen.toLowerCase() === currentQuestion[1].toString().toLowerCase())
    {
        //Right!
        inARow++;
        document.getElementById('inARow').innerText = "Current Score: " + inARow;
        if (inARow > currentQuizBest)
        {
            currentQuizBest = inARow;
            SetItemInStorage('currentQuizBest', currentQuizBest);
            document.getElementById('quizBest').innerText = "Current Record: " + currentQuizBest;
        }
        CreatePopup(quizCorrect);
    }
    else
    {
        //Wrong!
        var text = quizWrong;
        text = text.replace("***", "The correct answer was " + currentQuestion[1] + ". You scored " + inARow + ".");
        CreatePopup(text);
    }
}

function ResetQuiz()
{
    inARow = 0;
    document.getElementById('inARow').innerText = "Current Score: " + inARow;
}

function ShareQuizResults() {
    var message = "I've just played the Arcade Sidekick Arcade Master Quiz and scored " + inARow + ". Why don't you have a go and see if you can beat my score? #ArcadeSidekickQuiz";
    DoQuizTweet(message);
}

function NextQuestion()
{
    currentQuestionNo++;
    currentQuestion = GetNextQuizQuestion();
    PopulateQuiz();
}

function GetNextQuizQuestion()
{
    var game = GetRandomGame();

    var questionArray = [];

    do {
        var getQuestionType = Math.floor(Math.random() * numberOfQuestionTypes);
        questionArray = GetQuestion(game, getQuestionType);
    }
    while (questionArray.length === 0);

    return questionArray;
}

function GetQuestion(game, getQuestionType)
{
    var getDateRegex = /[0-9]{4}/;
    var questionArray = [];

    switch (getQuestionType) {
        case 0:
            // What year was game X released

            if (game.release === '' || game.release === null || game.release === "Unknown") {
                break;
            }

            questionArray[0] = "What year was " + game.name + " released?";

            var answer = game.release.match(getDateRegex)[0];

            questionArray[1] = parseInt(answer);

            //Need to generate answer +- 3, then pick 2 random items from that list
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
            break;

        case 1:
            // Which of these games was released in year X

            if (game.release === '' || game.release === null || game.release === "Unknown") {
                break;
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

            break;

        case 2:
            // Which game was released first
            if (game.release === '' || game.release === null || game.release === "Unknown") {
                break;
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

            break;
        case 3:
            // Which game was released last
            if (game.release === '' || game.release === null || game.release === "Unknown") {
                break;
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

            break;
        case 4:
            // What type of game is X
            if (game.category === '' || game.category === null ||
                game.category === "Unknown" || game.category === 'misc') {
                break;
            }

            //var categoryList = ["beatemup", "fighting", "guns", "hackandslash", "maze", "misc", "platformer", "puzzle", "racing", "runandgun", "shooter", "sports", "rhythm", "pinball"];
            //var categoryDisplayNameList

            questionArray[0] = "What type of game is " + game.name + "?";
            questionArray[1] = categoryDisplayNameList[categoryList.indexOf(game.category)];

            var ans1 = '';
            var ans2 = '';

            do {
                ans1 = Math.floor(Math.random() * categoryList.length);
                ans1 = categoryDisplayNameList[ans1];
            } while (questionArray[1] === ans1 || ans1 == 'Misc');

            questionArray[2] = ans1;

            do {
                ans2 = Math.floor(Math.random() * categoryList.length);
                ans2 = categoryDisplayNameList[ans2];
            } while (questionArray[1] === ans2 || questionArray[2] === ans2 || ans2 == 'Misc');

            questionArray[3] = ans2;

            break;
        case 5:
            // Who developed X
            if (game.developer === '' || game.developer === null ||
                game.developer === "Unknown") {
                break;
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

            break;
        case 6:
            // Which of these games was developed by X
            if (game.developer === '' || game.developer === null || game.developer === "Unknown") {
                break;
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

            break;
        case 7:
            // Who published X
            if (game.publisher === '' || game.publisher === null ||
                game.publisher === "Unknown") {
                break;
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

            break;
        case 8:
            // Which of these games was published by X
            if (game.publisher === '' || game.publisher === null || game.publisher === "Unknown") {
                break;
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
            break;
        case 9:
            // How is the game X controlled
            PopulateGameControls();

            if (gameControls.length < 3)
            {
                //If we have less than 3 game controls in our possible answers then
                //We cannot ask the question as cannot provide 3 possible answers
                break;
            }

            if (game.controls === '' || game.controls === null ||
                game.controls === "Unknown") {
                break;
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
            break;
        case 10:
            // Quiz fact 1
            if (game.fact1 === '' || game.fact1 === null ||
                game.fact1 === "Unknown") {
                break;
            }

            questionArray[0] = game.fact1.split(',')[0];
            questionArray[1] = game.fact1.split(',')[1];
            questionArray[2] = game.fact1.split(',')[2];
            questionArray[3] = game.fact1.split(',')[3];
            break;
        case 11:
            // Quiz fact 2
            if (game.fact2 === '' || game.fact2 === null ||
                game.fact2 === "Unknown") {
                break;
            }

            questionArray[0] = game.fact2.split(',')[0];
            questionArray[1] = game.fact2.split(',')[1];
            questionArray[2] = game.fact2.split(',')[2];
            questionArray[3] = game.fact2.split(',')[3];
            break;
        case 12:
            // Quiz fact 3
            if (game.fact3 === '' || game.fact3 === null ||
                game.fact3 === "Unknown") {
                break;
            }

            questionArray[0] = game.fact3.split(',')[0];
            questionArray[1] = game.fact3.split(',')[1];
            questionArray[2] = game.fact3.split(',')[2];
            questionArray[3] = game.fact3.split(',')[3];
            break;
    }

    return questionArray;
}

function GetRandomControl()
{
    var controlNames = Object.keys(gameControls);
    var controlName = controlNames[Math.floor(Math.random() * controlNames.length)];
    return controlName;
}

function GetRandomGame()
{
    var gameNames = Object.keys(gameCatalog);
    var gameName = gameNames[Math.floor(Math.random() * gameNames.length)];
    var game = gameCatalog[gameName];

    if (game.category === 'pinball') {
        //We dont want pinball games
        return GetRandomGame();
    }
    else {
        return game;
    }
}

var controlPopulated = false;

function PopulateGameControls()
{
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
function GetGameNames(property,property2,property3) {
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