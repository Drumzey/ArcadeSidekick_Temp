var levelOverrides = [];

levelOverrides["Track and field"] = ["100M DASH", "110M HURDLES"];

function IsLevelLeaderboardOverridden(gameName, levelName)
{
    if (levelOverrides[gameName]) {
        if (levelOverrides[gameName].indexOf(levelName) !== -1) {
            return true;
        }
    }

    return false;
}