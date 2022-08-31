import {FisheyeApi} from "../api/Api.js";
import {Photographer} from "../models/Photographer.js";
import {MediaFactory} from "../factories/MediaFactory.js";
import {Medium} from "../models/Media.js";


/**
 * @class FisheyePhotographer : manages the page dedicated to a photographer. 
 */
class FisheyePhotographer {
    /**
     * @constructor : initialiazes the class for the photogrpaher with ID 
     *      passed in parameter.
     * @param {Integer} photographerId : Id of the photographer
     */
    constructor(photographerId) {
        // photographer Id is saved as reused in some methods
        this.photographerId = photographerId;
        // instantiation of the API to retrieve the data
        this.api = new FisheyeApi("data/photographers.json");
        // search and save the different dynamyc elements
        this.photographerDiv = document.getElementById("photographer");
        this.mediaDiv = document.getElementById("media");
        this.likesDiv = document.getElementById("likes");
        this.priceDiv = document.getElementById("price");
        this.slideShowMediumCard = document.getElementById("medium-lightbox_medium-card");
        // the following properties are filled by other methods.
        this.photographerMediaArray = [];
        this.photographerLikes = 0;
        this.photographerPrice = 0;
        this.slideIndex = "";
    }

    /**
     * @method : sorts the media array depending on the criteria given in
     *      parameter.
     * @param {String= "likes, date, title"} : sortCriteria to use to sort the
     *      media array 
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
     * @method displayPhotographerPrice() : displays photographer's price per day
     *      in the bottom panel. Called once when the photogra      pher header is
     *      displayed.
     * @memberof FisheyePhotographer
     */

    displayPhotographerPrice() {
        this.priceDiv.innerHTML= `
            <p class="price">${this.photographerPrice}€/jour</p>`;
    }

    /**
     * @method displayPhotographerLikes() : displays photogrper's cumulated
     *      likes in the bottom panel. Called each time the media are displayed
     *      or refreshed.
     * @memberof FisheyePhotographer
     */

    displayPhotographerLikes() {
        this.likesDiv.innerHTML= `
        <span class="likes">${this.photographerLikes}
            <i class="likes-icon fas fa-heart"></i>
        </span>`;
    }

    displaySlide() {
        const medium = this.photographerMediaArray[this.slideIndex];
        this.slideShowMediumCard.innerHTML = `
            ${medium.slideShowElement} src="assets/media/${this.photographerId}/${medium.fileName}">
            ${medium.slideShowEndElement}             
            <h2 class="medium-lightbox_medium-card_legend">${medium.title}</h2>
        `;
    }

    previousSlide = (event) => { 
        event.stopPropagation;
        if (--this.slideIndex === -1) {
            this.slideIndex = this.photographerMediaArray.length - 1;
        }
        this.displaySlide();
    };

    nextSlide = (event) =>  {
        event.stopPropagation;
        if (++this.slideIndex === this.photographerMediaArray.length) {
            this.slideIndex = 0;
        }
        this.displaySlide();
    };

    closeSlideShow = (event) => {
        event.stopPropagation;
        // remove the keydown call back
        document.removeEventListener("keydown", this.mediumLightboxKeydown);
        // hide the lightbox
        const mediumLightbox = document.querySelector(".medium-lightbox");
        mediumLightbox.style.display = "";
        // and enable scrolling
        const bodyElement = document.querySelector("body");
        bodyElement.classList.remove("body-scroll-disable");
        
    };

    mediumLightboxKeydown = (event) => {
        switch(event.key) {
        case "ArrowLeft":
        case "ArrowUp" :
            this.previousSlide(event);
            break;
        case "ArrowDown":
        case "ArrowRight":
            this.nextSlide(event);
            break;
        case "Escape":
            this.closeSlideShow(event);
            break;
        }
    };
    
