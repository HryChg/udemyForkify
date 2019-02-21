# 2019.02.18 12:38p
- created a config file where we can store the proxy and api key for for food2fork
- created a Recipe Model that saved a recipe object based on a search to Recipe ID


# 2019.02.20 9:36am
- read data (recipe ID in this case) from the page URL
- respond to the hashchange event (when current recipe ID changes)
- how to add the same event listener to multiple events (using foreach() in the recipe controller)


# 2019.02.20 12:34p
- used array method like map(), slice(), findIndex() and includes()
- when and why to use eval()
- parse thru similar terms like 'tbsp' and 'table spoon' 


# 2019.02.19 10:57am 
- implemented a for-loop inside a template string to for insert multiple ingredients in HTML('.recipe__ingredient-list')
- created the recipeView for rendering recipe onto index.html
- `recipe.formCount()`
    - added `fractional` package to convert float number back to fraction in (https://www.npmjs.com/package/fractional)
    - implemented destructuring from ES6 
- `searchView.highlightSelected()`
    - DOM manipulation to highlight selected recipe on the search list
    - used CSS selector for dynamic selection on recipe ID