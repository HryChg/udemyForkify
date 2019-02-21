import Search from './models/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
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
        
        try{
            // 4) Search for recipes
            await state.search.getResults();

            // 5) Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);   
        } catch (error) {
            alert('Something wrong with the search... ');
            clearLoader();
        }
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

const controlRecipe = async () => {
    /**
     * ** Get ID from URL **
     * window.location  return the url
     * window.location.hash return the hashcode within URL
     */
    const hashCode = window.location.hash;
    const id = hashCode.replace('#', ''); // replace '#' with nothing
    console.log(id);

    
    if (id) {
        // Prepare UI for changed    
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if (state.search) {
            searchView.highlightSelected(id);
        }
        

        // Create new recipe object
        state.recipe = new Recipe(id);

        try{
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (error) {
            alert('Error Processing Recipe');
        }
    }
};

/**
 * EFFECTS: add eventListener to these two events : 'hashchange' and 'load'
 *          if event is 'load', it allows the webpage to keep the current recipe id
 * 
 * hashchange: any change to the hash code in the URL. In this case, hashcode is the id of recipe
 * load: when the window reloads
 */
['hashchange', 'load'].forEach(event => {
    window.addEventListener(event, controlRecipe)
})


/**
 * EFFECTS: Handling Recipe button clicks.
 *          If the click event matches `btn-decrease` or any `child elements of btn-decrease`, 
 *          we update the servings and render the new result onto recipeView
 *          Note `servings` cannot be less than 1
 * 
 * `.btn-decrease *` is a Universal CSS selector that selects all child elements of `btn-decrease`
 */
elements.recipe.addEventListener('click', e => {

    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked --> `btn-decrease` or `any child elements of btn-decrease`

        if (state.recipe.servings > 1) { //servings cannot be 0 or negative
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }

    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button is clicked --> `btn-increase` or `any child elements of btn-increase`
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }

    console.log(state.recipe);
});