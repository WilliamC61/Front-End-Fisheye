export class Photographer {
    constructor(data) {
        this._id = data.id;
        this._name = data.name;
        this._city = data.city;
        this._country = data.country;
        this._tagline = data.tagline;
        this._price = data.price;
        this._portrait = data.portrait;
        this._nbLike = 0;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get location() {
        return `${this._city}, ${this._country}`;
    }

    get tagline() {
        return this._tagline;
    }

    get price() {
        return this._price;
    }

    get portrait() {
        return this._portrait;
    }
}
