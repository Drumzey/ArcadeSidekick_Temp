function Successful_SideKickOnline_PostUpdate(handle)
{
    SetNextPopUp(successfulUpdateUserInfoPopup);
    document.getElementById('mytwitterhandlesetup').innerText = 'Twitter ' + handle;
    ClosePopup();
}