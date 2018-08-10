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

messaging
    .requestPermission()
    .then(function () {
        console.log("Permission accepted");
        return messaging.getToken();
    })
    .then(function (data) {
        localStorage.setItem("dh_token", data);
        console.log(data)
});
// messaging on receive for foreground
messaging.onMessage(function(payload){
    console.log(payload);
});

messaging.onTokenRefresh(function () {
    messaging.getToken()
        .then(function (refreshedToken) {
            console.log('Token refreshed.');
            // Indicate that the new Instance ID token has not yet been sent 
            // to the app server.
            // setTokenSentToServer(false);
            // // Send Instance ID token to app server.
            // sendTokenToServer(refreshedToken);
        })
        .catch(function (err) {
            console.log('Unable to retrieve refreshed token ', err);
        });
});