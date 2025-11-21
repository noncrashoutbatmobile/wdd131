import recipes from "./recipes.mjs";

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

function ratingTemplate(rating) {
    const safeRating = Number.isFinite(Number(rating)) ? Number(rating) : 0;
    let html = `<div class="rating" role="img" aria-label="${safeRating} out of 5 stars">`;
    for (let i = 1; i <= 5; i++) {
        html += i <= safeRating ? `<span aria-hidden="true">★</span>` : `<span aria-hidden="true">☆</span>`;
    }
    html += `</div>`;
    return html;
}

function highlightMatches(text, query) {
    if (!query) return escapeHtml(text);
    const re = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'ig');
    return escapeHtml(text).replace(re, match => `<mark>${match}</mark>`);
}

function recipeTemplate(recipe, index, query = '') {
    const tagsText = Array.isArray(recipe.tags) ? recipe.tags.join(', ') : (recipe.tags || '');
    return `<section class="recipe">
        <a href="recipe.html?id=${index}" aria-label="View recipe: ${escapeHtml(recipe.name || 'Recipe')}">
            <img src="${escapeHtml(recipe.image || './images/default.jpg')}" alt="${escapeHtml(recipe.name || '404: Image Not Found')}" />
        </a>
        <div class="recipe-content">
            <p class="tags">${highlightMatches(tagsText, query)}</p>
            <h2><a href="recipe.html?id=${index}" aria-label="View recipe: ${escapeHtml(recipe.name || 'Recipe')}">
                ${highlightMatches(recipe.name || '404: Name Not Found', query)}
            </a></h2>
            ${ratingTemplate(recipe.rating || 0)}
            <p class="description">${highlightMatches(recipe.description || '404: Description Not Found', query)}</p>
        </div>
    </section>`;
}

function renderRecipes(recipeList, query = '') {
    const main = document.querySelector('main.container');
    if (!main) return;
    main.innerHTML = recipeList.map((r, i) => recipeTemplate(r.recipe, r.index, query)).join('');
}

function searchHandler(event) {
    event.preventDefault();

    const input = document.querySelector('.search-input');
    const query = input ? input.value.trim() : '';
    if (!query) return;

    // Check if we're on recipe.html
    if (window.location.pathname.includes('recipe.html')) {
        const proceed = confirm("You're about to return to the main page. Are you sure you wish to proceed?");
        if (!proceed) return;

        // Redirect to main page with query param
        window.location.href = `index.html?search=${encodeURIComponent(query)}`;
        return;
    }

    // Perform search
    const results = recipes
        .map((r, i) => ({ recipe: r, index: i }))
        .filter(({ recipe }) => {
            const hay = [
                recipe.name?.toLowerCase() || '',
                recipe.description?.toLowerCase() || '',
                Array.isArray(recipe.tags) ? recipe.tags.join(' ').toLowerCase() : ''
            ].join(' ');
            return hay.includes(query.toLowerCase());
        });

    if (results.length === 0) {
        renderRecipes([{ recipe: { name: 'No results found', description: '', tags: [], rating: 0 }, index: 0 }], query);
    } else {
        renderRecipes(results, query);
    }
}

function init() {
    const input = document.querySelector('.search-input');
    const button = document.querySelector('.search-button');

    // Clear search on load
    if (input) input.value = '';

    // Handle query param from redirect
    const params = new URLSearchParams(window.location.search);
    const queryParam = params.get('search');
    if (queryParam) {
        if (input) input.value = queryParam;
        searchHandler({ preventDefault: () => {} });
    } else {
        // Show 1 random recipe on fresh load
        const idx = random(recipes.length);
        renderRecipes([{ recipe: recipes[idx], index: idx }]);
    }

    if (button) button.addEventListener('click', searchHandler);
    if (input) input.addEventListener('keydown', (e) => { if (e.key === 'Enter') searchHandler(e); });
}

init();
