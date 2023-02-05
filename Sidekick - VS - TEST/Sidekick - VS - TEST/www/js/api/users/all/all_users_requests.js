function SideKickOnline_AllUsers() {

    Get_All_Users_Generic(
        SuccessfulAllUsers,
        UnsuccessfulOnlineCall,
        function () { StandardCompleteACOnline(); });
}

//All Users With no navigation
function SideKickOnline_AllUsersWithNoNavigate() {

    Get_All_Users_Generic(
        function () {
            if (latestXHTTP.status === 200) {
                var response = JSON.parse(latestXHTTP.responseText);
                allUsers = response;

                var users = [];

                var sorted = allUsers.sort();
                for (var i = 0; i < sorted.length; i++) {
                    users.push('<li><a id="' + sorted[i] + '" href="#" onclick="SendInvite(this)">' + sorted[i] + '</a></li>');
                }

                $('#selectUsersPopupUL').append(users.join('')).listview().listview('refresh');

                SetNextPopUpId('#selectUsers');
                ClosePopup();
            }
            else {
                UnsuccessfulOnlineCall();
            }
        },
        UnsuccessfulOnlineCall,
        StandardCompleteACOnline);

    //var url = newBaseUrl + userUrl + 'all';

    //Call_ArcadeSidekick_Online_Get(
    //    url,
    //    function () {
    //        if (latestXHTTP.status === 200) {
    //            var response = JSON.parse(latestXHTTP.responseText);
    //            allUsers = response;

    //            var users = [];

    //            var sorted = allUsers.sort();
    //            for (var i = 0; i < sorted.length; i++) {
    //                users.push('<li><a id="' + sorted[i] + '" href="#" onclick="SendInvite(this)">' + sorted[i] + '</a></li>');
    //            }

    //            $('#selectUsersPopupUL').append(users.join('')).listview().listview('refresh');

    //            SetNextPopUpId('#selectUsers');
    //            ClosePopup();
    //        }
    //        else {
    //            UnsuccessfulOnlineCall();
    //        }
    //    },
    //    UnsuccessfulOnlineCall,
    //    StandardCompleteACOnline,
    //    'Loading all users...'
    //);

    //CallACOnlineWithBodyAndWait(baseUrl + '/getusers',
    //    'GET',
    //    null,
    //    function () {
    //        if (latestXHTTP.status === 200) {
    //            var response = JSON.parse(latestXHTTP.responseText);
    //            allUsers = response;

    //            var users = [];

    //            var sorted = allUsers.sort();
    //            for (var i = 0; i < sorted.length; i++) {
    //                users.push('<li><a id="' + sorted[i] + '" href="#" onclick="SendInvite(this)">' + sorted[i] + '</a></li>');
    //            }

    //            $('#selectUsersPopupUL').append(users.join('')).listview().listview('refresh');

    //            SetNextPopUpId('#selectUsers');
    //            ClosePopup();
    //        }
    //        else {
    //            UnsuccessfulOnlineCall();
    //        }
    //    },
    //    function () {
    //        UnsuccessfulOnlineCall();
    //    },
    //    function () { StandardCompleteACOnline(); },
    //    'Loading all users.....');
}

function Get_All_Users_Generic(successCallBack, failureCallBack, completeCallBack)
{
    var url = newBaseUrl + userUrl + 'all';

    Call_ArcadeSidekick_Online_Get(
        url,
        successCallBack,
        failureCallBack,
        completeCallBack,
        'Loading all users.....'
    );
}