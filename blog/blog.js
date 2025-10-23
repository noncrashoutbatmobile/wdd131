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
    id: 0,
    type: 'flip',
    title: 'The Galactic Adventures of Luna',
    frontImg: 'luna_front2.webp',
    backImg: 'luna_back.webp',
    frontDescription: `Luna doesn't chase stars — she interprets them. When a mysterious signal draws her beyond Earth's orbit, she finds herself navigating a galaxy of forgotten dreams, cryptic transmissions, and a truth only she can decode. With her senses tuned to the strange rhythms of space, Luna must decide whether the stars are guiding her forward… or calling her home.`,
    backDescription: `⭐⭐⭐⭐⭐
      <em>"I picked this up expecting a quirky space adventure, but Luna surprised me. The writing is lyrical without being overdone, and the story has this quiet emotional pull that sneaks up on you. I loved how the sci-fi elements were woven into something deeply personal — it's not just about stars and signals, it's about memory, intuition, and finding your way when everything feels unfamiliar. I'll be thinking about that ending for a while."</em>
      — Maya T., reviewer at <strong>The Orbit Shelf</strong>`
  },
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
    bookItem.classList.add('book-item');
    bookItem.setAttribute('tabindex', '0');

    if (article.type === 'flip') {
      // Render flip card
      bookItem.innerHTML = `
        <div class="book-inner">
          <div class="book-front">
            <h3 class="book-title">${article.title}</h3>
            <img src="${article.frontImg}" alt="${article.title}" class="book-image">
            <p class="book-description">${article.frontDescription}</p>
          </div>
          <div class="book-back">
            <h3 class="book-title">${article.title}</h3>
            <img src="${article.backImg}" alt="Back cover of ${article.title}" class="book-image">
            <p class="book-description">${article.backDescription}</p>
          </div>
        </div>
      `;
    } else {
      // Render static card
      bookItem.classList.add('static-card');
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
    }

    bookList.appendChild(bookItem);
  });

  // Add flip card keyboard interaction
  const flipCards = document.querySelectorAll('.book-item .book-inner');
  flipCards.forEach(card => {
    card.parentElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });
});