    /**
     * @method DisplaySlideShow : initialization and display of the slide show
     *      of the photographer's media. 
     *      The Id of clicked medium is retrieved using dataset.id of the
     *      medium target of the event. mei displaying the media which Id is obtain  given in
     *      parameter.
     *      The index of this medium is then searched in the media array to
     *      initialize the slide show index.
     *      Proper call back are set up for button click and arrow press, the
     *      scrolling is disabled. 
     *      The slide show is then event driven with the methods nextSlide,
     *      previousSlide and closeSlideShow.
     *      The media are displayed in a loop : with next, when last one is reached, next
     *      one is first. Same management for previous.
     *
     * @param {event} click event on a medium
     * @throw error message if the medium id is not found in the media arry
     * @memberof FisheyePhotographer
     */
    displaySlideShow= (event) => {
        // retrieve the initial medium If to initiate the slide show with the
        // clicked medium
        const initialMediumId = Number(event.target.dataset.id);
        // search the index of the initialMediumId in the media array
        let slideIndex = 0;
        while((slideIndex !== this.photographerMediaArray.length) &&
                (this.photographerMediaArray[slideIndex].id !== initialMediumId)) {
            slideIndex++;
        }
        // if not found throw an error
        if (slideIndex === this.photographerMediaArray.length) {
            throw (`medium id="${initialMediumId}" not found`);
        }
        // found => store it to use it in the previous and next callbacks
        this.slideIndex = slideIndex;
        // set the call back for buttons click management
        const leftArrow = document.getElementById("medium-lightbox_left_arrow");
        leftArrow.addEventListener("click", this.previousSlide);
        const rightArrow = document.getElementById("medium-lightbox_right_arrow");
        rightArrow.addEventListener("click", this.nextSlide);
        const closeButton = document.getElementById("medium-lightbox_close_button");
        closeButton.addEventListener("click", this.closeSlideShow);
        // set call back for key press
        //mediumLightbox.addEventListener("keydown", this.mediumLightboxKeydown());
        // display the medium (video or image)
        this.displaySlide();
        // disable scrolling
        const bodyElement = document.querySelector("body");
        bodyElement.classList.add("body-scroll-disable");
        // display the lightbox
        const mediumLightbox = document.getElementById("medium-lightbox");
        mediumLightbox.style.display = "flex";
        // set call back for key press
        document.addEventListener("keydown", this.mediumLightboxKeydown);
    };
/**
     * @method iLikeIt() : manage the click on like icon:
     *      - stop propagation of the event
     *      - removal of the event listening to avoid double like.
     *      - class change to indicate that the click is not possible
     *         and change iconcolor to show it was liked
     *      - increments both unitary and global counters, and display them.
     * 
     */

    iLikeIt = (event) => {
        event.stopPropagation;
        // remove the call back 
        const mediumLikesIcon = document.getElementById(`${event.target.id}`);
        mediumLikesIcon.removeEventListener("click", this.iLikeIt);
        // remove the pointer cursor on hover
        mediumLikesIcon.classList.replace("medium-card_likes-icon","medium-card_liked-icon");
        // increment the medium likes
        const mediumLikes = document.getElementById(`likes_${event.target.dataset.id}`);
        let nbLikes = Number(mediumLikes.textContent) + 1;
        mediumLikes.textContent = nbLikes.toString();
        // increment the photogrphers like 
        this.photographerLikes ++;
        this.displayPhotographerLikes();
    };

