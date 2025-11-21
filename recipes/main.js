import recipes from "./recipes.mjs";
import { initCookMode } from './wakeLock.js';
function random(num) {
return Math.floor(Math.random() * num);
}
function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
function getRandomListEntry(list) {
    const listLength = list.length;
    const randomNum = random(listLength);
    return list[randomNum];
}


function recipeTemplate(recipe, index) {
    // Produce the same structure + classes used by the static HTML
    const tagsText = Array.isArray(recipe.tags) ? recipe.tags.join(', ') : (recipe.tags || '');
        return `<section id="maincontent" class="recipe">
    <a href="recipe.html?id=${index}" aria-label="View recipe: ${escapeHtml(recipe.name || 'Recipe')}"><img src="${escapeHtml(recipe.image || './images/default.jpg')}" alt="${escapeHtml(recipe.name || '404: Image Not Found')}" /></a>
    <div class="recipe-content">
        <p class="tags">${escapeHtml(tagsText)}</p>
        <h2><a href="recipe.html?id=${index}" aria-label="View recipe: ${escapeHtml(recipe.name || 'Recipe')}">${escapeHtml(recipe.name || '404: Name Not Found')}</a></h2>
        ${ratingTemplate(recipe.rating || 0)}
        <p class="description">${escapeHtml(recipe.description || '404: Description Not Found')}</p>
    </div>
</section>`;
}
function tagsTemplate(tags) {
    // kept for backward compatibility but the main template now renders tags as text
    const safeTags = Array.isArray(tags) ? tags : [];
    return safeTags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("");
}

function ratingTemplate(rating) {
    // Build rating HTML to match the static file's structure
    const safeRating = Number.isFinite(Number(rating)) ? Number(rating) : 0;
    let html = `<div class="rating" role="img" aria-label="${safeRating} out of 5 stars">`;
    for (let i = 1; i <= 5; i++) {
        if (i <= safeRating) {
            html += `<span aria-hidden="true">★</span>`;
        } else {
            html += `<span aria-hidden="true">☆</span>`;
        }
    }
    html += `</div>`;
    return html;
}
function renderRecipe(recipeList, offset = 0) {
    // Try to replace the existing #maincontent section (static HTML) so layout/classes match exactly
    const recipeHtmlArray = recipeList.map((recipe, i) => recipeTemplate(recipe, offset + i));
    const html = recipeHtmlArray.join("");

    const existingMain = document.getElementById('maincontent');
    if (existingMain) {
        // Replace the whole section so id/classes remain the same
        existingMain.outerHTML = html;
        // After replacing, move keyboard focus to the new recipe heading for screen-reader/keyboard users
        const newMain = document.getElementById('maincontent');
        if (newMain) {
            const heading = newMain.querySelector('h2');
            if (heading) {
                heading.tabIndex = -1; // make focusable
                heading.focus();
            }
        }
        return;
    }

    // Fallback: insert into the main container
    const mainContainer = document.querySelector('main.container');
    if (!mainContainer) {
        console.warn('renderRecipe: could not find target to render recipes.');
        return;
    }
    mainContainer.innerHTML = html;
    // ensure keyboard focus lands on the recipe heading when injected
    const newMain = document.getElementById('maincontent');
    if (newMain) {
        const heading = newMain.querySelector('h2');
        if (heading) {
            heading.tabIndex = -1;
            heading.focus();
        }
    }
}
function init() {
    // get a random recipe index so links point to the correct recipe in recipes.mjs
    const idx = random(recipes.length);
    const recipe = recipes[idx];
    // render the recipe and provide the original index as offset
    renderRecipe([recipe], idx);
    // initialize cook mode toggle (wake lock)
    try {
        initCookMode();
    } catch (err) {
        console.warn('initCookMode failed', err);
    }
}
init();