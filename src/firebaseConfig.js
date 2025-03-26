// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtqZBUTIKlMCvnPEWP4kMA6U6_V1VgA44",
  authDomain: "smart-attendance-system-bb8fe.firebaseapp.com",
  projectId: "smart-attendance-system-bb8fe",
  storageBucket: "smart-attendance-system-bb8fe.firebasestorage.app",
  messagingSenderId: "684830009362",
  appId: "1:684830009362:web:65fbff38046d423314d0cb",
  measurementId: "G-93VLMR93YK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
