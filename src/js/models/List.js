import uniqid from 'uniqid';

export default class List{

    constructor() {
        this.items = [];
    }

    /**
     * MODIFIES: `this.items`
     * EFFECTS: create an item with unique ID and add it to internal items
     * @param {*} count should be a number > 0
     * @param {*} unit should a string
     * @param {*} ingredient should be a string depicting the ingredient
     */
    addItem(count, unit, ingredient) { 
        const item = {
            id: uniqid(), // unique ID, external package
            count,
            unit, 
            ingredient
        }
        this.items.push(item);
        return item;
    }

    /**
     * REQUIRES: id exists in `this.items`
     * MODIFIES: `this.items`
     * EFFECTS: Remove item from times base on the given id
     * @param {*} id should be string
     */
    deleteItem(id){
        /**
         * slice() does not mutate original array, splice() does
         * [2, 4, 9].splice(1, 1) --> 4,      original array is [2, 9]
         * [2, 4, 9].splice(1, 2) --> [4, 9], original array is [2]
         * [2, 4, 9].slice(1, 1)  --> null,   original array is [2, 4, 9]
         * [2, 4, 9].slice(1, 2)  --> 4,      original array is [2, 4, 9]
         */

        // loop thru all el in items and return the index of matching id
        const index = this.items.findIndex(el => el.id === id); 
        this.items.splice(index, 1); // 1 mean delete 1 element starting from `index`
    }

    /**
     * MODIFIES: `this.items`
     * EFFECTS: update a particular item with a new count
     * @param {*} id should be string
     * @param {*} newCount a new count for the item
     * 
     * `find(el => el.id === id)` will return the item of the matching id
     */
    updateCount(id, newCount){
        this.items.find(el => el.id === id).count = newCount;
    }
}