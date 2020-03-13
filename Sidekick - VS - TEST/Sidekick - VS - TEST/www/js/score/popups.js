var lowerHighscorePopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Are you sure?</h3> \
        <h6>This score is worse than your last one, are you sure you want to update?</h6> \
        <a onclick="ProcessScore();ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Yes</span></span></a> \
        <a onclick="UndoScoreUpdate();ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Cancel</span></span></a> \
    </div>';

var detailedScoreError = 
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Error</h3> \
        <h6>Unable to add detailed score. Please check the score is correct.</h6> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';