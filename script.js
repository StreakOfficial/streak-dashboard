const API = "https://streak-bot-9vnn.onrender.com/api/embed";
const CHANNEL_API = "https://streak-bot-9vnn.onrender.com/api/channels";

/* =========================
   LOAD CHANNELS DROPDOWN
========================= */
async function loadChannels() {
  try {
    const res = await fetch(CHANNEL_API);
    const channels = await res.json();

    const select = document.querySelector("#channelSelect");
    if (!select) return;

    select.innerHTML = "";

    channels.forEach(ch => {
      const option = document.createElement("option");
      option.value = ch.id;
      option.textContent = `# ${ch.name}`;
      select.appendChild(option);
    });
  } catch (err) {
    console.log(err);
  }
}

/* =========================
   SEND EMBED
========================= */
async function sendEmbed() {
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const channel = document.querySelector("#channelSelect").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      description,
      channel
    })
  });

  alert("Embed sent!");
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  loadChannels();

  const btn = document.querySelector(".send-embed");
  if (btn) btn.addEventListener("click", sendEmbed);
});
