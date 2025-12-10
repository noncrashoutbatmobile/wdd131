// --------------------
// Dark / Light Toggle (styled like navbar links)
// --------------------

const navbarList = document.querySelector('.navbar-nav');
if (navbarList) {
  // Create <li> wrapper
  const toggleLi = document.createElement('li');
  toggleLi.classList.add('nav-item');

  // Create the link
  const toggleLink = document.createElement('a');
  toggleLink.href = '#';
  toggleLink.classList.add('nav-link');
  toggleLink.style.display = 'flex';
  toggleLink.style.alignItems = 'center';
  toggleLink.style.gap = '0.5rem'; // space between icon and text

  const darkIcon = 'images/dark-mode.png';
  const lightIcon = 'images/light-mode.png';

  // Initial content: icon + text
  toggleLink.innerHTML = `<img src="${lightIcon}" alt="Toggle Dark/Light Mode" style="width:24px;height:24px;"> Toggle Theme`;

  // Toggle logic
  toggleLink.addEventListener('click', (e) => {
    e.preventDefault(); // prevent jump to top
    document.body.classList.toggle('light-mode');
    toggleLink.innerHTML = document.body.classList.contains('light-mode')
      ? `<img src="${darkIcon}" alt="Toggle Dark/Light Mode" style="width:24px;height:24px;"> Toggle Theme`
      : `<img src="${lightIcon}" alt="Toggle Dark/Light Mode" style="width:24px;height:24px;"> Toggle Theme`;
  });

  toggleLi.appendChild(toggleLink);
  navbarList.appendChild(toggleLi);
}
