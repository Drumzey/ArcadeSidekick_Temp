var defaultDataErrors = true;
var defaultSetting = 12;
var appVersion = "1.3.04";
var currentVersion = "";

function Success() {
    defaultSetting--; 

    if (defaultSetting === 0) { 
        if (test) {
            var notify = localStorage.getItem("notify");
            if (notify === "on") {
                TurnOnNotifications();
            }
            else
            {
                TurnOffNotifications();
            }
        }
        else {
            GetItemFromStorageWithCallBack('notify', function (notify) {
                if (notify === null || notify === "on") {
                    SetItemInStorage('notify', 'on');
                    notify = "on";
                    TurnOnNotifications();
                }
                else {
                    TurnOffNotifications();
                }
            });
        }

        init();
    }        
}

function SetDefaultData() {

    if (test) {
        localStorage.setItem("version", appVersion);
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('version',
            function (value) {
                currentVersion = value;
                if (currentVersion === null || currentVersion === '') {
                    currentVersion = appVersion;
                    SetItemInStorageWithCallBack('version', currentVersion, Success);
                }
                else {
                    Success();
                }
            },
            function (err) {
                SetItemInStorageWithCallBack('version', appVersion, Success);
            }
        );
    }

    if (test) {
        currentRecord = new Record();
        localStorage.setItem("my_record", JSON.stringify(new Record()));
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('my_record',
            function (value) {                
                currentRecord = value;
                if (currentRecord === null || currentRecord === "[]" || currentRecord === '')
                {                    
                    currentRecord = new Record();
                }
                Success();
            },
            function (err) {  
                currentRecord = new Record();                                         
                SetItemInStorageWithCallBack('my_record', new Record(), Success);                                    
            }
        );
    }

    if (test)
    {
        localStorage.setItem("firstTime", "yes");
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('firstTime',
            function (value) {                
                firstTime = value;
                if (firstTime === null || firstTime === '')
                {
                    firstTime = "yes";
                }
                Success();
            },
            function (err) {               
                firstTime = "yes";                               
                SetItemInStorageWithCallBack('firstTime', 'yes', Success);                
            }
        );
    }

    if (test) {
        localStorage.setItem("firstTimeCustom", "yes");
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('firstTimeCustom', Success,
            function (err) {                                
                SetItemInStorageWithCallBack('firstTimeCustom', 'yes', Success);                
            }
        );
    }

    if (test) {
        //localStorage.setItem("customGames", JSON.stringify({}));
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('customGames',
            function (value) {                
                customGames = value;
                if (customGames === null || customGames === '') {
                    customGames = {};
                }
                Success();
            },
            function (err) {                
                customGames = {};                                   
                SetItemInStorageWithCallBack('customGames', {}, Success);                
            }
        );
    }

    if (test) {
        localStorage.setItem("secret", "");        
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('secret', Success,
            function (err) {                
                SetItemInStorageWithCallBack('secret', '', Success);                
            }
        );
    }

    if (test) {
        localStorage.setItem("userName", "");        
        Success();
    }
    else {
        document.getElementById('myusernamesetup').innerText = 'Username';
        GetItemFromStorageWithSuccessAndFailureCallBack('userName',
            function (value) {                   
                clientUserName = value;
                if (clientUserName === null) {
                    clientUserName = '';
                }
                if (clientUserName !== '' && clientUserName !== null) {
                    document.getElementById('myusernamesetup').innerText = 'Username ' + clientUserName;
                }
                Success();
            },
            function (err) {                
                clientUserName = '';                
                SetItemInStorageWithCallBack('userName', '', Success);
            }
        );
    }

    if (test) {
        localStorage.setItem("emailAddress", "");        
        Success();
    }
    else {
        document.getElementById('myemailsetup').innerText = 'Email';  
        GetItemFromStorageWithSuccessAndFailureCallBack('emailAddress',
            function (value) {                      
                emailAddress = value;
                if (emailAddress === null) {
                    emailAddress = '';
                }
                if (emailAddress !== '' && emailAddress !== null) {
                    document.getElementById('myemailsetup').innerText = 'Email ' + emailAddress;
                }
                Success();
            },
            function (err) {
                emailAddress = '';                           
                SetItemInStorageWithCallBack('emailAddress', '', Success);
            }
        );
    }    

    if (test) {
        localStorage.setItem("notify", "on");
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('notify', Success,
            function (err) {                
                SetItemInStorageWithCallBack('notify', 'on', Success);                
            }
        );
    }

    if (test) {
        localStorage.setItem("theme", "a");
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('theme', Success,
            function (err) {                
                SetItemInStorageWithCallBack('theme', 'a', Success);                
            }
        );
    }

    if (test) {
        friendsCollection = [];
        localStorage.setItem("friends", JSON.stringify([]));
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('friends',
            function (value) {
                friendsCollection = value;
                if (friendsCollection === null || friendsCollection === '') {                    
                    friendsCollection = [];
                }
                Success();
            },
            function (err) {                
                friendsCollection = [];                                                 
                SetItemInStorageWithCallBack('friends', [], Success);
            }
        );
    }

    if (test) {
        localStorage.setItem("firstTimeFriends", "yes");
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('firstTimeFriends', Success,
            function (err) {
                SetItemInStorageWithCallBack('firstTimeFriends', 'yes', Success);
            }
        );
    }
}


