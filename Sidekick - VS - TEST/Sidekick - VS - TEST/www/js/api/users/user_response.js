function Successful_SideKickOnline_PostUpdate(handle,dob,location,youtube)
{
    SetNextPopUp(successfulUpdateUserInfoPopup);
    document.getElementById('mytwitterhandlesetup').innerText = 'Twitter ' + handle;
    document.getElementById('mydobsetup').innerText = 'Year of birth ' + dob;
    document.getElementById('mylocationsetup').innerText = 'Country/Location ' + location;
    document.getElementById('myyoutubesetup').innerText = 'YouTube Channel ' + youtube;
    ClosePopup();
}