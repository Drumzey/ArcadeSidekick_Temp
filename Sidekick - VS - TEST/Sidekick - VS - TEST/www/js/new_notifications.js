var notify = '';

function TurnOnNotifications() {
    if (test === false) {
        AppCenter.Push.setEnabled(true, enableSuccess, error);
        if (AllowedOnline()) {            
            try {
                AppCenter.setUserId(clientUserName);
            }
            catch (err)
            {
                alert(err);
            }
        }
    }
}

function TurnOffNotifications() {
    if (test === false) {
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

    if (notify === "on" && choice === "notifyoff") {
        notify = 'off';
        SetItemInStorage('notify', 'off');
        TurnOffNotifications();
    } else if (notify === "off" && choice === "notifyon") {
        notify = 'on';
        SetItemInStorage('notify', 'on');
        TurnOnNotifications();
    }
}