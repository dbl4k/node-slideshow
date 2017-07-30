# Node Slideshow

## Terminology

**Bundle** - a directory containing a set of images.

**Item** - a single image within a Bundle.

## The API

### GET /bundles

Returns a json array of bundle names currently available. 

### GET /bundles/<bundle_name>

Returns a json array of item names belonging to a parent bundle. 

### GET /bundles/<bundle_name>/<item_name>

Returns an image.