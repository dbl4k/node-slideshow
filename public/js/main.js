 $(document).ready(function(){

    var current_bundle_imageurls = null;
    var current_item_index = 0;
    var is_paused = false;
    var show_interval_ms = 3000;
              
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
        is_paused = true;
        var bundle_name = $("#slideshow-bundle-selector").val();
        console.log(bundle_name);
        current_bundle_imageurls = [];

        $.ajax({url: "/api/bundles/" + bundle_name , success: function(data){
            var bundle_items = JSON.parse(data);
            current_item_index = 0;

            // grab the first image and push to the image.
            if(bundle_items.length > 0) {
                for(var i=0; i<=bundle_items.length-1; i++) {
                    current_bundle_imageurls
                    .push("/api/bundles/"+ bundle_name + "/" + bundle_items[i]);
                }
            } else {
                current_bundle_imageurls.push("/api/defaults/placeholder");
            }

            $("#slideshow-current-image")
                .attr('src', current_bundle_imageurls[current_item_index]);

            is_paused = false;
        }}) // #slideshow-bundle-selector.change
    }) 

    // increment index and load image every n seconds.
    setInterval(function(){ 
        if((!is_paused) && 
            current_bundle_imageurls && 
            current_bundle_imageurls.length > 1) {

            // reset increment if needed
            if(current_item_index >= current_bundle_imageurls.length){
                current_item_index = 0;
            }

            $("#slideshow-current-image")
                .attr('src', current_bundle_imageurls[current_item_index]);

            current_item_index++;
        }
    }, show_interval_ms);

}) // document.onready