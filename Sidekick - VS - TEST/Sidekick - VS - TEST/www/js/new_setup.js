function Setup() {

    GetItemFromStorageWithCallBack('notify', function (notify) {

        if (notify === "on") {
            set_jqm_radio_button_off("radio-notify", "notifyoff");
            set_jqm_radio_button("radio-notify", "notifyon");
        } else {
            set_jqm_radio_button_off("radio-notify", "notifyon");
            set_jqm_radio_button("radio-notify", "notifyoff");
        }
    });

    set_jqm_radio_button_off("radio-choice", "default");
    set_jqm_radio_button_off("radio-choice", "frogger");
    set_jqm_radio_button_off("radio-choice", "qix");
    set_jqm_radio_button_off("radio-choice", "joust");
    set_jqm_radio_button_off("radio-choice", "pacman");
    set_jqm_radio_button_off("radio-choice", "invader");
    set_jqm_radio_button_off("radio-choice", "donkey");
    set_jqm_radio_button_off("radio-choice", "arkanoid");
    set_jqm_radio_button_off("radio-choice", "battlezone");

    set_jqm_radio_button("radio-choice", theme);

    //If we have a client user name
    if (clientUserName !== '' && clientUserName !== null) {
        Hide('#newuserbutton');
        Hide('#existinguserbutton');
        if (AllowedOnline()) {
            Hide('#verifyuserbutton');            
        }
        else
        {
            Show('#verifyuserbutton');
        }
    }
    else {
        Show('#newuserbutton');
        Show('#existinguserbutton');
        Hide('#verifyuserbutton');   
    }
}

function ShowNewUser() {
    CreatePopup(newUserPopup);
}

function ShowExistingUser() {
    CreatePopup(existingUserPopup);
}

function FAQ() {
    NavigateToInternalPage("#FAQ");
}

function About() {
    ShowPopup("#About");
}

function Contact() {
    ShowPopup("#Contact");
}

function Backup() {
    if (AllowedOnline()) {
        UploadBulkDataAndPullDownStoredData();
    }
    else {
        ShowPopup('#NoUser');
    }
}

function Restore() {
    if (AllowedOnline()) {
        SynchOnlineAndOffline();
    }
    else {
        ShowPopup('#NoUser');
    }
}

function ShowTheme() {
    $('#70s').removeClass('ui-btn-active');
    $('#80s').removeClass('ui-btn-active');
    $('#90s').removeClass('ui-btn-active');

    $(".tabs").tabs().tabs("option", "active", 0);
    $('#70s').addClass('ui-btn-active');

    ShowPopup("#Themes");
}

function Thanks() {
    ShowPopup("#Thanks");
}

function ShowReset() {
    $('body').off('touchmove');
    popupopen = 0;
    ShowPopup("#Reset");
}
