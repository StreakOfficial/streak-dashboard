const links = document.querySelectorAll(".nav a");
const pages = document.querySelectorAll(".page");
const title = document.getElementById("pageTitle");

const API = "https://streak-bot-9vnn.onrender.com/api/settings";

/* =========================
   LOAD SETTINGS
========================= */
async function loadSettings() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    const inputs = document.querySelectorAll("input");

    if (inputs[0]) inputs[0].value = data.botName || "";
    if (inputs[1]) inputs[1].value = data.prefix || "";
    if (inputs[2]) inputs[2].value = data.status || "";

  } catch (err) {
    console.log("Load error:", err);
  }
}

/* =========================
   SAVE SETTINGS
========================= */
async function saveSettings() {
  try {
    const inputs = document.querySelectorAll("input");

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        botName: inputs[0]?.value || "",
        prefix: inputs[1]?.value || "",
        status: inputs[2]?.value || ""
      })
    });

    alert("Saved successfully!");
  } catch (err) {
    console.log("Save error:", err);
    alert("Failed to save");
  }
}

/* =========================
   CARL.GG PAGE SYSTEM
========================= */
function switchPage(pageName) {

  // update sidebar active state
  links.forEach(link => {
    link.classList.toggle("active", link.dataset.page === pageName);
  });

  // hide all pages
  pages.forEach(page => page.classList.remove("active"));

  // find correct page
  const target = document.getElementById(
    pageName.toLowerCase().replace(/ /g, "-")
  );

  if (target) target.classList.add("active");

  // update title
  if (title) title.textContent = pageName;
}

/* =========================
   EVENT LISTENERS
========================= */
links.forEach(link => {
  link.addEventListener("click", () => {
    switchPage(link.dataset.page);
  });
});

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {

  // save button
  document.querySelector(".save-btn")?.addEventListener("click", saveSettings);

  // load dashboard data
  loadSettings();
});
