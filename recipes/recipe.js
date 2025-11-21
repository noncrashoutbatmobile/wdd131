import recipes from './recipes.mjs';
import { initCookMode } from './wakeLock.js';

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function renderRating(container, rating) {
  const safeRating = Number.isFinite(Number(rating)) ? Number(rating) : 0;
  container.setAttribute('aria-label', `${safeRating} out of 5 stars`);
  container.innerHTML = Array.from({length:5}, (_,i) => i < safeRating ? '<span aria-hidden="true">★</span>' : '<span aria-hidden="true">☆</span>').join('');
}

function renderRecipeDetail(recipe) {
  const img = document.querySelector('#maincontent img');
  const tags = document.querySelector('#maincontent .tags');
  const title = document.querySelector('#maincontent h2');
  const ratingContainer = document.querySelector('#maincontent .rating');
  const desc = document.querySelector('#maincontent .description');

  img.src = recipe.image || './images/default.jpg';
  img.alt = recipe.name || 'Recipe image';
  tags.textContent = Array.isArray(recipe.tags) ? recipe.tags.join(', ') : (recipe.tags || '');
  title.textContent = recipe.name || '';
  renderRating(ratingContainer, recipe.rating || 0);
  desc.textContent = recipe.description || '';

  document.getElementById('prepTime').textContent = recipe.prepTime || '';
  document.getElementById('cookTime').textContent = recipe.cookTime || '';
  document.getElementById('yield').textContent = recipe.recipeYield || '';

  const ingredientsList = document.getElementById('ingredients');
  ingredientsList.innerHTML = '';
  if (Array.isArray(recipe.recipeIngredient)) {
    recipe.recipeIngredient.forEach((ing) => {
      const li = document.createElement('li');
      li.innerHTML = escapeHtml(ing);
      ingredientsList.appendChild(li);
    });
  }

  const instructions = document.getElementById('instructions');
  instructions.innerHTML = '';
  if (Array.isArray(recipe.recipeInstructions)) {
    recipe.recipeInstructions.forEach((step) => {
      const li = document.createElement('li');
      li.innerHTML = escapeHtml(step);
      instructions.appendChild(li);
    });
  }
}

// After rendering, move keyboard focus to the title for accessibility
function focusTitle() {
  const title = document.querySelector('#maincontent h2');
  if (title) {
    title.tabIndex = -1;
    title.focus();
  }
}

function init() {
  const id = getQueryParam('id');
  if (id === null) {
    console.warn('No recipe id provided in URL');
    document.querySelector('main.container').innerHTML = '<p>No recipe specified. <a href="index.html">Back</a></p>';
    return;
  }

  const idx = Number(id);
  if (!Number.isFinite(idx) || idx < 0 || idx >= recipes.length) {
    console.warn('Invalid recipe id:', id);
    document.querySelector('main.container').innerHTML = '<p>Recipe not found. <a href="index.html">Back</a></p>';
    return;
  }

  const recipe = recipes[idx];
  renderRecipeDetail(recipe);
  focusTitle();
  try {
    initCookMode();
  } catch (err) {
    console.warn('initCookMode failed', err);
  }
}

init();
