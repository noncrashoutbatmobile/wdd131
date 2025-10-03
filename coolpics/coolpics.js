console.log("Cool Pics JS loaded.");
console.log("Cool Pics JS loaded.");

document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu");
    const nav = document.getElementById("main-nav");
    menuBtn.addEventListener("click", function () {
        if (nav.style.display === "none" || nav.style.display === "") {
            nav.style.display = "block";
        } else {
            nav.style.display = "none";
        }
    });
});
