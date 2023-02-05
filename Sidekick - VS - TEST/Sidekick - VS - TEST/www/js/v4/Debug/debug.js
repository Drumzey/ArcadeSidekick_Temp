var debugOn = 0;

function DebugAlert(message) {
    if (debugOn === 1) {
        alert(message);
    }
}

function EmailDebugReport()
{
    Email(cumulativeErrorText, "Sidekick - Storage Error Report");
}