   

import {FisheyeApi} from "../api/Api.js";
import { Photographer} from "../models/Photographer.js";
class FisheyeIndex {
    constructor() {
        this.photographersSection = document.querySelector(".photographers-section");
        this.api = new FisheyeApi("data/photographers.json");
    }

    async main() {
        const fisheyeData = await this.api.getData();
        const photographersData = fisheyeData.photographers;
        photographersData.forEach(photographer=>{
            const Template = new Photographer(photographer);
            this.photographersSection.appendChild(Template.createPhotographerArticle());
        });
    }
}

function start() {
    const app = new FisheyeIndex();
    app.main();
}

window.addEventListener("DOMContentLoaded", start);