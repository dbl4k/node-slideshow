var Helpers = function (){

    // Remove insecure characters that aren't part of a filename.
    this.removeDirectoryTraveringChars = function(value) {
        if(value!= isNaN()) {
            return value.replace(/[^\.0-9A-Za-z_-\s]/g, '');
        } else {
            // TODO : need to thow an exception here not return null..
           return null;
        }  
    }
}

module.exports = new Helpers();