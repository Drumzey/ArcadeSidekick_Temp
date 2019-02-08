//REMOVED FOR VERSION 1

//var receivedNews = false;

//function GetNews() {

//    if (!receivedNews) {
//        var url = 'http://arcadeclub.azurewebsites.net/news/get';
//        CallACOnlineWithWait(url, "POST",
//            function () {
//                SuccessfulGetNews();
//            },
//            function () {
//                UnsuccessfulOnlineCall();
//            },
//            function () {
//                StandardCompleteACOnline();
//            },
//            "Getting latest news....");
//    }
//    else {
//        NavigateToInternalPage("#News");
//    }
//}

//function SuccessfulGetNews() {
    
//    if (latestXHTTP.status === 200) {
//        receivedNews = true;

//        var response = JSON.parse(latestXHTTP.responseText);
//        var output = [];

//        RemoveAllChildren("newsfeed");
                
//        if (response.length === 0) {
//            output.push('<li data-role="list-divider" id="info" style="white-space: normal;text-overflow: clip;" class="ui-li ui-li-static ui-btn-up-c">No news</li>');
//            output.push('<li style="white-space: normal;text-overflow: clip;font-size: 70%" class="ui-li ui-li-static ui-btn-up-c">We have nothing to say right now but check back later for events, new cabs and arcade news.</li>');
//        }

//        for (var i = 0; i < response.length; i++) {
//            var newsItem = response[i];
//            var title = newsItem.title;
//            var body = newsItem.body;            
//            //Populate the news feed
//            output.push('<li data-role="list-divider" id="info" style="white-space: normal;text-overflow: clip;" class="ui-li ui-li-static ui-btn-up-c">' + title + '</li>');
//            output.push('<li style="white-space: normal;text-overflow: clip;font-size: 70%" class="ui-li ui-li-static ui-btn-up-c">' + body + '</li>');
//        }

//        $('#newsfeed').append(output.join('')).listview().listview('refresh');
//        $('#newsfeed').listview().listview('refresh');
//        $('#newsfeed').listview('refresh');
//        NavigateToInternalPage("#News");        
//    }
//    else {
//        UnsuccessfulOnlineCall();
//    }    
//}