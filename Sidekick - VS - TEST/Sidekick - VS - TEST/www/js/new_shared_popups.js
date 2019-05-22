var firstTimePopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
      <h3 style="text-align: center">Welcome!</h3> \
      <h6>Thankyou for purchasing Arcade sidekick, the place to record your top scores on arcade video game classics, share your achievements and challenge your friends.</h6> \
      <h6>Want to be part of our online community? Create a new user or enter an already registered username. You can set it now or through the setup menu later.</h6> \
      <h6>Follow us on <a href="#" onclick="GoToTwitter(this)">twitter</a> for all the latest news and please give us feedback so we can make the sidekick everything you want it to be.</h6> \
      <h6>Now go set some high scores!</h6> \
      <a onclick="WelcomeNewUserClicked();" style="font-size:70%" data-role="button" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">New User</span></span></a> \
      <a onclick="WelcomeExistingUserClicked();" style="font-size:70%" data-role="button" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Existing User</span></span></a> \
      <a onclick="ClosePopup()" style="font-size:70%" data-role="button" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Lets go!</span></span></a> \
     </div>';

var newUserPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3 style="text-align: center">New User</h3> \
        <h6>Enter a username and email. This information will identify you in our online community so we can store your scores and ratings.</h6> \
        <span style="font-size:70%;color:red;" id="userErrorText_newuser"></span> \
        <form style="font-size:70%;" action="javascript:DoNothing()" onsubmit="SetupUserName()"> \
            <label style="font-size:70%" for="myusername_newuser">Username</label> \
            <input required="required" type="text" pattern="[A-Za-z0-9_]{3,15}" title="3-15 characters A-Z 0-9 _ only" name="myusername_newuser" id="myusername_newuser" style="text-transform:uppercase" /> \
            <label style="font-size:70%" for="myemail_newuser">Email</label> \
            <input required="required" type="text" name="myemail_newuser" id="myemail_newuser" /> \
            <label style="font-size:70%" for="myconfirmemail_newuser">Confirm Email</label> \
            <input required="required" type="text" name="myconfirmemail_newuser" id="myconfirmemail_newuser" /> \
            <input style="font-size:70%" type="submit" value="Create User" id="myusernamesubmit""> \
        </form> \
        <a onclick="ClosePopup();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span style="font-size:70%" class="ui-btn-text">Cancel</span></span></a> \
    </div>';

var verifyLaunchPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3 style="text-align: center">Enter your secret key</h3> \
        <h6>You\'ve created a user but not yet verified your account. We\'ve sent you a key to the email address provided. Please enter it here, you\'ll need it before you can save any online data.</h6> \
        <span style="font-size:70%;" id="secretErrorText"></span> \
        <form style="font-size:70%;" action="javascript:DoNothing()"> \
            <label style="font-size:70%" for="secretkey">Secret Key</label> \
            <input required="required" type="text" name="secretkeyinput" id="secretkeyinput" /> \
            <input style="font-size:70%" type="submit" value="Verify" id="secretkeysubmit" onclick="VerifyUser()"> \
        </form> \
        <a onclick="ClosePopup();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span style="font-size:70%" class="ui-btn-text">I\'ll do it later</span></span></a> \
    </div>';

var secretKeyPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3 style="text-align: center">Enter your secret key</h3> \
        <h6>We\'ve sent you a key to the email address provided. Please enter it here, you\'ll need it before you can save any online data.</h6> \
        <span style="font-size:70%;" id="secretErrorText"></span> \
        <form style="font-size:70%;" action="javascript:DoNothing()"> \
            <label style="font-size:70%" for="secretkey">Secret Key</label> \
            <input required="required" type="text" name="secretkeyinput" id="secretkeyinput" /> \
            <input style="font-size:70%" type="submit" value="Verify" id="secretkeysubmit" onclick="VerifyUser()"> \
        </form> \
        <a onclick="ClosePopup();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span style="font-size:70%" class="ui-btn-text">I\'ll do it later</span></span></a> \
    </div>';

var existingUserPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
         <h3 style="text-align: center">Existing User</h3> \
         <h6>Enter the username, email and secret previously used. If you can not remember this information please go to setup - help.</h6> \
         <span style="font-size:70%;color:red;" id="userErrorText_existinguser"></span> \
         <form style="font-size:70%;" action="javascript:DoNothing()" onsubmit="SetExistingUser()"> \
             <label style="font-size:70%" for="myusername_existinguser">Username</label> \
             <input required="required" type="text" pattern="[A-Za-z0-9_]{3,15}" title="3-15 characters A-Z 0-9 _ only" name="myusername_existinguser" id="myusername_existinguser" style="text-transform:uppercase" /> \
             <label style="font-size:70%" for="myemail_existinguser">Email</label> \
             <input required="required" type="text" name="myemail_existinguser" id="myemail_existinguser" /> \
             <label style="font-size:70%" for="myfavouritegame_existinguser">Secret Code</label> \
             <input required="required" type="text" name="myfavouritegame_existinguser" id="myfavouritegame_existinguser" /> \
             <input style="font-size:70%" type="submit" value="Find user" id="myusernamesubmitRegistered"> \
         </form> \
         <a onclick="ClosePopup();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span style="font-size:70%" class="ui-btn-text">Cancel</span></span></a> \
     </div>';        

