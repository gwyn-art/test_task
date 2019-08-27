import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPGa2QRSfvGMLVSgvPeCYRX_fJL7zdex8",
  authDomain: "joobleinterviewfrontend.firebaseapp.com",
  databaseURL: "https://joobleinterviewfrontend.firebaseio.com",
  projectId: "joobleinterviewfrontend",
  storageBucket: "joobleinterviewfrontend.appspot.com",
  messagingSenderId: "84956270178",
  appId: "1:84956270178:web:65528f215c98826a"
};

firebase.initializeApp(firebaseConfig);

firebase
  .auth()
  .signInWithEmailAndPassword('gwyn.artstyle@gmail.com', 'b43URU05xd')
  .catch(() => console.error('Unable connect to Firebase.'));

  export const db = firebase.firestore();
  export const drugsCollection = db.collection('medicines_ruslan');
