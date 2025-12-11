// --------------------
// Dark / Light Toggle (with saved preference)
// --------------------

const navbarList = document.querySelector('.navbar-nav');

if (navbarList) {
  const toggleLi = document.createElement('li');
  toggleLi.classList.add('nav-item');

  const toggleLink = document.createElement('a');
  toggleLink.href = '#';
  toggleLink.classList.add('nav-link');
  toggleLink.style.display = 'flex';
  toggleLink.style.alignItems = 'center';
  toggleLink.style.gap = '0.5rem';

  const darkIcon = 'images/dark-mode.png';
  const lightIcon = 'images/light-mode.png';

  // Load saved theme (default = dark)
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  }

  // Set initial toggle content
  function updateToggleContent() {
    const isLight = document.body.classList.contains('light-mode');
    toggleLink.innerHTML = isLight
      ? `<img src="${darkIcon}" style="width:24px;height:24px;"> Toggle Theme`
      : `<img src="${lightIcon}" style="width:24px;height:24px;"> Toggle Theme`;
  }

  updateToggleContent();

  // Toggle logic
  toggleLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.classList.toggle('light-mode');

    // Save preference
    const newTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);

    updateToggleContent();
  });

  toggleLi.appendChild(toggleLink);
  navbarList.appendChild(toggleLi);
}


document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector('.gallery-grid');

  gallery.addEventListener('click', e => {
    const card = e.target.closest('.gallery-item');
    if (!card || !gallery.contains(card)) return;

    const description = card.querySelector('p');
    const title = card.querySelector('.title');
    const iframe = card.querySelector('iframe');
    const video = card.querySelector('video');

    if (!description || !title || (!iframe && !video)) return;

    // Only trigger modal if description is hidden
    const isHidden = window.getComputedStyle(description).display === 'none';
    if (!isHidden) return;

    // Create dialog/modal
    const dialog = document.createElement('dialog');
    dialog.classList.add('video-viewer');
    dialog.innerHTML = `
      <div class="video-wrapper">
        <h3 class="modal-title">${title.innerHTML}</h3>
        ${iframe ? iframe.outerHTML : video.outerHTML}
        <div class="description">${description.innerHTML}</div>
        <button class="close-viewer">X</button>
      </div>
    `;
    document.body.appendChild(dialog);
    dialog.showModal();

    // Close button
    dialog.querySelector(".close-viewer").addEventListener("click", () => {
      dialog.close();
      dialog.remove();
    });

    // Click outside content to close
    dialog.addEventListener("click", evt => {
      if (evt.target === dialog) {
        dialog.close();
        dialog.remove();
      }
    });
  });
});

