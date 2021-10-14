import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAzLWi5rX08Xd1AKdpVnK33ew18n85nxXQ",
  authDomain: "rn-instagram-clone-3cb12.firebaseapp.com",
  projectId: "rn-instagram-clone-3cb12",
  storageBucket: "rn-instagram-clone-3cb12.appspot.com",
  messagingSenderId: "649034798104",
  appId: "1:649034798104:web:f79a04409d23eeb8901f6d",
  measurementId: "G-E1FDMC04V1",
};

// Initialize Firebase

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore();

export { firebase, db };
