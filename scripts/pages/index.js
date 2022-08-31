   

import {FisheyeApi} from "../api/Api.js";
import { Photographer} from "../models/Photographer.js";
class FisheyeMain {
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
    const app = new FisheyeMain();
    app.main();
}

window.addEventListener("DOMContentLoaded", start);