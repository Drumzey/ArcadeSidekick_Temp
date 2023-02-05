var venueUrl = 'app/venues/';

function JoinVenue(venuename, password)
{
    var url = newBaseUrl + venueUrl + 'join';

    var body = {
        'VenueName': venuename,
        'Password': password
    };

    Call_ArcadeSidekick_Online_Post(
        url,
        body,
        function () {
            //Only add it if it isnt there already.
            if (myVenues.indexOf(venuename) === -1) {
                myVenues.push(venuename);
            }
            SetNextPopUp(venueSuccessPopUp);
            ClosePopup();
            DrawVenues();
        },
        Failed_JoinVenue,
        StandardCompleteACOnline,
        'Validating ...');
}