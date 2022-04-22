import {FisheyeApi} from "../api/Api.js";
import {PhotographerHeader} from "../templates/PhotographerHeader.js";
import { MediaFactory } from "../factories/MediaFactory.js";
import {MediumArticle} from "../templates/MediumArticle.js";

class FisheyePhotographer {
    constructor(photographerId) {
        this.api = new FisheyeApi("/data/photographers.json");
        this.photographerDiv = document.querySelector("#photographer");
        this.mediaDiv = document.querySelector("#media");
        this.likesAndPriceDiv = document.querySelector("#likes-and-price");
        this.photographerId = photographerId;
        this.photographerMediaArray = [];
        this.photographerLikes = 0;
        this.photographerPrice = 0;
    }

    // method to sort the media array depending on the criteria
    sortPhotographerMedia(sortCriteria) {
        if (sortCriteria === "likes") {
            // sort by decreasing likes (most popular first)
            this.photographerMediaArray.sort((a, b) => b.likes-a.likes);
        } else if (sortCriteria === "date") {
            // sort by decreasing date (most recent first)
            this.photographerMediaArray.sort((a, b) =>{
                if (a.date>b.date) {
                    return-1;
                }
                else if (a.date<b.date) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else if (sortCriteria === "title") {
            // sort by increasing title 
            this.photographerMediaArray.sort((a, b) => {
                if (a.title<b.title) {
                    return-1;
                }
                else if (a.title>b.title) {
                    return 1;
                } else {
                    return 0;
                }    
            });
        } else {
            throw `Unknow sort criteria:${sortCriteria}`;
        }
    }
   

    // displays photographer media and compute global likes 
    displayPhotographerMedia() {
        // empty the Media div and reset the like counter
        this.mediaDiv.innerHTML = "";
        this.photographerLikes = 0;
        this.photographerMediaArray.forEach (medium => {
            const Template = new MediumArticle(medium);
            this.mediaDiv.appendChild(Template.createMediumArticle(this.photographerId));
            this.photographerLikes += medium.likes; 
        });
        this.likesAndPriceDiv.innerHTML= `
            <span class="likes-and-price_likes">${this.photographerLikes}
                <i class="likes-and-price_likes-icon fas fa-heart"></i>
            </span>
            <p class="likes-and-price_price">${this.photographerPrice}€/jour</p>`;
    }


   


    displayPhotographerHeader(photographersData) {
        // serch the photographer data by ID and create photographer header template when found
        let Template = null;
        photographersData.forEach(photographer=>{
            if (photographer.id === this.photographerId) {
                Template = new PhotographerHeader(photographer);
            }
        });    
        // if not found throw an error
        if (Template===null) {
            throw `photographer with ID =${this.photogrpaherID} not found`;
        } 
        this.photographerDiv.appendChild(Template.createPhotographerHeader());
        // keep photographer price for below right frame
        this.photographerPrice= Template._photographer.price;
    }

    buildMediaArray(mediaData){
        mediaData.forEach(medium=>{
            if (medium.photographerId === this.photographerId){
                if (Object.prototype.hasOwnProperty.call(medium, "image")) {
                    this.photographerMediaArray.push(new MediaFactory(medium, "image"));
                }
                else if (Object.prototype.hasOwnProperty.call(medium,"video")) {
                    this.photographerMediaArray.push(new MediaFactory(medium, "video"));
                }
                else {
                    throw " medium is neither image nor video";
                }
            }
        });
    }
    // callback for contact-me
    displayContactMeForm() {
        console.log ("contact me");
    }
    // callback when the sortCriteria change
    sortCriteriaChange = (event) => {
        console.log(event.target.value);
        this.sortPhotographerMedia(event.target.value);
        this.displayPhotographerMedia();
    };

    async main() {
        // get data from api
        const fisheyeData = await this.api.getData();
        // display photographer header
        this.displayPhotographerHeader(fisheyeData.photographers);
        // build the array of the photographer's media
        this.buildMediaArray(fisheyeData.media);
        // sort of the array with default criteria : decreasing like (most popular first)
        this.sortPhotographerMedia ("likes");
        // and initial display of the media
        this.displayPhotographerMedia();

        // set-up of the call back for contact me button 
        const contactMeButton = document.querySelector("#contact-me-button");
        contactMeButton.addEventListener("click", this.displayContactMeForm);

        // set-up of the call back for sort criteria change 
        const sortCriteriaSelect = document.querySelector("#sort-criteria");
        sortCriteriaSelect.addEventListener("change", this.sortCriteriaChange);
    }
}

// event call back functions

function displayLightBox(event)
{
    console.log(event);
}


function start() {
    // get photographer ID and convert it to a number (same format as json data)
    const pageURL = window.location.search;
    const urlParams = new URLSearchParams(pageURL);
    const photographerId = Number(urlParams.get("id"));
    // instantiation of the DOM elements
    const app = new FisheyePhotographer(photographerId);
    app.main();
}

// event listening set-up



window.addEventListener("DOMContentLoaded", start);