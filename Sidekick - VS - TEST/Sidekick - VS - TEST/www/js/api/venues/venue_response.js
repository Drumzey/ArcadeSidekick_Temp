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