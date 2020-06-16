// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.15.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.1/firebase-messaging.js');
// Initialize the Firebase app in the service worker by passing in the messagingSenderId.
// firebase.initializeApp({
//   'messagingSenderId': '43950208709' // 4の messagingSenderId をコピペ
// });

const firebaseConfig = {
  apiKey: "AIzaSyDid8bauQK5C6mot9yE0_yqOnElpZKLHQE",
  authDomain: "notify-demo-cfbdb.firebaseapp.com",
  databaseURL: "https://notify-demo-cfbdb.firebaseio.com",
  projectId: "notify-demo-cfbdb",
  storageBucket: "notify-demo-cfbdb.appspot.com",
  messagingSenderId: "43950208709",
  appId: "1:43950208709:web:c887cd03c439826d19e2ac"
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();
// [END initialize_firebase_in_sw]
console.log(messaging);

console.log("service worker logs...");

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/img/icons/apple-touch-icon.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('push', function (event) {

  console.log("event:push")
  let messageTitle = "MESSAGETITLE"
  let messageBody = "MESSAGEBODY"
  let messageTag = "MESSAGETAG"

  const notificationPromise = self.registration.showNotification(
    messageTitle,
    {
      body: messageBody,
      tag: messageTag
    });

  event.waitUntil(notificationPromise);

}, false)