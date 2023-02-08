// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDE9PJl3jNGQEbfFrezEzr7uzLUBVSV_pA",
  authDomain: "sell-everything-84f04.firebaseapp.com",
  projectId: "sell-everything-84f04",
  storageBucket: "sell-everything-84f04.appspot.com",
  messagingSenderId: "335132757429",
  appId: "1:335132757429:web:33c06bae688ef16c49ddfc",
  measurementId: "G-3BMV1X81DW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export const signInWithGoogle =async () => {

  await signInWithPopup(auth, provider).then((result) => {
    console.log("2");
    
    return result;
  }).catch((error) => {
    console.log(error);
    return "false";
  })
}
