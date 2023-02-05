var unknownPagePopUp = oneButtonPopupTemplate
    .replace("TITLE", 'Unknown Page')
    .replace("TEXT", 'You have requested a page that does not exist')
    .replace("BUTTONONCLICK", 'ClosePopup();')
    .replace("BUTTONTEXT", 'OK');