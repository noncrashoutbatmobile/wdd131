const hamburger = document.querySelector(".navbar-hamburger");
const navLinks = document.querySelector(".navbar-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});