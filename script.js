const links = document.querySelectorAll(".nav a");
const pages = document.querySelectorAll(".page");
const title = document.getElementById("pageTitle");

const API = "https://streak-bot-9vnn.onrender.com/api/settings";

/* ---------------------------
   LOAD SETTINGS FROM SERVER
---------------------------- */
async function loadSettings() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    const inputs = document.querySelectorAll("input");

    if (inputs.length >= 2) {
      if (data.botName) inputs[0].value = data.botName;
      if (data.prefix) inputs[1].value = data.prefix;
    }

  } catch (err) {
    console.log("Load error:", err);
  }
}

/* ---------------------------
   SAVE SETTINGS TO SERVER
---------------------------- */
async function saveSettings() {
  try {
    const inputs = document.querySelectorAll("input");

    const payload = {
      botName: inputs[0]?.value || "",
      prefix: inputs[1]?.value || ""
    };

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    alert("Saved successfully!");
  } catch (err) {
    console.log("Save error:", err);
    alert("Failed to save settings");
  }
}

/* ---------------------------
   CARL.GG STYLE NAVIGATION
---------------------------- */
links.forEach(link => {
  link.addEventListener("click", () => {

    // sidebar active highlight
    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    const pageName = link.dataset.page;

    // hide all pages
    pages.forEach(p => p.classList.remove("active"));

    // show correct page
    const targetId = pageName.toLowerCase().replace(/ /g, "-");
    const target = document.getElementById(targetId);

    if (target) target.classList.add("active");

    // update title
    if (title) title.textContent = pageName;
  });
});

/* ---------------------------
   INIT (SAFE LOAD)
---------------------------- */
document.addEventListener("DOMContentLoaded", () => {

  // save button
  const saveBtn = document.querySelector(".save-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", saveSettings);
  }

  loadSettings();
});
