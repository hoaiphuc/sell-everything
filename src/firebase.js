// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBsBwRW5o-iUjokOv_lJ970jLsPkiBwB6M",
  authDomain: "secondhandvh-44c3e.firebaseapp.com",
  projectId: "secondhandvh-44c3e",
  storageBucket: "secondhandvh-44c3e.appspot.com",
  messagingSenderId: "798402416096",
  appId: "1:798402416096:web:28167507165a50b17bef85",
  measurementId: "G-6EC489LJ21"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider()

export const signInWithGoogle =async () => {

  await signInWithPopup(auth, provider).then((result) => {
    
    return result;
  }).catch((error) => {
    console.log(error);
    return "false";
  })
}
