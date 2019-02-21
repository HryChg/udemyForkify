import {
    elements
} from './base.js';

// EFFECTS: return the result in the search__field (input text)
export const getInput = () => elements.searchInput.value;

// EFFECTS: clear the test in the search_field
export const clearInput = () => {
    elements.searchInput.value = '';
};

// EFFECTS: clearing the searched result list and the page buttons 
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

/**
 * EFFECTS: remove all highlighted search item in HTML, then only highlight the selected search item by adding a 
 *          new class `results__link--active` to the selected recipe id
 * 
 * `a[]` is a CSS selector. 
 * In this case, `a[href*="#${id}"]` selects HTML elements based on the attribute `href`
 * 
 * @param {*} id the id of the recipe
 */
export const highlightSelected = id => {
    // remove highlight on previously selected items
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });

    document.querySelector(`a[href*="#${id}"]`).classList.add('results__link--active');
};

/* 
EFFECTS: return a string within limit (default = 17)
EXAMPLE:
    'Pasta with tomato and spinach' => ['Pasta', 'with', 'tomato', 'and', 'spinach']
    acc: 0  / acc + cur.length = 5  / newTitle = ['Pasta']
    acc: 5  / acc + cur.length = 9  / newTitle = ['Pasta', 'with']
    acc: 9  / acc + cur.length = 15 / newTitle = ['Pasta', 'with', 'tomato']
    acc: 15 / acc + cur.length = 18 / stop adding to the list
    acc: 18 / acc + cur.length = 24 / stop adding to the list
*/
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        /** reduce() is basically a for-each loop
         * @param acc is can be initialized any way you want, here we have it 
         *            accumulate to the total length of string so far
         * @param cur is the current element being processed
         * 
         * returns the new value of `acc`
        */
        title.split(' ').reduce((acc, cur) => {
            // if the accumulated string length plus curr word's length is under limit
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length; // return the new val of acc
        }, 0);                       // init value for acc

        return `${newTitle.join(' ')} ...`;
    }
    return title;
}


// EFFECTS: create one recipe HTML (w/ recipe id, img, title, and publisher) and insert
//          into searchResList with title string length limited
const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

/** 
 * EFFECTS: return an HTML of a page btn based on the given page and the desired type
 *  @param page: the page number on the btn
 *  @param type: 'prev', 'next'
 */
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

/**
 * EFFECTS: render the page btns on 'searchResPages'
 * @param {*} page: the current page of searchResPages
 * @param {*} numResults: the number of recipes to display
 * @param {*} resPerPage: the num of recipes allowed per page
 */
const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage); // calc num of pages needed
    let button;
    if (page === 1 && pages > 1) {
        // Only Button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // Both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        // Only button to go to previous page
        button = createButton(page, 'prev');
    }
    
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

/**
 * EFFECTS: display recipes in pages
 * @param {*} recipes: all recipes to be displayed
 * @param {*} page: first page to show on searchResPages
 * @param {*} resPerPage: num of recipes in one page
 */
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // render results of current page
    const start = (page - 1) * resPerPage;           // start of the rendered recipes
    const end = page * resPerPage;                   // end of the rendered recipes
    recipes.slice(start, end).forEach(renderRecipe); // slice extract [start, end) of the recipes array (exclusive)

    // render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};