var successOnlinePopup =     
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Welcome back!</h3> \
        <h6>What are you waiting for? Go beat your friends records!</h6> \
        <a onclick="PostSignup(false)" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
     </div>';

//Used when creating a new user
var successVerify = 
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Success!</h3> \
        <h6>You are now ready to log games played, scores and challenge friends.</h6> \
        <a onclick="PostSignup(true);" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
     </div>';

var shareSignup = 
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Share!</h3> \
        <h6>Spread the word about Arcade Sidekick by sharing your username.</h6> \
        <a onclick="ShareSignupOnTwitter();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span style="font-size:70%;white-space: normal;text-overflow: clip">Share on Twitter</span></a> \
        <a onclick="ShareSignupOnFaceBook();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span style="font-size:70%;white-space: normal;text-overflow: clip">Share on Facebook</span></a> \
        <a onclick="ShareSignupOnOther();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span style="font-size:70%;white-space: normal;text-overflow: clip">Share ...</span></a> \
        <a onclick="ClosePopup();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span style="font-size:70%;white-space: normal;text-overflow: clip">OK</span></a> \
     </div>';

var noFriends =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>You have no friends!</h3> \
        <h6>In app, not in real life.... Add them via friends in the main menu.</h6> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';

var errorOnlinePopup =     
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>I AM ERROR!</h3> \
        <h6>Error communicating with our online services. Make sure you are connected to the internet and try again.</h6> \
        <a onclick="EmailError()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Email Crash Report</span></span></a> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';

var sharePopup =
    '<div data-role="content" data-theme="a" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Share!</h3> \
        <h6>Post your achievements to social media or challenge a friend via text to beat your high score:</h6> \
        <ul id="postgamepopuplist" data-role="listview" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow"> \
            <li id="postgametotext" onclick="ShareOnText()" style="white-space: normal;text-overflow: clip;" class="ui-li ui-btn-up-c"> \
                <a id="textlink"> \
                    <span style="font-size:70%;white-space: normal;text-overflow: clip" ;>Challenge a friend</span> \
                </a> \
            </li> \
            <li id="postgametofacebook" onclick="ShareOnFaceBook()" style="white-space: normal;text-overflow: clip;" class="ui-li ui-btn-up-c"> \
                <a id="facebooklink"> \
                    <img src="img/facebook.png" class="ui-li-icon ui-corner-none ui-li-thumb"> \
                    <span style="font-size:70%;white-space: normal;text-overflow: clip" ;>Share on Facebook</span> \
                </a> \
            </li> \
            <li id="postgametotwitter" onclick="ShareOnTwitter()" style="white-space: normal;text-overflow: clip;" class="ui-li ui-btn-up-c"> \
                <a id="twitterlink"> \
                    <img src="img/twitter.png" class="ui-li-icon ui-corner-none ui-li-thumb"> \
                    <span style="font-size:70%;white-space: normal;text-overflow: clip" ;>Share on Twitter</span> \
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

var contactPopup =
    '<div data-role="content" data-theme="a" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Contact us!</h3> \
        <h6>We always want to hear from you so get in touch in any of the following ways:</h6> \
        <ul style="opacity: 1 !important" data-role="listview" data-inset="true" class="ui-listview ui-listview-inset ui-corner-all ui-shadow"> \
            <li onclick="GoToEmail(this)" style="white-space: normal;text-overflow: clip;" class="ui-li ui-btn-up-c"> \
                <a> \
                    <span style="font-size:80%">Email</span> \
                </a> \
            </li> \
            <li onclick="GoToTwitter(this)" style="white-space: normal;text-overflow: clip;" class="ui-li ui-btn-up-c"> \
                <a> \
                    <img src="img/twitter.png" class="ui-li-icon ui-corner-none ui-li-thumb"> \
                    <span style="font-size:70%">Twitter</span> \
                </a> \
            </li> \
        </ul> \
        <a onclick="ClosePopup()" data-role="button" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK!</span></span></a> \
    </div>';

var errorFacebookPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>I AM ERROR!</h3> \
        <h6>Cant share via Facebook, Installation of the facebook app is required.</h6> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';

var errorTwitterPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>I AM ERROR!</h3> \
        <h6>Cant share via Twitter, Installation of the twitter app is required.</h6> \
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
    