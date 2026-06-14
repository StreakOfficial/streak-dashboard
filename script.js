const API = "http://localhost:3000/api/settings";

// Load saved settings when page opens
async function loadSettings() {
  const res = await fetch(API);
  const data = await res.json();

  if (data.prefix) {
    document.querySelectorAll("input")[1].value = data.prefix;
  }

  if (data.botName) {
    document.querySelectorAll("input")[0].value = data.botName;
  }
}

// Save settings
async function saveSettings() {
  const botName = document.querySelectorAll("input")[0].value;
  const prefix = document.querySelectorAll("input")[1].value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      botName,
      prefix
    })
  });

  alert("Saved to server!");
}

// Hook button
document.querySelector("button").onclick = saveSettings;

loadSettings();
