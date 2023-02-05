// PAGE DECLARATION
var venuePage = new AppPage();
venuePage.id = 'venues';
venuePage.pageName = 'Venues';
venuePage.beforeNavigate = function () {
    DrawVenues();
};
venuePage.afterNavigate = function () {
    ShowFirstTimeVenuesPopUp();
};

AppPages[venuePage.id] = venuePage;

// VARIABLES
var allVenues = [];
var myVenues = [];
var firstTimeVenues = 'yes';

// FUNCTIONS
function ShowFirstTimeVenuesPopUp() {
    if (firstTimeVenues === 'yes') {
        firstTimeVenues = 'no';
        SetItemInStorage('firstTimeVenues', 'no');
        CreatePopup(venuesFirstTime);
    }
}

function DrawVenues() {

    if (myVenues.length === 0) {
        SetCurrentTab("ALLVENUES");
    }
    else {
        SetCurrentTab("MYVENUES");
    }

    var venuesoutput = [];
    var myVenuesOutput = [];
    RemoveAllChildren('allVenuesul');
    RemoveAllChildren('myVenuesul');

    var currentCountry = '';

    for (var i = 0; i < allVenues.length; i++) {
        var location = allVenues[i];

        if (location.Private === false) {

            if (location.Country !== currentCountry) {
                // We are in a new country
                // Create the appropriate header
                venuesoutput.push(AddVenueHeader(location.Country));
                currentCountry = location.Country;
            }

            venuesoutput.push(AddVenue(location));
        }

        if (myVenues.indexOf(location.Name) !== -1) {
            myVenuesOutput.push(AddVenue(location));
        }
    }
    $('#allVenuesul').append(venuesoutput.join('')).listview().listview('refresh');
    $('#myVenuesul').append(myVenuesOutput.join('')).listview().listview('refresh');
}

function AddVenueHeader(country) {

    var countries = [];
    countries.push("UK");
    countries.push("IRE");
    countries.push("USA");
    countries.push("AUS");
    countries.push("CAN");
    countries.push("FRA");

    if (countries.indexOf(country) !== -1) {
        var text = '';

        if (country === 'UK')
            text = "England";
        else if (country === 'IRE')
            text = "Ireland";
        else if (country === 'USA')
            text = "United States Of America";
        else if (country === 'AUS')
            text = "Australia";
        else if (country === 'CAN')
            text = "Canada";
        else if (country === 'FRA')
            text = "France";
        else if (country === 'BEL')
            text = "Belgium";
        else
            text = "Other";

        return '<li data-role="list-divider">' + text + '</li>';
    }
    else {
        return '<li data-role="list-divider">Other</li>';
    }
}

function AddVenue(location) {
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

function Failed_JoinVenue() {
    if (latestXHTTP.status !== 200) {
        SetNextPopUp(venueBadPasswordPopUp);
        ClosePopup();
    }
    else {
        UnsuccessfulOnlineCall();
    }
}