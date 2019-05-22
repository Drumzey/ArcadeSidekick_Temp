function GetRecentActivity()
{
    SideKickOnline_GetRecent();
}

function SuccessfulRecentActivity()
{
    if (latestXHTTP.status === 200) {
        var response = JSON.parse(latestXHTTP.responseText);
        PopulateRecentActivity(response);
        NavigateToInternalPage("#Recent");
    }
    else {
        UnsuccessfulOnlineCall();
    }
}

function PopulateRecentActivity(recent) {
    RemoveAllChildren("allrecentblock");
    
    if (recent.length !== 0) {

        var recentArray = [];
        
        for (var i = 0; i < recent.length; i++) {

            var message = recent[i];
            recentArray.push('<li class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;"><span style="font-size:70%;white-space: normal;text-overflow: clip;">' + message + '</span></li>');            
        }

        $('#recentblock').children('ul').append(recentArray.join('')).listview().listview('refresh');
    }
}