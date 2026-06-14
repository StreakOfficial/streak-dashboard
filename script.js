const links = document.querySelectorAll(".nav a");
const pages = document.querySelectorAll(".page");
const title = document.getElementById("pageTitle");

const API = "https://streak-bot-9vnn.onrender.com/api/settings";

/* ---------------- LOAD SETTINGS ---------------- */
async function loadSettings() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    const inputs = document.querySelectorAll("input");

    if (data.botName) inputs[0].value = data.botName;
    if (data.prefix) inputs[1].value = data.prefix;
    if (data.status) inputs[2].value = data.status;

  } catch (err) {
    console.log("Load error:", err);
  }
}

/* ---------------- SAVE SETTINGS ---------------- */
async function saveSettings() {
  const inputs = document.querySelectorAll("input");

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      botName: inputs[0]?.value,
      prefix: inputs[1]?.value,
      status: inputs[2]?.value
    })
  });

  alert("Saved!");
}

/* ---------------- CARL.GG NAV ---------------- */
links.forEach(link => {
  link.addEventListener("click", () => {

    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    const pageName = link.dataset.page;

    pages.forEach(p => p.classList.remove("active"));

    const target = document.getElementById(
      pageName.toLowerCase().replace(/ /g, "-")
    );

    if (target) target.classList.add("active");

    if (title) title.textContent = pageName;
  });
});

/* ---------------- INIT ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".save-btn")?.addEventListener("click", saveSettings);
  loadSettings();
});
