import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
import './registerServiceWorker'

Vue.config.productionTip = false

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
const messaging = firebase.messaging();
messaging.usePublicVapidKey('BDkVLlxP4ksMfQjhSsRLM9X50TEF5cojK7J3yT1QfTmqVk9HoBqnBvNzmzJiVlBM-3iN0Hd0t5vB_FEt5_QbjEE');

// 通知の受信許可
messaging.requestPermission().then(() => {
  console.log('Notification permission granted.');

  // トークン取得
  messaging.getToken().then((token) => {
    console.log(token);
    alert(token);
  })

  // Handle incoming messages. Called when:
  // - a message is received while the app has focus
  // - the user clicks on an app notification created by a service worker
  //   `messaging.setBackgroundMessageHandler` handler.
  messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    // ...
  });
}).catch((err) => {
  console.log('Unable to get permission to notify.', err);
});


new Vue({
  render: h => h(App),
}).$mount('#app')
