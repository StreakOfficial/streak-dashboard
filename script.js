const content = document.getElementById("content");
const pageTitle = document.getElementById("pageTitle");

/* =========================
   DROPDOWN TOGGLE
========================= */
document.querySelectorAll(".dropdown").forEach(drop => {
  drop.addEventListener("click", () => {
    drop.classList.toggle("active");
  });
});

/* =========================
   LOAD VIEW FILES
========================= */
async function loadPage(page) {
  try {
    const res = await fetch(`views/${page}.html`);
    const html = await res.text();

    content.innerHTML = html;
    pageTitle.textContent = page.replace(/-/g, " ");

  } catch (err) {
    content.innerHTML = "<h2>Page not found</h2>";
  }
}

/* =========================
   SIDEBAR NAV CLICK
========================= */
document.querySelectorAll("[data-page]").forEach(link => {
  link.addEventListener("click", () => {
    const page = link.getAttribute("data-page");
    loadPage(page);
  });
});

/* =========================
   DEFAULT PAGE
========================= */
loadPage("bot-settings");
