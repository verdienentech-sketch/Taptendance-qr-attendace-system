import { db, auth } from "./firebase.js";
import {
  doc, getDoc, setDoc, updateDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }).render(async (decodedText) => {
  const studentId = decodedText;
  const today = formatDate(new Date());
  const attendanceId = `${studentId}_${today}`;

  const studentRef = doc(db, "students", studentId);
  const studentSnap = await getDoc(studentRef);

  if (!studentSnap.exists()) {
    alert("Student not found");
    return;
  }

  const { name } = studentSnap.data();
  const attendanceRef = doc(db, "attendance", attendanceId);
  const attendanceSnap = await getDoc(attendanceRef);

  if (!attendanceSnap.exists()) {
    await setDoc(attendanceRef, {
      studentId,
      name,
      timeIn: serverTimestamp()
    });
    alert(`${name} clocked IN`);
  } else {
    await updateDoc(attendanceRef, {
      timeOut: serverTimestamp()
    });
    alert(`${name} clocked OUT`);
  }
});
