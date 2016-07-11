

  $(document).ready(function() {
    // Functions for code snippets
    initExpandableContent();
    initFilterableLists();
    initQuicklinks();
    
    // Functions for site menu
    changeSiteMenuText();
    initSiteMenuEvents();

    // -- Call to run this function on page load, starting with the active link in the menu drawer.
    recursiveToggleSubMenu($('#site-menu .active'));

    // Functions for search
    initSearchEvents();

    // Functions for video
    displayVideoLink();
    
    // Functions for page positioning
    updateInternalLinkScroll();
    adjustPageTopMargin();
  });

  // Using window.load for functions that require their inner elements to be fully loaded before executing.
  $(window).load(function() {
    // Functions for Bootstrap carousels
    initBootstrapImages();
    initBootstrapVideos();

    // Functions called the window is resized.
    $(window).resize(function() {
      resizeCarousel();
      adjustPageTopMargin();
    });
  });



  /* ----------------------------------
   * Functions for code snippets
   * ---------------------------------- */

  /* 
   * Function to set up expandable content
   */

  function initExpandableContent() {
    // prepare expanding
    $('.expand').each(function(e) {
      $(this).
        addClass('enhanced')
        .html('<span>' + $(this).html() + '<i class="fa fa-fw"></i></span>')
        .next('div')
        .hide();
    });
    // expanding click state
    $('.expand').click(function() {
      $(this).next('div').slideToggle();
      $(this).toggleClass('active');
    });
  }

  /*
   * Function to set up filterable lists
   */

  function initFilterableLists() {
    $('.grouping').each(function(e) {
      var itemActive = 'active';
      var groupMenu = '.grouping .menu li';
      var groupItem = '.grouping .item';
      $(groupMenu + '.all').addClass(itemActive);
      $(groupMenu).click(function(){
        $(groupMenu).removeClass(itemActive);
        var newSelection = $(this).attr('class');
        if( newSelection == 'all') {
          $(groupItem).slideDown();
        } else {
          $(groupItem + ':not(.'+newSelection+')').removeClass('active').slideUp().next('div').slideUp();
          $(groupItem+'.'+newSelection).slideDown();
        }
        $(this).addClass(itemActive);
      });
    });
  }

  /*
   * Function to set up quicklinks
   */

  function initQuicklinks() {
    $('.global-sidebar-quicklinks, .page-sidebar-quicklinks').click(function() {
      $(this).toggleClass('show');
      $('ul', this).slideToggle();
    });
  }


  /* ----------------------------------
   * Functions for site menu
   * ---------------------------------- */

  /*
   * Change text/link in full site menu
   */

  function changeSiteMenuText() {
    $('#site-menu .toggle-nav')
      .attr('title','Close navigation menu')
      .html('<span class="large">x</span> <span class="small">Close</span>');
  }

  /* 
   * Function to initialize site menu events.
   */

  function initSiteMenuEvents() {
    // Event to open the menu drawer.
    $('.toggle-nav').click(function(event) {
      event.preventDefault();
      $('body').toggleClass('show-nav');
    });

    // Event to close the menu drawer on click.
    $('.site-overlay').click(function() {
      $('body').removeClass('show-nav');
    });

    // Event to close the menu drawer on escape key.
    $(document).keyup(function(e) {
      if (e.keyCode == 27 && $('body').hasClass('show-nav')) {
        $('body').removeClass('show-nav');

        // Set focus on the skip to menu navigation link for screen readers.
        $('a#skip-to-site-menu').focus();
      }
    });

    // Event for skip to menu link for screen readers.
    $('#skip-to-site-menu').click(function(event) {
      event.preventDefault();
      $('body').addClass('show-nav');
      $('#menu-links .navbar-nav > .nav-item:first-child a').focus();
    });

    // Event for menu drawer tabs.
    $('.menu-tab').click(function(event) {
      event.preventDefault();

      // Get the ID of the menu drawer panel to be displayed.
      var id = $(this).attr('data-target');

      // Show the correct panel.
      $('#site-menu .menu').hide();
      $(id).show();
    });

    // Event to open/close sub-menus in the menu drawer.
    $('.menu-toggle').click(function(event) {
      event.preventDefault();
      toggleSubMenu($(this));
    });
  }

  /*
   * Function that opens/closes a single sub-menu in the menu drawer.
   */

  function toggleSubMenu(el) {
    var parent = el.parent();

    // If the menu item is already open, close everything underneath it.
    if (parent.hasClass('open')) {
      $('.nav-item', parent).removeClass('open');
      $('.nav-item .menu-child', parent).hide();
    }

    // Toggle the sub-menu being opened/closed.
    parent.toggleClass('open').children('.menu-child').slideToggle();

    // Toggle the opened/closed state icon container.
    $('.opened', el).toggle();
    $('.closed', el).toggle();
  }

  /*
   * Recursive function for the menu drawer that opens the sub-menu containing the
   * active link and all of that sub-menus parents.
   * ** Run on page load. **
   */

  function recursiveToggleSubMenu(el) {
    // Find the toggle button of the active link's sub-menu container.
    var toggle = $(el).closest('.menu-child').siblings('.menu-toggle');

    // If that toggle button exists (i.e. we are not at the top-level menu), open that sub-menu.
    if (toggle.length) {
      toggleSubMenu(toggle);
      recursiveToggleSubMenu(toggle);
    }
  }


  /* ----------------------------------
   * Functions for search
   * ---------------------------------- */

  function initSearchEvents() {
    // Click event for the search button.
    $('#search-form .btn.search').click(function(event) {
      // If the search bar is closed, open it.
      if (!$('#search-form').hasClass('open')) {
        event.preventDefault();
        openSearchBar();
      } 

      // If the search bar is open but there is no search input, close the search bar.
      else if ($('.search-input').val() == '') {
        event.preventDefault();
        closeSearchBar();
      }
    });

    // Click event to close search bar if user clicks outside of it.
    $(document).click(function(event) {
      if (!$(event.target).closest('#search-form').length && !$(event.target).is('#search-form')) {
        closeSearchBar();
      }
    });

    // Click event to close search bar if user presses escape.
    $(document).keyup(function(e) {
      if (e.keyCode == 27) { // escape key maps to keycode `27`
        closeSearchBar();
      }
    });
  }

  /* 
   * Function to open the search bar.
   */

  function openSearchBar() {
    // Open the search form.
    $('#search-form').addClass('open');

    // Top level menu hides when search is open to prevent overlap.
    $('#top-level-menu').addClass('fadeNav');

    // Focus should be on input field if search is open.
    $('.search-input').focus();
  }

  /* 
   * Function to close the search bar.
   */

  function closeSearchBar() {
    if ($('#search-form').hasClass('open')) {
      $('#search-form').removeClass('open');
      $('#top-level-menu').removeClass('fadeNav');
      $('.search-input').blur();
    }
  }


  /* ----------------------------------
   * Functions for video
   * ---------------------------------- */

  /*
   * Function for print-only: Video displays the iframe link/src
   */

  function displayVideoLink() {
    var videos = $('div.video');
    $.each(videos, function(i, obj) {
      var video = $('iframe', $(obj));
      $(this).prepend('<p class="print-only text-hide"><b>Video link:</b> <a href="' + video.prop('src') + '">' + video.prop('src') + '</a></p>');
    });
  }


  /* ----------------------------------
   * Functions for page positioning
   * ---------------------------------- */

  /*
   * Hash change event to adjust scrollTo Y position for internal links
   * Accounts for the height of the top navigation
   */

  function updateInternalLinkScroll() {
    $(window).on("hashchange", function () {
      if (location.hash.length !== 0) {
        var offset = $('header.navbar').height() + 16;  // Add 1em extra to the height to give offset some padding.
        window.scrollTo(window.scrollX, window.scrollY - offset);
      }
    });
  }

  /*
   * Function to adjust the top margin of the main page for taller site headers
   * Useful when the site name breaks to multiple lines.
   */

  function adjustPageTopMargin() {
    var offset = $('header.navbar').height();
    $('.page').css('margin-top', offset);
  }


  /* ----------------------------------
   * Functions for Bootstrap carousels
   * ---------------------------------- */

  /*
   * Function that adds carousel previous and next arrows to thumbnails area.
   */

  function addCarouselArrows(nav) {
    var navWrap = nav.parent();

    // Check to see if the gallery navigation should scroll.
    if (nav.width() < nav.prop('scrollWidth')) {
      nav.addClass('scrolling');

      // Add previous and next buttons.
      var navPrev = $('<span class="fa fa-caret-left scroll prev"></span>').prependTo(navWrap),
          navNext = $('<span class="fa fa-caret-right scroll next"></span>').appendTo(navWrap);

      // Add scrolling click events.
      navPrev.click( function() { nav.scroll('left') });
      navNext.click( function() { nav.scroll('right') });

      nav.scroll = function(direction) {
        var amount = direction === 'right' ? nav.width() : -nav.width();
        nav.animate({
          scrollLeft: nav.scrollLeft() + amount
        }, 400);
      }
    }
  }

  /*
   * Function that instantiates the carousel if it is a gallery.
   */

  function instantiateGallery(carousel) {
    carousel.carousel({
      pause: true,
      interval: false
    });

    var nav = $('.carousel-indicators', carousel);
    addCarouselArrows(nav);
  }

  /*
   * Function that instantiates the carousel if it is a rotator.
   */

  function instantiateRotator(carousel) {
    carousel.carousel({
      interval: 6000
    });

    carousel.swipe({
      swipe: function(event, direction) {
        if (direction == 'left') { $(this).carousel('next'); }
        if (direction == 'right') { $(this).carousel('prev'); }
      },
      hold: function(event) {
        $(this).carousel('pause');
      },
      allowPageScroll: 'vertical',
      preventDefaultEvents: false
    });
  }

  /*
   * Function that sets rotator item height to the height of the largest item.
   */

  function setRotatorItemHeight(carousel) {
    var maxHeight = 0,
        items = $('.carousel-item', carousel);

    // Remove any existing height attribute on items.
    items.css('height', '');

    $.each(items, function(i, obj) {
      // Item must be visible to get height.
      var height = $(obj).show().outerHeight();

      // Set the max height to the current item's height if it is bigger.
      if (height > maxHeight) {
        maxHeight = height;
      }

      // Remove display attribute on item when done.
      $(obj).css('display', '');
    });

    // Set height of all items to max height.
    items.css('height', maxHeight);
  }

  /*
   * Function to initialize Boostrap image gallery/rotator
   */

  function initBootstrapImages() {
    var carousels = $('.carousel');

    $.each(carousels, function(i, obj) {
      carousel = $(obj);

      // Give the carousel an ID; required by Bootstrap if multiple galleries on page.
      var id = "carousel-" + i;
      carousel.attr('id', id);

      // Add the ID as data attributes to carousel elments.
      var indicators = $('.carousel-indicators li', carousel);
      indicators.attr('data-target', "#" + id);

      var controls = $('.carousel-control', carousel);
      controls.attr('href', "#" + id);

      // Instantiate the carousel.
      if (carousel.hasClass('gallery-items')) {
        instantiateGallery(carousel);
      } else {
        setRotatorItemHeight(carousel);
        instantiateRotator(carousel);
      }
    });
  }

  /*
   * Function to initialize Boostrap video gallery
   */

  function initBootstrapVideos() {
    // See if there are video galleries on the page.
    var videosGalleries = $('.video-gallery-container');

    $.each(videosGalleries, function(i, obj){
      // If this javascript is enabled, allow the video gallery to display.
      $(obj).removeClass('no-js');

      // Get an array of each video in the player.
      var videos = $('.video-gallery-nav li', obj);

      // Set the first video as the video to be displayed in the iframe.
      var source = $(videos[0]).attr('data-videosource');
      $('.video-gallery-player', obj).attr('src', source);

      // Create click events for each of the video icons in the navigation to swap the active video.
      $('.video-gallery-nav li').click(function(event) {
        event.preventDefault();
        var source = $(this).attr('data-videosource');
        var parent = $(this).closest('.video-gallery-container');
        $('.video-gallery-player', parent).attr('src', source);
      });

      // Add gallery navigation arrows, if necessary.
      var nav = $('.video-gallery-nav .slides', obj);
      addCarouselArrows(nav);
    });
  }

  /*
   * Resize rotator item heights (used on window resize).
   */

  function resizeCarousel() {
    var carousels = $('.carousel');
     $.each(carousels, function(i, obj) {
      setRotatorItemHeight($(obj));
    });
  }


