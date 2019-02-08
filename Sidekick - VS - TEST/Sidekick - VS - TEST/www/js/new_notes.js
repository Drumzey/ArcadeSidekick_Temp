function LoadNotes() {
    var noteValue = '';
    
    var scores = currentRecord.scores;
    for (var i = 0; i < scores.length; i++) {
        var gameid = scores[i].id;

        if (gameid === TransformedCurrentGameName()) {
            noteValue = scores[i].notes;            
            break;
        }
    }

    document.getElementById('gameNotes').value = noteValue;
}

function SaveNotes() {
    var newNotes = document.getElementById('gameNotes').value;

    var scores = currentRecord.scores;
    for (var i = 0; i < scores.length; i++) {
        var gameid = scores[i].id;

        if (gameid === TransformedCurrentGameName()) {
            scores[i].notes = newNotes;
            SetItemInStorage("my_record", currentRecord);
            break;
        }
    }
}