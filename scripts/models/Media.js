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
            <a class="medium-card_link" id="medium_${this.id}"
                aria-label="${this.title}">
                ${this.thumbnailElement}
                    data-id="${this.id}"
                    src="../../assets/media/${this.photographerId}/${this.fileName}"
                    alt="${this.title}">
            </a>
            <div class="medium-card_legend">
                <h2 class="medium-card_title">${this.title}</h2>
                <span class="medium-card_likes" id="likes_${this.id}">${this.likes}</span><span><i id="icon_${this.id}" data-id="${this.id}" class="medium-card_likes-icon fas fa-heart"></i>
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
        this.slideShowElement = "<img class=\"medium-lightbox_medium-card_image\" ";
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
        this.slideShowElement = "<video controls class=\"medium-lightbox_medium-card_video\" ";
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