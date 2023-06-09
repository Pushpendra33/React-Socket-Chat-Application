import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyATYwn2kjEXj-vEXqMDHUaJblq2NSZKqyQ",
  authDomain: "saf3chat-50feb.firebaseapp.com",
  projectId: "saf3chat-50feb",
  storageBucket: "saf3chat-50feb.appspot.com",
  messagingSenderId: "137775410696",
  appId: "1:137775410696:web:e9839b74c977bed242abbd",
  measurementId: "G-YDDBDYLJ8L",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
