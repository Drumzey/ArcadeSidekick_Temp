var venuesFirstTime = '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
                     <h3>Where do you play?</h3> \
                     <h6>We always want to learn about new venues where our users can play games.</h6> \
                     <h6>Please select from the list below the venues you play your games at, this will help us show you the relevant locations when you are submitting a score.</h6> \
                     <h6>If youd like a venue to be added then please contact us, and if you want to register your home arcade as a private venue then please let us know!</h6> \
                     <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all ui-btn-text">OK</span></a> \
                  </div>';

var venueSuccessPopUp = '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>1 UP!</h3> \
        <h6>Success! Jolly good.</h6> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';

var venueBadPasswordPopUp =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>I AM ERROR!</h3> \
        <h6>Cannot verify venue, please check the venue name and password.</h6> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';

var joinPrivateVenuePopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Join Private Venue!</h3> \
        <h6>Please enter the venue name and password to join.</h6> \
        <form style="font-size:70%;" action="javascript:DoNothing()"> \
            <label style="font-size:70%" for="venuename">Name</label> \
            <input type="text" name="venuename" id="venuename" /> \
            <label style="font-size:70%" for="venuepassword">Password</label> \
            <input type="text" name="venuepassword" id="venuepassword" /> \
            <input type="submit" value="OK" id="venuepasswordsubmit" onclick="JoinVenueFromPopUp();"> \
        </form> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span style="font-size:70%" class="ui-btn-text">Cancel</span></span></a> \
    </div>';