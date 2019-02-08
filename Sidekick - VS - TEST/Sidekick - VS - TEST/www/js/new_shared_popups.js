var newUserPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3 style="text-align: center">New User</h3> \
        <h6>Enter a username, email and your favourite video game. This information will identify you in our online community so we can store your scores and ratings.</h6> \
        <span style="font-size:70%;" id="userErrorText_newuser"></span> \
        <form style="font-size:70%;" action="javascript:DoNothing()"> \
            <label style="font-size:70%" for="myusername_newuser">Username</label> \
            <input type="text" pattern="[A-Za-z0-9]{3,15}" title="3-15 characters A-Z 0-9 only" name="myusername_newuser" id="myusername_newuser" style="text-transform:uppercase" /> \
            <label style="font-size:70%" for="myemail_newuser">Email</label> \
            <input type="text" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$" name="myemail_newuser" id="myemail_newuser" /> \
            <input style="font-size:70%" type="submit" value="Create User" id="myusernamesubmit" onclick="SetupUserName()"> \
        </form> \
        <a onclick="ClosePopup();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span style="font-size:70%" class="ui-btn-text">Cancel</span></span></a> \
    </div>';

var secretKeyPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3 style="text-align: center">Enter your secret key</h3> \
        <h6>We\'ve sent you a key to the email address provided. Please enter it here, you\'ll need it before you can save any online data.</h6> \
        <span style="font-size:70%;" id="secretErrorText"></span> \
        <form style="font-size:70%;" action="javascript:DoNothing()"> \
            <label style="font-size:70%" for="secretkey">Secret Key</label> \
            <input type="text" name="secretkeyinput" id="secretkeyinput" /> \
            <input style="font-size:70%" type="submit" value="Verify" id="secretkeysubmit" onclick="VerifyUser()"> \
        </form> \
        <a onclick="ClosePopup();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span style="font-size:70%" class="ui-btn-text">I\'ll do it later</span></span></a> \
    </div>';

var existingUserPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
         <h3 style="text-align: center">Existing User</h3> \
         <h6>Enter the username, email and game previously registered. If you can not remember this information please contact us.</h6> \
         <span style="font-size:70%;" id="userErrorText_existinguser"></span> \
         <form style="font-size:70%;" action="javascript:DoNothing()"> \
             <label style="font-size:70%" for="myusername_existinguser">Username</label> \
             <input type="text" pattern="[A-Za-z0-9]{3,15}" title="3-15 characters A-Z 0-9 only" name="myusername_existinguser" id="myusername_existinguser" style="text-transform:uppercase" /> \
             <label style="font-size:70%" for="myemail_existinguser">Email</label> \
             <input type="text" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$" name="myemail_existinguser" id="myemail_existinguser" /> \
             <label style="font-size:70%" for="myfavouritegame_existinguser">Secret Code</label> \
             <input type="text" name="myfavouritegame_existinguser" id="myfavouritegame_existinguser" /> \
             <input style="font-size:70%" type="submit" value="Find user" id="myusernamesubmitRegistered" onclick="SetExistingUser()"> \
         </form> \
         <a onclick="ClosePopup();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span style="font-size:70%" class="ui-btn-text">Cancel</span></span></a> \
     </div>';        

var successOnlinePopup =     
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Success!</h3> \
        <h6>You are now ready to log games played, scores and challenge friends.</h6> \
        <a onclick="ClosePopup();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
     </div>';

//Used when creating a new user
var successVerify = 
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Success!</h3> \
        <h6>You are now ready to log games played, scores and challenge friends.</h6> \
        <a onclick="ClosePopup(); PostSignup();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
     </div>';

var errorOnlinePopup =     
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>I AM ERROR!</h3> \
        <h6>Error communicating with our online services. Make sure you are connected to the internet and try again.</h6> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';

var errorNewUser =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>I AM ERROR!</h3> \
        <h6>User already exists. Try another user name.</h6> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';

var errorVerify =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>I AM ERROR!</h3> \
        <h6>Unable to verify user. Please try again.</h6> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';
    