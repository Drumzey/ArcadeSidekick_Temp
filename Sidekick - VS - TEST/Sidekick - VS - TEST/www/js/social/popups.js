var sharePopup =
    '<div data-role="content" data-theme="a" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Share!</h3> \
        <h6>Post your achievements to social media or challenge a friend via text to beat your high score:</h6> \
        <ul id="postgamepopuplist" data-role="listview" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow"> \
            <li id="postgametotext" onclick="ShareOnText()" style="white-space: normal;text-overflow: clip;" class="ui-li ui-btn-up-c"> \
                <a id="textlink"> \
                    <span style="font-size:70%;white-space: normal;text-overflow: clip" ;>Challenge a friend via text</span> \
                </a> \
            </li> \
            <li id="postgametoother" onclick="ShareOnOther()" style="white-space: normal;text-overflow: clip;" class="ui-li ui-btn-up-c"> \
                <a id="otherlink"> \
                    <span style="font-size:70%;white-space: normal;text-overflow: clip;">Share.....</span> \
                </a> \
            </li> \
        </ul> \
        <a onclick="ClosePopup()" data-role="button" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Done</span></span></a> \
    </div>';