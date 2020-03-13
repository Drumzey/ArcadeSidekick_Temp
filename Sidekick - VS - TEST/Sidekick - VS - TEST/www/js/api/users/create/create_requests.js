function SideKickOnline_NewUser(username, email, twitter) {

    var url = newBaseUrl + userUrl + 'create';

    var body =
        {
            'Username': username,
            'EmailAddress': email,
            'TwitterHandle': twitter
        };

    Call_ArcadeSidekick_Online_Post(
        url,
        body,
        function () { SuccessfulGetOfNewUser(username, email, twitter); },
        UnsuccessfulNewUser,
        StandardCompleteACOnline,
        "Checking user name..."
    );

    //CallACOnlineWithBodyAndWait(baseUrl + '/createuser',
    //    'POST',
    //    body,
    //    function () { SuccessfulGetOfNewUser(username, email, twitter); },
    //    function () { UnsuccessfulNewUser(); },
    //    function () { StandardCompleteACOnline(); },
    //    "Checking user name ...");
}