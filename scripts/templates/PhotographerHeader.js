export class PhotographerHeader {
    constructor(photographer) {
        this._photographer = photographer;
    }

    createPhotographerHeader() {
        const div = document.createElement("div");
        div.classList.add("photographer-header");
        const PhotographerHeader = `
            <div class = photographer-header_presentation>
                <h1 class="photographer-header_name">${this._photographer.name}</h1>
                <h2 class="photographer-header_location">${this._photographer.city}, ${this._photographer.country}</h2>
                <h3 class= "photographer-header_tagline">${this._photographer.tagline}</h3>
            </div>
            <button class="photographer-header_contact-button" id="contact-me-button">Contactez-moi</button>
            <img class="photographer-header_portrait" src="../../assets/photographersIDPict/${this._photographer.portrait}">
        `;
        div.innerHTML= PhotographerHeader; 
        return div;
    }

    get price(){
        return this._photographer.price;
    }
}
