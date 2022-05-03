import {FisheyeApi} from "../api/Api.js";
import {Photographer} from "../models/Photographer.js";
import {MediaFactory } from "../factories/MediaFactory.js";
import {Medium} from "../models/Media.js";


/**
 * @class FisheyePhotographer : manages the page dedicated to a photogrpaher. 
 */
class FisheyePhotographer {
    /**
     * @constructor : initialiazes the class for the photogrpaher with ID 
     *      passed in parameter.
     * @param {Interger} photographerId : Id of the photographer
     */
    constructor(photographerId) {
        // photogrpaher Id is saved as reused in some methods
        this.photographerId = photographerId;
        // intantiation of the API to retrive the data
        this.api = new FisheyeApi("/data/photographers.json");
        // search and save the different dynamyc elements
        this.photographerDiv = document.querySelector("#photographer");
        this.mediaDiv = document.querySelector("#media");
        this.likesDiv = document.querySelector("#likes");
        this.priceDiv = document.querySelector("#price");
        // the following properties are filled by other methods.
        this.photographerMediaArray = [];
        this.photographerLikes = 0;
        this.photographerPrice = 0;
    }

    /**
     * @method : sorts the media array depending on the criteria following the
     *      criteria given in parameter.
     * @param {String= "likes, date, title"} : sortCriteria to use 
     */
    sortPhotographerMedia(sortCriteria) {
        switch (sortCriteria) {
        case "likes":
            // sort by decreasing likes (most popular first)
            this.photographerMediaArray.sort((a, b) => b.likes-a.likes);
            break;
        case "date":
            // sort by decreasing date (most recent first)
            this.photographerMediaArray.sort((a, b) => b.date.localeCompare(a.date));
            break;
        case "title":
            // sort by increasing title 
            this.photographerMediaArray.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            // unexpectd value => error
            throw `Unknow sort criteria:${sortCriteria}`;
        }
    }
   
    /**
     * @method displayPhotographerPrice() : displays photogrper's price per day
     *      in the bottom panel. Called once when the photogrpher header is
     *      displayed.
     */

    displayPhotographerPrice() {
        this.priceDiv.innerHTML= `
            <p class="price">${this.photographerPrice}€/jour</p>`;
    }

    /**
     * @method displayPhotographerLikes() : displays photogrper's cumulated
     *      likes in the bottom panel. Called each time the media are displayed
     *      or refreshed.
     */

    displayPhotographerLikes() {
        this.likesDiv.innerHTML= `
        <span class="likes">${this.photographerLikes}
            <i class="likes-icon fas fa-heart"></i>
        </span>`;
    }

    /**
     * @method displayPhotographerMedia() : displays the grid of photogrper's
     *      media and compute the cumulated likes to display it in the bottom
     *      panel. Called each time the media are displayed or refreshed.
     * @assumption : the media array has been built and sorted before call.
     */
   
    displayPhotographerMedia() {
        // empty the Media div and reset the like counter
        this.mediaDiv.innerHTML = "";
        this.photographerLikes = 0;
        // loop to append each medium article, and add medium likes to counter
        this.photographerMediaArray.forEach (medium => {
            const Template = medium.createMediumArticle();
            this.mediaDiv.appendChild(Template);
            this.photographerLikes += medium.likes; 
        });
        // display likes counter
        this.displayPhotographerLikes();
    }

    /**
     * @method : displayPhotographerHeaders : display the photographer header 
     *      whose ID match the ID given in parameter 
     * @param {Array of photographer data} photographersData : photogrpahers
     *      data part of the API. 
     */
    displayPhotographerHeader(photographersData) {
        // serch the photographer data set by ID and create photographer's
        // header template when found
        let Template = null;
        photographersData.forEach(photographer=>{
            if (photographer.id === this.photographerId) {
                Template = new Photographer(photographer);
            }
        });    
        // if not found throw an error
        if (Template === null) {
            throw `photographer with ID =${this.photogrpaherID} not found`;
        } 
        // display the photogrpaher template
        this.photographerDiv.appendChild(Template.createPhotographerHeader());
        // keep photographer price for below right frame
        this.photographerPrice = Template.price;
        this.displayPhotographerPrice();
    }

    buildPhotographerMediaArray(mediaData){
        mediaData.forEach(medium=>{
            if (medium.photographerId === this.photographerId){
                this.photographerMediaArray.push(new MediaFactory(medium));
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
        this.buildPhotographerMediaArray(fisheyeData.media);
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