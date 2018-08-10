// UTILS 
// get OS NAME
function getOS(){
    var OSName = "Unknown";
    if (window.navigator.userAgent.indexOf("Windows NT 10.0")!= -1) OSName="Windows 10";
    if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) OSName="Windows 8";
    if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) OSName="Windows 7";
    if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) OSName="Windows Vista";
    if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) OSName="Windows XP";
    if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) OSName="Windows 2000";
    if (window.navigator.userAgent.indexOf("Mac")            != -1) OSName="Mac/iOS";
    if (window.navigator.userAgent.indexOf("X11")            != -1) OSName="UNIX";
    if (window.navigator.userAgent.indexOf("Linux")          != -1) OSName="Linux";
    
    return OSName;
}
// get browser info
function getBrowser(){
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
    var isFirefox = /Firefox\/\d+.\d+/.test(navigator.userAgent)

    // browser name
    var browserName = "Others"
    if(isChrome){
        browserName = "Chrome"
    }else if(isSafari){
        browserName = "Safari"
    }else if(isFirefox){
        browserName = "Firefox"
    }

    return browserName;
}
// send information to the system
function save_token(token){
    
    var browser = getBrowser();
    //get operating system
    var platform = getOS();

    // user language
    var language = navigator.language;
    var userAgent = navigator.userAgent;

    $.ajax({
        url : "http://localhost:8080/token",
        type: 'post',
        data: JSON.stringify({
            browser: browser,
            token: token,
            os: platform,
            language: language,
            userAgent: userAgent
        }),
        contentType: 'application/json',
        headers:{
            'Content-Type': 'application/json'
        },
        success: function(data){
            console.log(data)
        }
    });
}
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCGTT2wpVE44VO9Fm1nkOWXLrF4hfiFW3k",
    authDomain: "digitalhify-65472.firebaseapp.com",
    databaseURL: "https://digitalhify-65472.firebaseio.com",
    projectId: "digitalhify-65472",
    storageBucket: "digitalhify-65472.appspot.com",
    messagingSenderId: "990720914069"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.usePublicVapidKey("BGkQP_MY_r0cMHbcVHlkdDI_VPhbNhWB4HPP_OXNQfVmce-8mDdXrq8DZ434t9G2PTwKb2WlcJQImVUblTKJ-1I");
if ('serviceWorker' in navigator) {
	  window.addEventListener('load', function() {
	    navigator.serviceWorker
	    			 .register('Scripts/digitalhify-sw.js')
	    			 .then(function(registration){
	    				 messaging.useServiceWorker(registration); 
	    			 });
	  });
}

if(!('dh_token' in localStorage)){
messaging
		.requestPermission()
		.then(function(){
			console.log("Permission accepted");
			return messaging.getToken();
		})
		.then(function(data){
			localStorage.setItem("dh_token",data);
            save_token(data)
//			localStorage.setItem("digitoken",data);
			console.log(data) 
        });
}
// messaging on receive for foreground
messaging.onMessage(function(payload){
//	console.log(payload);
	var Notify = Notification || window.webkitNotifications;
	var notify = new Notify(payload.notification.title,payload.notification)
	notify.onclick = function(event){
		console.log(payload)
		event.preventDefault();
		notify.close();
		window.open(payload.data['gcm.notification.url'],'_blank')
	};
});
