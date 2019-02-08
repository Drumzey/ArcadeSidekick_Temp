//TODO: DONE

function TurnOnNotifications() {
    if (test == false) {
        AppCenter.Push.setEnabled(true, enableSuccess, error);
    }
}

function TurnOffNotifications() {
    if (test == false) {
        AppCenter.Push.setEnabled(false, disableSuccess, error);
    }
}

var enableSuccess = function () {
    console.log("push notifications enabled");
};

var disableSuccess = function () {
    console.log("push notifications disabled");
};

var error = function (error) {
    console.error(error);
};

function SetNotifications() {
    var choice;

    $("input[id*=notify-]:checked").each(function () {
        choice = $(this).val();
    });

    GetItemFromStorageWithCallBack('notify', function (oldchoice) {

        if (oldchoice === "on" && choice === "notifyoff") {
            SetItemInStorage('notify', 'off');
            TurnOffNotifications();
        } else if (oldchoice === "off" && choice === "notifyon") {
            SetItemInStorage('notify', 'on');
            TurnOnNotifications();
        }
    });
}