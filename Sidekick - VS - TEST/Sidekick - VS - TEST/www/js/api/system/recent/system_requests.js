// Available endpoints
// /app/system/activity - Gets the recent activity

var systemUrl = 'app/system/';

function SideKickOnline_GetRecent(tab) {

    var url = newBaseUrl + systemUrl + 'activity';

    Call_ArcadeSidekick_Online_Get(
        url,
        function () { Successful_SideKickOnline_GetRecent(tab); },
        UnsuccessfulOnlineCall,
        StandardCompleteACOnline,
        'Getting Recent Activity...'
    );
}