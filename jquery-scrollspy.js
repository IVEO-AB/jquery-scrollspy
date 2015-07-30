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

            options = $.extend({}, defaults, options);

            return this.each(function() {

                var $container = $(options.container),

                    // cache this
                    self = this,

                    // cache the jQuery object
                    $element = $(self),
                    buffer = options.buffer,
                    enters = 0,
                    inside = false,
                    leaves = 0,
                    mode = options.mode;


                /* add listener to container */
                $container.on('scroll.' + options.namespace, function(e) {
                    // cache the jQuery object
                    var $this = $(this);
                    var position = {
                        top: $this.scrollTop(),
                        left: $this.scrollLeft()
                    };

                    var xy = (mode == 'vertical') ? position.top + buffer : position.left + buffer;
                    var max = options.max;
                    var min = options.min;

                    /* fix max */
                    if ($.isFunction(options.max)) {
                        max = options.max();
                    }

                    /* fix max */
                    if ($.isFunction(options.min)) {
                        min = options.min();
                    }

                    if (max === 0) {
                        max = (mode == 'vertical') ? $container.height() : $container.outerWidth() + $element.outerWidth();
                    }

                    /* if we have reached the minimum bound but are below the max ... */
                    if (xy >= min && xy <= max) {
                        /* trigger enter event */
                        if (!inside) {
                            inside = true;
                            enters++;

                            /* fire enter event */
                            $element.trigger('scrollEnter', {
                                position: position
                            });
                            if ($.isFunction(options.onEnter)) {
                                options.onEnter(self, position);
                            }

                        }

                        /* trigger tick event */
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
                            /* trigger leave event */
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