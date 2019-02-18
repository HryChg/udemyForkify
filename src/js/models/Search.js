import axios from 'axios';
import {key, proxy} from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
        } catch (err) {
            console.log(err);
        }
    }

    // EFFECTS: AJAX call to Edamam Food API with keyword: "red apple"
    // async getEdamamResult() {
    //     const edamam_id = "bb08a934";
    //     const edamam_key = "109788009c2c1ca6ff5ac36a4698aa0a";
    //     const ingredient = "red%20apple";
    //     try {
    //         const result = await fetch(`https://cors-anywhere.herokuapp.com/https://api.edamam.com/api/food-database/parser?ingr=${ingredient}&app_id=${edamam_id}&app_key=${edamam_key}`);
    //         console.log(result.json());
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
}