var currentGameName = '';
var currentGameTrueName = '';
var currentCategoryName = '';
var currentCategoryId = '';
var currentTab = 'PlayedTab';
var currentScoreTab = 'AllPlayers';
var currentMyScoreTab = 'AllScoresTab';
var currentRecord;
var storePosition = {
    topCoordinate: null
}

var controlCache = [];
var gameCache = [];
var gamenotifications = new Array();

var clientUserName = '';
var emailAddress = '';

var currentGameNode = null;

var currentGameType = '';
var timeOrder = '';

function LoadOnlineGameInformation() {     
    GetCommunityRating();    
}