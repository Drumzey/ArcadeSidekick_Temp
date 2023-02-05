var allVenues = [];
var myVenues = [];
var firstTimeVenues = 'yes';

function SendVenueRequest() {
    var emailContents = '';

    emailContents += "Please include the following details with your submission:\n\n";
    emailContents += "Name:\n";
    emailContents += "Website link (optional):\n";
    emailContents += "Location/Address:\n";
    emailContents += "Should this venue be public or private/home arcade (i.e password protected and hidden from all users):\n";

    Email(emailContents, "Arcade Sidekick - Venue Request");
}

function JoinCurrentVenue()
{
    var venueName = document.getElementById('VenueTitle').innerHTML;
    ChangeVenueStatus(venueName);
    Show('#leaveVenue');
    Hide('#joinVenue');
}

function LeaveCurrentVenue()
{
    var venueName = document.getElementById('VenueTitle').innerHTML;

    var venue = [];

    for (var i = 0; i < allVenues.length; i++) {
        if (allVenues[i].Name === venueName) {
            venue = allVenues[i];
            break;
        }
    }

    ChangeVenueStatus(venueName);
    Hide('#leaveVenue');
    Show('#joinVenue');

    //When we leave a private venue, navigate back to the venues page
    if (venue.Private) {
        NavigateBack();
    }
}

function JoinPrivateVenue() {
    CreatePopup(joinPrivateVenuePopup);
}

function JoinVenueFromPopUp() {

    var venuename = document.getElementById("venuename").value;
    var password = document.getElementById("venuepassword").value;
    JoinVenue(venuename, password);
}

function ChangeVenueStatus(venueName) {

    var indexOfVenue = myVenues.indexOf(venueName);

    if (indexOfVenue === -1) {
        myVenues.push(venueName);
        SetItemInStorage("myVenues", myVenues);
    }
    else
    {
        myVenues.splice(indexOfVenue, 1);
        SetItemInStorage("myVenues", myVenues);
    }

    DrawVenues();
}

function SetDefaultVenueImage(venue) {
    venue.src = venueImageUrl + '/default.png';
}

function LoadVenue(venueName)
{
    DisplayVenueInformation(venueName);
    NavigateToInternalPage('#Venue');
}

function DisplayVenueInformation(venueName)
{
    var venue = [];

    for (var i = 0; i < allVenues.length; i++)
    {
        if (allVenues[i].Name === venueName)
        {
            venue = allVenues[i];
            break;
        }
    }

    document.getElementById('VenueTitle').innerText = venueName;
    document.getElementById('venueimage').src = venueImageUrl + '/' + venueName + '.png';

    if (myVenues.indexOf(venueName) !== -1) {
        Show('#leaveVenue');
        Hide('#joinVenue');
    }
    else
    {
        Hide('#leaveVenue');
        Show('#joinVenue');
    }

    LoadField('venueWebsite', venue.Website);
    LoadField('venueTwitter', venue.Twitter);
    LoadField('venueFacebook', venue.Facebook);
    LoadField('venueInstagram', venue.Instagram);

    RemoveAllChildren('venueDescriptionul');
    RemoveAllChildren('venueGamessul');

    var descriptionOutput = [];
    var gamesOutput = [];

    descriptionOutput.push('<li style="font-size:70%;white-space: normal;text-overflow: clip;" class="ui-li ui-li-static ui-btn-up-c ui-body-inherit">' + venue.Information + '</li>');
    descriptionOutput.push('<li style="font-size:70%;white-space: normal;text-overflow: clip;" class="ui-li ui-li-static ui-btn-up-c ui-body-inherit">' + venue.Address + '</li>');

    $('#venueDescriptionul').append(descriptionOutput.join('')).listview().listview('refresh');

    var gamesAvailable = venue.GamesAvailable.length;
    var gameCategories = {};
    for (var i = 0; i < venue.GamesAvailable.length; i++)
    {
        var gameName = FindGameInCatalog(venue.GamesAvailable[i]);

        if (gameName) {
            var game = gameCatalog[gameName];
            if (!gameCategories.hasOwnProperty(game.category)) {
                gameCategories[game.category] = [];
            }

            gameCategories[game.category].push(gameName);
        }
    }

    for (var prop in gameCategories)
    {
        if (gameCategories.hasOwnProperty(prop))
        {
            var index = categoryList.indexOf(prop);
            var propertyDisplayName = categoryDisplayNameList[index];
            gamesOutput.push('<li data-role="list-divider" style="font-size:70%;white-space: normal;text-overflow: clip;" class="ui-li ui-li-static ui-btn-up-c ui-li-divider ui-bar-inherit">' + propertyDisplayName + '</li>');
            var games = gameCategories[prop].sort();
            for (var i = 0; i < games.length; i++)
            {
                gamesOutput.push('<li style="font-size:70%;white-space: normal;text-overflow: clip;" class="ui-li ui-li-static ui-btn-up-c ui-body-inherit">' + games[i] + '</li>');
            }
        }
    }

    if (gamesOutput.length === 0) {
        gamesOutput.push('<li data-role="list-divider" style="font-size:70%;white-space: normal;text-overflow: clip;" class="ui-li ui-li-static ui-btn-up-c ui-li-divider ui-bar-inherit">Known games at location</li>');
        gamesOutput.push('<li style="font-size:70%;white-space: normal;text-overflow: clip;" class="ui-li ui-li-static ui-btn-up-c ui-body-inherit">No games currently recorded</li>');
    }
    else
    {
        gamesOutput.splice(0, 0, '<li data-role="list-divider" style="font-size:70%;white-space: normal;text-overflow: clip;" class="ui-li ui-li-static ui-btn-up-c ui-li-divider ui-bar-inherit">Known games at location</li>');
    }

    $('#venueGamessul').append(gamesOutput.join('')).listview().listview('refresh');
}

function LoadField(fieldname, value)
{
    if (value != null && value !== "" && value !== " ") {
        Show("#" + fieldname);
        document.getElementById(fieldname).innerText = value;
    }
    else {
        Hide("#" + fieldname);
    }
}