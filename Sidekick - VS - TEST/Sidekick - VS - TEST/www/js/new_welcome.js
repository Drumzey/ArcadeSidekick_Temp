//Do we show the welcome screen on start up?
function CheckForFirstTime() {

    GetItemFromStorageWithCallBack('firstTime', function (firstTime) {
        if (firstTime !== "no") {
            clientUserName = '';
            SetItemInStorage('firstTime', 'no');
            SetItemInStorage('userName', '');
            SetItemInStorage('emailAddress', '');
            $('#userErrorText').addClass('ui-screen-hidden');
            ShowPopup('#FirstTime');
        } else {
            if (clientUserName !== '' && clientUserName !== null) {
                document.getElementById('myusernamesetup').innerText = 'Username ' + clientUserName;
                document.getElementById('myemailsetup').innerText = 'Email ' + emailAddress;
            } else {
                document.getElementById('myusernamesetup').innerText = 'Username';
                document.getElementById('myemailsetup').innerText = 'Email';
            }
        }

        pageHistory.push("#MainMenu");

        GetItemFromStorageWithCallBack("my_record", function (value) {
            currentRecord = value;
            if (currentRecord === null || currentRecord === "[]") {
                var category = new Record();
                SetItemInStorage("my_record", category);
            }
        });
    });
}

function WelcomeNewUserClicked() {
    ClosePopup();
    CreatePopup(newUserPopup);
}

function WelcomeExistingUserClicked() {    
    ClosePopup();
    CreatePopup(existingUserPopup);
}