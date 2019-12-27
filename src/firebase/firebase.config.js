  import firebase from "firebase/app"
  import "firebase/firestore"
  import "firebase/auth"

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCnrDCrBBv8OQOWWB1BvRTFKtrBC93s7GU",
    authDomain: "gamer-store-e2712.firebaseapp.com",
    databaseURL: "https://gamer-store-e2712.firebaseio.com",
    projectId: "gamer-store-e2712",
    storageBucket: "gamer-store-e2712.appspot.com",
    messagingSenderId: "84486663460",
    appId: "1:84486663460:web:efa0461ae780de570e97b1",
    measurementId: "G-S27C0J8VWB"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: "select_account"});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;