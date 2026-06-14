const links = document.querySelectorAll(".nav a");
const pages = document.querySelectorAll(".page");
const title = document.getElementById("pageTitle");

const API = "https://streak-bot-9vnn.onrender.com/api/settings";

/* LOAD */
async function load() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    const inputs = document.querySelectorAll("input");

    if (inputs[0]) inputs[0].value = data.botName || "";
    if (inputs[1]) inputs[1].value = data.prefix || "";
    if (inputs[2]) inputs[2].value = data.status || "";

  } catch {}
}

/* SAVE */
async function save() {
  const inputs = document.querySelectorAll("input");

  await fetch(API, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      botName: inputs[0]?.value,
      prefix: inputs[1]?.value,
      status: inputs[2]?.value
    })
  });

  alert("Saved");
}

/* NAV */
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

    title.textContent = pageName;
  });
});

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".save-btn")?.addEventListener("click", save);
  load();
});
