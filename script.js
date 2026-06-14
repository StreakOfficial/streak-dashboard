const links = document.querySelectorAll(".nav a");
const pageTitle = document.getElementById("pageTitle");

links.forEach(link => {
  link.addEventListener("click", () => {
    links.forEach(item => item.classList.remove("active"));
    link.classList.add("active");

    pageTitle.textContent = link.dataset.page;
  });
});
