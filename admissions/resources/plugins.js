/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
  def: 'easeOutQuad',
  swing: function (x, t, b, c, d) {
    //alert(jQuery.easing.default);
    return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
  },
  easeInQuad: function (x, t, b, c, d) {
    return c*(t/=d)*t + b;
  },
  easeOutQuad: function (x, t, b, c, d) {
    return -c *(t/=d)*(t-2) + b;
  },
  easeInOutQuad: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
  },
  easeInCubic: function (x, t, b, c, d) {
    return c*(t/=d)*t*t + b;
  },
  easeOutCubic: function (x, t, b, c, d) {
    return c*((t=t/d-1)*t*t + 1) + b;
  },
  easeInOutCubic: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
  },
  easeInQuart: function (x, t, b, c, d) {
    return c*(t/=d)*t*t*t + b;
  },
  easeOutQuart: function (x, t, b, c, d) {
    return -c * ((t=t/d-1)*t*t*t - 1) + b;
  },
  easeInOutQuart: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
    return -c/2 * ((t-=2)*t*t*t - 2) + b;
  },
  easeInQuint: function (x, t, b, c, d) {
    return c*(t/=d)*t*t*t*t + b;
  },
  easeOutQuint: function (x, t, b, c, d) {
    return c*((t=t/d-1)*t*t*t*t + 1) + b;
  },
  easeInOutQuint: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
    return c/2*((t-=2)*t*t*t*t + 2) + b;
  },
  easeInSine: function (x, t, b, c, d) {
    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
  },
  easeOutSine: function (x, t, b, c, d) {
    return c * Math.sin(t/d * (Math.PI/2)) + b;
  },
  easeInOutSine: function (x, t, b, c, d) {
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  },
  easeInExpo: function (x, t, b, c, d) {
    return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  },
  easeOutExpo: function (x, t, b, c, d) {
    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  },
  easeInOutExpo: function (x, t, b, c, d) {
    if (t==0) return b;
    if (t==d) return b+c;
    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  easeInCirc: function (x, t, b, c, d) {
    return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
  },
  easeOutCirc: function (x, t, b, c, d) {
    return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
  },
  easeInOutCirc: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
    return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
  },
  easeInElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
  },
  easeOutElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
  },
  easeInOutElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
  },
  easeInBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c*(t/=d)*t*((s+1)*t - s) + b;
  },
  easeOutBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
  },
  easeInOutBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
  },
  easeInBounce: function (x, t, b, c, d) {
    return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
  },
  easeOutBounce: function (x, t, b, c, d) {
    if ((t/=d) < (1/2.75)) {
      return c*(7.5625*t*t) + b;
    } else if (t < (2/2.75)) {
      return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
    } else if (t < (2.5/2.75)) {
      return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
    } else {
      return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
    }
  },
  easeInOutBounce: function (x, t, b, c, d) {
    if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
    return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
  }
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright Â© 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

 
/*
 * SVGeezy.js 1.0
 *
 * Copyright 2012, Ben Howdle http://twostepmedia.co.uk
 * Released under the WTFPL license
 * http://sam.zoy.org/wtfpl/
 *
 * Date: Sun Aug 26 20:38 2012 GMT
 */

/*
  //call like so, pass in a class name that you don't want it to check and a filetype to replace .svg with
  svgeezy.init('nocheck', 'png');
*/

var svgeezy = function() {

  return {

    init: function(avoid, filetype) {
      this.avoid = avoid || false;
      this.filetype = filetype || 'png';
      this.svgSupport = this.supportsSvg();
      if(!this.svgSupport) {
        this.images = document.getElementsByTagName('img');
        this.imgL = this.images.length;
        this.fallbacks();
      }
    },

    fallbacks: function() {
      while(this.imgL--) {
        if(!this.hasClass(this.images[this.imgL], this.avoid) || !this.avoid) {
          var src = this.images[this.imgL].getAttribute('src');
          if(src === null) {
            continue;
          }
          if(this.getFileExt(src) == 'svg') {
            var newSrc = src.replace('.svg', '.' + this.filetype);
            this.images[this.imgL].setAttribute('src', newSrc);
          }
        }
      }
    },

    getFileExt: function(src) {
      var ext = src.split('.').pop();

            if(ext.indexOf("?") !== -1) {
                ext = ext.split('?')[0];
            }

            return ext;
    },

    hasClass: function(element, cls) {
      return(' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    },

    supportsSvg: function() {
      return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
    }
  };

}();


/* Placeholder fallback */
$(document).ready(function(){

  if(!Modernizr.input.placeholder){

    $('[placeholder]').focus(function() {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
        input.removeClass('placeholder');
      }
    }).blur(function() {
      var input = $(this);
      if (input.val() == '' || input.val() == input.attr('placeholder')) {
        input.addClass('placeholder');
        input.val(input.attr('placeholder'));
      }
    }).blur();
    $('[placeholder]').parents('form').submit(function() {
      $(this).find('[placeholder]').each(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
          input.val('');
        }
      });
    });
  }
});



