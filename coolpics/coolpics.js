document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu");
  const nav = document.getElementById("main-nav");
  const gallery = document.querySelector('.gallery');

  // Reset
  nav.removeAttribute("style");
  nav.classList.remove("show");

  // Menu toggle for small screens
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
    updateLayout(); // Immediately apply the correct display
  });

  // Delegated gallery click for modal
  gallery.addEventListener('click', e => {
    const img = e.target.closest('img');
    if (!img || !gallery.contains(img)) return;

    const dialog = document.createElement('dialog');
    dialog.id = 'image-viewer';
    dialog.innerHTML = `
      <img src="${img.src}" alt="${img.alt}">
      <button class="close-viewer">X</button>
    `;
    document.body.appendChild(dialog);
    dialog.showModal();

    dialog.querySelector(".close-viewer").addEventListener("click", () => {
      dialog.close();
      dialog.remove();
    });

    dialog.addEventListener("click", evt => {
      if (evt.target === dialog) {
        dialog.close();
        dialog.remove();
      }
    });
  });

  function styleNavLinks(display, margin, padding) {
    const links = document.querySelectorAll('#main-nav a');
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-light');
    links.forEach(link => {
      link.style.display = display;
      link.style.margin = margin;
      link.style.padding = padding;
      link.style.color = textColor;
    });
  }

  // Combined layout update: nav + gallery
  function updateLayout() {
    const width = window.innerWidth;

    // --- Nav/Menu logic ---
    if (width > 800) {  // breakpoint
      nav.style.display = 'block';
      menuBtn.style.display = 'none';
      styleNavLinks('inline-block', '0 1rem', '0.5rem 0');
    } else {
      menuBtn.style.display = 'inline-block';
      nav.style.display = nav.classList.contains('show') ? 'block' : 'none';
      const linkDisplay = width >= 600 ? 'inline-block' : 'block';
      const linkMargin = width >= 600 ? '0 1rem' : '0.5em 0';
      styleNavLinks(linkDisplay, linkMargin, '0.5rem 0');
    }

    // --- Gallery layout ---
    if (gallery) {
      if (width <= 600) {
        gallery.style.gridTemplateColumns = '1fr';
      } else if (width <= 800) {
        gallery.style.gridTemplateColumns = '1fr 1fr';
      } else {
        gallery.style.gridTemplateColumns = '1fr 1fr 1fr';
      }
    }
  }

  // Initial layout
  updateLayout();

  // Update on window resize
  window.addEventListener('resize', updateLayout);
});
