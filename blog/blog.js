const hamburger = document.querySelector(".navbar-hamburger");
const navLinks = document.querySelector(".navbar-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});
window.addEventListener('resize', () => {
  const links = document.querySelector('.navbar-links');
  if (window.innerWidth > 646) {
    links.classList.remove('active');
  }
});
const articles = [
  {
    id: 1,
    title: 'Septimus Heap Book One: Magyk',
    date: 'July 5, 2022',
    description:
      'If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.',
    imgSrc: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg',
    imgAlt: 'Book cover for Septimus Heap 1',
    ages: '10-14',
    genre: 'Fantasy',
    stars: '⭐⭐⭐⭐'
  },
  {
    id: 2,
    title: 'Magnus Chase Book One: Sword of Summer',
    date: 'December 12, 2021',
    description:
      'The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.',
    imgSrc:
      'https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300',
    imgAlt: 'Book cover for Magnus Chase 1',
    ages: '12-16',
    genre: 'Fantasy',
    stars: '⭐⭐⭐⭐'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const bookList = document.querySelector('.book-list');

  articles.forEach(article => {
    const bookItem = document.createElement('div');
    bookItem.classList.add('book-item', 'static-card');
    bookItem.setAttribute('tabindex', '0');
    bookItem.innerHTML = `
      <h3 class="book-title">${article.title}</h3>
      <img src="${article.imgSrc}" alt="${article.imgAlt}" class="book-image">
      <p class="book-description">${article.description}</p>
      <div class="book-meta">
        <p><strong>Ages:</strong> ${article.ages}</p>
        <p><strong>Genre:</strong> ${article.genre}</p>
        <p><strong>Rating:</strong> ${article.stars}</p>
      </div>
    `;

    bookList.appendChild(bookItem);
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const flipCards = document.querySelectorAll('.book-item');

  flipCards.forEach(card => {
    card.addEventListener('keydown', (e) => {
      // Flip on Enter or Space key
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); // prevent scrolling with Space
        card.querySelector('.book-inner').classList.toggle('flipped');
      }
    });
  });
});
