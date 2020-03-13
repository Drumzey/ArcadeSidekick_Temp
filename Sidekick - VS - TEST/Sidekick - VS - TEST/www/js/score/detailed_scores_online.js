//var detailedhaserrored = false;

//function DoPresentationChange()
//{
//    if (setPresentation == false) {
//        //Set presentation on elements where jquery does not do what is required        
//        $('#score').parent().addClass('ui-corner-bottom').removeClass('ui-corner-all');
//        $('#difficulty').parent().addClass('ui-corner-bottom').removeClass('ui-corner-all');
//        $('#lives').parent().addClass('ui-corner-bottom').removeClass('ui-corner-all');
//        $('#extralives').parent().addClass('ui-corner-bottom').removeClass('ui-corner-all');
//        $('#credits').parent().addClass('ui-corner-bottom').removeClass('ui-corner-all');
//        setPresentation = true;

//        $('#existingsetting-listbox-popup').find('a').addClass('multilineLi');

//        $('#existinglevels-button').removeClass('ui-corner-all').addClass('ui-corner-bottom');
//        $('#location-button').removeClass('ui-corner-all').addClass('ui-corner-bottom');
//        $('#mameorpcb-button').removeClass('ui-corner-all').addClass('ui-corner-bottom');
//        $('#clubsevents-button').removeClass('ui-corner-all').addClass('ui-corner-bottom');
//        $('#clubsSelect-button').removeClass('ui-corner-all').addClass('ui-corner-bottom');
//        $('#existingsetting-button').removeClass('ui-corner-all').addClass('ui-corner-bottom');
//    }
//}

//function PostDetailedScoreSubmission() {
//    var jwt = CreateJWT(clientUserName, emailAddress, secret);

//    var body = {
//        'GameName': TransformedCurrentGameName(),
//        'UserName': clientUserName,
//        'Score': detailedScore,
//        'Date': detailedDate,
//        'Location': detailedLocation,
//        'LevelName': detailedLevelName,
//        'EventName': detailedEvent,
//        'Difficulty': detailedDifficulty,
//        'Lives': detailedLives,
//        'ExtraLivesAt': detailedExtraLivesAt,
//        'MameOrPCB': detailedMameOrPCB,
//        'Credits': detailedCredits
//    };

//    CallACOnlineWithBodyAndWait(baseUrl + '/gamedetails/scores',
//        'POST',
//        body,
//        function () {
//            //We have successfully posted it online
//        },
//        function (err) {
//            SetNextPopUpId('#ErrorDetailed');
//        },
//        function () {
//            StandardCompleteACOnline();
//        },
//        'Posting Score...',
//        jwt);
//}