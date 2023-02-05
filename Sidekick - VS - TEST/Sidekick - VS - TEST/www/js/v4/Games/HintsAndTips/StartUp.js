function SetHintsTipsStartUpValue()
{
    if (test) {
        localStorage.setItem("firstTimeHintsAndTips", "yes");
        Success();
    }
    else {
        GetItemFromStorageWithSuccessAndFailureCallBack('firstTimeHintsAndTips',
            function (value) {
                firstTimeHintsAndTips = value;
                if (firstTimeHintsAndTips === null || firstTimeHintsAndTips === '') {
                    firstTimeHintsAndTips = 'yes';
                }
                Success();
            },
            function (err) {
                firstTimeHintsAndTips = 'yes';
                SetItemInStorageWithCallBack('firstTimeHintsAndTips', 'yes', Success);
            }
        );
    }
}