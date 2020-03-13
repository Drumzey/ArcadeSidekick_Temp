var firstTimeProfilePopUp =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Welcome to your profile! (preview)</h3> \
        <h6>Track your progress through our catalogue here, see your level, badges earnt and stats about your gameplay! Youll get points for playing and rating games, uploading scores and sharing via social media!</h6> \
        <h6>Your level will refresh each time you upload data to our servers so always remember to upload your scores!</h6> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';

var firstTimeProfilePopUpOffLine =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Welcome to your profile! (preview)</h3> \
        <h6>Track your progress through our catalogue here, see your level, badges earnt and stats about your gameplay! Youll get points for playing and settings scores. Create an account and get more points by ratings games, sharing your achievements on social media and updating your current records.</h6> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';

var levelUpPopUp =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Level Up!</h3> \
        <h6>Congratulations!</h6> \
        <h6>You have reached the esteemed rank of ***RANK***</h6> \
        <a onclick="ClosePopup();GotoProfile();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Profile</span></span></a> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';

var levelDownPopUp =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Level Down?!</h3> \
        <h6>How did you manage that?</h6> \
        <h6>You have been demoted to ***RANK***</h6> \
        <a onclick="ClosePopup();GotoProfile();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Profile</span></span></a> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';