/*
 * Scrollface - A basic jQuery slideshow

 * Copyright (c) 2012 Kyle Truscott
 *
 * http://keighl.github.com/scrollface
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function ($) {

  // ----------------------------------

  "use strict";

  var methods = {

    init : function (options) {

      return $(this).each(function () {

        var $this  = $(this),
        data       = $(this).data('scrollface'),
        settings   = {
          pager              : null,
          pager_builder      : methods.pager_builder,
          next               : null,
          prev               : null,
          active_pager_class : 'active',
          speed              : 300,
          easing             : 'linear',
          auto               : true,
          interval           : 2000,
          before             : methods.before,
          after              : methods.after,
          transition         : "horizontal"
        };

        if (!data) {

          if (options) {
            $.extend(settings, options);
          }

          settings.slides    = $(this).children();
          settings.count     = settings.slides.size();
          settings.height    = $(this).height();
          settings.width     = $(this).width();
          settings.index     = 0;
          settings.is_moving = false;
          settings.timer     = null;

          /*
          * Drop the init if there are zero or 1 slides
          */

          if (settings.slides.length <= 1) {
            return false;
          }

          /*
          * Force absolute position on wrapper element
          */

          $(this).css({ position : 'absolute' });

          /*
          * Force absolute position on slide elements
          * Place first in view - others off screen
          */


          $(settings.slides).each(function (i, e) {

            $(e).css({
              position : 'absolute',
              left     : (i === 0) ? 0 : settings.width * 100, // really push this off screen
              top      : 0,
              display  : (i === 0) ? 'block' : 'none'
            });


            /*
            * Setup pager
            */

            var anchor = null;

            if ($(settings.pager).size()) {

              if (typeof settings.pager_builder === "function") {

                /*
                * Send a message to the callback (plugin or user defined)
                * -> the pager object
                * -> the slide index
                * -> the slide object
                * User must return an achor object
                */

                anchor = settings.pager_builder.call($this, settings.pager, i, e);

                if (i === 0) {
                  $(anchor).addClass(settings.active_pager_class);
                }

                $(anchor).bind('click.scrollface', function () {
                  methods.interrupt.call($this);
                  methods.step_to.call($this, i);
                  return false;
                });

              }

            }

          });

          /*
          * Setup up next bindings
          */

          if ($(settings.next).size()) {

            $(settings.next).bind('click.scrollface', function (e) {
              methods.interrupt.call($this);
              methods.next.call($this);
              //return false;
              e.preventDefault();
            });

          }

          /*
          * Setup up prev bindings
          */

          if ($(settings.prev).size()) {

            $(settings.prev).bind('click.scrollface', function (e) {
              methods.interrupt.call($this);
              methods.prev.call($this);
              //return false;
              e.preventDefault();
            });

          }

          /*
          * Store all this stuff as data
          */

          $(this).data('scrollface', settings);

          /*
          * Setup auto interval
          */

          if (settings.auto) {
            methods.start.call($this);
          }

        }

      });

    },

    // --------------------------------

    destroy : function () {

      return $(this).each(function () {

        var data = $(this).data('scrollface');

        if (data) {

          /*
          * Unbind prev / next events
          */

          if ($(data.next).size()) {
            $(data.next).unbind('click.scrollface');
          }

          if ($(data.prev).size()) {
            $(data.prev).unbind('click.scrollface');
          }

          /*
          * Remove the settings object
          */

          $(this).data('scrollface', null);

        } else {

          return false;

        }

      });

    },

    // --------------------------------

    /*
    * Move to a given slide index
    * index -> slide index
    * options = {
      speed : ...
      easing : ...
      direction : ...
      transition : ...
    }
    */

    step_to: function (index, user_options) {

      return $(this).each(function () {

        var data = $(this).data('scrollface');

        if (!data) {
          return false;
        }

        /*
        * Exit if
        * -> the slide is in moving
        * -> the index is the current slide
        * -> the index does not exist
        */

        if (!data.is_moving && index !== data.index && index <= (data.count - 1) && index >= 0) {

          data.is_moving = true;

          /*
          * Set default transition_options, and merge with user supplied ones
          */

          var options = {
            speed      : data.speed,
            easing     : data.easing,
            direction  : null,
            transition : data.transition
          };

          if (user_options) {
            $.extend(options, user_options);
          }

          /*
          * Set direction if none was supplied
          * Usually need when users click pageer anchors
          */

          if (!options.direction) {
            if (index > data.index) {
              options.direction = "advance";
            }
            if (index < data.index) {
              options.direction = "retreat";
            }
          }

          /*
          * Update the pager, if it's there
          */

          if ($(data.pager).size()) {
            $('a', data.pager).removeClass(data.active_pager_class);
            $('a', data.pager).eq(index).addClass(data.active_pager_class);
          }

          /*
          * Run the BEFORE callback
          * include both id and idx
          * id is deprecated
          */

          if (typeof data.before === "function") {

            var old_slide = {
              id    : data.index,
              idx   : data.index,
              slide : $(data.slides[data.index])
            },
            new_slide = {
              id    : index,
              idx   : index,
              slide : $(data.slides[index])
            };

            data.before.call(this, old_slide, new_slide);

          }

          /*
          * Run the transition (user defined or preassigned)
          */

          transitions[options.transition].call(this, index, options);

        }

      });

    },

    // -------------------------------

    next: function (user_options) {

      return $(this).each(function () {

        var data = $(this).data('scrollface');

        if (!data) {
          return false;
        }

        var index = (data.index === data.count - 1) ? 0 : data.index + 1;

        /*
        * Set default transition_options, and merge with user supplied ones
        * Only one here that is required to be passed on to step_to is DIRECTION
        * step_two will do another merge for the other attributes later on
        */

        var options = {
          direction  : "advance"
        };

        if (user_options) {
          $.extend(options, user_options);
        }

        methods.interrupt.call(this);
        methods.step_to.call(this, index, options);

      });

    },

    // -------------------------------

    prev: function (user_options) {

      return $(this).each(function () {

        var data = $(this).data('scrollface');

        if (!data) {
          return false;
        }

        var index = (data.index === 0) ? data.count - 1 : data.index - 1;

        /*
        * Set default transition_options, and merge with user supplied ones
        * Only one here that is required to be passed on to step_to is DIRECTION
        * step_two will do another merge for the other attributes later on
        */

        var options = {
          direction  : "retreat"
        };

        if (user_options) {
          $.extend(options, user_options);
        }

        methods.interrupt.call(this);
        methods.step_to.call(this, index, options);

      });

    },

    // -------------------------------

    start: function () {

      return $(this).each(function () {

        var data = $(this).data('scrollface');

        if (!data) {
          return false;
        }

        var $this = this;

        /*
        * Only start the timer if one isn't currently moving
        */

        if (!data.timer) {

          data.timer = setInterval(function () {
            methods.next.call($this);
          }, data.interval);

        }

      });

    },

    // -------------------------------

    stop: function () {

      return $(this).each(function () {

        var data = $(this).data('scrollface');

        if (!data) {
          return false;
        }

        if (data.timer) {

          clearInterval(data.timer);
          data.timer = null;

        }

      });

    },

    //---------------------------------

    interrupt: function (time) {

      return $(this).each(function () {

        var data = $(this).data('scrollface');

        if (!data) {
          return false;
        }

        var $this = $(this),
        period    = 0;

        /*
        * Stop the timer, and wait a period of time before restarting it.
        * Period defaults to the timer interval
        */

        if (data.timer) {

          if (typeof time !== "number") {
            period = data.interval;
          } else {
            period = time;
          }

          methods.stop.call(this);

          setTimeout(function resume_timer () {
            methods.start.call($this);
          }, period);

        }

      });

    },

    //---------------------------------

    pager_builder: function (pager, index, slide) {

      var anchor = $(document.createElement('a'))
        .html(index + 1)
        .appendTo($(pager));

      return anchor;

    },

    //---------------------------------

    /*
    old_slide = {
      idx : #,
      slide : $() object
    }
    new_slide = {
      idx : #,
      slide : $() object
    }
    */

    before: function (old_slide, new_slide) {
      return true;
    },

    //---------------------------------

    /*
    old_slide = {
      idx : #,
      slide : $() object
    }
    new_slide = {
      idx : #,
      slide : $() object
    }
    */

    after: function (old_slide, new_slide) {
      return true;
    }

  };

  // ----------------------------------

  var transitions = {

    horizontal: function (index, options) {

      var data = $(this).data('scrollface');

      if (!data) {
        return false;
      }

      /*
      * Calculate current position of current slide and container
      */

      var curr_container_pos = parseInt($(this).css('left'), 10) || 0,
      curr_slide             = $(data.slides[data.index]),
      curr_slide_left_pos    = parseInt($(curr_slide).css('left'), 10) || 0,
      curr_slide_top_pos     = parseInt($(curr_slide).css('top'), 10) || 0;

      /*
      * Calculate the position for the next slide
      * Place the next slide either to the right or left of the current slide
      */

      var next_slide_left_pos = (options.direction === "advance")
        ? curr_slide_left_pos + data.width
        : curr_slide_left_pos - data.width;

      var next_slide = $(data.slides[index])
        .css({
          left : next_slide_left_pos,
          top  : curr_slide_top_pos
        }).show();


      //alert(next_slide_left_pos)
      /*
      * Calculate the new wrapper position
      */

      var new_container_pos = (options.direction === "advance")
          ? curr_container_pos - data.width
          : curr_container_pos + data.width;

      /*
      * Animate the slides wrapper
      */

      $(this).stop().animate({
        left : new_container_pos
      }, options.speed, options.easing, function () {


        /*
        * Run the BEFORE callback
        * include both id and idx
        * id is deprecated
        */

        if (typeof data.after === "function") {

          var old_slide = {
            id    : data.index,
            idx   : data.index,
            slide : $(data.slides[data.index])
          },
          new_slide = {
            id    : index,
            idx   : index,
            slide : $(data.slides[index])
          };

          data.after.call(this, old_slide, new_slide);

        }

        /*
        * Update the slideshow data, and hide the slide we just removed
        */

        $(curr_slide).hide();
        data.index     = index;
        data.is_moving = false;

      });

    },

    vertical: function (index, options) {

      var data = $(this).data('scrollface');

      if (!data) {
        return false;
      }

      /*
      * Calculate current position of current slide and container
      */

      var curr_container_pos = parseInt($(this).css('top'), 10) || 0,
      curr_slide             = $(data.slides[data.index]),
      curr_slide_top_pos     = parseInt($(curr_slide).css('top'), 10) || 0,
      curr_slide_left_pos    = parseInt($(curr_slide).css('left'), 10) || 0;

      /*
      * Calculate the position for the next slide
      * Place the next slide either to the top or bottom of the current slide
      */

      var next_slide_top_pos = (options.direction === "advance")
          ? curr_slide_top_pos + data.height
          : curr_slide_top_pos - data.height;

      var next_slide = $(data.slides[index])
        .css({
          top  : next_slide_top_pos,
          left : curr_slide_left_pos
        }).show();

      /*
      * Calculate the new wrapper position
      */

      var new_container_pos = (options.direction === "advance")
          ? curr_container_pos - data.height
          : curr_container_pos + data.height;

      /*
      * Animate the slides wrapper
      */

      $(this).stop().animate({
        top : new_container_pos
      }, options.speed, options.easing, function () {

        /*
        * Run the BEFORE callback
        * include both id and idx
        * id is deprecated
        */

        if (typeof data.after === "function") {

          var old_slide = {
            id    : data.index,
            idx   : data.index,
            slide : $(data.slides[data.index])
          },
          new_slide = {
            id    : index,
            idx   : index,
            slide : $(data.slides[index])
          };

          data.after.call(this, old_slide, new_slide);

        }

        /*
        * Update the slideshow data, and hide the slide we just removed
        */

        $(curr_slide).hide();
        data.index     = index;
        data.is_moving = false;

      });

    },

    fade: function (index, options) {

      var data = $(this).data('scrollface');

      if (!data) {
        return false;
      }

      /*
      * Current slide
      * Set the z-index: 0
      */

      var curr_slide = $(data.slides[data.index])
        .css({
          zIndex : 0
        });

      var curr_slide_top_pos = parseInt($(curr_slide).css('top'), 10) || 0,
      curr_slide_left_pos    = parseInt($(curr_slide).css('left'), 10) || 0;

      /*
      * Next slide
      * Set the z-index: 1
      */

      var next_slide = $(data.slides[index])
        .css({
          left   : curr_slide_left_pos,
          top    : curr_slide_top_pos,
          zIndex : 1
        });

      /*
      * FadeIn the next slide
      */

      $(next_slide).fadeTo(data.speed, 1.0, function () {

        $(curr_slide).css({ left : data.width, zIndex : 0 }).hide();

        /*
        * Run the BEFORE callback
        * include both id and idx
        * id is deprecated
        */

        if (typeof data.after === "function") {

          var old_slide = {
            id    : data.index,
            idx   : data.index,
            slide : $(data.slides[data.index])
          },
          new_slide = {
            id    : index,
            idx   : index,
            slide : $(data.slides[index])
          };

          data.after.call(this, old_slide, new_slide);

        }

        /*
        * Update the slideshow data, and hide the slide we just removed
        */

        $(curr_slide).hide();
        data.index     = index;
        data.is_moving = false;

      });

    },

    random: function (index, options) {

      var data = $(this).data('scrollface');

      if (!data) {
        return false;
      }

      var available_transitions = ["horizontal", "vertical", "fade"];

      /*
      * Choose a random transition
      */

      var transition = available_transitions[Math.floor(Math.random() * available_transitions.length)];

      transitions[transition].call(this, index, options);

    }

  };

  // ----------------------------------

  $.fn.scrollface = function (method) {

    if (methods[method]) {

      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

    } else if (typeof method === 'object' || !method) {

      return methods.init.apply(this, arguments);

    } else {

      $.error('Method ' +  method + ' does not exist on jQuery.scrollface!');

    }

  };

}(jQuery));





