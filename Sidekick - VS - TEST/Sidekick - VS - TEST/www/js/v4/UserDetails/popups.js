var updateUserInfoPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Update User info</h3> \
        <h6>Please supply/update the following extra information. We\'d like this so that we can include you in our social media and learn a little more about you.</h6> \
        <form style="font-size:70%;" action="javascript:DoNothing()" onsubmit="PostUpdateOnline()"> \
            <label for="mydob_setup" >Year of Birth</label > \
            <input type="number" name="mydob_setup" pattern="[0-9]{1,4}" title="1-4 characters 0-9 only" id="mydob_setup" value="*DOB*"/> \
            <label for="mytwitter_setup" >Twitter Handle</label > \
            <input type="text" name="mytwitter_setup" pattern="[A-Za-z0-9_]{1,15}" title="1-15 characters A-Z 0-9 _ only" id="mytwitter_setup" value="*TWITTER*"/> \
            <label for="mylocation_setup">Location</label> \
            <input type="text" name="mylocation_setup" id="mylocation_setup" value="*LOCATION*"/> \
            <label for="myyoutube_setup">YouTube Channel</label> \
            <input type="text" name="myyoutube_setup" id="myyoutube_setup" value="*YOUTUBE*"/> \
            <input type="submit" value="Update" id="myusernamesubmit""> \
        </form> \
        <a onclick= "ClosePopup();" data-role="button" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"> \
            <span class="ui-btn-inner ui-btn-corner-all"><span style="font-size:70%;" class="ui-btn-text">Cancel</span></span> \
        </a> \
    </div>';

var pleaseRegisterUpdateUserInfoPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Update User info</h3> \
        <h6>You cant update your user if you have not registered. Please register or sign in.</h6> \
        <a onclick= "ClosePopup();" data-role="button" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"> \
            <span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span> \
        </a> \
    </div>';

var successfulUpdateUserInfoPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>User info updated</h3> \
        <h6>Thanks for the info! I feel i know you a little better now.</h6> \
        <a onclick= "ClosePopup();" data-role="button" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"> \
            <span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span> \
        </a> \
    </div>';