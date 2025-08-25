import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Config your firebase here
  apiKey: "AIzaSyBEpVJgkkXjtUs2xGImtEev7F1-p8Gog2M",
  authDomain: "busy-by-1.firebaseapp.com",
  projectId: "busy-by-1",
  storageBucket: "busy-by-1.firebasestorage.app",
  messagingSenderId: "337830709974",
  appId: "1:337830709974:web:02f996f8a16d1762a89777",
};

console.log(process.env);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
