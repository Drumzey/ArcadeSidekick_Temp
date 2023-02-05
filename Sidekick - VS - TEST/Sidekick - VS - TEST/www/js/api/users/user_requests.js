var userUrl = 'app/users/';

// Method to post an update to user information
function PostUpdateOnline() {

    var url = newBaseUrl + userUrl + 'update';

    var handle = document.getElementById('mytwitter_setup').value;
    var dob = document.getElementById('mydob_setup').value;
    var location = document.getElementById('mylocation_setup').value;
    var youtube = document.getElementById('myyoutube_setup').value;

    var body = {
        'Username': clientUserName,
        'TwitterHandle': handle,
        'DOB': dob,
        'Location': location,
        'YouTubeChannel': youtube,
    };

    Call_ArcadeSidekick_Online_Post(
        url,
        body,
        function () { Successful_SideKickOnline_PostUpdate(handle,dob,location,youtube); },
        UnsuccessfulOnlineCall,
        StandardCompleteACOnline,
        'Updating info...');
}

function SetItemsInStorage(username, friendsCollection, twitterHandle, dob, location, youtube) {
    //Add me back into friends list
    friendsCollection.push(username);
    SetItemInStorage("friends", friendsCollection);
    SetItemInStorage("twitterHandle", twitterHandle);
    SetItemInStorage("dob", dob);
    SetItemInStorage("location", location);
    SetItemInStorage("youtubechannel", youtube);
    Hide('#verifyuserbutton'); //Show verified button in setup
}