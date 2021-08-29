import firebase from "firebase";



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1A8mtvdQNSL0YuyDaXsRoFBKLbMxuDOE",
  authDomain: "whatup-clone-2df51.firebaseapp.com",
  projectId: "whatup-clone-2df51",
  storageBucket: "whatup-clone-2df51.appspot.com",
  messagingSenderId: "549434364983",
  appId: "1:549434364983:web:f54577260a98dea8c65bb2",
  measurementId: "G-9C19FMT5E6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();


export { auth, provider};

export default db;
