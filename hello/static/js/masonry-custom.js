/*jQuery*/

(function ($) {
    // USE STRICT
    "use strict";

    $(document).ready(function () {
        var masonryGrid = $('.masonry-grid');
        if (masonryGrid !== undefined) {

            masonryGrid.imagesLoaded(function () {
                masonryGrid.masonry({
                    // options
                    itemSelector: '.masonry-item'
                });
            });
        }
    });

})(jQuery);