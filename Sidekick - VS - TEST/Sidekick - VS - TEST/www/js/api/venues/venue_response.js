function Successful_Sidekick_Online_GetAllLocationsOnStartUp()
{
    if (latestXHTTP.status === 200) {
        var response = JSON.parse(latestXHTTP.responseText);
        for (var i = 0; i < response.length; i++) {
            var location = response[i];
            allVenues.push(location);
        }
        DrawVenues();
    }
}

function Failed_JoinVenue()
{
    if (latestXHTTP.status !== 200) {
        SetNextPopUp(venueBadPasswordPopUp);
        ClosePopup();
    }
    else {
        UnsuccessfulOnlineCall();
    }
}

function DrawVenues()
{
    var venuesoutput = [];
    var myVenuesOutput = [];
    RemoveAllChildren('allVenuesul');
    RemoveAllChildren('myVenuesul');
    for (var i = 0; i < allVenues.length; i++) {
        var location = allVenues[i];

        if (location.Private === false) {
            venuesoutput.push(AddVenue(location));
        }

        if (myVenues.indexOf(location.Name) !== -1)
        {
            myVenuesOutput.push(AddVenue(location));
        }
    }
    $('#allVenuesul').append(venuesoutput.join('')).listview().listview('refresh');
    $('#myVenuesul').append(myVenuesOutput.join('')).listview().listview('refresh');
}

function AddVenue(location)
{
    var template =
        '<li style="padding: 0em !important">' +
        '<a style="padding-left: 5.5em;padding-right:3em;margin-right: 2em;" href="#" onclick="LoadVenue(\'VENUENAME\')">' +
        '<img style="background: white;" src="' + venueImageUrl + '/VENUENAME.png" onerror="SetDefaultVenueImage(this);" >' +
        '<h2 style="white-space: normal;margin:0;padding:0;font-size:80%">VENUENAME</h2>' +
        '<p style="white-space: normal;font-size:60%;margin:0">DESCRIPTION</p>' +
        '<p style="white-space: normal;font-size:60%;margin:0">Known Games Available:-GAMES-</p>' +
        '</a>' +
        '<a href="#" onclick="ChangeVenueStatus(\'VENUENAME\')" class="***CLASS***">Join Venue</a>' +
        '</li>';

    var name = location.Name;
    var description = location.Address + ". " + location.Website;
    var venue = template.replace(new RegExp('VENUENAME', 'g'), name);
    venue = venue.replace(new RegExp('DESCRIPTION', 'g'), description);
    venue = venue.replace(new RegExp('-GAMES-', 'g'), location.GamesAvailable.length);

    if (myVenues.indexOf(name) !== -1) {
        venue = venue.replace("***CLASS***", 'member');
    } else {
        venue = venue.replace("***CLASS***", '');
    }

    return venue;
}

function Successful_Sidekick_Online_GetAllLocations()
{
    if (latestXHTTP.status === 200) {
        var response = JSON.parse(latestXHTTP.responseText);

        $('#location').append($('<option>', {
            value: 'Home Arcade',
            text: 'Home Arcade'
        }));

        for (var i = 0; i < response.length; i++) {
            var location = response[i];
            $('#location').append($('<option>', {
                value: location,
                text: location
            }));
        }
    }
    else {
        multiCallHasFailed = true;
    }
}