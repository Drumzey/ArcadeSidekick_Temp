var defaultSetting = 11;

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
        localStorage.setItem("my_record", JSON.stringify(new Record()));
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('my_record', Success,
            function (err) {
                if (err.code === 2) {                    
                    SetItemInStorageWithCallBack('my_record', new Record(), Success);                    
                }
            }
        );
    }

    if (test)
    {
        localStorage.setItem("firstTime", "yes");
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('firstTime', Success,
            function (err) {
                if (err.code === 2) {
                    SetItemInStorageWithCallBack('firstTime', 'yes', Success);
                }
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
                if (err.code === 2) {
                    SetItemInStorageWithCallBack('firstTimeCustom', 'yes', Success);
                }
            }
        );
    }

    if (test) {
        localStorage.setItem("customGames", JSON.stringify([]));
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('customGames', Success,
            function (err) {
                if (err.code === 2) {
                    SetItemInStorageWithCallBack('customGames', [], Success);
                }
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
                if (err.code === 2) {
                    SetItemInStorageWithCallBack('secret', '', Success);
                }
            }
        );
    }

    if (test) {
        localStorage.setItem("userName", "");        
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('userName', Success,
            function (err) {
                if (err.code === 2) {
                    SetItemInStorageWithCallBack('userName', '', Success);
                }
            }
        );
    }

    if (test) {
        localStorage.setItem("emailAddress", "");        
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('emailAddress', Success,
            function (err) {
                if (err.code === 2) {
                    SetItemInStorageWithCallBack('emailAddress', '', Success);
                }
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
                if (err.code === 2) {
                    SetItemInStorageWithCallBack('notify', 'on', Success);
                }
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
                if (err.code === 2) {
                    SetItemInStorageWithCallBack('theme', 'a', Success);
                }
            }
        );
    }

    if (test) {
        localStorage.setItem("friends", JSON.stringify([]));
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('friends', Success,
            function (err) {
                if (err.code === 2) {
                    SetItemInStorageWithCallBack('friends', [], Success);
                }
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
                if (err.code === 2) {
                    SetItemInStorageWithCallBack('firstTimeFriends', 'yes', Success);
                }
            }
        );
    }
}


