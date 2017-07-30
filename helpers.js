var Helpers = function (){

    // Remove insecure characters that aren't part of a filename.
    this.removeRiskyChars = function(value) {
        if(value != null) {
            return value.replace(/[^\.0-9A-Za-z_-\s]/g, '');
        } else {
            // TODO : need to thow an exception here not return null..
           throw new Error("value is null, terminating.");
        }  
    }
}

module.exports = new Helpers();