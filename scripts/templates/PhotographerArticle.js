export class PhotographerArticle {
    constructor(photographer) {
        this._photographer = photographer;
    }

    createPhotographerArticle() {
        const article = document.createElement("article");
        article.classList.add("photographers-section_article");
        const PhotographerArticle = `
            <a class="photographer-link"   
                href="photographer.html?id=${this._photographer.id.toString()}"
                aria-label="${this._photographer.name}">
                <img class="photographers-section_article_portrait" 
                    src="../../assets/photographersIDPict/${this._photographer.portrait}"
                    alt="${this._photographer.name}">
                <h2 class="photographers-section_article_name">${this._photographer.name}</h2>
            </a>
            <h3 class="photographers-section_article_location">${this._photographer.city}, ${this._photographer.country}</h3>
            <h4 class="photographers-section_article_tagline">${this._photographer.tagline}</h4>
            <h5 class="photographers-section_article_price">${this._photographer.price}€/jour</h5>
        `;
        article.innerHTML= PhotographerArticle; 
        return article;
    }
}
