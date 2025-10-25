import { db } from "./firebase.js";
import {
  collection, getDocs
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

const snapshot = await getDocs(collection(db, "attendance"));
const rows = [];

snapshot.forEach(doc => {
  const data = doc.data();
  rows.push([
    data.studentId,
    data.name,
    data.timeIn?.toDate().toLocaleTimeString() || "—",
    data.timeOut?.toDate().toLocaleTimeString() || "—"
  ]);
});

document.getElementById("attendanceTable").innerHTML = rows.map(r =>
  `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`
).join("");

document.getElementById("exportBtn").onclick = () => {
  const csv = rows.map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "attendance.csv";
  link.click();
};
