// Avoid "console" errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

function parseLocalistEventDetails(jsonEvent) {
      // Given a Localist event record, extract its details and return them in an object.
      var theEvent = {};
      theEvent.title = jsonEvent.event.title;
      theEvent.localist_URL = jsonEvent.event.localist_url;
      theEvent.description = jsonEvent.event.description_text;

      theEvent.starts = jsonEvent.event.event_instances[0].event_instance.start.replace("T", " ").replace(/\-0\d:00$/, "");
      theEvent.dateStarts = Date.parse(theEvent.starts);
      theEvent.startHour = (theEvent.dateStarts.getHours() > 12) ? theEvent.dateStarts.getHours() - 12 : theEvent.dateStarts.getHours();
      theEvent.startMin = theEvent.dateStarts.getMinutes();
      theEvent.eventTimeSpan = (theEvent.startHour + ":" + theEvent.startMin);

      theEvent.ends = jsonEvent.event.event_instances[0].event_instance.end;
      // Some events have null for their end, or have the same date/time as the start date/time so we need to check for those possibilities and handle them.
      if (theEvent.ends) {
          theEvent.ends = jsonEvent.event.event_instances[0].event_instance.end.replace("T", " ").replace(/\-0\d:00$/, "");
          theEvent.dateEnds = Date.parse(theEvent.ends);
          theEvent.endHour = (theEvent.dateEnds.getHours() > 12) ? theEvent.dateEnds.getHours() - 12 : theEvent.dateEnds.getHours();
          theEvent.endMin = theEvent.dateEnds.getMinutes();
          if ((theEvent.endHour != theEvent.startHour) && (theEvent.endMin != theEvent.endHour)) {
              theEvent.eventTimeSpan += ("-" + theEvent.endHour + ":" + theEvent.endMin);
          }
      }

      theEvent.monthName = theEvent.dateStarts.toString("MMM");
      theEvent.dayNum = theEvent.dateStarts.getDate();
      theEvent.eventTimeSpan = theEvent.eventTimeSpan.replace(/:0\-/, ":00-").replace(/:0$/, ":00");
      return theEvent;
}

function findGADataAttr(dataAttr, el) {
    // Traverse item's DOM ancestry until finding a defined data attribute or reaching the top. (We do this only when the item's attribute itself is undefined.)
    var notFound = "undefined";
    var dataAttrVal = $(el).data(dataAttr) || notFound;

    if (dataAttrVal == notFound) {
        $(el).parents().each(function() {
            dataAttrVal = $(this).data(dataAttr) || notFound;
            //console.debug("parent: ", dataAttr, $(this).data(dataAttr));
            if (dataAttrVal != notFound) {
                return false;
            }
        });
    }

    return dataAttrVal;
}

