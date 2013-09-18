(function($) {

    'use strict';

    /* Define the library functions for the coordinate plugin.
     * These include things like generating unique ids, etc.
     */
    var coordinateLib = function() {
        var id = 0;
        this.indentifier = function() {
            return 'auto' + id++;
        }
    };

    /* Instantiate a single instance of the coordinateLib to use in the
     * $.fn.coordinate function and elsewhere.
     */
    var lib = new coordinateLib;

    /* Expose the coordinateLib functionality to the public.
     */
    $.coordinate = lib;

    /* The jQuery plugin for automated id creation, and auto-appending to
     * elements.
     */
    $.fn.coordinate = function(type) {
        var id = $.coordinate.indentifier(),
            className = ['coordinate', type, id].join('-');
        console.log('========>', $(this));
        $(this).addClass(className);
    };

    /* The core functionality or coordinate */
    var coordinationTypes = {'hover': ['mouseenter', 'mouseleave']};

    function getAppropriateClassNames($el, prefix) {
        var classList = $el.attr('class').split(/\s+/),
            classNames = [];
        $.each(classList, function(i, className) {
            if (className.match(prefix)) {
                classNames.push(className);
            }
        });
        return classNames;
    }

    for (var type in coordinationTypes) {
        var eventNames = coordinationTypes[type],
            prefix = 'coordinate-' + type + '-';
        $.each(eventNames, function(i, eventName) {
            $(document).on(eventName, '[class^="coordinate-' + type + '-"]', function() {
                var classNames = getAppropriateClassNames($(this), prefix),
                    $obj = [];
                $.each(classNames, function(dc, className) {
                    $.extend($obj, $('.' + className));
                });
                if (i === 0) {
                    $obj.addClass('coordinate-' + type);
                } else {
                    $obj.removeClass('coordinate-' + type);
                }
            });
        });
    }

})(jQuery);
