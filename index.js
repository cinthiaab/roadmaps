(function render() {
    fetch("fontend/beginners/roadmap.json")
        .then(resp => createStep(resp.json(), 'start'))
        .catch(error => console.log(error));
})();

function createStep(content, justify) {
    const htmlTemplate = `
        <div class="row row-${justify == 'start' ? 1 : 2}">
            <section>
            <i class="${content.iconClasses}"></i>
            <div class="details">
                <span class="title">${content.name}</span>
            </div>
            <p>${content.description}</p>
            <div class="bottom">
                <a href="${content.link}">Saiba Mais</a>
            </div>
            </section>
        </div>
    `;
    
    // https://stackoverflow.com/a/35385518
    var template = document.createElement('template');
    template.innerHTML = htmlTemplate.trim();
    const step = template.content.firstChild;

    document.querySelector(".wrapper").appendChild(step);

    if(content.nextSteps) {
        content.nextSteps.forEach(nextContent => {
            createStep(nextContent, justify == 'start' ? 'end' : 'start');
        });
    }
}