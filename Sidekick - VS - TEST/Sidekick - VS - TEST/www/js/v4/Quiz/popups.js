var quizFirstTime = '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
                     <h3>Welcome to the Arcade Master Quiz!</h3> \
                     <h6>Test your knowledge of our catalog with these randomly generated questions. Inspired by the Ten Pence Arcade Podcast Arcade MAster Quiz!</h6> \
                     <a onclick="ClosePopup()" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all ui-btn-text">OK</span></a> \
                  </div>';

var quizCorrect = '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
                     <h1>Correct!</h1> \
                     <a onclick="ClosePopup();NextQuestion();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all ui-btn-text">Next</span></a> \
                     <a onclick="ClosePopup();NavigateBack();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all ui-btn-text">Exit</span></a> \
                  </div>';

var quizWrong = '<div data-role="content" class="ui-corner-bottom ui-content" role="main"> \
                     <h1>Error!</h1> \
                     <h6>***</h6> \
                     <a onclick="ResetQuiz();ClosePopup();NextQuestion();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all ui-btn-text">Try Again</span></a> \
                     <a onclick="ShareQuizResults();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all ui-btn-text">Share Result</span></a> \
                     <a onclick="ClosePopup();NavigateBack();" data-role="button" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-c"><span class="ui-btn-inner ui-btn-corner-all ui-btn-text">Exit</span></a> \
                  </div>';