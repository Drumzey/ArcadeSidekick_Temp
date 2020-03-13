var currentGameName = '';
var parentGame = ''
var currentGameTrueName = '';
var currentCategoryName = '';
var currentCategoryId = '';

var currentTab = 'PlayedTab';
var lastAllGamesTab = '';
var lastCategoryGamesTab = '';

var currentScoreTab = 'AllPlayers';
var currentMyScoreTab = 'AllScoresTab';
var currentRecord;
var storePosition = {
    topCoordinate: null
};

var controlCache = [];
var gameCache = [];
var gamenotifications = new Array();

var clientUserName = '';
var emailAddress = '';
var secret = '';
var twitterHandle = '';

var currentGameNode = null;

var currentGameType = '';
var timeOrder = '';

function LoadOnlineGameInformation() {
    GetCommunityRating();
}