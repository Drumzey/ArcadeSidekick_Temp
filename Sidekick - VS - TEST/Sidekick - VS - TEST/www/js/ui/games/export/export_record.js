//Send email with all games played, scores, notes
function ExportCSVRecord() {
    var emailContents = "";

    var scores = currentRecord.scores;
    for (var i = 0; i < scores.length; i++) {
        var gameid = scores[i].id;
        var score = scores[i].score;
        var notes = scores[i].notes;

        if (timed.indexOf(gameid) !== -1) {
            score = MillisecondsToMinutesSecondsMilliseconds(parseInt(score));
        }
        else {
            score = addComma(score.toString());
        }

        gameid = FindGameInCatalog(gameid.replace(/_/g, ' ').toLowerCase());

        emailContents += "\"" + gameid + "\",\"" + score + "\"\n";
    }

    Email(emailContents, "Arcade Sidekick Export", null, emailAddress);

}

function ExportRecord() {
    var emailContents = "";

    var scores = currentRecord.scores;
    for (var i = 0; i < scores.length; i++) {
        var gameid = scores[i].id;
        var score = scores[i].score;
        var notes = scores[i].notes;

        if (timed.indexOf(gameid) !== -1) {
            score = MillisecondsToMinutesSecondsMilliseconds(parseInt(score));
        }
        else {
            score = addComma(score.toString());
        }

        gameid = FindGameInCatalog(gameid.replace(/_/g, ' ').toLowerCase());

        emailContents += gameid + ": " + score + "\n";

        if (notes !== null && notes !== "") {
            emailContents += "\n";
            emailContents += "Notes: " + notes + "\n";
            emailContents += "\n";
        }
    }

    Email(emailContents, "Arcade Sidekick Export", null, emailAddress);
}
