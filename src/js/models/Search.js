import axios from 'axios';
export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResult() {
        const food2Fork_key = "f5e0def7610f4c445db7c0c0ed62d483";
        const edamam_id = "bb08a934";
        const edamam_key = "109788009c2c1ca6ff5ac36a4698aa0a";
        try {
            // const res = await axios(`https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            const result = await fetch(`https://cors-anywhere.herokuapp.com/https://api.edamam.com/api/food-database/parser?ingr=red%20apple&app_id=${edamam_id}&app_key=${edamam_key}`);
            console.log(result.json());
        } catch (err) {
            console.log(err);
        }
    }

    async getInfo(){
        try {
            const app_id = "bb08a934";
            const app_key = "109788009c2c1ca6ff5ac36a4698aa0a";
            const result = await fetch(`https://api.edamam.com/api/food-database/parser?ingr=red%20apple&app_id=${app_id}&app_key=${app_key}`);
            console.log(result.json());
    
        } catch (err) {
            console.log(err);
        }
        
    }
}