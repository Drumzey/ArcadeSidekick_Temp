var enterEmail = '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
                     <h6>Please enter the email address you used when registering your account.</h6> \
                     <form style="font-size:70%;" action="javascript:DoNothing()" onsubmit="SubmitForgot_Username()"> \
                        <input required="required" type="text" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$" title="Enter a valid email address" name="forgetUsernameEmailEntry" id="forgetUsernameEmailEntry" /> \
                        <input style="font-size:70%" type="submit" value="OK"> \
                     </form> \
                     <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text" style="font-size:70%">Cancel</span></span></a> \
                  </div>';

var sendUserName = '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
                       <h3>Email sent</h3> \
                       <h6>Weve sent a user name reminder to the email address you registered with us when you created your account.</h6> \
                       <a onclick="ClosePopup()" data-role="button" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
                    </div>';

var enterUsername = '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
                        <h6>Please enter the username you used when registering your account.</h6> \
                        <form style="font-size:70%;" action="javascript:DoNothing()" onsubmit="SubmitForgot_Email()"> \
                            <input required="required" type="text" pattern="[A-Za-z0-9_]{3,15}" title="3-15 characters A-Z 0-9 _ only" name="forgetEmailUsernameEntry" id="forgetEmailUsernameEntry" style="text-transform:uppercase"/> \
                            <input style="font-size:70%" type="submit" value="OK"> \
                        </form> \
                        <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text" style="font-size:70%">Cancel</span></span></a> \
                    </div>';

var sendEmail = '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
                    <h3>Email reminder</h3> \
                    <h6>This is the email address you used to register your account</h6> \
                    <h6 id="emailreminder">***</h6> \
                    <a onclick="ClosePopup()" data-role="button" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
                 </div>';

var enterUsernameAndEmail =
    '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
                     <h6>Please enter the username and email address you used when registering your account.</h6> \
                     <form style="font-size:70%;" action="javascript:DoNothing()" onsubmit="SubmitForgot_Secret();"> \
                        <label style="font-size:70%" for="forgetEmailUsernameEntry">Username</label> \
                        <input required="required" type="text" pattern="[A-Za-z0-9_]{3,15}" title="3-15 characters A-Z 0-9 _ only" name="forgetEmailUsernameEntry" id="forgetEmailUsernameEntry" style="text-transform:uppercase"/> \
                        <label style="font-size:70%" for="forgetUsernameEmailEntry">Email</label> \
                        <input required="required" type="text" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$" title="Enter a valid email address" name="forgetUsernameEmailEntry" id="forgetUsernameEmailEntry" /> \
                        <input style="font-size:70%" type="submit" value="OK"> \
                     </form> \
                     <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text" style="font-size:70%">Cancel</span></span></a> \
                  </div>';

var sendSecret = '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
                    <h3>Email sent</h3> \
                    <h6>Weve sent your secret key to the email address you registered with us when you created your account.</h6> \
                    <a onclick="ClosePopup()" data-role="button" data-theme="a" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
                 </div>'

var forgoterror = '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
                      <h3>I AM ERROR!</h3> \
                      <h6>Unable to retrieve user information</h6> \
                      <h6 id="forgeterror">***</h6> \
                      <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">OK</span></span></a> \
                   </div>';