/*
 * Selectasaur - Customize the target for a <select> tag

 * Copyright (c) 2012 Kyle Truscott
 *
 * http://keighl.github.com/selectasaur
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

;(function ($) {

  // ----------------------------------

  "use strict";

  var methods = {

    init : function (options) {

      return $(this).each(function () {

        var $this    = $(this),
            selected = $this.find(":selected:first"),
            settings = {
              enabled_class        : "selectasaur-enabled",
              wrapper_class        : "selectasaur-wrapper",
              wrapper_active_class : "selectasaur-wrapper-active",
              wrapper_focus_class  : "selectasaur-wrapper-focus",
              wrapper_hover_class  : "selectasaur-wrapper-hover",
              label_class          : "selectasaur-label",
              change               : methods.callbacks.change,
              focus                : methods.callbacks.focus,
              blur                 : methods.callbacks.blur,
              mousedown            : methods.callbacks.mousedown,
              mouseup              : methods.callbacks.mouseup,
              mouseenter           : methods.callbacks.mouseenter,
              mouseleave           : methods.callbacks.mouseleave,
              keyup                : methods.callbacks.keyup,
              click                : methods.callbacks.click
            };

        if (options) {
          $.extend(settings, options);
        }

        var wrapper  = $('<div />').addClass(settings.wrapper_class),
            label    = $('<span />').addClass(settings.label_class);

        /*
        * Store all this stuff as data
        */

        $this.data('selectasaur', settings);

        $this.addClass(settings.enabled_class);

        if (selected.length === 0) {
          selected = $this.find("option:first");
        }

        label.html(selected.html());

        $this.css("opacity", 0);
        $this.wrap(wrapper);
        $this.before(label);

        wrapper = $this.parent("div");
        label   = $this.siblings("span");

        $this.bind({
          "change.selectasaur": function() {
            label.text($this.find(":selected").html());
            wrapper.removeClass(settings.wrapper_focus_class);
            wrapper.removeClass(settings.wrapper_hover_class);
            wrapper.removeClass(settings.wrapper_active_class);
            settings.change.call($this);
          },
          "focus.selectasaur": function() {
            wrapper.addClass(settings.wrapper_focus_class);
            settings.focus.call($this);
          },
          "blur.selectasaur": function() {
            wrapper.removeClass(settings.wrapper_focus_class);
            wrapper.removeClass(settings.wrapper_active_class);
            settings.blur.call($this);
          },
          "mousedown.selectasaur touchbegin.selectasaur": function() {
            wrapper.addClass(settings.wrapper_active_class);
            settings.mousedown.call($this);
          },
          "mouseup.selectasaur touchend.selectasaur": function() {
            wrapper.removeClass(settings.wrapper_active_class);
            settings.mouseup.call($this);
          },
          "click.selectasaur touchend.selectasaur": function(){
            wrapper.removeClass(settings.wrapper_active_class);
            settings.click.call($this);
          },
          "mouseenter.selectasaur": function() {
            wrapper.addClass(settings.wrapper_hover_class);
            settings.mouseenter.call($this);
          },
          "mouseleave.selectasaur": function() {
            wrapper.removeClass(settings.wrapper_hover_class);
            settings.mouseleave.call($this);
          },
          "keyup.selectasaur": function() {
            label.text($this.find(":selected").html());
            settings.keyup.call($this);
          }
        });

      });

    },

    // --------------------------------

    destroy : function () {

      return $(this).each(function () {

        var $this    = $(this),
            wrapper  = $this.parent("div"),
            settings = $this.data("selectasaur");

        if (!settings) {
          return false;
        }

        $this.data('selectasaur', null);
        $this.unbind(".selectasaur");
        $this.css("opacity", 1);

        wrapper.after($this);
        wrapper.remove();

        $this.removeClass(settings.enabled_class);

      });

    },

    // ------------------------------------

    callbacks : {
      change     : function () {},
      focus      : function () {},
      blur       : function () {},
      mousedown  : function () {},
      mouseup    : function () {},
      mouseenter : function () {},
      mouseleave : function () {},
      keyup      : function () {},
      click      : function () {}
    }
  };

  // ----------------------------------

  $.fn.selectasaur = function (method) {

    if (methods[method]) {

      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

    } else if (typeof method === 'object' || !method) {

      return methods.init.apply(this, arguments);

    } else {

      $.error('Method ' +  method + ' does not exist on jQuery.selectasaur!');

    }

  };

}(jQuery));


