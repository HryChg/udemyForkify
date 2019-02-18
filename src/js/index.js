import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';
import Recipe from './models/Recipe';

/** Global state of the app
* - Search Object
* - Current recipe object 
* - Shopping list object
* - Liked Recipe
*/
const state = {};

/**
 * SEARCH CONTROLLER
 */
// EFFECTS: display searchView on left column
const controlSearch = async () => {
    // 1) get the search keywords from view
    const query = searchView.getInput();
    
    if (query) {
        // 2) New Search Object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes); // the spinner
        
        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }

}

// EFFECTS: display SearchView upon clicking 'submit'
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); // prevent page from reloading
    controlSearch();
});

// EFFECTS: change page upon clicking 'prev' and 'next' btns
elements.searchResPages.addEventListener('click', e => {

    /**
     * closest(): 
     * U pon clicking the page btns, it will find the closest CSS class around the clicked region.
     * In this case, it should be the 'btn-inline' class. That class is then returned to 'btn'
     */
    const btn = e.target.closest('.btn-inline'); 
    
    /**
     * The prev/next btns have an attribute called 'data-goto'
     * which contain the page number we goto later.
     * Extract that number and render the next page
     */
    if (btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});


/**
 * RECIPE CONTROLLER
 */
const r = new Recipe(35382);
r.getRecipe();
console.log(r);
