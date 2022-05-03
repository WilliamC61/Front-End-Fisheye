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
            <a class="medium-card_link" id= this.medium.id
                href="#"
                aria-label="${this.title}">
                ${this.thumbnailElement}
                    src="../../assets/media/${this.photographerId}/${this.fileName}"
                    alt="${this.title}">
            </a>
            <div class="medium-card_legend">
                <h2 class="medium-card_title">${this.title}</h2>
                <span class="medium-card_likes">${this.likes}<span><i class="medium-card_likes-icon fas fa-heart"></i>
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