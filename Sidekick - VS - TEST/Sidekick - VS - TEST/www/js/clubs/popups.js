var clubsFirstTimePopUp =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Welcome to Clubs!</h3> \
        <h6>Are you part of a gaming community? Do you listen to a particular retro gaming podcast? Join clubs here to see the leaderboards for each club as well as friends and global. Want a new club adding? Just make a club request using the link at the top of the page!</h6> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';

var cannotJoinClubPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>I AM ERROR!</h3> \
        <h6>You cant join any clubs unless you have registered and verified your account with us online.</h6> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';

var clubBadPasswordPopUp =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>I AM ERROR!</h3> \
        <h6>Incorrect Password.</h6> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';

var joinPrivateClubPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Join Private Club!</h3> \
        <h6>Please enter the club name and password to join.</h6> \
        <form style="font-size:70%;" action="javascript:DoNothing()"> \
            <label style="font-size:70%" for="clubname">Name</label> \
            <input type="text" name="clubname" id="clubname" /> \
            <label style="font-size:70%" for="clubpassword">Password</label> \
            <input type="text" name="clubpassword" id="clubpassword" /> \
            <input type="submit" value="OK" id="clubpasswordsubmit" onclick="JoinClubFromPopUp();"> \
        </form> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span style="font-size:70%" class="ui-btn-text">Cancel</span></span></a> \
    </div>';

var welcomeToClubPopUp =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Welcome!</h3> \
        <h6>***CLUBTEXT***</h6> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';

var sendClubMessagePopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Send Message</h3> \
        <h6>Please select which type of message you wish to send</h6> \
        <div data-role="fieldcontain" style="font-size:70%"> \
            <select id="clubSendMessageSelect" data-native-menu=false onchange="RefreshClubNewsEventText()"> \
              <option value="Event" style="background: white">New Event</option> \
              <option value="News" style="background: white">News</option> \
              <option value="Invite" style="background: white">Invite</option> \
            </select> \
        </div> \
        <textarea class="ui-corner-all" style="margin: 0; height: auto !important;" id="clubEventNewsText" rows="4">***MESSAGE***</textarea> \
        <a onclick="SendClubMessage();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Send</span></span></a> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Cancel</span></span></a> \
    </div>';

var newsSentPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>News Sent</h3> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';

var eventSentPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Event Sent</h3> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';