const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
}

toggleBtn.onclick = () => {
  body.classList.toggle("dark");
  const theme = body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
};
