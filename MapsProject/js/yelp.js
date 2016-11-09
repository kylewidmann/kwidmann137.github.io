// var jso = new JSO({
//     providerID: "yelp",
//     client_id: "9v0dToFOoyuhLJiWJfujRA",
//     // redirect_uri: "http://bridge.uninett.no/jso/index.html",
//     authorization: "https://accounts.google.com/o/oauth2/auth",
//     scopes: { request: ["https://www.googleapis.com/auth/userinfo.profile"]}
// });

// JSO.enablejQuery($);

// jso.ajax({
//     url: "https://www.googleapis.com/oauth2/v1/userinfo",
//     oauth: {
//         scopes: {
//             request: ["https://www.googleapis.com/auth/userinfo.email"],
//             require: ["https://www.googleapis.com/auth/userinfo.email"]
//         }
//     },
//     dataType: 'json',
//     success: function(data) {
//         console.log("Response (google):");
//         console.log(data);
//         $(".loader-hideOnLoad").hide();
//     }
// });\

// var OAuth = require('@zalando/oauth2-client-js');
// var google = new OAuth.Provider({
//     id: 'google',   // required
//     authorization_url: 'https://google.com/auth' // required
// });

function yelpSearch(location, name){
    var auth = {
        consumerKey : "9v0dToFOoyuhLJiWJfujRA",
        consumerSecret : "HCtQEDyu5Xq-Axp-1hqbEpkiBSM",
        accessToken : "J44hl-oUuyJqNqd7hDk_mlfWcay8p3EL",
        accessTokenSecret : "XLzY67GI-YbvQwy2N36416mAdLo",
        serviceProvider : {
            signatureMethod : "HMAC-SHA1"
        }
    };

    name = name.replace(' ', '+');
    location = location.replace(' ', '+');

    var terms = name;
    var near = location;

    var accessor = {
        consumerSecret : auth.consumerSecret,
        tokenSecret : auth.accessTokenSecret
    };
    parameters = [];
    parameters.push(['term', terms]);
    parameters.push(['location', near]);
    parameters.push(['callback', 'yelpCB']);
    parameters.push(['limit', '1']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

    var message = {
        'action' : 'https://api.yelp.com/v2/search',
        'method' : 'GET',
        'parameters' : parameters
    };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);

    var parameterMap = OAuth.getParameterMap(message.parameters);
    console.log(parameterMap);

    $.ajax({
        'url' : message.action,
        'data' : parameterMap,
        'dataType' : 'jsonp',
        'jsonpCallback' : 'yelpCB',
        'async' : 'false',
        'cache' : true
    }).fail(function(XMLHttpRequest, textStats, error){
        console.log("Error");
        console.log(error);
    });
}

function yelpCB(data){
    console.log("Return from yelp");
    console.log(data);
}