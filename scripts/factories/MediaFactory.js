import {Image} from "../models/Media.js";
import {Video} from "../models/Media.js";

class MediaFactory {
    constructor(data) {
        if (Object.prototype.hasOwnProperty.call(data, "image")) {
            return new Image(data);
        }
        else if (Object.prototype.hasOwnProperty.call(data,"video")) {
            return new Video(data);
        }
        else {
            throw new Error (" medium is neither image nor video");
        }
    }
}
export {MediaFactory}; 