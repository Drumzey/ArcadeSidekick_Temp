var gameplayTipsPage = new AppPage();
gameplayTipsPage.id = 'tips';
gameplayTipsPage.pageName = 'GameplayTips';
gameplayTipsPage.beforeNavigate = function () { GetHints(); };
gameplayTipsPage.afterNavigate = function () { ShowFirstTimeHintsPopUp(); };

AppPages[gameplayTipsPage.id] = gameplayTipsPage;

var firstTimeHintsAndTips = '';

function LoadGameplayTips()
{
    CompleteNavigation('tips');
}

function ShowFirstTimeHintsPopUp()
{
    if (firstTimeHintsAndTips === "yes") {
        CreatePopup(firstTimeHintsAndTipsPopup);
        firstTimeHintsAndTips = "no";
        SetItemInStorage("firstTimeHintsAndTips", firstTimeHintsAndTips);
    }
}

function ShowHintsAndTips()
{
    if (latestXHTTP.status === 200) {
        var response = JSON.parse(latestXHTTP.responseText);

        var hintsAvailable = 0;
        var hintsAndTips = [];

        for (var i = 0; i < response.length; i++) {
            hintsAvailable++;
            var hintResponse = response[i];
            var hintUserName = hintResponse.UserName;
            var hintText = hintResponse.HintText;
            var hint = '<li class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;"><div><p style="word-break: keep-all;white-space: normal;">' + hintText + '</p><p style="font-size:8px;" align="right">' + hintUserName + '</p></div></li>';
            hintsAndTips.push(hint);
        }

        if (test && hintsAvailable === 0) {
            hintsAvailable = 1;

            var tempHint = new Hint();
            tempHint.User = "TENPENCEARCADE";
            tempHint.HintText = "Just shoot em in face";
            var tHint = '<li class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;"><div><p style="word-break: keep-all;white-space: normal;">' + tempHint.HintText + '</p><p style="font-size:8px;" align="right">' + tempHint.User + '</p></div></li>';
            hintsAndTips.push(tHint);
        }

        if (hintsAvailable === 0) {
            Hide('#gameplayTipsBlock');
            Show('#noTips');
        }
        else {

            $('#gameplayTipsBlock').children('ul').append(hintsAndTips.join('')).listview().listview('refresh');

            Show('#gameplayTipsBlock');
            Hide('#noTips');
        }
    }
    else
    {
        ErrorGetGameplayTips();
    }
    
}

function AddGameplayTip()
{
    CompleteNavigation('addTip');
}

function GetHints()
{
    Hide('#gameplayTipsBlock');
    Hide('#noTips');
    RemoveAllChildren('gameplayTipslist');

    var url = newBaseUrl + 'app/games/getgameplaytips?gameName=' + TransformedCurrentGameName();

    Call_ArcadeSidekick_Online_Get(
        url,
        SuccessfulGetGameplayTips,
        ErrorGetGameplayTips,
        StandardCompleteACOnline,
        'Loading tips.....'
    );
}

function SuccessfulGetGameplayTips() {
    ShowHintsAndTips();
}

function ErrorGetGameplayTips() {
    UnsuccessfulOnlineCall();
}