/**
 * jquery.calendario.js v2.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2012, Codrops
 * http://www.codrops.com
 * Updated by : Bozi Dabel
 */
;( function( $, window, undefined ) {
  
  'use strict';

  $.Calendario = function( options, element ) {
    
    this.$el = $( element );
    this._init( options );
    
  };

  // the options
  $.Calendario.defaults = {
    /*
    you can also pass:
    month : initialize calendar with this month (1-12). Default is today.
    year : initialize calendar with this year. Default is today.
    caldata : initial data/content for the calendar.
    caldata format:
    {
      'MM-DD-YYYY' : 'HTML Content',
      'MM-DD-YYYY' : 'HTML Content',
      'MM-DD-YYYY' : 'HTML Content'
      ...
    }
    */
    weeks : [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
    weekabbrs : [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
    months : [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
    monthabbrs : [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
    // choose between values in options.weeks or options.weekabbrs
    displayWeekAbbr : false,
    // choose between values in options.months or options.monthabbrs
    displayMonthAbbr : false,
    // left most day in the calendar
    // 0 - Sunday, 1 - Monday, ... , 6 - Saturday
    startIn : 1,
    onDayClick : function( $el, $content, dateProperties ) { return false; },
    onDayHover : function( $el, $content, dateProperties ) { return false; }
  };

  $.Calendario.prototype = {
    _init : function( options ) {
      
      // options
      this.options = $.extend( true, {}, $.Calendario.defaults, options );

      this.today = new Date();
      this.month = ( isNaN( this.options.month ) || this.options.month == null) ? this.today.getMonth() : this.options.month - 1;
      this.year = ( isNaN( this.options.year ) || this.options.year == null) ? this.today.getFullYear() : this.options.year;
      this.caldata = this.options.caldata || {};
      this._generateTemplate();
      this._initEvents();

    },
    _initEvents : function() {

      var self = this;

      this.$el.on( 'click.calendario', 'div.fc-row > div', function() {

        var $cell = $( this ),
          idx = $cell.index(),
          $content = $cell.children( 'div' ),
          dateProp = {
            day : $cell.children( 'span.fc-date' ).text(),
            month : self.month + 1,
            monthname : self.options.displayMonthAbbr ? self.options.monthabbrs[ self.month ] : self.options.months[ self.month ],
            year : self.year,
            weekday : idx + self.options.startIn,
            weekdayname : self.options.weeks[ (idx==6?0:idx + self.options.startIn) ]
          };

        if( dateProp.day ) {
          self.options.onDayClick( $cell, $content, dateProp );
        }

      } );
      
      this.$el.on( 'mouseenter.calendario', 'div.fc-row > div', function() {

        var $cell = $( this ),
          idx = $cell.index(),
          $content = $cell.children( 'div' ),
          dateProp = {
            day : $cell.children( 'span.fc-date' ).text(),
            month : self.month + 1,
            monthname : self.options.displayMonthAbbr ? self.options.monthabbrs[ self.month ] : self.options.months[ self.month ],
            year : self.year,
            weekday : idx + self.options.startIn,
            weekdayname : self.options.weeks[ (idx==6?0:idx + self.options.startIn) ]
          };
        
        if( dateProp.day ) {
          self.options.onDayHover( $cell, $content, dateProp );
        }

      } );

    },
    // Calendar logic based on http://jszen.blogspot.pt/2007/03/how-to-build-simple-calendar-with.html
    _generateTemplate : function( callback ) {

      var head = this._getHead(),
        body = this._getBody(),
        rowClass;

      switch( this.rowTotal ) {
        case 4 : rowClass = 'fc-four-rows'; break;
        case 5 : rowClass = 'fc-five-rows'; break;
        case 6 : rowClass = 'fc-six-rows'; break;
      }

      this.$cal = $( '<div class="fc-calendar ' + rowClass + '">' ).append( head, body );

      this.$el.find( 'div.fc-calendar' ).remove().end().append( this.$cal );

      if( callback ) { callback.call(); }

    },
    _getHead : function() {

      var html = '<div class="fc-head">';
    
      for ( var i = 0; i <= 6; i++ ) {

        var pos = i + this.options.startIn,
          j = pos > 6 ? pos - 6 - 1 : pos;

        html += '<div>';
        html += this.options.displayWeekAbbr ? this.options.weekabbrs[ j ] : this.options.weeks[ j ];
        html += '</div>';

      }

      html += '</div>';

      return html;

    },
    _getBody : function() {

      var d = new Date( this.year, this.month + 1, 0 ),
        // number of days in the month
        monthLength = d.getDate(),
        firstDay = new Date( this.year, this.month, 1 );

      // day of the week
      this.startingDay = firstDay.getDay();

      var html = '<div class="fc-body"><div class="fc-row">',
        // fill in the days
        day = 1;

      // this loop is for weeks (rows)
      for ( var i = 0; i < 7; i++ ) {

        // this loop is for weekdays (cells)
        for ( var j = 0; j <= 6; j++ ) {

          var pos = this.startingDay - this.options.startIn,
            p = pos < 0 ? 6 + pos + 1 : pos,
            inner = '',
            today = this.month === this.today.getMonth() && this.year === this.today.getFullYear() && day === this.today.getDate(),
            past = this.year < this.today.getFullYear() || this.month < this.today.getMonth() && this.year === this.today.getFullYear() || this.month === this.today.getMonth() && this.year === this.today.getFullYear() && day < this.today.getDate(),
            content = '';
              
          if ( day <= monthLength && ( i > 0 || j >= p ) ) {

            inner += '<span class="fc-date">' + day + '</span><span class="fc-weekday">' + this.options.weekabbrs[ j + this.options.startIn > 6 ? j + this.options.startIn - 6 - 1 : j + this.options.startIn ] + '</span>';

            // this day is:
            var strdate = ( this.month + 1 < 10 ? '0' + ( this.month + 1 ) : this.month + 1 ) + '-' + ( day < 10 ? '0' + day : day ) + '-' + this.year,
              dayData = this.caldata[ strdate ];
            var strdateyear = ( this.month + 1 < 10 ? '0' + ( this.month + 1 ) : this.month + 1 ) + '-' + ( day < 10 ? '0' + day : day ) + '-' + 'YYYY',
              dayDataYear = this.caldata[ strdateyear ];
            var strdatemonth = 'MM' + '-' + ( day < 10 ? '0' + day : day ) + '-' + this.year,
              dayDataMonth = this.caldata[ strdatemonth ];
            var strdatemonthyear = 'MM' + '-' + ( day < 10 ? '0' + day : day ) + '-' + 'YYYY',
              dayDataMonthYear = this.caldata[ strdatemonthyear ];
            var strdatemonthlyyear = ( this.month + 1 < 10 ? '0' + ( this.month + 1 ) : this.month + 1 ) + '-' + 'DD' + '-' + this.year,
              dayDataMonthlyYear = this.caldata[ strdatemonthlyyear ];
            var strdatemonthly = ( this.month + 1 < 10 ? '0' + ( this.month + 1 ) : this.month + 1 ) + '-' + 'DD' + '-' + 'YYYY',
              dayDataMonthly = this.caldata[ strdatemonthly ];
            
            if( today ) {
              var dayDataToday = this.caldata[ "TODAY" ];
              if( dayDataToday )
                content += dayDataToday;
            }
            if( dayData ) {
              content += dayData;
            }
            if( dayDataMonth ) {
              content += dayDataMonth;
            }
            if( dayDataMonthlyYear ) {
              if( dayDataMonthlyYear['start'] && dayDataMonthlyYear['end'] )
              {
                if( (day >= dayDataMonthlyYear['start']) && (day <= dayDataMonthlyYear['end']) )
                  content += dayDataMonthlyYear['content'];
              }
              else if( dayDataMonthlyYear['start'] > 1 )
              {
                if( day >= dayDataMonthlyYear['start'] )
                  content += dayDataMonthlyYear['content'];
              }
              else if( dayDataMonthlyYear['end'] > 0 )
              {
                if( day <= dayDataMonthlyYear['end'] )
                  content += dayDataMonthlyYear['content'];
              }
              else
              {
                if( dayDataMonthlyYear['content'] )
                  content += dayDataMonthlyYear['content'];
                else
                  content += dayDataMonthlyYear;
              }
            }
            if( dayDataMonthly ) {
              if( dayDataMonthly['start'] && dayDataMonthly['end'] )
              {
                if( (day >= dayDataMonthly['start']) && (day <= dayDataMonthly['end']) )
                  content += dayDataMonthly['content'];
              }
              else if( dayDataMonthly['start'] > 1 )
              {
                if( day >= dayDataMonthly['start'] )
                  content += dayDataMonthly['content'];
              }
              else if( dayDataMonthly['end'] > 0 )
              {
                if(day <= dayDataMonthly['end'])
                  content += dayDataMonthly['content'];
              }
              else
              {
                if( dayDataMonthly['content'] )
                  content += dayDataMonthly['content'];
                else
                  content += dayDataMonthly;
              }
            }
            if( dayDataMonthYear ) {
              content += dayDataMonthYear;
            }
            if( dayDataYear ) {
              content += dayDataYear;
            }

            if( content !== '' ) {
              inner += '<div>' + content + '</div>';
            }

            ++day;

          }
          else {
            today = false;
          }

          var cellClasses = today ? 'fc-today ' : '';
          if ( past ) {
                  cellClasses += 'fc-past ';
                }
          if( content !== '' ) {
            cellClasses += 'fc-content';
          }

          html += cellClasses !== '' ? '<div class="' + cellClasses + '">' : '<div>';
          html += inner;
          html += '</div>';

        }

        // stop making rows if we've run out of days
        if (day > monthLength) {
          this.rowTotal = i + 1;
          break;
        } 
        else {
          html += '</div><div class="fc-row">';
        }

      }
      html += '</div></div>';

      return html;

    },
    // based on http://stackoverflow.com/a/8390325/989439
    _isValidDate : function( date ) {

      date = date.replace(/-/gi,'');
      var month = parseInt( date.substring( 0, 2 ), 10 ),
        day = parseInt( date.substring( 2, 4 ), 10 ),
        year = parseInt( date.substring( 4, 8 ), 10 );

      if( ( month < 1 ) || ( month > 12 ) ) {
        return false;
      }
      else if( ( day < 1 ) || ( day > 31 ) )  {
        return false;
      }
      else if( ( ( month == 4 ) || ( month == 6 ) || ( month == 9 ) || ( month == 11 ) ) && ( day > 30 ) )  {
        return false;
      }
      else if( ( month == 2 ) && ( ( ( year % 400 ) == 0) || ( ( year % 4 ) == 0 ) ) && ( ( year % 100 ) != 0 ) && ( day > 29 ) )  {
        return false;
      }
      else if( ( month == 2 ) && ( ( year % 100 ) == 0 ) && ( day > 29 ) )  {
        return false;
      }

      return {
        day : day,
        month : month,
        year : year
      };

    },
    _move : function( period, dir, callback ) {

      if( dir === 'previous' ) {
        
        if( period === 'month' ) {
          this.year = this.month > 0 ? this.year : --this.year;
          this.month = this.month > 0 ? --this.month : 11;
        }
        else if( period === 'year' ) {
          this.year = --this.year;
        }

      }
      else if( dir === 'next' ) {

        if( period === 'month' ) {
          this.year = this.month < 11 ? this.year : ++this.year;
          this.month = this.month < 11 ? ++this.month : 0;
        }
        else if( period === 'year' ) {
          this.year = ++this.year;
        }

      }

      this._generateTemplate( callback );

    },
    /************************* 
    ******PUBLIC METHODS *****
    **************************/
    getYear : function() {
      return this.year;
    },
    getMonth : function() {
      return this.month + 1;
    },
    getMonthName : function() {
      return this.options.displayMonthAbbr ? this.options.monthabbrs[ this.month ] : this.options.months[ this.month ];
    },
    // gets the cell's content div associated to a day of the current displayed month
    // day : 1 - [28||29||30||31]
    getCell : function( day ) {

      var row = Math.floor( ( day + this.startingDay - this.options.startIn ) / 7 ),
        pos = day + this.startingDay - this.options.startIn - ( row * 7 ) - 1;

      return this.$cal.find( 'div.fc-body' ).children( 'div.fc-row' ).eq( row ).children( 'div' ).eq( pos ).children( 'div' );

    },
    setData : function( caldata ) {

      caldata = caldata || {};
      $.extend( this.caldata, caldata );
      this._generateTemplate();

    },
    // goes to today's month/year
    gotoNow : function( callback ) {

      this.month = this.today.getMonth();
      this.year = this.today.getFullYear();
      this._generateTemplate( callback );

    },
    // goes to month/year
    gotoMonth : function( month, year, callback ) {

      this.month = month - 1;
      this.year = year;
      this._generateTemplate( callback );

    },
    gotoPreviousMonth : function( callback ) {
      this._move( 'month', 'previous', callback );
    },
    gotoPreviousYear : function( callback ) {
      this._move( 'year', 'previous', callback );
    },
    gotoNextMonth : function( callback ) {
      this._move( 'month', 'next', callback );
    },
    gotoNextYear : function( callback ) {
      this._move( 'year', 'next', callback );
    }

  };
  
  var logError = function( message ) {

    if ( window.console ) {

      window.console.error( message );
    
    }

  };
  
  $.fn.calendario = function( options ) {

    var instance = $.data( this, 'calendario' );
    
    if ( typeof options === 'string' ) {
      
      var args = Array.prototype.slice.call( arguments, 1 );
      
      this.each(function() {
      
        if ( !instance ) {

          logError( "cannot call methods on calendario prior to initialization; " +
          "attempted to call method '" + options + "'" );
          return;
        
        }
        
        if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {

          logError( "no such method '" + options + "' for calendario instance" );
          return;
        
        }
        
        instance[ options ].apply( instance, args );
      
      });
    
    } 
    else {
    
      this.each(function() {
        
        if ( instance ) {

          instance._init();
        
        }
        else {

          instance = $.data( this, 'calendario', new $.Calendario( options, this ) );
        
        }

      });
    
    }
    
    return instance;
    
  };
  
} )( jQuery, window );

