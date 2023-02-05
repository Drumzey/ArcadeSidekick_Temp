var addTipsPage = new AppPage();
addTipsPage.id = 'addTip';
addTipsPage.pageName = 'NewTip';
addTipsPage.validateNavigate = function () { return AllowedOnline(); };
addTipsPage.beforeNavigate = function () { BeforeNavigationAddTip(); };

AppPages[addTipsPage.id] = addTipsPage;

function BeforeNavigationAddTip()
{
    document.getElementById("newGameplayTip").value = '';
}

function SaveNewGameplayTip() {
    var tip = document.getElementById("newGameplayTip").value;

    if (tip === "" || tip === null) {
        ErrorTipInfo();
        return;
    }

    var body =
        {
            'UserName': clientUserName,
            'GameName': TransformedCurrentGameName(),
            'HintText': tip
        };

    var jwt = CreateJWT(clientUserName, emailAddress, secret);

    CallACOnlineWithBodyAndWait(newBaseUrl + 'app/games/uploadgameplaytip',
        'Post',
        body,
        SuccessfulGameplayTipAdded,
        UnsuccessfulOnlineCall,
        StandardCompleteACOnline,
        'Uploading tip...',
        jwt);
}

function ErrorTipInfo()
{
    CreatePopup(errorTipAddedPopup);
}

function SuccessfulGameplayTipAdded() {
    CreatePopup(tipAddedPopup);
}

function ErrorGameplayTipAdded() {
    UnsuccessfulOnlineCall();
}