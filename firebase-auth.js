import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js';


const firebaseConfig = {
    apiKey: "AIzaSyBXLGR6_bIj9hrb2XGBmq0QufKDZwFcDHk",
    authDomain: "h-n-h-168ed.firebaseapp.com",
    projectId: "h-n-h-168ed",
    storageBucket: "h-n-h-168ed.appspot.com",
    messagingSenderId: "1004894394049",
    appId: "1:1004894394049:web:9e9eb4ca1bcd23db6c2640",
    measurementId: "G-95EPKZ6WZ7"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Signup Function
window.signup = async () => {
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert('Signup successful!');
    console.log('User:', userCredential.user);
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Error signing up:', error);
    alert(error.message);
  }
};

// Login Function
window.login = async () => {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    //alert('Login successful!');
    console.log('User:', userCredential.user);
    window.location.href = 'weather.html';
  } catch (error) {
    console.error('Error logging in:', error);
    alert(error.message);
  }
};