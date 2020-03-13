var cannotSetChallengeNoUser =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>I AM ERROR</h3> \
        <h6>You cannot send challenges unless you have registered and verified a username</h6> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';

var cannotSetChallengeNoFriends =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>I AM ERROR</h3> \
        <h6>You cannot send challenges unless you have friends or are a club admin</h6> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';

var setChallengeAsAdminOrUserPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Send Challenge</h3> \
        <h6>Do you want to send a challenge to a club or user?</h6> \
        <a onclick="ClubChallenge()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Club</span></span></a> \
        <a onclick="UserChallenge()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">User</span></span></a> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Cancel</span></span></a> \
    </div>';

var sendChallengeToClubPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Select Club</h3> \
        <h6>Please select the club you wish to send the challenge to</h6> \
        <div id="whatDiv" data-role="fieldcontain" style="font-size:70%"> \
            <select id="clubChallengeSelect" data-native-menu=false onchange="RefreshClubChallengeText()"> \
                *** \
            </select> \
        </div> \
        <textarea class="ui-corner-all" style="margin: 0; height: auto !important;" id="clubChallengeText" rows="4">***MESSAGE***</textarea> \
        <a style="font-size:70%" onclick="SendChallenge(true);" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c">OK</a> \
        <a style="font-size:70%" onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c">Cancel</a> \
    </div>';

var sendChallengeToUserPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Select User</h3> \
        <h6>Please select the user you wish to send the challenge to</h6> \
        <div id="whatDiv" data-role="fieldcontain" style="font-size:70%"> \
            <select id="userChallengeSelect" data-native-menu=false> \
                *** \
            </select> \
        </div> \
        <textarea class="ui-corner-all" style="margin: 0; height: auto !important;" id="userChallengeText" rows="4">***MESSAGE***</textarea> \
        <a onclick="SendChallenge(false);" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Cancel</span></span></a> \
    </div>';

var successfulChallengeSetPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Challenge Sent</h3> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';