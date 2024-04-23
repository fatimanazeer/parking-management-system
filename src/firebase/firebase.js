import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import {getFirestore} from "@firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBpMmEcDnMZ3YgPChxscwktSpWqhde-3Tk",
  authDomain: "pdftron-sign-app-a6712.firebaseapp.com",
  databaseURL: "https://pdftron-sign-app-a6712-default-rtdb.firebaseio.com",
  projectId: "pdftron-sign-app-a6712",
  storageBucket: "pdftron-sign-app-a6712.appspot.com",
  messagingSenderId: "651816435282",
  appId: "1:651816435282:web:68ee935d1aeb752f43298b",
  measurementId: "G-SM1DNL395F"
};




const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestore=getFirestore(app);
export const storage = getStorage(app);