function logGA(el, elType, event) {
    // Log a Google Analytics action for a page element (link or menu selection choice).
    var section, linkText, altText, linkTitle, linkClass, itemClicked, dataCategory, dataAction, dataLabel;
    var notFound = "undefined";

    //$(document).on("click", "a", function(event) {

        if (event.shiftKey) {
          console.debug(" ");
        }

        // Check the link for data attributes.

        dataCategory = $(el).data("click-category") || notFound;
        dataAction = $(el).data("click-action") || notFound;
        dataLabel = $(el).data("click-label") || notFound;
        if (event.shiftKey) {
          console.debug("THIS LINK: category: ", dataCategory, " -- action: ", dataAction, " -- label: ", dataLabel);
        }

        // Check the link's DOM ancestors data attributes.

        dataCategory = findGADataAttr("click-category", $(el));
        dataAction = findGADataAttr("click-action", $(el));
        dataLabel = findGADataAttr("click-label", $(el));
        if (event.shiftKey) {
          console.debug("A PARENT: category: ", dataCategory, " -- action: ", dataAction, " -- label: ", dataLabel);
        }

        if (dataLabel == notFound) {
            // Extract something from the link to identify it.
            linkText = $(el).text();
            linkTitle = $(el).attr("title");
            altText = $(el).attr("alt");
            linkClass = $(el).attr("class");

            if (elType == "option") {
              linkText = $(el).find("option:selected").text();
            }

            //console.debug("Did not find a label, so check link text, etc.")
            itemClicked = linkText;
            if ((itemClicked == "") || (typeof itemClicked == "undefined")) {
                itemClicked = linkTitle;
                if ((itemClicked == "") || (typeof itemClicked == "undefined")) {
                    itemClicked = altText;
                    if ((itemClicked == "") || (typeof itemClicked == "undefined")) {
                        itemClicked = linkClass;
                        if ((itemClicked == "") || (typeof itemClicked == "undefined")) {
                            itemClicked = "link has no text, title, alt, or class";
                        }
                    }
                }
            }
            dataLabel = itemClicked.replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/g, " ");

            section = $(el).closest("div").attr("id");
            if (typeof section == "undefined") {
                section = notFound;
            }
        }

        // https://developers.google.com/analytics/devguides/collection/analyticsjs/events
        if (event.shiftKey) {
          console.debug("GA gets: ", dataCategory, dataAction, dataLabel);
        }
        _gaq.push(['_trackEvent', dataCategory, dataAction, dataLabel]);

        if (event.shiftKey) {
          return false;
        }
}

function bindSelectMenus() {
  // Some pages have pop-up menus whose use should result in going to a URL for the selected item.
  $(".gotoMenuURL").change(function() {
    var event = jQuery.Event("keydown");
    event.shiftKey = (window.location.href.indexOf("cornelleducf9t") > -1) ? true : false;
    logGA($(this), "option", event);

    var destURL = $(this).val();
    if ((destURL.toLowerCase().indexOf("ttp") >= 1) && (!event.shiftKey)) {
      window.location = destURL;
    }
  });
}

function searchHandling() {
  // Handle search-related tasks and bindings.

  // Execute in-page events search if on search-events page.
  if ($("#events-results").length) {
      $(document).ready(function() {
         getSearchEvents();
      });
  }

  // Set the focus to the search bar when relevant.
  if ($("#search-site").length) {
    $("#search-site").focus();
  }

  // Hack to allow the pressing enter in the search box to resubmit the search form, which it normally does not do.
  // (We add a space character to the search term, which apparently causes the onChange event to fire, thus unlocking something that otherwise prevents the enter-key event from triggering the form submission.)
  $(document).on("keydown", "#search-site", function(event) {
    if (event.keyCode == 13) {
      window.location.href = "/search?q=" + $("#search-site").val() + " ";
    }
  });
}

function addTimeAgo() {
  // Convert timestamps to X time ago strings.
  $(".timeago").timeago();
}

// Handle the footer map when the window is resized.
function simplemaps_worldmap_complete() {
  simplemaps_worldmap_popup(0);
  simplemaps_worldmap_variables.ignore_clicks = true;
}
var footerMapID;
//$(window).resize(function() {
//    $("#tt_sm").hide();
//    clearTimeout(footerMapID);
//    footerMapID = setTimeout(doneResizing, 500);
//});
//function doneResizing() {
//  if ($("#footerMap").length) {
//    simplemaps_worldmap();
//    placeFooterMapInfoBox();
//  }
//}
// Band-aid for page sections changing size and throwing off the info box.
//$(".tab").click(function() {
//    footerMapID = setTimeout(doneResizing, 501);
//});

function placeFooterMapInfoBox() {
  var delay = (typeof simplemaps_worldmap_mapinfo == "undefined") ? 3000 : 1;
  setTimeout(delayPlaceFooterMapInfoBox, delay);
}

