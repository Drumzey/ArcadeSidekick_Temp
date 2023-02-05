var profilePage = new AppPage();
profilePage.id = 'profile';
profilePage.pageName = 'Profile';
profilePage.afterNavigate = function () { ShowFirstTimeProfilePopUp(); };

AppPages[profilePage.id] = profilePage;