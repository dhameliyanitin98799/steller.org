import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyCnMfEgqXKnDfRKn1s-Z_TtqDeArLjCRcI",
  authDomain: "steller-56788.firebaseapp.com",
  projectId: "steller-56788",
  storageBucket: "steller-56788.appspot.com",
  messagingSenderId: "558185986288",
  appId: "1:558185986288:web:548f4a0f9fc11fd6ebea35",
  measurementId: "G-T14EEKP4DT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const database = getDatabase(app);
export const fireStoreDb = getFirestore(app);