let renderForecastItem = (parentElementId, content) => {
    let parentElement = document.getElementById(parentElementId);
    parentElement.innerHTML = content;
};

let renderForecastImgItem = (elementId, src) => {
    let icon = document.getElementById(elementId);
    icon.src = src;
};

export { renderForecastItem, renderForecastImgItem };