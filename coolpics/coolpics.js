document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu");
  const nav = document.getElementById("main-nav");

  // Reset any leftover inline styles from earlier experiments
  nav.removeAttribute("style");
  nav.classList.remove("show");

  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
});
document.addEventListener("DOMContentLoaded", () => {
  // Attach click listeners to all gallery images
  document.querySelectorAll(".gallery img").forEach(img => {
    img.addEventListener("click", () => {
      // Create the dialog element
      const dialog = document.createElement("dialog");
      dialog.id = "image-viewer";

      // Inject the modal content
      dialog.innerHTML = `
        <img src="${img.src}" alt="${img.alt}">
        <button class="close-viewer">X</button>
      `;

      // Append to body
      document.body.appendChild(dialog);

      // Show the modal
      dialog.showModal();

      // Close button logic
      dialog.querySelector(".close-viewer").addEventListener("click", () => {
        dialog.close();
        dialog.remove();
      });

      // Optional: close if user clicks backdrop
      dialog.addEventListener("click", e => {
        if (e.target === dialog) {
          dialog.close();
          dialog.remove();
        }
      });
    });
  });
});
