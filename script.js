const API = "https://streak-bot-9vnn.onrender.com/api/settings";

// Load settings from server
async function loadSettings() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    const inputs = document.querySelectorAll("input");

    if (data.botName) inputs[0].value = data.botName;
    if (data.prefix) inputs[1].value = data.prefix;

  } catch (err) {
    console.log("Failed to load settings:", err);
  }
}

// Save settings to server
async function saveSettings() {
  const inputs = document.querySelectorAll("input");

  const botName = inputs[0].value;
  const prefix = inputs[1].value;

  try {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        botName,
        prefix
      })
    });

    alert("Saved to server!");
  } catch (err) {
    alert("Failed to save settings");
    console.log(err);
  }
}

// Attach button safely
window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("button").addEventListener("click", saveSettings);
  loadSettings();
});
