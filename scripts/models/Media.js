class Medium {
    constructor(data) {
        this._id = data.id;
        this._photographerId = data.photographerId;
        this._title = data.title;
        this._likes = data.likes;
        this._date = data.date;
        this._price = data.price;
    }

    get id() {
        return this._id;
    }
    get photographerId() {
        return this._photographerId;
    }

    get title() {
        return this._title;
    }

    get likes() {
        return this._likes;
    }

    get date() {
        return this._date;
    }

    get price() {
        return this._price;
    }
}

export class Image extends Medium {
    constructor(data) {
        super(data);
        this._thumbnailElement = "<img class=\"medium-card_img\" ";
        this._thumbnailFile = data.image;
    }

    get thumbnailElement() {
        return this._thumbnailElement;
    }
    
    get thumbnailFile() {
        return this._thumbnailFile;
    }
}

export class Video extends Medium {
    constructor(data) {
        super(data);
        this._thumbnailElement = "<video class=\"medium-card_video\" ";
        this._thumbnailFile = data.video;
    }
    get thumbnailElement() {
        return this._thumbnailElement;
    }
    
    get thumbnailFile() {
        return this._thumbnailFile;
    }
}