var debugOn = 0;

function DebugAlert(message) {
    if (debugOn === 1) {
        alert(message);
    }
}

function EmailError() {
    Email(lastError, "Sidekick - ERROR Report");
}