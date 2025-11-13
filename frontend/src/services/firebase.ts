import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDS7hiS8OVot85RUZlVyP1umO3ljyRYpKU",
  authDomain: "intiscorp-a31ad.firebaseapp.com",
  databaseURL: "https://intiscorp-a31ad-default-rtdb.firebaseio.com",
  projectId: "intiscorp-a31ad",
  storageBucket: "intiscorp-a31ad.firebasestorage.app",
  messagingSenderId: "410950239997",
  appId: "1:410950239997:web:36bd1de0a0b9ac25482094"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
