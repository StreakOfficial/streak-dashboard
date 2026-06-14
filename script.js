const API = "https://streak-bot-9vnn.onrender.com/api/embed";

/* =========================
   EMBED SENDER SYSTEM
========================= */

async function sendEmbed() {
  const title = document.querySelector("#title")?.value;
  const description = document.querySelector("#description")?.value;
  const channel = document.querySelector("#channel")?.value;

  if (!title || !description || !channel) {
    alert("Please fill in all fields");
    return;
  }

  try {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        channel
      })
    });

    alert("Embed sent to bot!");
  } catch (err) {
    console.log(err);
    alert("Failed to send embed");
  }
}

/* =========================
   BUTTON CONNECTION
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".send-embed");

  if (btn) {
    btn.addEventListener("click", sendEmbed);
  }
});