function delayPlaceFooterMapInfoBox() {
  // Determine and set where the highlighted location's info box and its pointing arrow appears, based on the location's geo coords.

        var generateRandomLocation = false;
        if (generateRandomLocation) {
            var ns = Math.random() * (10 - 1) + 1;
            var ew = Math.random() * (10 - 1) + 1;
            var degreesNS = Math.random() * (90 - 0) + 0;
            var degreesEW = Math.random() * (179 - 0) + 0;
            if (ns > 5) {
              degreesNS = degreesNS * -1;
            }
            if (ew > 5) {
              degreesEW = degreesEW * -1;
            }

            //degreesNS = 53
            //degreesEW = 32;  

            simplemaps_worldmap_mapdata.locations[0].lat = degreesNS;
            simplemaps_worldmap_mapdata.locations[0].lng = degreesEW;
        }

        simplemaps_worldmap_mapinfo.calibrate.x_adjust=-50;
        simplemaps_worldmap_mapinfo.calibrate.width=2050;   
        simplemaps_worldmap_mapinfo.calibrate.ratio=1.9;
        simplemaps_worldmap();
        simplemaps_worldmap_popup(0);

        var lat = parseFloat(simplemaps_worldmap_mapdata.locations[0].lat);
        var lng = parseFloat(simplemaps_worldmap_mapdata.locations[0].lng);

        var arrow = "bottom";
        var marginLeft = -114;
        var marginTop = 5;

        // Tweak placement (by adjusting margin settings) and set arrow direction based on location's lat/lng.
        if (lng < -150) {
          arrow = "left";
          if (lat < 6) {
            marginLeft = 14;
            marginTop = -54;
          }
          else {
            marginLeft = 14;
            marginTop = -54;
          }
        }
        else if (lng > 30) {
          arrow = "right";
          if (lat > 6) {
              marginLeft = -16;
              marginTop = -52;
          }
          else {
              marginLeft = -16;
              marginTop = -52;
          }
        }
        else if (lat < 10) {
          arrow = "bottom";
          if (lng > 15) {
            marginLeft = 115;
            marginTop = -154;
          }
          else {
            marginLeft = -115;
            marginTop = -140;
          }
        }
        else if (lat > 0) {
          arrow = "top";
          marginLeft = -119;
          marginTop = 20;
        }

        var debug = false;
        if (debug) {
            console.debug(arrow, marginLeft, marginTop, simplemaps_worldmap_mapdata.locations[0]);
        }

        // The following svg components show the location; these numbers might be useful for mathematically generating numbers to be used for placing the info box and/or its arrow.
        var mapSVG = $("svg:eq(1)");
        var circle = $("svg:eq(1) circle:eq(0)");

        var mapW = Math.round($(mapSVG).attr("width"));
        var mapH = Math.round($(mapSVG).attr("height"));
        var circleX = Math.round($(circle).attr("cx"));
        var circleY = Math.round($(circle).attr("cy"));

        //console.debug("svg data:", mapW, mapH, circleX, circleY);

        // Adjust the placement of the info box element and the direction of its arrow by applying a class and margin updates.
        $("#tt_sm").addClass("tt_sm_" + arrow);
        $("#tt_sm").css("margin-left", marginLeft + "px");
        $("#tt_sm").css("margin-top", marginTop + "px");
}

  //this function maintains the aspect ratio of the video during fluid resizing
  function setVidSize(videoContainer,videoRatio,headline){
      //get current height of video containter
      videoContainer.css('height','auto');
      //find the iframe element
      vid = videoContainer.find('iframe');
      //calculate the new height based on the original aspect ratio and current width
      newHeight = videoRatio * vid.width();
      //set the new height
      vid.css('height',newHeight);
      //make sure the parent element is tall enough to contain the resized iframe
      if (videoContainer.parent().height() < newHeight) {
        videoConatiner.parent.height(newHeight);  
      }
  }//setVidSize()

function handleMediaVideo() {
    $('.media-video:not(.no-player)').on('click',function(event) {
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
    $(this).fadeOut('fast',function(){  });
    target.css('height',posterImg.height()).append($(this).data('embed'));
    //bind resize handler to keep video aspect ratio on window resize     
    $( window ).resize(function(){ setVidSize(target,videoRatio) });
      }// if ios 
    });//media-video click bind
}

