import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCM3x_wax7TfzQufUirVBfza5lUa-vvELs",
  authDomain: "cococare-db-8c5e9.firebaseapp.com",
  projectId: "cococare-db-8c5e9",
  storageBucket: "cococare-db-8c5e9.appspot.com",
  messagingSenderId: "912397197528",
  appId: "1:912397197528:web:8ba1d968777a300e6e77ad",
};

// Initialize firebase
let app;
if (getApps.length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);

export { auth };
