var removeGamePopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Remove Game</h3> \
        <h6>Are you sure you wish to remove this game. Your score will be lost</h6> \
        <a onclick="SuccessfulRemovePlayed();" data-role="button" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
       <a onclick= "ClosePopup();UndoRemovePlayed();" data-role="button" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Cancel</span></span></a> \
    </div>';