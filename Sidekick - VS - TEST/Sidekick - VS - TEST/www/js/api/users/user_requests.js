var userUrl = 'app/users/';

// Method to post an update to user information
function PostUpdateOnline() {

    var url = newBaseUrl + userUrl + 'update';

    var handle = document.getElementById('mytwitter_setup').value;

    var body = {
        'Username': clientUserName,
        'TwitterHandle': handle
    };

    Call_ArcadeSidekick_Online_Post(
        url,
        body,
        function () { Successful_SideKickOnline_PostUpdate(handle); },
        UnsuccessfulOnlineCall,
        StandardCompleteACOnline,
        'Updating info...');
}

//VERIFY RETURNING USER
function SideKickOnline_VerifyReturningUser(userName, email, proposedsecret) {
    var jwt = CreateJWT(userName, email, proposedsecret);

    var url = newBaseUrl + userUrl + 'verify';

    var body =
        {
            'Username': userName,
            'EmailAddress': email
        };

    Call_ArcadeSidekick_Online_Post(
        url,
        body,
        function () {
            clientUserName = userName;
            emailAddress = email;
            secret = proposedsecret;
            SetItemInStorage("userName", userName);
            SetItemInStorage("emailAddress", emailAddress);
            SetItemInStorage("secret", proposedsecret);
            SideKickOnline_RestoreUser(userName, emailAddress, proposedsecret);
        },
        function () {
            StandardCompleteACOnline();
            UnsuccessfulVerifyUser();
        },
        function () { /* DO NOTHING AS WE ARE WAITING ON ANOTHER CALL*/ },
        "Verifying user...",
        jwt);
}

// RESTORE USER - 
function SideKickOnline_RestoreUser(username, email, secret) {

    var url = newBaseUrl + userUrl + 'restore?username=' + username;

    Call_ArcadeSidekick_Online_Get(
        url,
        function () {
            ProcessMyGames();
            SuccessfulGetProfileStats();
            SetNextPopUp(successOnlinePopup);
            var response = JSON.parse(latestXHTTP.responseText);
            SetUserNameAndEmailInSetup(username, emailAddress, response.TwitterHandle);
            twitterHandle = response.TwitterHandle;
            friendsCollection = response.Friends;
            SetItemInStorage("friends", friendsCollection);
            SetItemInStorage("twitterHandle", response.TwitterHandle);
            Hide('#verifyuserbutton'); //Show verified button in setup
        },
        UnsuccessfulOnlineCall,
        function () {
            //If we have navigated to clubs then we can calculate our admin roles
            if (allClubs.length !== 0) {
                GetMyClubAdmins(allClubs);
                ClosePopup();
                StandardCompleteACOnline();
            }
            else {
                //we need to call 
                SideKickOnline_AllClubsFromRestore();
            }
        },
        'Restoring data...');
}