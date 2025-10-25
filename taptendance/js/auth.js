import { auth } from "./firebase.js";
import {
  GoogleAuthProvider, signInWithPopup, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

const provider = new GoogleAuthProvider();

document.getElementById("loginBtn").onclick = () => {
  signInWithPopup(auth, provider).then(() => {
    window.location.href = "scan.html";
  });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("userInfo").innerText = `Welcome, ${user.displayName}`;
  }
});
