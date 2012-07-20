/**
 * zepto-fluid-carousel - a Zepto plug-in for creating fluid, responsive carousels
 *
 * @version 0.1
 * @author Kai Mallea (kmallea@gmail.com)
 * @license MIT
 */
(function($) {

    // Default styling
    var css = {

        viewport: {
            'width': '100%', // viewport needs to be fluid
            'overflow': 'hidden',
            'position': 'relative'
        },

        pane_wrapper: {
            'width': '0%', // will be set to (number of panes * 100)
            'list-style': 'none',
            'position': 'relative',
            'overflow': 'hidden',
            'left': '0%',
            'padding': '0'
        },

        pane: {
            'width': '0%', // will be set to (100 / number of images)
            'position': 'relative',
            'float': 'left'
        },

        img: {
            'width': '100%',
            'display': 'block',
            'max-width': '100%'
        },

        h2: {
            'font-size': '1em',
            'padding': '0.5em',
            'position': 'absolute',
            'bottom': '0',
            'left': '0',
            'width': '100%',
            'text-align': 'left',
            'color': '#fff',
            'background-color': 'rgba(0,0,0,0.75)',
            'margin': '0'
        }
    };


    $.extend($.fn, {
        carousel: function (opts) {
            var options = {
                circular: true,
                speed: 5000,
                easing: 'ease-in-out',
                duration: 700
            };

            $.extend(options, opts);

            $.each(this, function(index, item) {
                var $viewport = $(item), // <div> wrapper, known as $viewport
                    $pane_wrapper = $viewport.find('ul').eq(0), // <ul> list container, known as $pane_wrapper
                    $panes = $pane_wrapper.find('li'), // <li> list items, known as $panes
                    current_position = 0, // keep track of current pane in view
                    NUM_PANES = options.circular ? ($panes.length + 1) : $panes.length, // total panes (+1 for circular illusion)
                    PANE_WRAPPER_WIDTH = (NUM_PANES * 100) + '%', // % width of wrapper (total panes * 100)
                    PANE_WIDTH = (100 / NUM_PANES) + '%'; // % width of each individual pane (100 / total panes)


                $viewport.css(css.viewport); // set css on viewport
                $pane_wrapper.css( $.extend(css.pane_wrapper, {width: PANE_WRAPPER_WIDTH}) ); // set css on pane wrapper


                if (options.circular) {
                    // clone the first pane and add it to the end for circular illusion
                    $panes.push( $panes.first().clone().appendTo($pane_wrapper) );
                }

    
                $panes.forEach(function (item, index) { // apply css to each pane and their children (h2, img)
                    var $item = $(item);
                    
                    $item.css( $.extend(css.pane, {width: PANE_WIDTH}) );

                    $item.find('img').css(css.img);
                    $item.find('h2').css(css.h2);
                });


                // Perform the carousel animation on a pane wrapper
                var doAnimation = function (percent) {
                    $pane_wrapper.animate(
                        {
                            left: (percent + '%')
                        },
                        {
                            duration: options.duration,
                            easing: options.easing,
                            complete: function () {

                                // circular illusion: reset to first slide without user noticing
                                if (options.circular && current_position === (NUM_PANES - 1)) {
                                    $pane_wrapper.css(css.pane_wrapper);
                                    current_position = 0;
                                    percent = 0;
                                }

                                if (percent > -((NUM_PANES -1) * 100)) // NOTE: negative number comparison
                                    setTimeout(function () { doAnimation((percent + -100), options.speed); }, options.speed);
                            }
                        }
                    );
                    current_position++;
                };


                setTimeout(function () {
                    doAnimation(-100, options.speed);
                }, options.speed);
            });

            return this;
        }
    });
})(Zepto);
