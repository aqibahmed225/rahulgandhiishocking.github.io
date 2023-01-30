define(['common'], function (common) {
    var env = {};
    let token = common.getCookie("token");
    let clientId = common.getCookie("_ht_clientid") || "";
    /* var photoID = "101600237693758";
    var videoID = "101600667378174"; */
    var photoID = "mostpopularPhotos";
    var videoID = "mostpopularVideos";

    var strIsHomePage="no";
    if(document.URL===webbaseUrl + '/' || document.URL==="http://localhost:8083/")
        {
            photoID="101633085539873";
            videoID="101633599912715";
            strIsHomePage="yes";
        }
   
    if (document.URL.includes(webbaseUrl + '/india-news')) {
        photoID = "101636536969093";
        videoID = "101636615249893";
    } else if (document.URL.includes(webbaseUrl + '/world-news')) {
        videoID = "101636617954800";
    } else if (document.URL.includes(webbaseUrl + '/lifestyle')) {
        photoID = "101636551283672";
        videoID = "101636950155949";
    } else if (document.URL.includes(webbaseUrl + '/entertainment')) {
        photoID = "101636551347862";
        videoID = "101636950273605";
    } else if (document.URL.includes(webbaseUrl + '/sports') || document.URL.includes(webbaseUrl + '/cricket')) {
        photoID = "101636551412886";
        videoID = "101636950375264";
    } else if (document.URL.includes(webbaseUrl + '/astrology')) {
        videoID = "101636950479743";
    }

    env.zoneId = {
        topnews: "101626686890568",
        dontmiss: "101602662870563",
        trendingtopic: "101597921120718",
        latestnews: "101627459306119",
        photos: photoID,
        trendingnews: "101620728554845",
        videos: videoID,
        shopnow: "101661758267979",
        isHomePage: strIsHomePage
    }

    if (document.URL.includes("https://www.hindustantimes.com") ||
        document.URL.includes("https://preprod-www.hindustantimes.com") ||
        apiBaseUrl.includes('preprod-api') || apiBaseUrl.includes('stg-api')) {
        env.abStr = "7cTgL3GXSgKlg4l7pxePTg";
        env.abSectionFromMore = "85V3NcVzS-225YQdKSNTSQ";
        //env.subscriptionUrl = apiBaseUrl + "subscription/check-subscription?id=" + clientId;
        env.subscriptionUrl = apiBaseUrl + "subscription/get-user-subcription?usertoken=" + token;
        env.abDontMiss = "0wc3JCTqRKqg808IsqcVGw";

       /* var photoID = "101633085539873";
        var videoID = "101616666685316"; */
        var photoID = "mostpopularPhotos";
        var videoID = "mostpopularVideos";

        if (document.URL.includes(webbaseUrl + '/india-news')) {
            photoID = "101637579151396";
            videoID = "101637579756389";
        } else if (document.URL.includes(webbaseUrl + '/world-news')) {
            videoID = "101637580826859";
        } else if (document.URL.includes(webbaseUrl + '/lifestyle')) {
            photoID = "101637581020280";
            videoID = "101637581094470";
        } else if (document.URL.includes(webbaseUrl + '/entertainment')) {
            photoID = "101637581155350";
            videoID = "101637581214521";
        } else if (document.URL.includes(webbaseUrl + '/sports') || document.URL.includes(webbaseUrl + '/cricket')) {
            photoID = "101637581280287";
            videoID = "101637581341125";
        } else if (document.URL.includes(webbaseUrl + '/astrology')) {
            videoID = "101637581408016";
        }

        if(document.URL===webbaseUrl + '/' || document.URL==="http://localhost:8083/")
        {
            photoID="101633085539873";
            videoID="101633599912715";
            strIsHomePage="yes";
        }

        env.zoneId = {
            topnews: "101606209437749",
            dontmiss: "101606314351968",
            trendingtopic: "101615281411240",
            latestnews: "101606719788629",
            photos: photoID,
            trendingnews: "101606719759208",
            videos: videoID,
            shopnow: "101654153994159",
            isHomePage: strIsHomePage
        }
    } else if (document.location.hostname.includes("localhost") || document.location.hostname.includes("local")) {
        env.abStr = "_uU1xK9LQKOHhIn5WIC7Eg";
        env.abSectionFromMore = "AuvTB6zXSEumtwKCIjJyeA";
        //env.subscriptionUrl = apiBaseUrl + 'subscription/check-subscription?usertoken=' + token;
        env.subscriptionUrl = apiBaseUrl + 'subscription/get-user-subcription?usertoken=' + token;
        env.abDontMiss = "tlEFRqz7S1aOFNoLnsrwHA";
    } else {
        env.abStr = "_uU1xK9LQKOHhIn5WIC7Eg";
        env.abSectionFromMore = "AuvTB6zXSEumtwKCIjJyeA";
        //env.subscriptionUrl = apiBaseUrl + "subscription/check-subscription";
        env.subscriptionUrl = apiBaseUrl + "subscription/get-user-subcription";
        env.abDontMiss = "tlEFRqz7S1aOFNoLnsrwHA";
    }

    return env;
});