function activateFooterMap() {
    // Activate dynamic map if our page has a container for it.
    if ($("#footerMap").length) {
        var numLocations = $.map(CU_simplemaps_worldmap_mapdata.locations, function(n, i) { return i; }).length;
        var locToDisplay = 0;
        if (numLocations > 1) {
            locToDisplay = Math.floor((Math.random() * numLocations));
            //locToDisplay = 0;
            if (locToDisplay >= numLocations) {
              locToDisplay = numLocations - 1;
            }
            simplemaps_worldmap_mapdata.locations[0] = CU_simplemaps_worldmap_mapdata.locations[locToDisplay];
        }
        setTimeout(placeFooterMapInfoBox, 1);
        // Prevent or trap clicks on the map outside the info box.
        $(document).on("click", "#footerMap_inner", function() {
            //console.debug("click");
            return false;
        });
    }
}

function applySubnav() {
  // Special handling for the Apply button in the top nav bar.
  $(".applyParent").click(function(e) {
    if ($('.applyChild').css('display') == 'none') { 
      //$(this).css('background-color','#a10606');
      $(".applyChild").show(200,function(e){});
      $('.applyParent').animate({"paddingRight":"20px" },200,'easeInOutCubic');
      $(".applyParent").addClass('apply-nohover').css({'background-image':'url(/assets/images/apply-bg.png)', 'background-repeat' : 'no-repeat', 'background-position' : 'right center', 'background-color' : '#b31b1b' });
    } 
    else {
      $(".applyChild").hide(200,function(e){ $(".applyParent").css('background-image','none').css('background-color','none'); });
      $('.applyParent').removeClass('apply-nohover').animate({"paddingRight":"10px" },200,'easeInOutCubic');
    }
    e.preventDefault();
    });
  return false;
}

function enableMeganavEsc() {
    // Allow the ESC key to close the meganav.
    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
           //console.debug("ESC was pressed.");
           $("#spotlight").trigger("click");
        }
    });
}

function bindAtUMenuTabbing() {
    // Handle the Around-the-University filter menu tabbing.
    // That is, enable the menu's items to be tabbed if the filter is active, else ensure they are not tabbable.
    $("#atuFilterActivator").click(function() {
        $("#atuFilterMenus a").attr("tabindex", 0);
    });

    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
           $("#atuFilterMenus").removeClass("visible");
           $(".hc-dimmer").removeClass("visible");
           $("#atuFilterMenus a").attr("tabindex", -1);
        }
    });
}

function bindSearchTabs() {
    // When a search tab is clicked, its q param should change to be what's in the search box.
    $("#search-tabs .tab").on("click mouseover", function() {
      if ($("#search-site").val().length > 2) {
         var href = $(this).attr("href").replace(/\?q=.*/, "?q=" + $("#search-site").val());
         $(this).attr("href", href);
      }
    });
}

//$(document).ready(function() {
//    activateFooterMap();
//});

$(document).ready(function() {
    //enableMeganavEsc();

    // Bind Google Analytics clicks, except if on a Localist / events page.
    var localistPage = false;
    if ((window.location.href.indexOf("events.cornell.edu") > -1) || (window.location.href.indexOf("localist.com") > -1)) {
      localistPage = true;
    }
    if (!localistPage) {
      $("body").on("click", "a", function(event) {
          logGA(event.target, "link", event);
      });
      $("body").on("click", "input", function(event) {
          logGA(event.target, "link", event);
      });
      $("body").on("click", "button", function(event) {
          logGA(event.target, "button", event);
      });
    }

    bindSelectMenus();
    searchHandling();
    addTimeAgo();
    handleMediaVideo();
    applySubnav();
    bindAtUMenuTabbing();
    bindSearchTabs();

    $(document).on("click", ".tip-link", function() {
      window.location = $(this).attr("href");
    });

});
