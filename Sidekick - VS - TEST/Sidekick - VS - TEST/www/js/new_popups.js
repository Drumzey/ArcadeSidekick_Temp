var popupopen = 0;
var popupname = '';
var temppopup = null;

function ShowPopup(name) {
    temppopup = null;
    $(name).popup('open');
    $('body').addClass('no-scroll');
    popupopen = 1;
    popupname = name;
}

var nextPopup = '';

function SetNextPopUp(popupText) {
    nextPopup = popupText;
}

function ClosePopup() {
    $('body').removeClass('no-scroll');
    popupopen = 0;
    if (temppopup !== null) {
        temppopup.popup('close');       
    }
    else
    {
        $(popupname).popup('close');
    }
    popupname = '';
}

function CreatePopup(popupCode) {
    
    var $popUp = $("<div/>").popup({
        dismissible: false,
        theme: themeLetter,        
        transition: "pop"
    }).on("popupafterclose", function () {
        $(this).remove();
        if (nextPopup !== '') {
            CreatePopup(nextPopup);
            nextPopup = '';
        }
    });

    $(popupCode, {}).appendTo($popUp);
    $popUp.popup('open').trigger("create");
    temppopup = $popUp;
}