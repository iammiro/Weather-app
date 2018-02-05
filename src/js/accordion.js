const accordionForWeekForecast = () => {
    const el = document.getElementById('week-forecast-wrapper');
    el.addEventListener("click", function (event) {
        if (event.target.classList.contains('accordion')) {
            event.target.classList.toggle("active");
            let panel = event.target.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        }
    })
};

export {accordionForWeekForecast};
