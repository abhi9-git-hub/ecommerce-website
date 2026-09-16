import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAmWgct5KMOs6xy8FH0dDF8NKEXwIVTAg8",
  authDomain: "ecommerce-website-c8341.firebaseapp.com",
  projectId: "ecommerce-website-c8341",
  storageBucket: "ecommerce-website-c8341.firebasestorage.app",
  messagingSenderId: "348872631992",
  appId: "1:348872631992:web:2179b1be15be5ab5dcb64d",
  URL: "https://ecommerce-website-c8341-default-rtdb.firebaseio.com/",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);