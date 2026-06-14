const API = "https://streak-bot-9vnn.onrender.com/api/settings";

// LOAD
async function load() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    const inputs = document.querySelectorAll("input");

    if (data.botName) inputs[0].value = data.botName;
    if (data.prefix) inputs[1].value = data.prefix;
    if (data.status) inputs[2].value = data.status;

  } catch (err) {
    console.log(err);
  }
}

// SAVE
async function save() {
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

// BUTTON
document.querySelector(".save-btn")?.addEventListener("click", save);

load();
