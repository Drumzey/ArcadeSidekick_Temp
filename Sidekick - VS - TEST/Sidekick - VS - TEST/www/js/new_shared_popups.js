var newGamesPopup = 
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>New Games added!</h3> \
        <h6>New games have been added to the catalog since you last launched.</h6> \
        <h6>They will be marked in the games list with a star.</h6> \
        <a onclick="NextStartupPopup();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
     </div>';

var whatsNewPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Level 3! (V3)</h3> \
        <h6>It took a long time to level up didnt it? But its been worth the wait.</h6> \
        <h6>Detailed score submissions. You can now say where and when you made your score along with storing the game settings. This means you can also see leaderboards of those individual game settings!</h6> \
        <h6>Venues, select where you play your games for the detailed highscores and learn more about other arcade venues.</h6> \
        <h6>The Vectrex! After a number of requests to add these \'mini arcade machines\' into the app its done! Get requesting more games to add to the vectrex catalog!</h6> \
        <h6>The Arcade Quiz! Test your knowledge on our catalogue of games and share your scores on social.</h6> \
        <h6>Speed improvements. We\'ve spend a lot of time working on the speed of our online services. Hopefully you\ll notice the difference.</h6> \
        <h6>More user info! Please go to settings and fill in more info about yourself. It will help us learn more about you and our users.</h6> \
        <a onclick="PostWhatsNew();NextStartupPopup();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
     </div>';

var verifyLaunchPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3 style="text-align: center">Enter your secret key</h3> \
        <h6>You\'ve created a user but not yet verified your account. We\'ve sent you a key to the email address provided. Please enter it here, you\'ll need it before you can save any online data.</h6> \
        <label style="font-size:70%" for="secretkey">Secret Key</label> \
        <input type="text" name="secretkeyinput" id="secretkeyinput" /> \
        <a onclick="VerifyUser();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span style="font-size:70%" class="ui-btn-text">Verify</span></span></a> \
        <a onclick="NextStartupPopup();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span style="font-size:70%" class="ui-btn-text">I\'ll do it later</span></span></a> \
    </div>';

var scoresToUploadPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
      <h3 style="text-align: center">Upload Scores!</h3> \
      <h6>You have scores entered that you have not yet uploaded to our global leaderboards. You can do it now or through myscores later.</h6> \
      <a onclick="UploadScores();" style="font-size:70%" data-role="button" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Upload now</span></span></a> \
      <a onclick="NextStartupPopup();" style="font-size:70%" data-role="button" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Cancel</span></span></a> \
     </div>';

var recentFriendsActivityPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
      <h3 style="text-align: center">Friend Update</h3> \
      <h6>Your friends have posted new scores since you last logged in! Check their updates in recent activity.</h6> \
      <a onclick="NextStartupPopup();GetRecentActivity(1);" style="font-size:70%" data-role="button" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Recent Activity</span></span></a> \
      <a onclick="NextStartupPopup();" style="font-size:70%" data-role="button" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
     </div>';

var screenshotPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
      <h3 style="text-align: center">I Am Error!</h3> \
      <h6>Unable to take screenshot for sharing. Automatic screenshots will be turned off.</h6> \
      <a onclick="ClosePopup();" style="font-size:70%" data-role="button" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
     </div>';

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
        <label style="font-size:70%" for="myusername_newuser">Username</label> \
        <input type="text" pattern="[A-Za-z0-9_]{3,30}" title="3-30 characters A-Z 0-9 _ only" name="myusername_newuser" id="myusername_newuser" style="text-transform:uppercase" /> \
        <label style="font-size:70%" for="myemail_newuser">Email</label> \
        <input type="text" name="myemail_newuser" id="myemail_newuser" /> \
        <label style="font-size:70%" for="myconfirmemail_newuser">Confirm Email</label> \
        <input type="text" name="myconfirmemail_newuser" id="myconfirmemail_newuser" /> \
        <label style="font-size:70%" for="mytwitter_newuser">Twitter Handle (Optional)</label> \
        <input type="text" name="mytwitter_newuser" pattern="[A-Za-z0-9_]{1,15}" title="1-15 characters A-Z 0-9 _ only" id="mytwitter_newuser" /> \
        <a onclick="SetupUserName();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span style="font-size:70%" class="ui-btn-text">Create User</span></span></a> \
        <a onclick="ClosePopup();"    data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span style="font-size:70%" class="ui-btn-text">Cancel</span></span></a> \
    </div>';

var secretKeyPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3 style="text-align: center">Enter your secret key</h3> \
        <h6>We\'ve sent you a key to the email address provided, please check your spam folder if you cannot see anything. Please enter the code here, you\'ll need it before you can save any online data. If you are having trouble then please contact us.</h6> \
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
         <label style="font-size:70%" for="myusername_existinguser">Username</label> \
         <input type="text" pattern="[A-Za-z0-9_]{3,30}" title="3-30 characters A-Z 0-9 _ only" name="myusername_existinguser" id="myusername_existinguser" style="text-transform:uppercase" /> \
         <label style="font-size:70%" for="myemail_existinguser">Email</label> \
         <input type="text" name="myemail_existinguser" id="myemail_existinguser" /> \
         <label style="font-size:70%" for="myfavouritegame_existinguser">Secret Code</label> \
         <input type="text" name="myfavouritegame_existinguser" id="myfavouritegame_existinguser" /> \
         <a onclick="SetExistingUser();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span style="font-size:70%" class="ui-btn-text">Find user</span></span></a> \
         <a onclick="ClosePopup();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span style="font-size:70%" class="ui-btn-text">Cancel</span></span></a> \
     </div>';

var signInUserErrorPopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
         <h3 style="text-align: center">Error</h3> \
         <h6>***</h6> \
         <a onclick="RetryUser()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span style="font-size:70%" class="ui-btn-text">Retry</span></span></a> \
         <a onclick="ClosePopup();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span style="font-size:70%" class="ui-btn-text">Cancel</span></span></a> \
     </div>';

var successOnlinePopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Welcome back!</h3> \
        <h6>What are you waiting for? Go beat your friends records!</h6> \
        <a onclick="PostRestoreUser()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
     </div>';

//Used when creating a new user
var successVerify =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Success!</h3> \
        <h6>You are now ready to log games played, scores and challenge friends.</h6> \
        <a onclick="PostSignup();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
     </div>';

var shareSignup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Share!</h3> \
        <h6>Spread the word about Arcade Sidekick by sharing your username.</h6> \
        <a onclick="ShareSignup();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span style="font-size:70%;white-space: normal;text-overflow: clip">Share ...</span></a> \
        <a onclick="ClosePopup();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span style="font-size:70%;white-space: normal;text-overflow: clip">OK</span></a> \
     </div>';

var noFriends =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>You have no friends!</h3> \
        <h6>In app, not in real life.... Add them via friends in the main menu.</h6> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';

var errorStartupOnlinePopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>I AM ERROR!</h3> \
        <h6>Error communicating with our online services. Weve not been able to load the app data on startup. \
        Make sure you are connected to the internet and please launch the app again.</h6 > \
        <a onclick="EmailError()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Email Crash Report</span></span></a> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
    </div>';

var errorOnlinePopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>I AM ERROR!</h3> \
        <h6>Error communicating with our online services. Make sure you are connected to the internet and try again.</h6> \
        <a onclick="EmailError()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Email Crash Report</span></span></a> \
        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
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

var newCustomGamePopup =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
        <h3>Add Game</h3> \
        <h6>Enter the name of your custom game. It will appear in the custom games section.</h6> \
        <label for="newCustomGameName2">Name:</label> \
        <input type="text" name="newCustomGameName2" id="newCustomGameName2" value="" required onkeyup="ValidateCustomGameInput2()" /> \
        <a onclick="SaveCustomGameFromGameScreen();ClosePopup();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Add</span></span></a> \
        <a onclick="ClosePopup();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Cancel</span></span></a> \
    </div>';
