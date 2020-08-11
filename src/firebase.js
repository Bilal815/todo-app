import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBvzMdyuA29PV5djXPSUmqtDuL_E1oYwFI",
    authDomain: "todo-app-cp-9d503.firebaseapp.com",
    databaseURL: "https://todo-app-cp-9d503.firebaseio.com",
    projectId: "todo-app-cp-9d503",
    storageBucket: "todo-app-cp-9d503.appspot.com",
    messagingSenderId: "142207282020",
    appId: "1:142207282020:web:506579ed53fa631dec6871",
    measurementId: "G-2T86CYMN5S"
});

const db = firebaseApp.firestore();

export default db;