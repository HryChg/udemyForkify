import { elements } from './base';
import { Fraction } from 'fractional';

/**
 * REQUIRES: `factional` package 
 * EFFECTS: return a string that is the fraction representation of count
 * 
 * 
 * 
 * @param {*} count 
 */
const formatCount = count => {
    if (count){
        // count = 2.5 -> 2 1/2
        // count = 0.5 -> 1/2

        // destructure a two elt strArray to two constants (ES6 syntax)
        const [int, dec] = count.toString().split('.').map(el => parseInt(el, 10));
 
        // if no decimal
        if (!dec) return count;

        // if no int, but decimal  0.5 -> 1/2
        if (int === 0) {
            const fr = new Fraction(count);
            return `${fr.numerator}/${fr.denominator}`;
        } else { // if 2.5 -> 2 1/2
            const fr = new Fraction(count - int); // fraction only on the decimal part
            return `${int} ${fr.numerator}/${fr.denominator}`;
        }
    }
    return '?';
};

/** 
 * EFFECTS: return a HTML string of one ingredient
 */
const createIngredient = ingredient => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredient.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient}
        </div>
    </li>
`;

/**
 * EFFECTS: clear the recipe rendering in HTML
 */
export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
};

/**
 * EFFECTS: render the HTML representation of recipe to index.html, including the recipe title, image, directions, ingredients ... etc
 */
export const renderRecipe = recipe => {
    const markup = `
            <figure class="recipe__fig">
                <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>

            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart-outlined"></use>
                    </svg>
                </button>
            </div>

            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                    ${recipe.ingredients.map(el => createIngredient(el)).join('')}                    
                </ul>

                <button class="btn-small recipe__btn recipe__btn--add">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
    `;
    elements.recipe.insertAdjacentHTML('afterbegin', markup);
};

/**
 * EFFECTS: update the recipeView with the new number of servings and the new count of ingredients
 * 
 * `document.querySelectorAll('.recipe__count')` will return an array of all HTML elements that are of `recipe__count` class
 */
export const updateServingsIngredients = recipe => {
    // Update the Servings
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

    // Update the Ingredients
    const countElements = Array.from(document.querySelectorAll('.recipe__count'));
    countElements.forEach((el, i) => {
        el.textContent = formatCount(recipe.ingredients[i].count);
    });
};