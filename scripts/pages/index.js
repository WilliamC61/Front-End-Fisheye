   

import {FisheyeApi} from "../api/Api.js";
import { PhotographerArticle} from "../templates/PhotographerArticle.js";
class FisheyeIndex {
    constructor() {
        this.photographersSection = document.querySelector(".photographers-section");
        this.api = new FisheyeApi("/data/photographers.json");
    }

    async main() {
        const fisheyeData = await this.api.getData();
        console.log(fisheyeData);
        const photographersData = fisheyeData.photographers;
        photographersData.forEach(photographer=>{
            const Template = new PhotographerArticle(photographer);
            this.photographersSection.appendChild(Template.createPhotographerArticle());
        });
    }
}

function start() {
    const app = new FisheyeIndex();
    app.main();
}

window.addEventListener("DOMContentLoaded", start);