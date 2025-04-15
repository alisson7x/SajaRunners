// firebaseConfig/firebase.js
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "saja-runner.firebaseapp.com",
  databaseURL: "https://saja-runner-default-rtdb.firebaseio.com",
  projectId: "saja-runner",
  storageBucket: "saja-runner.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID",
};

firebase.initializeApp(firebaseConfig);
window.db = firebase.database(); // <-- ESSA LINHA É ESSENCIAL!
