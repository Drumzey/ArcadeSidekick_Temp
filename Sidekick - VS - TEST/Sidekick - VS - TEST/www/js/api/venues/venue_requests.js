var venueUrl = 'app/venues/';

function GetExistingLocations() {

    var url = newBaseUrl + venueUrl + 'all';

    Call_ArcadeSidekick_Online_Get(
        url,
        Successful_Sidekick_Online_GetAllLocations,
        UnsuccessfulOnlineMultiCall,
        function () { FinalErrorForOnlineMultiCall('#SubmitDetailedScore', DoPresentationChange); },
        'Getting details...');
}