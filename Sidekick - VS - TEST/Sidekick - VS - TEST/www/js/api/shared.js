var latestXHTTP = '';
var hasErrored = false;
var baseUrl = 'https://nvsngzyuq3.execute-api.eu-west-2.amazonaws.com/Beta';
var newBaseUrl = 'https://nvsngzyuq3.execute-api.eu-west-2.amazonaws.com/v3/';
var lastError = '';

var clubImageUrl = "https://arcadesidekick.s3.eu-west-2.amazonaws.com/images/clubs";
var websiteAddress = "https://arcadesidekick.s3.eu-west-2.amazonaws.com";


var multiCallHasFailed = false;

//Unsuccessful call to online api during multicall
function UnsuccessfulOnlineMultiCall()
{
    multiCallHasFailed = true;
}

function FinalErrorForOnlineMultiCall(navigateTo, callback)
{
    onlineCalls--;

    if (onlineCalls === 0) {
        if (multiCallHasFailed) {
            ShowPopup('#ErrorDetailed');
            StandardCompleteACOnline();
        }
        else {
            StandardCompleteACOnline();
            NavigateToInternalPage(navigateTo);
            callback();
        }
    }
}

//Standard unsuccessful cal to online api
function UnsuccessfulOnlineCall() {
    //Quit the current pop up routine if there is one
    if (popupopen === 1) {
        popupsOnStartup = [];
        SetNextPopUp(errorOnlinePopup);
        ClosePopup();
    }
    else {
        CreatePopup(errorOnlinePopup);
    }
}

//Standard call when online api call complete
function StandardCompleteACOnline() {
    $.mobile.loading('hide');
}

//Method to perform a GET on any endpoint
function Call_ArcadeSidekick_Online_Get(url, successCallBack, failureCallBack, CompleteCallBack, message) {
    CallACOnlineWithBodyAndWait(
        url,
        'GET',
        null,
        function () {
            successCallBack();
        },
        function () {
            failureCallBack();
        },
        function () {
            CompleteCallBack();
        },
        message);
}

//Method to perform a POST on any endpoint
function Call_ArcadeSidekick_Online_Post(url, body, successCallBack, failureCallBack, CompleteCallBack, message, jwtoveride) {

    var jwt = '';
    if (jwtoveride)
    {
        jwt = jwtoveride;
    }
    else
    {
        jwt = CreateJWT(clientUserName, emailAddress, secret);
    }    

    CallACOnlineWithBodyAndWait(
        url,
        'POST',
        body,
        function () {
            successCallBack();
        },
        function () {
            failureCallBack();
        },
        function () {
            CompleteCallBack();
        },
        message,
        jwt);
}