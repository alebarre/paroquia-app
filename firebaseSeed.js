import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "paroquia-app-80d22.firebaseapp.com",
  projectId: "paroquia-app-80d22",
  storageBucket: "paroquia-app-80d22.appspot.com",
  messagingSenderId: "1285184543",
  appId: "1:1285184543:web:1c6a8438cbace440a7492a",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
