(function() {
  var $body, CU, init_outer_caption, resize_video, test_video, _ref;

  CU = {};

  $body = $('body');

  window.lt_ie9 = (_ref = $('html').hasClass('lt-ie9')) != null ? _ref : {
    "true": false
  };

  window.visible = false;

  window.sub_visible = false;

  window.mega_visible = false;

  window.searching = false;

  $('html').addClass('no-videopreload');

  test_video = $('video').first();

  test_video.on('loadeddata', function() {
    return $('html').removeClass('no-videopreload').addClass('videopreload');
  });

  resize_video = function(video) {
    var h, w;
    w = video.width();
    h = Math.floor(w / (16 / 9));
    return video.attr({
      height: h,
      width: w
    });
  };

  $(window).on('resize load', function() {
    return $('iframe.video').each(function() {
      return resize_video($(this));
    });
  });

  $('a.back-to-top').on('click', function() {
    $('body, html').animate({
      scrollTop: 0
    }, 600, 'easeOutExpo');
    return false;
  });

  $('.tertiary-menu').on('click', 'a.tertiary-dropdown', function() {
    $('.tertiary-menu').toggleClass('dropdown-active');
    return false;
  });

  init_outer_caption = function(el) {
    var caption, context, source;
    if (!el.data('caption')) {
      return false;
    }
    caption = $(el.data('caption'));
    context = el.data('context') ? el.data('context') : '.slideshow';
    source = el.data('source') ? el.data('source') : '.media-caption';
    if (caption.length) {
      if (caption.length > 1) {
        $(el.data('caption'), el);
      }
      $(context, el).data('scrollface').before = function(old_slide, new_slide) {
        return caption.fadeOut('300', 'easeOutExpo', function() {
          el = $(this);
          el.html($(source, new_slide.slide).html());
          return el.fadeIn('300', 'easeOutExpo');
        });
      };
      return caption.html($(source + ':first', el).html());
    }
  };

  /*
   *
   * Primary Menu
   *
  */


  CU.menu = {
    mobile_reset: function() {
      $body.removeClass('mobile-menu-visible');
      $('.submenu-visible').removeClass('submenu-visible');
      $('#cu-overlay').removeClass('overlay-visible');
      this.reset();
      window.visible = false;
      return window.sub_visible = false;
    },
    reset: function() {
      $body.removeClass('cu-menu-visible');
      $('#cu-nav-main > li').removeClass('active');
      return window.mega_visible = false;
    },
    expose: function(target) {
      this.reset();
      $body.addClass('cu-menu-visible');
      target.addClass('active');
      return window.mega_visible = true;
    },
    mouseover_timer: function() {},
    mouseout_timer: function() {},
    sticky: function() {
      var sub_menu;
      sub_menu = $('.secondary-menu');
      sub_menu.wrap('<div class="sticky-wrapper" />');
      return $(window).on("scroll", function() {
        if ($(window).scrollTop() >= $('#cu-hdr').height()) {
          if (!sub_menu.hasClass('sticky')) {
            return sub_menu.addClass('sticky').parent().css({
              height: sub_menu.height()
            });
          }
        } else {
          if (sub_menu.hasClass('sticky')) {
            return sub_menu.removeClass('sticky');
          }
        }
      }).on("resize", function() {
        return $('.sticky-wrapper').height(sub_menu.height());
      });
    },
    init: function() {
      var self;
      self = this;
      $('#mobile-trigger').on('click', function() {
        if (window.visible) {
          self.mobile_reset();
        } else {
          $body.addClass('mobile-menu-visible');
          $('#cu-overlay').addClass('overlay-visible');
          window.visible = true;
        }
        return false;
      });
      $('#cu-overlay').on('click', function() {
        return self.mobile_reset();
      });
      $('.submenu-trigger, #cu-nav-utility a.menu-item').on('click', function() {
        var $parent, $self;
        $self = $(this);
        $parent = $self.parent();
        if (window.sub_visible) {
          if ($parent.hasClass('submenu-visible')) {
            $parent.removeClass('submenu-visible');
            window.sub_visible = false;
          } else {
            $('.submenu-visible').removeClass('submenu-visible');
            $parent.addClass('submenu-visible');
          }
        } else {
          $parent.addClass('submenu-visible');
          window.sub_visible = true;
        }
        return false;
      });
      $('#cu-nav-main > li').on('mouseover', function() {
        var $this;
        $this = $(this);
        clearTimeout(self.mouseout_timer);
        if (window.mega_visible) {
          //return self.expose($this);
		  return self.mouseover_timer = setTimeout(function() {
            return self.expose($this);
          }, 400);
        } else {
          return self.mouseover_timer = setTimeout(function() {
            return self.expose($this);
          }, 400);
        }
      }).on('mouseout', function() {
        clearTimeout(self.mouseover_timer);
        return self.mouseout_timer = setTimeout(function() {
          return self.reset();
        }, 600);
      });
      if (Modernizr.touch) {
        $('#cu-nav-main > li').off('mouseover mouseout').on('click', function() {
          var $this;
          $this = $(this);
          if (Modernizr.mq('only all and (min-width: 960px)')) {
            if (!$this.hasClass('active')) {
              self.expose($this);
              return false;
            }
          }
        });
      }
      $('#cu-nav-main a.menu-item').on('focus', function() {
        if (!window.mega_visible) {
          self.reset();
          $body.addClass('cu-menu-visible');
          $('#cu-nav-main > li').removeClass('active');
          return $(this).parent().addClass('active');
        }
      });
      $body.on('keyup', function(e) {
        var code;
        code = e.keyCode || e.which;
        if (code === 9 && !$('#cu-nav-main a:focus').length) {
          return self.reset();
        }
      });
      $('#search-query').on('focus', function() {
        $body.addClass('search-engaged');
        return window.searching = true;
      }).on('blur', function() {
        $body.removeClass('search-engaged');
        return setTimeout(function() {
          return window.searching = false;
        }, 400);
      });
      $('#search-trigger').on('click', function(e) {
        if (!window.searching) {
          $('#search-query').focus();
        }
        //return false;
        e.preventDefault();
      });
      $('#nav-close').on('touchend', function() {
        return self.reset();
      });
      if (!Modernizr.touch && Modernizr.mq('only all and (min-width: 960px)')) {
        return this.sticky();
      }
    }
  };

  /*
   *
   * Tabbed UI
   *
  */


  CU.tabs = {
    set_panel_height: function(target) {
      return target.parent().animate({
        height: target.height()
      }, 250);
    },
    dropdown: function(el) {
      var tab_selected;
      if ($('.tab-selected', el).length) {
        tab_selected = $('a.tab-selected', el);
      } else {
        tab_selected = $('<a href="#" class="tab-selected">' + $('a.tab:first', el).html() + '</a>').prependTo(el);
      }
      return el.on('click', tab_selected, function() {
        el.toggleClass('dropdown-active');
        return false;
      });
    },
    update_indicator: function(el, indicator) {
      var current_position, current_tab;
      current_tab = $('a.tab.current', el);
      current_position = current_tab.position();
      return indicator.css({
        width: current_tab.width(),
        left: current_position.left
      });
    },
	stop_videos: function(el) {
		if (!el.hasClass('current')) { 
			$('.tab-panel').find('iframe.video').remove();
			$('.tab-panel').find('.media-video').fadeIn('slow');	
		}
    },
    update_aria: function(current_tab, tabs, requested_panel, panels) {
      tabs.attr('aria-selected', 'false');
      current_tab.attr('aria-selected', 'true');
      panels.attr('aria-hidden', 'true');
      return requested_panel.attr('aria-hidden', 'false');
    },
    events: {
      hide: function(panels) {
        return panels.each(function() {
          return $(this).children().addClass('transparent');
        });
      },
      sequential_reveal: function(panel) {
        var children, count, index;
        children = panel.children();
        count = children.length;
        index = 0;
        return setTimeout(function() {
          var timer;
          return timer = setInterval(function() {
            children.eq(index).removeClass('transparent');
            index++;
            if (index >= count) {
              return clearInterval(timer);
            }
          }, 100);
        }, 100);
      }
    },
    init: function(el) {
      var indicator, panels, self, tabs;
      self = this;
      tabs = $('a.tab', el);
      panels = $('.tab-panel', el.data('target'));
      indicator = $('.tab-indicator', el);
      panels.not(':first').hide();
      this.set_panel_height(panels.first());
      if (panels.parent('#home-event-lists, #admissions-event-lists').length) {
        self.events.hide(panels);
        self.events.sequential_reveal(panels.first());
      }
      tabs.each(function(i) {
        return $(this).data({
          index: i
        });
      });
      tabs.on('click', function(e) {
        var idx, requested_panel;
        e.preventDefault();
        idx = $(this).data('index');
        requested_panel = $(panels.get(idx));
		self.stop_videos(el);

        tabs.removeClass('current');
        $(this).addClass('current');
        self.update_indicator(el, indicator);
        self.update_aria($(this), tabs, requested_panel, panels);
        if (el.hasClass('dropdown')) {
          el.removeClass('dropdown-active').find('a.tab-selected').html($(this).html());
        }
        panels.fadeOut('fast');
        self.set_panel_height(requested_panel);
        requested_panel.fadeIn('fast').find('iframe.video').each(function() {
          return resize_video($(this));
        });
        if (panels.parent('#home-event-lists, #admissions-event-lists').length) {
          self.events.hide(panels);
          self.events.sequential_reveal(requested_panel);
        }
		
		 // if tour panels, switch some stuff out
         if (panels.closest('#tour-calendars').length) {
         
         //get ID of clicked tab
          var thisTab = $(this).attr('id');
         
         // switch cal data on tab switch
          Modernizr.load({
            test: $('#calendar').length,
            yep: '/assets/js/json-samples/calendar-data.js',
            complete: function() {
              if ($('#calendar').length) {
                  
                //some animation
                $('#calendar').fadeOut();
                $('.cu-tour-times').fadeOut();
                $('.cu-tour-times').html('');
                
                //swap in new data based on tab
                if(thisTab == 'general-tab'){
                     CU.calendar.init($('#calendar'), general_tours);
                }
                else if(thisTab == 'freshman-tab'){
                    CU.calendar.init($('#calendar'), freshman_tours);
                }
                
                //fade calendar back in
                $('#calendar').fadeIn();
                $('.cu-tour-times').fadeIn();
                return
              }
            }
          });
           
        }
        return false;
      });
      if (el.hasClass('dropdown')) {
        this.dropdown(el);
      }
      return $(window).on('resize load', function() {
        self.update_indicator(el, indicator);
        return self.set_panel_height($('.tab-panel:visible', el.data('target')));
      });
    }
  };

  /*
   *
   * Marquee Slideshow
   *
  */
    window.ImagerLazyLoad = function(a) {
      if ($(a).data('src'))
        new Imager(a,{
            availableWidths: {
                100: "100x56",
                377: "377x212",
                400: "400x225",
                500: "400x225",
                640: "640x360",
                750: "750x422",
                1280: "1280x720"
            }
        })
    }
    window.Shim16x9 = function(a) {
        var b = "<img width='100%' src='data:image/gif;base64,R0lGODlhEAAJAPAAAAAAAAAAACH/C1hNUCBEYXRhWE1QAz94cAAh+QQFAAAAACwAAAAAEAAJAEACCoSPqcvtD6OclBUAOw==' />";
        return $(a).prepend(b),
        b
    }
  CU.marquee = {
    shim: function(el) {
      var b;
      ImagerLazyLoad(el.find(".marquee-img").first());
      el.find(".marquee-img").on('load',function(e){
        backgroundUrl = $(e.target).attr('src');
        $(e.target).parent().css("background-image","url('"+backgroundUrl+"')");
      });
      b = el.find(".marquee-img").first().clone();
      b = b.removeClass("marquee-img").addClass("marquee-shim").attr("alt", "");
      return el.prepend(b);
    },
    slideshow: function(el) {
      return $('.marquee', el).scrollface({
        auto: false,
        transition: 'fade',
        pager: $('.pager', el),
        next: $('a.next, span.next, button.next', el),
        prev: $('a.prev, span.prev, button.prev', el),
        interval: 4000,
        speed: 600,
        easing: 'easeOutExpo',
        before: function(old_slide, new_slide) {
          window.ImagerLazyLoad(new_slide.slide.find(".marquee-img"));
          new_slide.slide.find(".marquee-img").on('load',function(e){
            backgroundUrl = $(e.target).attr('src');
            $(new_slide.slide).css("background-image","url('"+backgroundUrl+"')");
          });
          return old_slide.slide.removeClass("animate-copy");
        },
        after: function(old_slide, new_slide) {
          return new_slide.slide.addClass('animate-copy');
        }
      });
    },
    video_offset: function(el) {
      /*
      Since we can't set video as a background-image
      we need to offset it's position to center it 
      within the .marquee-mask
      */

       return $(window).on('resize load', function() {
        var marquee_height, marquee_video, video_height, video_offset;
        marquee_height = el.height();
        marquee_video = el.find('.marquee-video');
        video_height = marquee_video.height();
        video_offset = parseInt((video_height - marquee_height) / 2);
        return marquee_video.css({
          top: video_offset > 0 ? -video_offset : 0
        });
      });
    },
    init: function(el) {
      // init takes the marquee-mask element.
      // always.
      
      this.shim(el);
      //so it will find the first marquee-item, which should be a span containing a div that will become an image.
      el.find('.marquee-item:first').addClass('animate-copy');
      // for backwards compatibility, we'll leave the with-slideshow and with-video.
      // the real key here is that the marquee itself should be shimmed, not the item.
      if (el.hasClass('with-slideshow')) {
        this.slideshow(el);
      } else if (el.hasClass('with-video')) {
        this.video_offset(el);
      } else {
        // if we get here, then we're stuck figuring it out ourselves.
        if (el.find('.marquee-img').length == 1) {
          // find the parent element and shim it.
        }
      }
      //window.ImagerLazyLoad(el.find(".marquee-img").first());

    }
  };

  /*
   *
   * Form Elements
   *
  */


  CU.form = {
    update_radio_checkbox: function(e) {
      var name;
      name = $(e.currentTarget).attr('name');
      $('input[name=' + name + ']').each(function() {
        var button, id, label;
        id = $(this).attr('id');
        button = $('#' + id);
        label = $('label[for=' + id + ']');
        if (button.is(":checked")) {
          return label.addClass('checked');
        } else {
          return label.removeClass('checked');
        }
      });
      return false;
    },
    custom_select: function() {
      //return $('select').selectasaur({
	  //added not: selector so this can be overridden with the .cu-select disabled class
      return $('select:not(.cu-select-disabled)').selectasaur({
        enabled_class: 'cu-select-enabled',
        wrapper_class: 'cu-select',
        wrapper_active_class: 'active',
        wrapper_focus_class: 'focus',
        wrapper_hover_class: 'hover',
        label_class: 'cu-select-label'
      });
    },
    init: function(form) {
      var self;
      self = this;
      $('input[type=radio], input[type=checkbox]', form).each(function() {
        var type;
        type = $(this).attr('type');
        return $(this).bind('change', self.update_radio_checkbox).parent().addClass('cu-' + type);
      });
      return this.custom_select();
      /* 
      Should include validations and
      error reporting in this object
      */

    }
  };

  /*
   *
   * Slideshows
   *
  */


  CU.slideshows = {
    init: function(el) {
      var auto, controls, interval, next, pager, prev, speed;
      auto = el.data('auto') ? el.data('auto') : false;
      speed = el.data('speed') ? el.data('speed') : 600;
      interval = el.data('interval') ? el.data('interval') : 3000;
      controls = el.data('controls') ? $(el.data('controls')) : $('.slide-controls', el);
      next = el.data('next') ? $(el.data('next')) : $('a.next, span.next, button.next', controls);
      prev = el.data('prev') ? $(el.data('prev')) : $('a.prev, span.prev, button.prev', controls);
      pager = el.data('pager') ? $(el.data('pager')) : $('.pager', controls);
      ImagerLazyLoad(el.find(".slideshow-img").first()),

      el.find('.slideshow').scrollface({
        auto: auto,
        speed: speed,
        interval: interval,
        next: next,
        prev: prev,
        pager: pager,
        easing: 'easeOutExpo',
        before: function(old_slide,new_slide){
          window.ImagerLazyLoad(new_slide.slide.find(".slideshow-img"));
        }
      });
      init_outer_caption(el);
      return $(window).on('resize load', function() {
        var h, w;
        w = el.width();
        if (typeof el.find('.slideshow').data('scrollface') !== "undefined") {
            el.find('.slideshow').data('scrollface').width = w;
        }
        if (el.data('ratio')) {
          switch (el.data('ratio')) {
            case '16:9':
              h = w / (16 / 9);
              break;
            case '4:3':
              h = w / (4 / 3);
              break;
            case '1:1':
              h = w;
              break;
            default:
              h = w / (16 / 9);
          }
          return el.height(Math.floor(h));
        }
      });
    }
  };

  /*
   *
   * Calendar with Calendario 
   *
  */


  CU.calendar = {
    init: function(el, calData) {
      var $month, cal, self, update_month;
      self = this;
      cal = el.calendario({
        startIn: 0,
        caldata: calData,
        onDayClick: function($el, $content, dateProperties) {
          if ($content.length) {
            $('.fc-content').removeClass('current');
            $el.addClass('current');
            return $('.cu-tour-times').html("<h4 class=\"cu-title alt\">" + dateProperties.monthname + " " + dateProperties.day + "</h4>").append($content.clone());
          }
        }
      });
      if ($('.fc-today > div').length) {
        $('.cu-tour-times').html("<h4 class=\"cu-title alt\">Today's Tour Times</h4>").append($('.fc-today > div').clone());
      }
      $month = $('.calendar-month').html("" + (cal.getMonthName()) + " " + (cal.getYear()));
      $('.calendar-next').on('click', function() {
        cal.gotoNextMonth(update_month);
        return false;
      });
      $('.calendar-prev').on('click', function() {
        cal.gotoPreviousMonth(update_month);
        return false;
      });
      return update_month = function() {
        return $month.html("" + (cal.getMonthName()) + " " + (cal.getYear()));
      };
    }
  };

 /*
 *
 * Honeycomb 
 *
*/


CU.honeycomb = {
	 shim: function(el) {
	  var shim;

	  shim = el.find('img').first().clone();
	  shim = shim.addClass('hc-slideshow-shim').attr('alt', '');
    ImagerLazyLoad(el.find(".slideshow-img").first());
    shim = $('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />');
    shim = shim.addClass("hc-slideshow-shim").attr("alt", "");

	  return el.append(shim);
   },
  filter_menu: function() {},
  sequential_reveal: function(tiles, callback) {

	var count, index;
	count = tiles.length;
	index = 0;
	return setTimeout(function() {
	  var timer;
	  return timer = setInterval(function() {
		tiles.eq(index).removeClass('scale-down');
    imagerElement = tiles.eq(index).find("div:not([data-src=\"\"])").first();
    ImagerLazyLoad(imagerElement);
    imagerElement = tiles.eq(index).find(":not([data-src=\"\"])");
    if (index !== 0)
      imagerElement.parent().find('.image-replace').attr('src', "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
    imagerElement.on('load',function(e){
      $(e.target).parent().find('.hc-slideshow-shim').remove();
    });
		index++;
		if (index >= count) {
		   $('#honeycomb').css('min-height', 0);
		  return clearInterval(timer); 
		}
	  }, 100);
	}, 500);
   
  },
  slideshow: function() {
	$('.hc-slideshow').scrollface({
	  auto: false,
    
    next: $('#honeycomb a.next, #honeycomb span.next, #honeycomb button.next'),
    prev: $('#honeycomb a.prev, #honeycomb span.prev, #honeycomb button.prev'),
	  pager: $('#honeycomb .pager'),
	  speed: 600,
	  easing: 'easeOutExpo',
    before:function(old_slide,new_slide){
      ImagerLazyLoad(new_slide.slide.find(".slideshow-img").first())
    },
    after: function(old_slide, new_slide) {
      ImagerLazyLoad(new_slide.slide.find(".slideshow-img").first())
    }
	});
	this.shim($('.hc-slide-mask'));
	init_outer_caption($('.hc-slide-mask'));
	// add class to #honeycomb
	$('#honeycomb').addClass('with-slideshow');
	return $(window).on('resize load', function() {
		var w;
		w = $('.hc-slide-mask img').first().width();
		return $('.hc-slideshow').data('scrollface').width = w;
	});
  },
  init: function() {
	var self;
	self = this;
	//if ($('.hc-filter').length) {
//	  this.filter_menu();
//	}
	if ($('.hc-slideshow').length) {
	  this.slideshow();
	}
  //$('.hc-item').each(function(index,el){CU.honeycomb.shim($(el))});
    $('.ith-image').each(function(index,el){
      shim = $('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />');
      shim = shim.addClass("hc-slideshow-shim").attr("alt", "");
      if($(el).hasClass('with-image'))
      return $(el).prepend(shim);
    });
	this.sequential_reveal($('.scale-down'));
	$body.on('click', '.hc-filter-trigger', function() {
	  $(this).toggleClass('close');
	  $('.hc-filters, .hc-dimmer').toggleClass('visible');
	  return false;
	});
	return $body.on('click', '.hc-filter:not(.disabledHC) a', function() {
	  // remove class from #honeycomb, will add back later
	  $('#honeycomb').removeClass('with-slideshow');
	  $('.hc-filter a').removeClass('current');
	  $(this).addClass('current');
	  $('.hc-filter-trigger').text($(this).text()).toggleClass('close');
	  $('.hc-filters, .hc-dimmer').toggleClass('visible');
	  
	 // $('.hc-slide-mask, .hc-item').addClass('scale-down');
	  //self.sequential_reveal($('.scale-down'));

	  //flickering fix get current height of #honeycomb
	  var HCheight = $('#honeycomb').outerHeight();
	  $('#honeycomb').css('min-height', HCheight);
	  
	  //get rid of current view
	  $('.hc-slide-mask, .hc-item').addClass('scale-down');
	  
	  // get information about the filter choice
	  var userSelectedFilter = $(this).attr('data-filter-value');

	  // get new stories
	  $.ajax({
		url: "/_includes/honeycomb-filter-stories.cfm",
		data: {filterBy: userSelectedFilter}
			  }).success(function(newHTML) {
				  $('#honeycomb').html(newHTML).promise().done(function(){
					  //fade back in
					  self.sequential_reveal($('.scale-down'));
						  // if there is a slideshow
						  if ($('.hc-slideshow').length) {
							// activate slideshow plugin init etc
							CU.honeycomb.slideshow();
								//resizes carousel so it shows up on intial load in
								var w;
								w = $('.hc-slide-mask img').first().width();
								return $('.hc-slideshow').data('scrollface').width = w;							 
						} // end if slideshow
						
			  
				  }) // end done	
		  }); // end ajax

	  
	  return false;
	});  // end filter click
	
  } // end init
}; // end cu.honeycomb

  /*
   *
   * Location slideshows (About page) 
   *
  */


  CU.locations = {
    init: function() {
      var delay;
      delay = 0;
      $('.cu-location-slideshow').each(function() {
        $(this).scrollface({
          speed: 600,
          interval: 5000,
          easing: 'easeOutExpo'
        });
        $(this).scrollface('step_to', $(this).data('idx')).scrollface('interrupt', delay);
        return delay = delay + 2500;
      });
      $('.cu-location-mask').on('mouseover', function() {
        return $(this).find('.cu-location-slideshow').scrollface('stop');
      }).on('mouseout', function() {
        return $(this).find('.cu-location-slideshow').scrollface('start');
      });
      return $(window).on('resize load', function() {
        var w;
        w = $('.cu-location-set').width();
        $('.cu-location-mask, .cu-location-slideshow').height(w);
        return $('.cu-location-slideshow').each(function() {
          return $(this).data('scrollface').width = w;
        });
      });
    }
  };

  /*
   *
   * Videos
   *
  */


  CU.videos = {
    kaltura_request: function() {
      //return console.log("Make AJAX request for video from Kaltura or other source");
	  var ios = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
	  if (!ios) { 
		  event.preventDefault();
		  if ($(this).attr('data-target')) {
			  var targetId = $(this).attr('data-target');
			  var target = $(targetId);
		  } else { 
			  var target = $(this);
		  }
		  var posterImg = target.find('.media-img');
		  // get ratio of video based on the width of the thumbnail
		  var videoRatio = posterImg.height() / posterImg.width();
		  //$(this).fadeOut('fast');
		  posterImg.fadeOut('fast');
		  target.css('margin-bottom','24px').css('height',posterImg.height()).html($(this).data('embed'));
		  //bind resize handler to keep video aspect ratio on window resize			
		  $( window ).resize(function(){ setVidSize(target,videoRatio) });
	  }// if ios 
    },
    init: function() {
      var self;
      self = this;
      return $('.media-video2').on('click', function() {
        self.kaltura_request();
        return false;
      });
    }
  };

  /*
   *
   * Parallax
   *
  */


  CU.parallax = {
    inview: function(el) {
      var el_bottom, el_height, el_offset, el_top, scroll_bottom, scroll_top, window_height;
      window_height = $(window).height();
      scroll_top = $(window).scrollTop();
      scroll_bottom = scroll_top + window_height;
      el_offset = el.offset();
      el_height = el.height();
      el_top = el_offset.top;
      el_bottom = el_top + el_height;
      if (scroll_bottom > el_top && scroll_top < el_bottom) {
        return true;
      } else {
        return false;
      }
    },
    init: function(el) {
      var self;
      self = this;
      return $(window).on("scroll", function() {
        var el_bottom, el_height, el_midpoint, el_offset, el_top, opacity_value, pos_value, window_midpoint;
        if (!Modernizr.touch && Modernizr.mq('only all and (min-width: 960px)')) {
          el_offset = el.offset();
          el_height = el.height();
          el_top = el_offset.top;
          el_bottom = el_top + el_height;
          if (self.inview(el)) {
            el_midpoint = parseInt(el_height / 2 + el_top) - $(window).scrollTop();
            window_midpoint = parseInt($(window).height() / 2);
            if (!(el_midpoint > window_midpoint)) {
              opacity_value = (el_midpoint / window_midpoint).toFixed(2);
              pos_value = ((1 - opacity_value) * 1.2).toFixed(3);
            }
            opacity_value = Math.pow(opacity_value, 3).toFixed(2);
            el.find('.marquee-oneliner-copy').css({
              "-webkit-transform": "translateY(" + (pos_value * 100).toFixed(1) + "%)",
              opacity: opacity_value
            });
            if ($(window).scrollTop() === 0) {
              return $('.marquee-oneliner-copy').css({
                "-webkit-transform": "translateY(0)",
                opacity: 1
              });
            }
          }
        }
      });
    }
  };

  /*
   *
   * Scrolling animations
   *
  */


  CU.scroll = {
    below_fold: function(el) {
      var el_offset, el_top, pct, scroll_bottom, scroll_top, window_height;
      window_height = $(window).height();
      scroll_top = $(window).scrollTop();
      scroll_bottom = scroll_top + window_height;
      el_offset = el.offset();
      el_top = el_offset.top;
      pct = ((el_top - scroll_top) / window_height).toFixed(2);
      if (pct > 0.85) {
        return true;
      } else {
        return false;
      }
    },
    hide: function(el) {
      if (this.below_fold(el)) {
        return el.addClass('transition-in');
      }
    },
    init: function(el) {
      var self;
      self = this;
      el.each(function() {
        return self.hide($(this));
      });
      return $(window).on('scroll', function() {
        return el.each(function() {
          if (!self.below_fold($(this))) {
            return $(this).removeClass('transition-in');
          }
        });
      });
    }
  };

  $(document).ready(function() {
    if (!Modernizr.touch) {
      CU.scroll.init($('.section:not(:last-child), .featured-blogs-section'));
    }
    Modernizr.load({
      test: $('.cu-map').length,
      yep: '/assets/core/js/cu-maps.js'
    });
    CU.menu.init();
    $('.cu-tabs[data-target]').each(function() {
      return CU.tabs.init($(this));
    });
    $('.marquee-mask').each(function() {
      return CU.marquee.init($(this));
    });

    CU.form.init($('.cu-form'));
	
    if ($('.slide-mask').length) {
		$('.slide-mask').each(function(index){
			CU.slideshows.init($(this));
		});	
    }
    Modernizr.load({
      test: $('#calendar').length,
      yep: '/assets/js/json-samples/calendar-data.js',
      complete: function() {
        if ($('#calendar').length) {
          return CU.calendar.init($('#calendar'), general_tours);
        }
      }
    });
	
	/* JS fallback for HTML5 placeholder
	 * requires jQuery and Modernizr (to detect support)
	 * by Jon Raasch - @jonraasch - http://jonraasch.com/
	 * modified script from Nico Hagenburger: http://bit.ly/LgrkT0
	*/
	 
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
				// if password input have to clone it as a text input and then remove this later (otherwise it will show up as ******)
				if ( input.attr('type') == 'password' ) {
					var newInput = input.clone();
					newInput.attr('type', 'text');
					newInput.val(input.attr('placeholder'));
					newInput.addClass('placeholder clone');
					newInput.insertAfter(input);
					
					input.hide();
					
					// add focus state to remove this input and show / focus the original
					newInput.focus(function() {
						$(this).remove();
						input.show().focus();
					});
				}
				else {
					input.addClass('placeholder');
					input.val(input.attr('placeholder'));
				}
			}
		}).blur();
		
		$('[placeholder]').parents('form').submit(function() {
			$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if ( input.hasClass('clone') ) {
					input.remove();
					return;
				}
	 
				if (input.val() == input.attr('placeholder')) {
					  input.val('');
				}
			})
		});
	}
    CU.honeycomb.init();
    CU.locations.init();
    CU.videos.init();
    if ($('.marquee-oneliner-copy').length) {
      return $('.marquee').each(function() {
        return CU.parallax.init($(this));
      });
    }
  });
  
  $('.equalize').equalize();
  
  (function randomFade() {
    var fadeDivs = $(':not(.fadeContainer) > .fadeinfadeout'),
      el = fadeDivs.eq(Math.floor(Math.random() * fadeDivs.length));        
      el.fadeIn('1500').delay(8000).fadeOut('1500',randomFade);   
  })();

  function sequentialFade(){
      fadeDivs = $(this.selector),
      el = fadeDivs.eq(this.n);        
      var n=(this.n+1) % fadeDivs.length;
      // use mod to wrap the n+1 back around, bind the context of the callback function
      var callback = sequentialFade.bind({n:n,selector:this.selector});
      // let the callback fire when it's ready.  no recursion, just event driven programming
      el.fadeIn('1500').delay(8000).fadeOut('1500',callback);   
  }
  // fn.bind creates a function with the "this" context bound in the original function.
  // that lets us set this.n and this.selector so we can have a callback function that fires without argument.
  var sequentialFadeStart=sequentialFade.bind({n:0,selector:'.fadeContainer .fadeinfadeout'});
  sequentialFadeStart();


}).call(this);
