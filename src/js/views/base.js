// all the DOM elements are placed here
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'), 
    searchResPages: document.querySelector('.results__pages')
};

// a public variable containing all the HTML element ID strings
export const elementString = {
    loader: 'loader'
}


// EFFECTS: render the loading icon with infinite spinning!
export const renderLoader = parent => {
    const loader = `
        <div class="${elementString.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw">
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

// EFFECTS: delete the loading icon
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementString.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
}

