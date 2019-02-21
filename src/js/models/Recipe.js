import axios from 'axios';
import {key, proxy} from '../config';

export default class Recipe{
    constructor(id){
        this.id = id;
    }

    /**
     * EFFECTS: make an AJAX call to fork2food api with the recipe ID and save that result to this.recipe
     */
    async getRecipe() {
        try{
            const res = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            console.log(error);
            alert('Something when wrong while getting recipe from ID');
        }
    }

    /** EFFECTS: calculate the time needed to cook for this.recipe
     *           Assume we need 15 min for every 3-ingredients
     */
    calcTime(){
        const numIng = this.ingredients.length; // num of ingredients
        const periods = Math.ceil(numIng/3);
        this.time = periods * 15;
    }

    /** 
     * EFFECTS: calculate the serving for each recipe. It is hard-coded to 4 servings right now 
    */
    calcServings(){
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];

        /** 
         * map(): creates a new array with the result of calling function on every element in the calling array()
         * 
         * findIndex(): An async ES6 method that returns the index of the first element
         *              in the array that satisfies the provided testing function (in this case : includes())
         * includes():  An ES7 method that returns true when the array contain given elements
         * 
         * forEach(elt, i): note that i is the index of elt 
         * 
         * eval() will take a string and evaluate it as a normal javascript code
         */
        const newIngredients = this.ingredients.map(el => {
            // 1) uniform units
            let ingredient  = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]); // replace all long unit in one ingredient to short unit
            });

            // 2) remove parenthesis and the content within one ingredient
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' '); 

            // 3) parse one ingredient string into count, unit, and ingredient
            const ingStrArr = ingredient.split(' '); // split one ingredient string to an string array 'ingStrArr'

            // unitIndex is the first index of the an valid unit in ingStrArr, -1 if not found
            const unitIndex = ingStrArr.findIndex(el2 => units.includes(el2)); 
            
            let objIng;
            if (unitIndex > -1){
                // There is a unit and a number

                    /**
                     * E.g. 4 1/2 cups, arrCount is [4 1/2] --> eval('4+1/2') --> 4.5
                     * E.g. 4 cup, arrCount = [4] --> ''
                     */
                const arrCount = ingStrArr.slice(0, unitIndex);  // extract front part until the unit index
                let count;
                if (arrCount.length === 1){
                    count = eval(ingStrArr[0].replace('-', '+'));          // '1-1/3' or '1' --> '1+1/3' or '1'
                    
                } else {
                    count = eval(ingStrArr.slice(0, unitIndex).join('+')); // '1 1/3' --> 1+1/3
                }

                objIng = {
                    count,
                    unit: ingStrArr[unitIndex],
                    ingredient: ingStrArr.slice(unitIndex + 1).join(' ')
                };


            } else if ( parseInt(ingStrArr[0], 10) ) {
                // There is NO unit, but 0th element in ingStrArr is a number
                objIng = {
                    count: parseInt(ingStrArr[0], 10),
                    unit: '',
                    ingredient: ingStrArr.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // There is NO unit and NO number in 0th position
                // E.g. 'slice of tomato', where slice is not a valid units
                objIng = {
                    count: 1, 
                    unit: '',
                    ingredient,
                }
            }

            console.log('parseIngredients() ---- objIng is:'); console.log(objIng); 
            return objIng;
        });

        this.ingredients = newIngredients;
    }

}