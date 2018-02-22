const createRecentlyViewedCitiesBlockItem = (address) => {
    createForecastItem(document.getElementById('recently-viewed-cities-block'), 'li', `${address}`);
    renderForecastItem(`${address}`, `${address}`);
};

const createFavoriteCitiesBlockItem = (address) => {
    let item = document.createElement('option');
    item.id = `${address}-favorite-city`;
    item.value = address;
    item.innerText = address;
    document.getElementById('favorite-cities-block').appendChild(item);
};

const createForecastItem = (parentElement, createdElement, createdElementId, itemClass) => {
    let item = document.createElement(createdElement);
    item.id = createdElementId;
    item.classList = itemClass;
    parentElement.appendChild(item);
};

export {
    createRecentlyViewedCitiesBlockItem,
    createFavoriteCitiesBlockItem
};
