/*!
 * jQuery Scrollspy Plugin
 * Author: @sxalexander
 * Licensed under the MIT license
 */
; (function($, window, document, undefined) {

    $.fn.extend({
        scrollspy: function(options) {

            // default options of Scollspy
            var defaults = {
                min: 0,
                max: 0,
                mode: 'vertical',
                namespace: 'scrollspy',
                buffer: 0,
                container: window,
                onEnter: options.onEnter ? options.onEnter : [],
                onLeave: options.onLeave ? options.onLeave : [],
                onTick: options.onTick ? options.onTick : []
            };

            // override the default options with those passed
            options = $.extend({}, defaults, options);

            // cache the jQuery object
            var $container = $(options.container),

                isVertical = options.mode.toUpperCase() === 'VERTICAL';

            return this.each(function() {

                // cache this
                var self = this,

                    // cache the jQuery object
                    $element = $(self),

                    enters = 0,

                    inside = false,

                    leaves = 0;

                // create a scroll listener for the container
                $container.on('scroll.' + options.namespace, function() {

                    // cache the jQuery object
                    var $this = $(this),

                        // create a position object literal
                        position = {
                            top: $this.scrollTop(),
                            left: $this.scrollLeft()
                        },

                        max = $.isFunction(options.max) ? options.max() : options.max,

                        min = $.isFunction(options.min) ? options.min() : options.min,

                        xAndY = isVertical ? position.top + options.buffer : position.left + options.buffer;

                    if (max === 0) {
                        max = isVertical ? $container.height() : $container.outerWidth() + $element.outerWidth();
                    }

                    // if we have reached the minimum bound, though are below the max
                    if (xAndY >= min && xAndY <= max) {

                        // trigger the 'scrollEnter' event
                        if (!inside) {

                            inside = true;
                            enters++;

                            // trigger the 'scrollEnter' event
                            $element.trigger('scrollEnter', {
                                position: position
                            });

                            if ($.isFunction(options.onEnter)) {
                                options.onEnter(self, position);
                            }

                        }

                        // trigger the 'scrollTick' event
                        $element.trigger('scrollTick', {
                            position: position,
                            inside: inside,
                            enters: enters,
                            leaves: leaves
                        });

                        if ($.isFunction(options.onTick)) {
                            options.onTick(self, position, inside, enters, leaves);
                        }

                    } else {

                        if (inside) {
                            inside = false;
                            leaves++;

                            // trigger the 'scrollLeave' event
                            $element.trigger('scrollLeave', {
                                position: position,
                                leaves: leaves
                            });

                            if ($.isFunction(options.onLeave)) {
                                options.onLeave(self, position);
                            }
                        }

                    }
                });

            });
        }

    });


})(jQuery, window, document);