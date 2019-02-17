import axios from 'axios';
export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResult() {
        const proxy = "https://cors-anywhere.herokuapp.com/";
        const food2Fork_key = "f5e0def7610f4c445db7c0c0ed62d483";
        try {
            console.log("searching now");
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${food2Fork_key}&q=${this.query}`);
            this.result = res.data.recipes;
            console.log(this.result);

        } catch (err) {
            console.log(err);
        }
    }

    // EFFECTS: AJAX call to Edamam Food API with keyword: "red apple"
    async getEdamamResult() {
        const edamam_id = "bb08a934";
        const edamam_key = "109788009c2c1ca6ff5ac36a4698aa0a";
        const ingredient = "red%20apple";
        try {
            const result = await fetch(`https://cors-anywhere.herokuapp.com/https://api.edamam.com/api/food-database/parser?ingr=${ingredient}&app_id=${edamam_id}&app_key=${edamam_key}`);
            console.log(result.json());
        } catch (err) {
            console.log(err);
        }
    }
}