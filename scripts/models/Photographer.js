export class Photographer {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.city = data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.price = data.price;
        this.portrait = data.portrait;
        this.likes = 0;
    }

    get(property) {
        if (property in this) {
            return this[property];
        } else {
            throw new Error(`La propriété ${property} n'existe pas.`);
        }
    }

    createPhotographerArticle() {
        const article = document.createElement("article");
        article.classList.add("photographers-section_article");
        const PhotographerArticle = `
            <a class="photographer-link"   
                href="photographer.html?id=${this.id.toString()}"
                aria-label="${this.name}">
                <img class="photographers-section_article_portrait" 
                    src="../../assets/photographersIDPict/${this.portrait}"
                    alt="${this.name}">
                <h2 class="photographers-section_article_name">${this.name}</h2>
            </a>
            <h3 class="photographers-section_article_location">${this.city}, ${this.country}</h3>
            <h4 class="photographers-section_article_tagline">${this.tagline}</h4>
            <h5 class="photographers-section_article_price">${this.price}€/jour</h5>
        `;
        article.innerHTML= PhotographerArticle; 
        return article;
    }

    createPhotographerHeader() {
        const div = document.createElement("div");
        div.classList.add("photographer-header");
        const PhotographerHeader = `
            <div class = photographer-header_presentation>
                <h1 class="photographer-header_name">${this.name}</h1>
                <h2 class="photographer-header_location">${this.city}, ${this.country}</h2>
                <h3 class= "photographer-header_tagline">${this.tagline}</h3>
            </div>
            <button class="photographer-header_contact-button" id="contact-me-button">Contactez-moi</button>
            <img class="photographer-header_portrait" src="../../assets/photographersIDPict/${this.portrait}">
        `;
        div.innerHTML= PhotographerHeader; 
        return div;
    }
}
