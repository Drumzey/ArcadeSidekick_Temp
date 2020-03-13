// Get Clubs Response
function Successful_SidekickOnline_GetClubs() {
    if (latestXHTTP.status === 200) {
        var clubData = JSON.parse(latestXHTTP.responseText);
        allClubs = clubData;
        GetMyClubAdmins(clubData);
        ShowAllClubs();
    } else {
        UnsuccessfulOnlineCall();
    }
}

//Leave Club response
function Successful_SideKickOnline_LeaveClub(clubName) {
    if (latestXHTTP.status === 200) {
        var response = JSON.parse(latestXHTTP.responseText);
        for (var c = 0; c < allClubs.length; c++) {
            if (allClubs[c].Name === response.Name) {
                allClubs[c].Members = response.Members;
            }
        }

        var index = myclubs.indexOf(clubName);
        if (index > -1) {
            myclubs.splice(index, 1);
        }

        SetItemInStorage("myclubs", myclubs);
        ShowAllClubs();
    } else {
        UnsuccessfulOnlineCall();
    }
}

function Failed_SideKickOnline_LeaveClub() {
    if (latestXHTTP.status === 403) {
        SetNextPopUp(clubBadPasswordPopUp);
        ClosePopup();
    }
    else {
        UnsuccessfulOnlineCall();
    }
}

//Join Club responses
function Successful_SideKickOnline_JoinClub(clubName)
{
    if (latestXHTTP.status === 200) {

        var response = JSON.parse(latestXHTTP.responseText);

        for (var c = 0; c < allClubs.length; c++) {
            if (allClubs[c].Name === response.Name) {
                allClubs[c].Members = response.Members;
            }
        }

        if (privateClubs.indexOf(clubName) !== -1) {
            var welcome = welcomeToClubPopUp.replace("***CLUBTEXT***", response.LongDescription);
            SetNextPopUp(welcome);
            ClosePopup();
        }

        myclubs.push(clubName);
        SetItemInStorage("myclubs", myclubs);
        ShowAllClubs();
    } else if (latestXHTTP.status === 403) {
        SetNextPopUp(clubBadPasswordPopUp);
        ClosePopup();
    }
    else {
        UnsuccessfulOnlineCall();
    }
    Hide('#joinClub');
}