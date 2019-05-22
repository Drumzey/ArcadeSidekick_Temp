var keyImLookingFor = '';
var test = true;

function SuccessCallback(obj) {
    console.log("Successful set " + keyImLookingFor);
}

function FailedToGet(obj) {
    alert("Failured to get " + keyImLookingFor);    
}

function FailureCallBack(obj) {
    alert("Failured to store " + keyImLookingFor);    
}

function ClearStorage()
{
    if (test === false) {
        NativeStorage.clear(SuccessCallback, FailureCallBack);
    }
    else {
        SuccessCallback();
    }
}

function SetTestData(key, value) {
    switch (key) {
        case "notify":
            localStorage.setItem("notify", value);
            return;
        case "theme":
            localStorage.setItem("theme", value);
            return;        
        case "my_record":
            localStorage.setItem("my_record", JSON.stringify(value));
            return;
        case "firstTime":
            localStorage.setItem("firstTime", value);
            return;
        case "firstTimeCustom":
            localStorage.setItem("firstTimeCustom", value);
            return;
        case "userName":
            localStorage.setItem("userName", value);
            return;
        case "secret":
            localStorage.setItem("secret", value);
            return;
        case "emailAddress":
            localStorage.setItem("emailAddress", value);
            return;
        case "friends":
            localStorage.setItem("friends", JSON.stringify(value));
            return;
        case "firstTimeFriends":
            localStorage.setItem("firstTimeFriends", value);
            return;
        case "customGames":
            localStorage.setItem("customGames", JSON.stringify(value));
            return;
    }
}

function GetTestReturnData(key) {
    switch (key) {
        case "notify":
            return localStorage.getItem("notify");            
        case "theme":
            return localStorage.getItem("theme");
        case "my_record":
            return JSON.parse(localStorage.getItem("my_record"));
        case "firstTime":
            return localStorage.getItem("firstTime");
        case "firstTimeCustom":
            return localStorage.getItem("firstTimeCustom");
        case "userName":
            return localStorage.getItem("userName");
        case "secret":
            return localStorage.getItem("secret");
        case "emailAddress":
            return localStorage.getItem("emailAddress");            
        case "friends":        
            return JSON.parse(localStorage.getItem("friends"));
        case "firstTimeFriends":
            return localStorage.getItem("firstTimeFriends");
        case "customGames":
            return JSON.parse(localStorage.getItem("customGames"));
        case "version":
            return "1.0.40";
    }
}

function SetItemInStorage(key, value)
{
    if (test === false) {
        keyImLookingFor = key;
        NativeStorage.setItem(key, value, SuccessCallback, FailureCallBack);
    }
    else {        
        SetTestData(key, value);
        SuccessCallback();
    }
}

function SetItemInStorageWithCallBack(key, value, callbackFunction) {
    if (test === false) {
        keyImLookingFor = key;
        NativeStorage.setItem(key, value, callbackFunction, FailureCallBack);
    }
    else {
        SetTestData(key, value);
        callbackFunction();
    }
}

function GetItemFromStorageWithCallBack(key, callbackFunction) {
    if (test === false) {
        keyImLookingFor = key;
        NativeStorage.getItem(key, callbackFunction, FailedToGet);
    }
    else {
        var returnData = GetTestReturnData(key);
        callbackFunction(returnData);
    }
}

function GetItemFromStorageWithSuccessAndFailureCallBack(key, success, failure) {
    if (test === false) {
        keyImLookingFor = key;
        NativeStorage.getItem(key, success, failure);
    }
    else {
        var returnData = GetTestReturnData(key);
        success(returnData);
    }
}

