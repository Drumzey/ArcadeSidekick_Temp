function Successful_SideKickOnline_GetRecent(tab) {
    if (latestXHTTP.status === 200) {
        PopulateRecentActivity();
        if (tab === 0) {
            SetCurrentTab("ALLRECENT");
        }
        else {
            SetCurrentTab("FRIENDSRECENT");
        }
        NavigateToInternalPage("#Recent");
    }
    else {
        UnsuccessfulOnlineCall();
    }
}

function PopulateRecentActivity() {
    var response = JSON.parse(latestXHTTP.responseText);
    RemoveAllChildren("allrecentblock");

    if (response.length !== 0) {

        var recentArray = [];

        for (var i = 0; i < response.length; i++) {

            var message = response[i];
            recentArray.push('<li class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;"><span style="font-size:70%;white-space: normal;text-overflow: clip;">' + message + '</span></li>');
        }

        $('#allrecent').children('ul').append(recentArray.join('')).listview().listview('refresh');
    }
}