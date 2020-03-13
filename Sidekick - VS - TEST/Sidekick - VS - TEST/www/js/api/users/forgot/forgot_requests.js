function SideKickOnline_ForgotUsername(email) {

    var url = newBaseUrl + userUrl + 'forgot?mode=USERNAME&Email=' + email;

    Call_ArcadeSidekick_Online_Get(
        url,        
        SuccessfulForgotUserName,
        FailedForgotInformation,
        StandardCompleteACOnline,
        "Getting username reminder..."
    );


    //CallACOnlineWithBodyAndWait(baseUrl + '/forgot?mode=USERNAME&Email=' + email,
    //    'GET',
    //    null,
    //    function () {
    //        SuccessfulForgotUserName();
    //    },
    //    function () { FailedForgotInformation(); },
    //    function () { StandardCompleteACOnline(); },
    //    "Getting username reminder ...");
}

function SideKickOnline_ForgotEmail(username) {

    var url = newBaseUrl + userUrl + 'forgot?mode=EMAIL&Username=' + username;

    Call_ArcadeSidekick_Online_Get(
        url,
        SuccessfulForgotEmail,
        FailedForgotInformation,
        StandardCompleteACOnline,
        "Getting email reminder..."
    );

    //CallACOnlineWithBodyAndWait(baseUrl + '/forgot?mode=EMAIL&Username=' + username,
    //    'GET',
    //    null,
    //    function () {
    //        SuccessfulForgotEmail();
    //    },
    //    function () { FailedForgotInformation(); },
    //    function () { StandardCompleteACOnline(); },
    //    "Getting email reminder ...");
}

function SideKickOnline_ForgotSecret(username, email) {

    var url = newBaseUrl + userUrl + 'forgot?mode=SECRET&Username=' + username + '&Email=' + email;

    Call_ArcadeSidekick_Online_Get(
        url,
        SuccessfulForgotSecret,
        FailedForgotInformation,
        StandardCompleteACOnline,
        "Getting secret reminder..."
    );

    //CallACOnlineWithBodyAndWait(baseUrl + '/forgot?mode=SECRET&Username=' + username + '&Email=' + email,
    //    'GET',
    //    null,
    //    function () {
    //        SuccessfulForgotSecret();
    //    },
    //    function () { FailedForgotInformation(); },
    //    function () { StandardCompleteACOnline(); },
    //    "Getting secret reminder ...");
}