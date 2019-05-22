var gameCount = 0;

function addCommas(node, nStr) {
    node.value = addComma(nStr);
}

function addComma(nStr) {
    nStr = nStr.replace(/,/g, '');
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    
    return x1 + x2;
}

function GetTime() {
    var minutes = document.getElementById('minutes').value;
    var seconds = document.getElementById('seconds').value;
    var micro = document.getElementById('micro').value;

    if (minutes === '') {
        minutes = '0';       
    }

    if (seconds === '') {
        seconds = '00';        
    }

    if (micro === '') {
        micro = '000';        
    }

    var score = parseInt(micro) + (parseInt(seconds) * 1000) + (parseInt(minutes) * 60000);
    return score;
}

function SaveLocalTime() {

    var scores = currentRecord.scores;
    for (var i = 0; i < scores.length; i++) {
        var gameid = scores[i].id;

        if (gameid === TransformedCurrentGameName()) {
            scores[i].score = GetTime();
            scores[i].uploaded = false;
            SetItemInStorage("my_record", currentRecord);
            break;
        }
    }    
}

function SaveSeconds() {
    var seconds = document.getElementById('seconds').value;
    seconds = ("00" + seconds).slice(-2);
    document.getElementById('seconds').value = seconds;
}

function SaveMicro() {
    var micro = document.getElementById('micro').value;
    micro = ("000" + micro).slice(-3);
    document.getElementById('micro').value = micro;
}

function CloseTime()
{
    document.activeElement.blur();
    $("#micro").blur();
}

function SelectScore()
{
    $('#myrecord').parent().removeClass('ui-screen-hidden');
    $('#myrecordText').parent().addClass('ui-screen-hidden');       
    $('#myrecord').focus();
}

function SaveLocalScore() {    
    var score = document.getElementById('myrecord').value;    
    
    var scores = currentRecord.scores;
    for (var i = 0; i < scores.length; i++) {
        var gameid = scores[i].id;

        if (gameid === TransformedCurrentGameName()) {
            scores[i].score = score;
            scores[i].uploaded = false;
            SetItemInStorage("my_record", currentRecord);
            break;
        }
    }

    //Add commas to the value entered.
    addCommas(document.getElementById('myrecordText'), score);
    $('#myrecord').parent().addClass('ui-screen-hidden');
    $('#myrecordText').parent().removeClass('ui-screen-hidden');    
}

function AlterFriendScoreHeights(names) {
    for (i = 0; i < names.length; i++) {
        var gameName = names[i];
        GetHeights(gameName);
    }   
}

function AlterScoreHeights() {
    //for each game name in currentRecord.scores
    //find that item and set the heights
    for (i = 0; i < currentRecord.scores.length; i++) {        
        var gameName = currentRecord.scores[i].id.replace(/_/g, ' ').toLowerCase();
        GetHeights(gameName);
    }   

    if (HasCustomGames()) {
        //Custom Divider
        GetHeights('customDiv');

        //Custom Games
        for (var customGameName in customGames) {
            if (customGames.hasOwnProperty(customGameName)) {
                GetHeights(customGameName);
            }
        }
    }
}

function MillisecondsToMinutesSecondsMilliseconds(ms) {
    days = Math.floor(ms / (24 * 60 * 60 * 1000));
    daysms = ms % (24 * 60 * 60 * 1000);
    hours = Math.floor((daysms) / (60 * 60 * 1000));
    hoursms = ms % (60 * 60 * 1000);
    minutes = Math.floor((hoursms) / (60 * 1000));
    minutesms = ms % (60 * 1000);
    sec = Math.floor((minutesms) / (1000));
    secondsms = ms % (1000);
    millims = Math.floor(secondsms);
    return minutes + ":" + ("00" + sec).slice(-2) + "." + ("000" + millims).slice(-3);
}

//If accessing an individual game before retrieving all scores 
function OnSuccessfulLoadOfGame() {
    var scores = currentRecord.scores;
    var score = '0';
    
    for (var i = 0; i < scores.length; i++) {
        var gameid = scores[i].id;

        if (gameid === TransformedCurrentGameName()) {
            score = scores[i].score;
            break;
        }
    }
         
    if (currentGameType === "time") {
        var local_minutes = '0';
        var local_seconds = '00';
        var local_micro = '000';
                       
        if (score === '0' || score === '') {
            local_minutes = '0';
            local_seconds = '00';
            local_micro = '000';
        }
        else {
            score = MillisecondsToMinutesSecondsMilliseconds(parseInt(score));
            var split = score.split(":");
            local_minutes = split[0];
            split = split[1].split(".");
            local_seconds = ("00" + split[0]).slice(-2);
            local_micro = ("000" + split[1]).slice(-3);
        }

        score = local_minutes + ":" + ("00" + local_seconds).slice(-2) + "." + ("00" + local_micro).slice(-3);
        
        document.getElementById('minutes').value = local_minutes;
        document.getElementById('seconds').value = local_seconds;
        document.getElementById('micro').value = local_micro;        
    }
    else {                       
        document.getElementById('myrecord').value = score;
        document.getElementById('myrecordText').value = addComma(score);
        $('#myrecord').parent().addClass('ui-screen-hidden');        
        $('#myrecordText').parent().removeClass('ui-screen-hidden');
        $('#myrecord').parent().addClass('ui-corner-bottom');
        $('#myrecordText').parent().addClass('ui-corner-bottom'); 
    }
}

function BlankScore() {
    var value = document.getElementById('myrecord').value;

    if (value === '0') {        
        document.getElementById('myrecord').value = '';
    }
}

function ResetScores() {    
    gameCount = 0;
}