// Popup when trying to enter the scores page but you have no scores for this game
var noDetailedScoresError =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Error</h3> \
        <h6>You have no scores for this game.</h6> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';

// Confirmation on deleting a score
var deleteDetailedScore =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Delete Score?</h3> \
        <h6>Are you sure you want to delete this score?</h6> \
        <a onclick="DeleteHighscore(false)" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Cancel</span></span></a> \
    </div>';

// Confirmation on deleting your top score
var deleteTopScore =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Delete Score?</h3> \
        <h6>This is your top score. Are you sure you want to delete it? Your next best score will become your new highscore.</h6> \
        <a onclick="DeleteHighscore(true)" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Cancel</span></span></a> \
    </div>';

// error when unable to delete score
var errorOnDelete = 
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Delete Score</h3> \
        <h6>Unable to delete score</h6> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';