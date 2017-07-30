 $(document).ready(function(){
              
    // populate the slideshow combo.
    $.ajax({url: "/api/bundles", success: function(data){
        var bundles = JSON.parse(data);

        for(var i=0; i<=bundles.length-1; i++) {
            var bundleName = bundles[i];
            console.log(bundleName);
            
            $("#slideshow-bundle-selector")
                .append($('<option>', {"value": bundleName, 
                                        "text": bundleName}));
        }
    }});
    
    // load first image on combo change
    $("#slideshow-bundle-selector").change(function(c){
        var bundle_name = $("#slideshow-bundle-selector").val();
        console.log(bundle_name);

        $.ajax({url: "/api/bundles/" + bundle_name , success: function(data){
            var bundle_items = JSON.parse(data);
            var image_src = null;

            // grab the first image and push to the image.
            if(bundle_items.length > 0) {
                image_src = "/api/bundles/" + bundle_name + "/" + bundle_items[0];
            } else {
                image_src = "/api/defaults/placeholder";
            }

            $("#slideshow-current-image")
                .attr('src', image_src);
        }}) // #slideshow-bundle-selector.change
    }) 

}) // document.onready