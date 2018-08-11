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
        url : "https://c91d4e4d.ngrok.io/token",
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
            localStorage.setItem("digi_token",token);
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


if(!('digi_token' in localStorage)){
    messaging.requestPermission().then(function() {
        console.log('Notification permission granted.');
        messaging.getToken().then(function(currentToken) {
            if (currentToken) {
                console.log(currentToken);
                save_token(currentToken);
            } else {
              console.log('No Instance ID token available. Request permission to generate one.');
            }
          }).catch(function(err) {
            console.log('An error occurred while retrieving token.', err);
            // showToken('Error retrieving Instance ID token. ', err);
            // setTokenSentToServer(false);
          });
      }).catch(function(err) {
        console.log('Unable to get permission to notify.', err);
    });
}

messaging.onTokenRefresh(function() {
    messaging.getToken().then(function(refreshedToken) {
      console.log('Token refreshed.');
      console.log(refreshedToken);
      save_token(refreshedToken);
    }).catch(function(err) {
      console.log('Unable to retrieve refreshed token ', err);
    });
});