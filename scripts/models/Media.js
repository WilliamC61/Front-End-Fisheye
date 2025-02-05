export class Medium {
    constructor(data) {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.likes = data.likes;
        this.date = data.date;
        this.price = data.price;
    }

    get(property) {
        if (property in this) {
            return this[property];
        } else {
            throw new Error(`La propriété ${property} n'existe pas.`);
        }
    }

    createMediumArticle() {
        const article = document.createElement("article");
        article.classList.add("medium-card");
        const MediumArticle = `
            <div class="medium-card_medium" id="medium_${this.id}">
                ${this.thumbnailElement}
                    data-id="${this.id}" tabindex="0"
                    src="assets/media/${this.photographerId}/${this.fileName}"
                    ${this.altAttribute}>
            </div>
            <div class="medium-card_legend">
                <h2 class="medium-card_title">${this.title}</h2>
                <span class="medium-card_likes" id="likes_${this.id}">${this.likes}</span>
                <button aria-label="J'aime" id="icon_${this.id}" data-id="${this.id}" class="medium-card_likes-icon fas fa-heart">
                </button>
            </div>
        `;
        article.innerHTML= MediumArticle; 
        return article;
    }
}

export class Image extends Medium {
    constructor(data) {
        super(data);
        this.thumbnailElement = "<img class=\"medium-card_img\" ";
        this.thumbnailEndElement = "";
        this.altAttribute = `alt=\"${data.title}\"`;
        this.slideShowElement = "<img class=\"medium-lightbox_medium-card_image\" ";
        this.slideShowEndElement = "";
        this.fileName = data.image;
    }
    get(property) {
        if (property in this) {
            return this[property];
        } else {
            throw new Error(`La propriété ${property} n'existe pas.`);
        }
    }
}

export class Video extends Medium {
    constructor(data) {
        super(data);
        this.thumbnailElement = "<video class=\"medium-card_video\" ";
        this.thumbnailendElement = "</video>";
        this.altAttribute = "";
        this.slideShowElement = "<video controls class=\"medium-lightbox_medium-card_video\" ";
        this.slideShowEndElement = "</video>";
        this.fileName = data.video;
    }
    get(property) {
        if (property in this) {
            return this[property];
        } else {
            throw new Error(`La propriété ${property} n'existe pas.`);
        }
    }
}