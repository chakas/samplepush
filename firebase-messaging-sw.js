importScripts('https://www.gstatic.com/firebasejs/5.3.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.3.1/firebase-messaging.js')

firebase.initializeApp({
    'messagingSenderId': '990720914069'
});

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
            icon: icon,
            data:{
                url : url
            }
        })
    );
});

self.addEventListener('notificationclick',function(e){
    e.notification.close();
    e.waitUntil(
        clients.openWindow(e.notification.data.url)
    );
});