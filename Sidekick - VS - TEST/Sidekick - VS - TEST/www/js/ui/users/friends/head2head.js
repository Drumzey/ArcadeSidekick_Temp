var initHead2Head = false;

function Head2Head() {
    if (friendsCollection.length === 0) {
        CreatePopup(noFriends);
        return;
    }

    //Load Timed Games
    //GetTimedGames();

    //Set my name on page
    var name = "Me";
    if (clientUserName !== null && clientUserName !== "") {
        name = clientUserName;
    }

    //Populate friends drop down
    var sortedFriends = friendsCollection.sort();
    var toAppend = [];
    toAppend.push("<option style='margin: 0em;border - radius:0.6em;' value='" + name + "'>" + name + "</option>");
    for (var i = 0; i < sortedFriends.length; i++) {
        if (sortedFriends[i] !== clientUserName) {
            toAppend.push("<option style='margin: 0em;border - radius:0.6em;' value='" + sortedFriends[i] + "'>" + sortedFriends[i] + "</option>");
        }
    }

    if (initHead2Head === true) {
        RemoveAllChildren('select-opponent-1');
        RemoveAllChildren('select-opponent-2');
        $('#select-opponent-1').append(toAppend.join(''));
        $('#select-opponent-2').append(toAppend.join(''));
        var myselect = $('#select-opponent-2');
        myselect[0].selectedIndex = 1;

        $('#select-opponent-1').selectmenu("refresh", true);
        $('#select-opponent-2').selectmenu("refresh", true);
    }
    else {
        $('#select-opponent-1').append(toAppend.join(''));
        $('#select-opponent-2').append(toAppend.join(''));
    }

    //Pick first friend and compare games
    var array = PopulateComparison();

    //Navigate to page
    NavigateToInternalPage("#Head2Head");

    if (array.length !== 0) {
        AlterControlHeights(array, 'head2head', '');
    }
}

function RefreshComparison() {
    var array = PopulateComparison();
    AlterControlHeights(array, 'head2head', '');
}

