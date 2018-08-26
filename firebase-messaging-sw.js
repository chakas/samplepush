importScripts('https://www.gstatic.com/firebasejs/4.9.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.9.1/firebase-messaging.js')

console.log("Registered SW")
firebase.initializeApp({
    'messagingSenderId': '990720914069'
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
        console.log("payload")
        console.log(payload)
});
// messaging.setBackgroundMessageHandler(function (payload) {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     var notificationTitle = 'Background Message Title';
//     var notificationOptions = {
//         body: 'Background Message body.'
//     };
//     return self.registration.showNotification(notificationTitle,
//         notificationOptions);
// });

self.addEventListener('push',function(e){
    const data = e.data.json()
    
    // notification details
    var title = data.notification.title;
    var body = data.notification.body;
    var icon = data.notification.icon;

    // extra info
    var url = data["data"]["gcm.notification.url"]
    e.waitUntil(
        self.registration.showNotification(title,{
            body: body,
            icon: icon
        })
    );
});

self.addEventListener('notificationclick',function(e){
    const data = e.data.json();
    var url = data["data"]["gcm.notification.url"];
    console.log(url)
    window.open(url);
});