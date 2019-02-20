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


}