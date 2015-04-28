var diwajs;
var tokenID = "";

function saveStuff()
{
    //alert("savin' "+tokenID+" to db");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://wesolyswiatrobotyki.comxa.com/receive.php?client_id=" + encodeURIComponent(tokenID), false);
    xhr.send();
} 

function onNotification(e) {
    //alert('onnotification here - ' + e.event);
    switch (e.event) {
        case 'registered':
            if (e.regid.length > 0) {
               // alert('registration id = ' + e.regid);
                tokenID = e.regid;      
                saveStuff();
            }
            break;

        case 'message':
           alert('Message! ' + e.message/* + ' msgcnt = ' + e.msgcnt*/);
            break;

        case 'error':
            alert('GCM error = ' + e.msg);
            break;

        default:
            alert('An unknown GCM event has occurred');
            break;
    }
}

function funnyfunction() 
{
    //alert('wut :D');
    if(device && device.platform)
    {
        diwajs = device;
    }
    else
    {
        diwajs = intel.xdk.device;
    }

    window.plugins.pushNotification.unregister(successHandler, errorHandler);

    if (diwajs.platform == "Android") {
        //alert("masz androida.");
        window.plugins.pushNotification.register(
            successHandler,
            errorHandler,
            {
                "senderID": "861188438553",
                "ecb": "onNotification"
            });
    }
    else if (diwajs.platform == "iOS") {
        window.plugins.pushNotification.register(
            tokenHandler,
            errorHandler,
            {
                "badge": "true",
                "sound": "true",
                "alert": "true",
                "ecb": "onNotificationAPN"
            });
    }
}

document.addEventListener("deviceready", funnyfunction, false);

function successHandler(result) {
    //alert('result = ' + result);
}

function errorHandler(error) {
    alert('error = ' + error);
}

function tokenHandler(result) {
    //alert('device token = ' + result);
    tokenID = result;
} 



function onNotificationAPN(event) {
    if (event.alert) {
        alert(event.alert);
    }

    if (event.sound) {
        var snd = new Media(event.sound);
        snd.play();
    }

    if (event.badge) {
        window.plugins.pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
    }
}