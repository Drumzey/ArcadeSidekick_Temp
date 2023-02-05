var defaultDataErrors = true;
var defaultSetting = 30;
var appVersion = "3.0.20";
var currentVersion = "";
var enemiesCollection = [];
var friendsCollection = [];

function Success() {
    defaultSetting--;

    if (defaultSetting === 0) {
        init();
    }
}

var lastlaunched = '';
var newGames = [];

function SetDefaultData() {

    if (test) {        
        var d = new Date();
        d.setDate(d.getDate() - 5);
        lastlaunched = d.toUTCString();
        localStorage.setItem("lastlaunched", lastlaunched);
        //Need to look through the date value of the catalog items to determine
        //which are new to you
        for (var game in gameCatalog) {
            if (gameCatalog[game].dateAdded) {
                if (Date.parse(lastlaunched) < Date.parse(gameCatalog[game].dateAdded)) {
                    //If the last launched value is less than the added value
                    //then these games will be new on the systme for this user.
                    newGames.push(gameCatalog[game].name);
                }
            }
        }     

        var today = new Date();
        today.setDate(today.getDate());
        localStorage.setItem("lastlaunched", today.toUTCString());
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('lastlaunched',
            function (value) {
                lastlaunched = value;
                if (lastlaunched !== null && lastlaunched !== '')
                {
                    //Need to look through the date value of the catalog items to determine
                    //which are new to you
                    for (var game in gameCatalog) {
                        if (gameCatalog[game].dateAdded) {
                            if (Date.parse(lastlaunched) < Date.parse(gameCatalog[game].dateAdded)) {                            
                                //If the last launched value is less than the added value
                                //then these games will be new on the systme for this user.
                                newGames.push(gameCatalog[game].name);
                            }
                        }
                    }                   
                }

                var today = new Date();
                today.setDate(today.getDate());
                lastlaunched = today.toUTCString();
                SetItemInStorageWithCallBack('lastlaunched', lastlaunched, Success);
            },
            function (err) {
                var today = new Date();
                today.setDate(today.getDate());
                SetItemInStorageWithCallBack('lastlaunched', today.toUTCString(), Success);
            }
        );
    }

    if (test) {
        localStorage.setItem("version", appVersion);
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('version',
            function (value) {
                currentVersion = value;
                if (currentVersion === null || currentVersion === '') {
                    currentVersion = appVersion;
                    SetItemInStorageWithCallBack('version', currentVersion, Success);
                }
                else {
                    Success();
                }
            },
            function (err) {
                SetItemInStorageWithCallBack('version', appVersion, Success);
            }
        );
    }

    if (test) {
        currentRecord = new Record();
        localStorage.setItem("my_record", JSON.stringify(new Record()));
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('my_record',
            function (value) {
                currentRecord = value;
                if (currentRecord === null || currentRecord === "[]" || currentRecord === '') {
                    currentRecord = new Record();
                }
                Success();
            },
            function (err) {
                currentRecord = new Record();
                currentRecord.verified = false;
                SetItemInStorageWithCallBack('my_record', new Record(), Success);
            }
        );
    }

    if (test)
    {
        detailedScoreCollection = [];
        SetItemInStorage("detailedScoreCollection", detailedScoreCollection);
        Success();
    }
    else
    {
        GetItemFromStorageWithSuccessAndFailureCallBack('detailedScoreCollection',
            function (value) {
                detailedScoreCollection = value;
                if (detailedScoreCollection === null || detailedScoreCollection === "[]"
                    || detailedScoreCollection === '') {
                    detailedScoreCollection = [];
                }
                Success();
            },
            function (err) {
                detailedScoreCollection = [];
                SetItemInStorageWithCallBack('detailedScoreCollection', detailedScoreCollection, Success);
            }
        );
    }

    if (test) {
        firstTimeClubs = "yes";
        localStorage.setItem("firstTimeClubs", "yes");
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('firstTimeClubs',
            function (value) {
                firstTimeClubs = value;
                if (firstTimeClubs === null || firstTimeClubs === '') {
                    firstTimeClubs = "yes";
                }
                Success();
            },
            function (err) {
                firstTimeClubs = "yes";
                SetItemInStorageWithCallBack('firstTimeClubs', 'yes', Success);
            }
        );
    }
    if (test) {
        firstTimeProfile = "yes";
        localStorage.setItem("firstTimeProfile", "yes");
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('firstTimeProfile',
            function (value) {
                firstTimeProfile = value;
                if (firstTimeProfile === null || firstTimeProfile === '') {
                    firstTimeProfile = "yes";
                }
                Success();
            },
            function (err) {
                firstTimeProfile = "yes";
                SetItemInStorageWithCallBack('firstTimeProfile', 'yes', Success);
            }
        );
    }

    if (test) {
        firstTimeAchievements = "yes";
        localStorage.setItem("firstTimeAchievements", "yes");
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('firstTimeAchievements',
            function (value) {
                firstTimeAchievements = value;
                if (firstTimeAchievements === null || firstTimeAchievements === '') {
                    firstTimeAchievements = "yes";
                }
                Success();
            },
            function (err) {
                firstTimeAchievements = "yes";
                SetItemInStorageWithCallBack('firstTimeAchievements', 'yes', Success);
            }
        );
    }

    if (test) {
        localStorage.setItem("sharescreenshot", "yes");
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('sharescreenshot',
            function (value) {
                sharescreenshot = value;
                if (sharescreenshot === null || sharescreenshot === '') {
                    sharescreenshot = "yes";
                }
                Success();
            },
            function (err) {
                sharescreenshot = "yes";
                SetItemInStorageWithCallBack('sharescreenshot', 'yes', Success);
            }
        );
    }

    if (test) {
        localStorage.setItem("firstTime", "yes");
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('firstTime',
            function (value) {
                firstTime = value;
                if (firstTime === null || firstTime === '') {
                    firstTime = "yes";
                }
                Success();
            },
            function (err) {
                firstTime = "yes";
                SetItemInStorageWithCallBack('firstTime', 'yes', Success);
            }
        );
    }

    if (test) {
        localStorage.setItem("firstTimeNotification", "yes");
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('firstTimeNotification',
            function (value) {
                firstTimeNotification = value;
                if (firstTimeNotification === null || firstTimeNotification === '') {
                    firstTimeNotification = "yes";
                }
                Success();
            },
            function (err) {
                firstTimeNotification = "yes";
                SetItemInStorageWithCallBack('firstTimeNotification', 'yes', Success);
            }
        );
    }

    if (test) {
        localStorage.setItem("firstTimeCustom", "yes");
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('firstTimeCustom',
            function (value) {
                firstTimeCustom = value;
                if (firstTimeCustom === null || firstTimeCustom === '') {
                    firstTimeCustom = '';
                }
                Success();
            },
            function (err) {
                firstTimeCustom = 'yes';
                SetItemInStorageWithCallBack('firstTimeCustom', 'yes', Success);
            }
        );
    }

    if (test) {
        customGames = [];
        localStorage.setItem("customGames", JSON.stringify([]));
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('customGames',
            function (value) {
                customGames = value;
                if (customGames === null || customGames === '' || customGames === []) {
                    customGames = [];
                }
                Success();
            },
            function (err) {
                customGames = [];
                SetItemInStorageWithCallBack('customGames', [], Success);
            }
        );
    }

    if (test) {
        localStorage.setItem("secret", "");
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('secret',
            function (value) {
                secret = value;
                if (secret === null || secret === '') {
                    secret = '';
                }
                Success();
            },
            function (err) {
                secret = '';
                SetItemInStorageWithCallBack('secret', '', Success);
            }
        );
    }

    if (test) {
        localStorage.setItem("userName", "");
        Success();
    }
    else {
        document.getElementById('myusernamesetup').innerText = 'Username';
        GetItemFromStorageWithSuccessAndFailureCallBack('userName',
            function (value) {
                clientUserName = value;
                if (clientUserName === null) {
                    clientUserName = '';
                }
                if (clientUserName !== '' && clientUserName !== null) {
                    document.getElementById('myusernamesetup').innerText = 'Username ' + clientUserName;
                }
                Success();
            },
            function (err) {
                clientUserName = '';
                SetItemInStorageWithCallBack('userName', '', Success);
            }
        );
    }

    if (test) {
        localStorage.setItem("emailAddress", "");
        Success();
    }
    else {
        document.getElementById('myemailsetup').innerText = 'Email';
        GetItemFromStorageWithSuccessAndFailureCallBack('emailAddress',
            function (value) {
                emailAddress = value;
                if (emailAddress === null) {
                    emailAddress = '';
                }
                if (emailAddress !== '' && emailAddress !== null) {
                    document.getElementById('myemailsetup').innerText = 'Email ' + emailAddress;
                }
                Success();
            },
            function (err) {
                emailAddress = '';
                SetItemInStorageWithCallBack('emailAddress', '', Success);
            }
        );
    }

    if (test) {
        localStorage.setItem("twitterHandle", "");
        Success();
    }
    else {
        document.getElementById('mytwitterhandlesetup').innerText = 'Email';
        GetItemFromStorageWithSuccessAndFailureCallBack('twitterHandle',
            function (value) {
                twitterHandle = value;
                if (twitterHandle === null) {
                    twitterHandle = '';
                }
                if (twitterHandle !== '' && twitterHandle !== null) {
                    document.getElementById('mytwitterhandlesetup').innerText = 'Twitter ' + twitterHandle;
                }
                Success();
            },
            function (err) {
                twitterHandle = '';
                SetItemInStorageWithCallBack('twitterHandle', '', Success);
            }
        );
    }

    if (test) {
        localStorage.setItem("dob", "");
        Success();
    }
    else {
        document.getElementById('mydobsetup').innerText = 'Year Of Birth';
        GetItemFromStorageWithSuccessAndFailureCallBack('dob',
            function (value) {
                playerdob = value;
                if (playerdob === null) {
                    playerdob = '';
                }
                if (playerdob !== '' && playerdob !== null) {
                    document.getElementById('mydobsetup').innerText = playerdob;
                }
                Success();
            },
            function (err) {
                playerdob = '';
                SetItemInStorageWithCallBack('dob', '', Success);
            }
        );
    }

    if (test) {
        localStorage.setItem("location", "");
        Success();
    }
    else {
        document.getElementById('mylocationsetup').innerText = 'Location';
        GetItemFromStorageWithSuccessAndFailureCallBack('location',
            function (value) {
                playerlocation = value;
                if (playerlocation === null) {
                    playerlocation = '';
                }
                if (playerlocation !== '' && playerlocation !== null) {
                    document.getElementById('mylocationsetup').innerText = playerlocation;
                }
                Success();
            },
            function (err) {
                playerlocation = '';
                SetItemInStorageWithCallBack('location', '', Success);
            }
        );
    }

    if (test) {
        localStorage.setItem("youtubechannel", "");
        Success();
    }
    else {
        document.getElementById('myyoutubesetup').innerText = 'YouTube Channel';
        GetItemFromStorageWithSuccessAndFailureCallBack('youtubechannel',
            function (value) {
                playeryoutubechannel = value;
                if (playeryoutubechannel === null) {
                    playeryoutubechannel = '';
                }
                if (playeryoutubechannel !== '' && playeryoutubechannel !== null) {
                    document.getElementById('myyoutubesetup').innerText = playeryoutubechannel;
                }
                Success();
            },
            function (err) {
                playeryoutubechannel = '';
                SetItemInStorageWithCallBack('youtubechannel', '', Success);
            }
        );
    }

    if (test) {
        localStorage.setItem("notify", "on");
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('notify', 
            function (value) {
                notify = value;
                if (notify === null || notify === '') {
                    notify = 'on';
                }
                Success();
            },
            function (err) {
                notify = 'on';
                SetItemInStorageWithCallBack('notify', 'on', Success);
            }
        );
    }

    if (test) {
        localStorage.setItem("theme", "a");
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('theme', 
            function (value) {
                theme = value;
                if (theme === null || theme === '') {
                    theme = 'default';
                }
                Success();
            },
            function (err) {
                theme = 'default';
                SetItemInStorageWithCallBack('theme', 'default', Success);
            }
        );
    }

    if (test) {
        friendsCollection = [];
        localStorage.setItem("friends", JSON.stringify([]));
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('friends',
            function (value) {
                friendsCollection = value;
                if (friendsCollection === null || friendsCollection === '') {
                    friendsCollection = [];
                }
                Success();
            },
            function (err) {
                friendsCollection = [];
                SetItemInStorageWithCallBack('friends', [], Success);
            }
        );
    }

    if (test) {
        localStorage.getItem("friendData", JSON.stringify([]));
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('friendData',
            function (value) {
                friendData = value;
                if (friendData === null || friendData === '') {
                    friendData = {};
                }
                Success();
            },
            function (err) {
                friendData = {};
                SetItemInStorageWithCallBack('friendData', {}, Success);
            }
        );
    }

    if (test) {
        enemiesCollection = [];
        localStorage.setItem("enemies", JSON.stringify([]));
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('enemies',
            function (value) {
                enemiesCollection = value;
                if (enemiesCollection === null || enemiesCollection === '') {
                    enemiesCollection = [];
                }
                Success();
            },
            function (err) {
                enemiesCollection = [];
                SetItemInStorageWithCallBack('enemies', [], Success);
            }
        );
    }

    if (test) {
        localStorage.setItem("firstTimeVenues", "yes");
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('firstTimeVenues',
            function (value) {
                firstTimeVenues = value;
                if (firstTimeVenues === null || firstTimeVenues === '') {
                    firstTimeVenues = 'yes';
                }
                Success();
            },
            function (err) {
                firstTimeVenues = 'yes';
                SetItemInStorageWithCallBack('firstTimeVenues', 'yes', Success);
            }
        );
    }

    if (test) {
        myVenues = [];
        localStorage.setItem("myVenues", JSON.stringify([]));
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('myVenues',
            function (value) {
                myVenues = value;
                if (myVenues === null || myVenues === '') {
                    myVenues = [];
                }
                Success();
            },
            function (err) {
                myVenues = [];
                SetItemInStorageWithCallBack('myVenues', [], Success);
            }
        );
    }

    if (test) {
        localStorage.setItem("firstTimeQuiz", "yes");
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('firstTimeQuiz',
            function (value) {
                firstTimeQuiz = value;
                if (firstTimeQuiz === null || firstTimeQuiz === '') {
                    firstTimeQuiz = 'yes';
                }
                Success();
            },
            function (err) {
                firstTimeQuiz = 'yes';
                SetItemInStorageWithCallBack('firstTimeQuiz', 'yes', Success);
            }
        );
    }

    if (test) {
        localStorage.setItem("currentQuizBest", 0);
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('currentQuizBest',
            function (value) {
                currentQuizBest = value;
                if (currentQuizBest === null || currentQuizBest === '' || currentQuizBest === 0) {
                    currentQuizBest = 0;
                }
                Success();
            },
            function (err) {
                currentQuizBest = 0;
                SetItemInStorageWithCallBack('currentQuizBest', 0, Success);
            }
        );
    }    

    if (test) {
        localStorage.setItem("firstTimeFriends", "yes");
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('firstTimeFriends', 
            function (value) {
                firstTimeFriends = value;
                if (firstTimeFriends === null || firstTimeFriends === '') {
                    firstTimeFriends = 'yes';
                }
                Success();
            },
            function (err) {
                firstTimeFriends = 'yes';
                SetItemInStorageWithCallBack('firstTimeFriends', 'yes', Success);
            }
        );
    }

    SetHintsTipsStartUpValue();

    if (test) {
        myclubs = [];
        localStorage.setItem("myclubs", JSON.stringify([]));
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('myclubs',
            function (value) {
                myclubs = value;
                if (myclubs === null || myclubs === '') {
                    myclubs = [];
                }
                Success();
            },
            function (err) {
                myclubs = [];
                SetItemInStorageWithCallBack('myclubs', [], Success);
            }
        );
    }
}