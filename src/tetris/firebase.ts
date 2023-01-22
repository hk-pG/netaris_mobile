// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZM0Ii1dPCw19ah9JSwjjEbfVa2DEAjho",
  authDomain: "netarisu-score.firebaseapp.com",
  projectId: "netarisu-score",
  storageBucket: "netarisu-score.appspot.com",
  messagingSenderId: "579852304400",
  appId: "1:579852304400:web:4c105fcae6beca49f9ca95",
  measurementId: "G-465TY1DZV8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db, collection, doc, setDoc };