function PopulateComparison() {
    RemoveAllChildren('head2headgameul');
    RemoveAllChildren('head2headmyscoreul');
    RemoveAllChildren('head2headfriendscoreul');

    Hide('#NoComparrison');

    var friendOneDropDown = $("#select-opponent-1 :selected").val();
    var friendTwoDropDown = $("#select-opponent-2 :selected").val();

    var head2headgameul = [];
    var head2headmyscoreul = [];
    var head2headfriendscoreul = [];

    var id = '';

    var friendOneWins = 0;
    var friendTwoWins = 0;

    var friendOnegamecount = 0;
    var friendTwogamecount = 0;

    var friendOneScores = [];
    var friendTwoScores = [];

    if (friendOneDropDown === "Me" || friendOneDropDown === clientUserName) {
        //Im drop down two
        if (currentRecord.scores.length > 0) {
            friendOnegamecount++;
            for (var i = 0; i < currentRecord.scores.length; i++) {
                friendOneScores[currentRecord.scores[i].id] = currentRecord.scores[i].score;
            }
        }
        else {
            document.getElementById('noComparrisonText').innerText = "You have not played any games.";
            Show('#NoComparrison');
            Hide('#comparisonsresults');
            return [];
        }
    }
    else {
        //Has this friend actually played any games?
        friendOneScores = friendsGames[friendOneDropDown];
        for (var fg in friendsGames[friendOneDropDown]) {
            if (friendsGames[friendOneDropDown].hasOwnProperty(fg)) {
                friendOnegamecount++;
                break;
            }
        }
    }

    if (friendOnegamecount === 0) {
        //Friend has played no games
        document.getElementById('noComparrisonText').innerText =
            friendOneDropDown + " hasnt uploaded any scores online.";
        Show('#NoComparrison');
        Hide('#comparisonsresults');
        return [];
    }

    if (friendTwoDropDown === "Me" || friendTwoDropDown === clientUserName) {
        //Im drop down two
        if (currentRecord.scores.length > 0) {
            friendTwogamecount++;
            for (var j = 0; j < currentRecord.scores.length; j++) {
                friendTwoScores[currentRecord.scores[j].id] = currentRecord.scores[j].score;
            }
        }
        else {
            document.getElementById('noComparrisonText').innerText = "You have not played any games.";
            Show('#NoComparrison');
            Hide('#comparisonsresults');
            return [];
        }
    }
    else {
        friendTwoScores = friendsGames[friendTwoDropDown];
        //Has this friend actually played any games?
        for (var k in friendsGames[friendTwoDropDown]) {
            if (friendsGames[friendTwoDropDown].hasOwnProperty(k)) {
                friendTwogamecount++;
                break;
            }
        }
    }

    if (friendTwogamecount === 0) {
        //Friend has played no games
        document.getElementById('noComparrisonText').innerText =
            friendTwoDropDown + " hasnt uploaded any scores online.";
        Show('#NoComparrison');
        Hide('#comparisonsresults');
        return [];
    }

    //Do comparison of the scores

    for (var property in friendOneScores) {
        if (friendOneScores.hasOwnProperty(property)) {
            if (friendTwoScores.hasOwnProperty(property)) {
                var myscore = friendOneScores[property];
                var opponentsScore = friendTwoScores[property];

                if (myscore !== "0" && opponentsScore !== "0") {

                    var whoWins = -1;

                    if (timed.indexOf(property) !== -1) {
                        if (parseInt(myscore) < parseInt(opponentsScore)) {
                            friendOneWins++;
                            whoWins = 0;
                        }
                        else if (parseInt(myscore) > parseInt(opponentsScore)) {
                            whoWins = 1;
                            friendTwoWins++;
                        }

                        myscore = MillisecondsToMinutesSecondsMilliseconds(parseInt(myscore));
                        opponentsScore = MillisecondsToMinutesSecondsMilliseconds(parseInt(opponentsScore));
                    }
                    else {
                        if (parseInt(myscore) > parseInt(opponentsScore)) {
                            whoWins = 0;
                            friendOneWins++;
                        }
                        else if (parseInt(myscore) < parseInt(opponentsScore)) {
                            whoWins = 1;
                            friendTwoWins++;
                        }

                        myscore = addComma(myscore.toString());
                        opponentsScore = addComma(opponentsScore.toString());
                    }

                    //This game has been played by Me and my opponent
                    var gameName = property.replace(/_/g, ' ').toLowerCase();
                    var control = '<li name="head2head' + property + '" class="ui-li ui-btn-up-c" style="font-size:70%;white-space: normal;text-overflow: clip;">' + gameName + '</li>';
                    head2headgameul.push([property, control]);

                    if (whoWins === 0) {
                        control = '<li name="head2head' + property + '" class="ui-li ui-btn-up-c bestScore" style="font-size:70%;white-space: normal;text-overflow: clip;">' + myscore + '</li>';
                        head2headmyscoreul.push([property, control]);

                        control = '<li name="head2head' + property + '" class="ui-li ui-btn-up-c" style="font-size:70%;white-space: normal;text-overflow: clip;">' + opponentsScore + '</li>';
                        head2headfriendscoreul.push([property, control]);
                    }
                    else if (whoWins === 1) {
                        control = '<li name="head2head' + property + '" class="ui-li ui-btn-up-c" style="font-size:70%;white-space: normal;text-overflow: clip;">' + myscore + '</li>';
                        head2headmyscoreul.push([property, control]);

                        control = '<li name="head2head' + property + '" class="ui-li ui-btn-up-c bestScore" style="font-size:70%;white-space: normal;text-overflow: clip;">' + opponentsScore + '</li>';
                        head2headfriendscoreul.push([property, control]);
                    }
                    else {
                        control = '<li name="head2head' + property + '" class="ui-li ui-btn-up-c" style="font-size:70%;white-space: normal;text-overflow: clip;">' + myscore + '</li>';
                        head2headmyscoreul.push([property, control]);

                        control = '<li name="head2head' + property + '" class="ui-li ui-btn-up-c" style="font-size:70%;white-space: normal;text-overflow: clip;">' + opponentsScore + '</li>';
                        head2headfriendscoreul.push([property, control]);
                    }
                }
            }
        }
    }

    if (head2headgameul.length === 0) {
        //No games that compare        
        document.getElementById('noComparrisonText').innerText = "These 2 players have not played any of the same games.";
        Show('#NoComparrison');
        Hide('#comparisonsresults');
        return [];
    }

    Show('#comparisonsresults');

    head2headgameul.sort(SortById);
    head2headmyscoreul.sort(SortById);
    head2headfriendscoreul.sort(SortById);

    var outputhead2headgameul = [];
    var outputhead2headmyscoreul = [];
    var outputhead2headfriendscoreul = [];

    for (var l = 0; l < head2headgameul.length; l++) {
        outputhead2headgameul.push(head2headgameul[l][1]);
        outputhead2headmyscoreul.push(head2headmyscoreul[l][1]);
        outputhead2headfriendscoreul.push(head2headfriendscoreul[l][1]);
    }

    $('#head2headgameul').append(outputhead2headgameul.join('')).listview().listview('refresh');
    $('#head2headmyscoreul').append(outputhead2headmyscoreul.join('')).listview().listview('refresh');
    $('#head2headfriendscoreul').append(outputhead2headfriendscoreul.join('')).listview().listview('refresh');

    document.getElementById('comparrisonMe').innerText = friendOneWins;
    document.getElementById('comparrisonOpponent').innerText = friendTwoWins;

    return head2headgameul;
}