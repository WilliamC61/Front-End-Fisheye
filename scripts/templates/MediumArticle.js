export class MediumArticle {
    constructor(medium) {
        this._medium = medium;
    }

    createMediumArticle(photographerId) {
        const article = document.createElement("article");
        article.classList.add("medium-card");
        const MediumArticle = `
            <a class="medium-card_link" id= this._medium.id
                href="#"
                aria-label="${this._medium.title}">
                ${this._medium.thumbnailElement}
                    src="../../assets/media/${photographerId}/${this._medium.thumbnailFile}"
                    alt="${this._medium.title}">
            </a>
            <div class="medium-card_legend">
                <h2 class="medium-card_title">${this._medium.title}</h2>
                <span class="medium-card_likes">${this._medium.likes}<i class="medium-card_likes-icon fas fa-heart"></i></span>
            </div>
        `;
        article.innerHTML= MediumArticle; 
        return article;
    }
}