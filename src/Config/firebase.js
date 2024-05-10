// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import {getStorage} from "firebase/storage"
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAPTfLGIv4-HuFC10T3dkYS-qcW30KbNqA",
  authDomain: "jossy-9f52d.firebaseapp.com",
  projectId: "jossy-9f52d",
  storageBucket: "jossy-9f52d.appspot.com",
  messagingSenderId: "861241262929",
  appId: "1:861241262929:web:f3402a29526f1ea31bc970",
  measurementId: "G-R4C8Z44QB3",
};

firebase.initializeApp(firebaseConfig);

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
