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

messaging.requestPermission().then(function() {
    console.log('Notification permission granted.');
    messaging.getToken().then(function(currentToken) {
        if (currentToken) {
            console.log(currentToken);
        } else {
          console.log('No Instance ID token available. Request permission to generate one.');
        }
      }).catch(function(err) {
        console.log('An error occurred while retrieving token. ', err);
        showToken('Error retrieving Instance ID token. ', err);
        setTokenSentToServer(false);
      });
  }).catch(function(err) {
    console.log('Unable to get permission to notify.', err);
});


messaging.onTokenRefresh(function() {
    messaging.getToken().then(function(refreshedToken) {
      console.log('Token refreshed.');
      console.log(refreshedToken);
    }).catch(function(err) {
      console.log('Unable to retrieve refreshed token ', err);
    });
});