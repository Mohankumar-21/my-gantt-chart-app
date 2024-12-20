// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpw59ZMQBhC0wAwvbvUOnnQhnUkDLUW2o",
  authDomain: "gantt-chart-46287.firebaseapp.com",
  projectId: "gantt-chart-46287",
  storageBucket: "gantt-chart-46287.firebasestorage.app",
  messagingSenderId: "379229886724",
  appId: "1:379229886724:web:fa28b6fa1f586b7b6fd851"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;