    /**
     * @method displayPhotographerMedia() : displays the grid of photogrper's
     *      media and compute the cumulated likes to display it in the bottom
     *      panel. Called at the page creation and each time the sort criteria
     *      is changed
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
            // set call back for slideshow
            const mediumThumbnailElement = document.getElementById(`medium_${medium.id}`);
            mediumThumbnailElement.addEventListener("click", this.displaySlideShow);
            // set callback for likes icon
            const mediumLikesIcon = document.getElementById(`icon_${medium.id}`);
            mediumLikesIcon.addEventListener("click", this.iLikeIt);
            this.photographerLikes += medium.likes; 
        });
        // display likes counter
        this.displayPhotographerLikes();
    }

    /**
     * @method : displayPhotographerHeaders() : display the header for the 
     *      photographer whose ID match the ID retrieved from the url and
     *      stoped in the photogrpaher class
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
        // display the photographer's name in the contact-me modal
        const contactModalPhotographerName = document.querySelector(".contact-modal_photographer-name");
        contactModalPhotographerName.textContent = Template.name;
    }

    /**
     * @method : buildPhotographerMediaArrayHeaders() : build the media array
     *      of the photographer from the media data passed in parameter.
     * @param {mediaData} media data read via the API
     *      data part of the API. 
     */
    buildPhotographerMediaArray(mediaData){
        mediaData.forEach(medium=>{
            if (medium.photographerId === this.photographerId){
                this.photographerMediaArray.push(new MediaFactory(medium));
            }
        });
    }
    /**
     * @method : closeContactMeForm(): callback for contact-me form closing
     *      - stop propagation of the event et disable default behavior
     *      - close the contact me form
     *      - enable back body scrolling
     */
    closeContactMeForm = (event) => {
        // stop propagation of the event et disable default behavior
        event.preventDefault();
        event.stopPropagation();
        // hide the contact me form
        const contactLightbox = document.getElementById("contact-lightbox");
        contactLightbox.style.display = "";
        // and enable scroling
        const bodyElement = document.querySelector("body");
        bodyElement.classList.remove("body-scroll-disable");
    }
    /**
     * @method : submitContactMeForm(): callback for contact-me form submission
     *      - displays the four input fields on the console
     *      - call closeContactMeForm to close the modal 
     *  @param {event} event listen on the submit bouton.
     */
    submitContactMeForm = (event) => {
        // display the form fields on the console
        console.log (`Prénom : ${document.forms.contact_form.elements.firstname.value}`);
        console.log (`Nom : ${document.forms.contact_form.elements.name.value}`);
        console.log (`Email : ${document.forms.contact_form.elements.email.value}`);
        console.log (`Message : ${document.forms.contact_form.elements.message.value}`);
        // call closeContactMeForm
        this.closeContactMeForm(event);
    }
    /**
     * @method : displayContactMeForm(): callback for contact me form display
     *      - stop propagation of the event et disable default behavior
     *      - displays the Contact me form
     *      - disable scrolling
     *      - listen click on close icon
     *      - listen click on close icon and submit button
     *  @param {event} event listen on the Contact Me bouton
     *      data. 
     */
    displayContactMeForm = (event) => {
        // stop propagation of the event et disable default behavior
        event.preventDefault();
        event.stopPropagation();
        // Display the form
        const contactLightboxElement = document.getElementById("contact-lightbox");
        contactLightboxElement.style.display = "flex";
        // disable scrolling
        const bodyElement = document.querySelector("body");
        bodyElement.classList.add("body-scroll-disable");
        // listen click on close icon
        const contactModalHeaderCloseButtonElement = document.getElementById("contact-modal_header_close-button");
        contactModalHeaderCloseButtonElement.addEventListener("click", this.closeContactMeForm);
        //listen submit of the form
        const contactModalFormElement = document.getElementById("contact-modal_form");
        contactModalFormElement.addEventListener("submit", this.submitContactMeForm);
        // set focus on name firstname input field
        const contactMeFormFirstnamneElement = document.getElementById("firstname");
        contactMeFormFirstnamneElement.focus();
    };

    // callback when the sortCriteria change
    sortCriteriaChange = (event) => {
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
        const contactMeButton = document.getElementById("contact-me-button");
        contactMeButton.addEventListener("click", this.displayContactMeForm);

        // set-up of the call back for sort criteria change 
        const sortCriteriaSelect = document.getElementById("sort-criteria");
        sortCriteriaSelect.addEventListener("change", this.sortCriteriaChange);
    }
}

// event call back functions
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