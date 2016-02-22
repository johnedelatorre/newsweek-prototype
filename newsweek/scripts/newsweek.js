/**
 * Implementation of Drupal behavior.
 */
(function($) {

  $.fn.shuffle = function() {
    return this.each(function(){
      var items = $(this).children().clone(true);
      return (items.length) ? $(this).html($.shuffle(items)) : this;
    });
  }

  $.shuffle = function(arr) {
    for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
  }

  Drupal.behaviors.newsweek = {
    attach: function (context, settings) {
      var IEversion = this.detectIE();
      if (IEversion !== false) {
        $('body').addClass('ie').addClass('ie-' + IEversion);
      }
      this.detectFFX();
      this.menuExpand();
      this.piano();
      if ($('.shuffle').length) {
        $('.shuffle').shuffle();
      }
      this.carousel();
      this.premierButtons();
      this.setSponsorHeight();
    },

    /**
     * detect IE
     * returns version of IE or false, if browser is not Internet Explorer
     */
    detectIE: function() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
           // IE 12 (aka Edge) => return version number
           return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    },

    detectFFX: function() {
      if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        $('body').addClass('ffx');
      }
    },

    isMobile: function() {
      return (/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent.toLowerCase()));
    },

    piano: function() {
      $(document).on('pianoLogin', function(e) {
        $('.view1').removeClass('show').addClass('hide');
        $('.view2').removeClass('hide').addClass('show');
        $('.piano-account-email').text(e.userData.email);
        $('.piano-account-remaining-days').text(e.userData.remainingDays);
        $('.piano-account-info').show();
      });
      $(document).on('pianoLogout', function() {
        $('.view1').removeClass('hide').addClass('show');
        $('.view2').removeClass('show').addClass('hide');
      });
      $('.piano-logout').on('click', function() {
        if (typeof PianoMedia != 'undefined') {
          PianoMedia.auth.logOut();
        }
      });
      $('.piano-login').on('click', function() {
        if (typeof PianoMedia != 'undefined') {
          $('.m-expand').removeClass('active').parent().removeClass('expand');
          PianoMedia.box.login.toggle();
          Drupal.behaviors.newsweek.togglePianoLoginButton($(this));
        }
      });
      $('.piano-renew').on('click', function() {
        if (typeof PianoMedia != 'undefined') {
          PianoMedia.box.payment.toggle();
        }
        Drupal.behaviors.newsweek.closeAll();
      });
    },

    togglePianoLoginButton: function() {
      if (typeof PianoMedia != 'undefined') {
        var button = $('.piano-login')
        var loginBox = $('#' + PianoMedia.box.login.element_id);
        if (loginBox.length && loginBox.is(':visible')) {
          button.addClass('active');
          $('body').removeClass('menu-expand');
        }
        else {
          button.removeClass('active');
        }
      }
    },

    menuExpand: function() {
      var pageHeader = $('.page-header');
      var btnGlobal = $('.m-expand');
      var btnMenu = $('.m-expand.menu');
      var targetBody = $('body');

      if (pageHeader.length > 0) {
        pageHeader.on('click', '.menu-search .m-expand', function(event) {
          var toggle = $(this);
          if (toggle.hasClass('active')) {
            toggle.removeClass('active');
            toggle.parent().removeClass('expand');
            targetBody.removeClass('menu-expand');
          }
          else {
            toggle.addClass('active').parent().addClass('expand');
            btnGlobal.not(this).removeClass('active').parent().removeClass('expand');
            targetBody.addClass('menu-expand');
          }
        });

        pageHeader.on('click', '.header-meta.desktop .m-expand', function(event) {
          var toggle = $(this);
          if (toggle.hasClass('piano-login')) {
            return;
          }
          if (toggle.hasClass('active')) {
            toggle.removeClass('active').parent().removeClass('expand');
            targetBody.removeClass('menu-expand');
          }
          else {
            toggle.addClass('active').parent().addClass('expand');
            btnGlobal.not(this).removeClass('active').parent().removeClass('expand');
            targetBody.addClass('menu-expand');
          }
        });

        pageHeader.on('click', '.header-meta.mobile .m-expand', function(event) {
          var toggle = $(this);
          if (toggle.hasClass('subscribe')) {
            return;
          }
          targetBody.addClass('menu-expand');
          btnMenu.addClass('active');
          if (toggle.hasClass('subscribe')) {
            $('.header-meta.desktop .header-subscribe > div').addClass('expand');
          }
          if (toggle.hasClass('edition')) {
            $('.header-meta.desktop .header-editions').addClass('expand');
          }
          if (toggle.hasClass('user')) {
            $('.header-meta.desktop .header-user > div').addClass('expand');
          }
        });

        pageHeader.on('click', '.m-expand.back', function(event) {
          var toggle = $(this);
          toggle.closest('.expand').removeClass('expand');
          btnMenu.addClass('active').parent().addClass('expand');
        });
      }

      $(document).click(function(event) {
        if (typeof PianoMedia != 'undefined' && !$(event.target).closest('#' + PianoMedia.box.login.element_id).length && !$(event.target).closest('.piano-login').length) {
          if (typeof PianoMedia != 'undefined' && ($('#' + PianoMedia.box.login.element_id).is(':visible') || $('#pnmdMobileBarContent').hasClass('pnmdMobileBarContentOpened'))) {
            Drupal.behaviors.newsweek.closePianoLogin();
          }
        }
        if (!$(event.target).closest('.dropdown').length && !$(event.target).closest('.expand').length) {
          Drupal.behaviors.newsweek.menuCollapse();
        }
      });
    },

    closePianoLogin: function() {
      if (typeof PianoMedia != 'undefined' && ($('#' + PianoMedia.box.login.element_id).is(':visible') || $('#pnmdMobileBarContent').hasClass('pnmdMobileBarContentOpened'))) {
        PianoMedia.box.login.close();
        Drupal.behaviors.newsweek.togglePianoLoginButton();
        $('body').removeClass('menu-expand');
      }
    },

    menuCollapse: function() {
      $('.m-expand').not('.piano-login').removeClass('active').parent().removeClass('expand');
      //$('body').removeClass('menu-expand');
    },

    closeAll: function () {
      this.closePianoLogin();
      this.menuCollapse();
    },

    carousel: function() {
      if ($.fn.owlCarousel && $('#in_the_mag_carousel').length) {
        var in_the_mag = $("#in_the_mag_carousel");
        var limit = 4;
        var count = in_the_mag.children().length;
        var width = $('body').width();
        Drupal.behaviors.carousel_bk = in_the_mag.clone().children();

        if (width >= 768) limit = 8;
        if (width >= 992) limit = 16;

        // Remove items that exceed the limit
        if (count > limit) {
          while (count > limit) {
            count--;
            in_the_mag.children().last().remove();
          }
        }

        in_the_mag.owlCarousel({
          loop:false,
          autoplay:false,
          autoplayHoverPause:false,

          responsive:{
            0:{
              items:1,
              nav:false,
              dots:true,
              autoHeight:true,
            },
            768:{
              items:2,
              slideBy:2,
              nav:false,
              dots:true,
            },
            992:{
              items:4,
              slideBy:4,
              nav:true,
              dots:true,
              onInitialized : function(e) {
                setTimeout(function(){
                  Drupal.behaviors.newsweek.resizeCarouselNav();
                }, 100);
                  
              },
              onResized : function(e) {
                Drupal.behaviors.newsweek.resizeCarouselNav();
              },
            }
          },
          onResize : function(e) {
            Drupal.behaviors.newsweek.setCarouselItems(e);
          },
          onRefresh: function(e) {
            var visible = e.page.size;

            // Only display the first visible page
            if (visible) {
              $(e.target).find('.owl-item').each(function( key, value ) {
                if (key < visible) {
                  $(value).find('img').each(function( index, img ) {
                    $(img).attr('src', $(img).attr('data-src'));
                  });
                }
              });
            }
          },
        });

      }

      if ($.fn.owlCarousel && $('#reference_stories_carousel').length) {
        var reference_stories = $('#reference_stories_carousel');

        reference_stories.owlCarousel({
          loop:false,
          autoplay:false,
          autoplayHoverPause:false,

          responsive:{
            0:{
              items:1,
              dots:true,
              autoHeight:true,
            },
            768:{
              items:2,
              slideBy:2,
              dots:true,
              nav:true,
            },
            992:{
              items:4,
              slideBy:4,
              nav:true,
              dots:false,
            }
          },
        });

      }
    },

    setCarouselItems: function(e) {
      var count = e.item.count;
      var width = $('body').width();
      var limit = 4;

      if (width >= 768) limit = 8;
      if (width >= 992) limit = 16;

      // Remove all items from carousel
      while (count > 0) {
        count--;
        $(e.target).trigger('remove.owl.carousel',1);
      }

      items = Drupal.behaviors.carousel_bk;

      // Add the number of items required
      while (count < limit) {
        var html = items.eq(count).html();
        count++;
        if (html) $(e.target).trigger('add.owl.carousel','<li>' + html + '</li>');
      }
    },

    resizeCarouselNav: function() {
      var owlNav = $('.feature.magazine .owl-nav');
      var owlItemImage = $('.feature.small li:first-child .image').height();

      if (owlNav.length) {
        var topPosition = owlItemImage - 30;
        owlNav.css('top', topPosition);
      }
    },

    premierButtons: function() {
      // Print & Digtal - 3months
      $('.printdigital a.premier-btn').click(function () {
        var pianoToggleOptions = {
          package_id: '96',
          package_promo: '100',
          geo_tag: 'US'
        };
        PianoMedia.box.package.toggle(pianoToggleOptions);
        Drupal.behaviors.newsweek.closeAll();
        return false;
      });
      // Digtal Only - 3months
      $('.digital a.premier-btn').click(function () {
        var pianoToggleOptions = {
          package_id: '18',
          package_promo: '100',
          geo_tag: 'US'
        };
        PianoMedia.box.package.toggle(pianoToggleOptions);
        Drupal.behaviors.newsweek.closeAll();
        return false;
      });
      // Print & Digtal - 1year
      $('.printdigitalfull a.premier-btn').click(function () {
        var pianoToggleOptions = {
          package_id: '21',
          package_promo: '100',
          geo_tag: 'US'
        };
        PianoMedia.box.package.toggle(pianoToggleOptions);
        Drupal.behaviors.newsweek.closeAll();
        return false;
      });
      // Digtal Only - 1year
      $('.digitalfull a.premier-btn').click(function () {
        var pianoToggleOptions = {
          package_id: '19',
          package_promo: '100',
          geo_tag: 'US'
        };
        PianoMedia.box.package.toggle(pianoToggleOptions);
        Drupal.behaviors.newsweek.closeAll();
        return false;
      });
      // BlueValley promo
      $('.bluevalley a.premier-btn').click(function () {
        var pianoToggleOptions = {
          package_id: '234',
          package_promo: '100',
          geo_tag: 'US'
        };
        PianoMedia.box.package.toggle(pianoToggleOptions);
        Drupal.behaviors.newsweek.closeAll();
        return false;
      });
    },

    setSponsorHeight: function() {
      var sponsor = $('#block-nw-home-featured-story li.sponsor .info');
      if (!sponsor.length) {
        return;
      }
      Drupal.behaviors.newsweek.calculateHeight(sponsor);
      $(window).on('resize', function() {
        Drupal.behaviors.newsweek.calculateHeight(sponsor);
      });
    },

    calculateHeight: function(sponsor) {
      var windowWidth = $(window).width();
      if (windowWidth < 768) {
        sponsor.css('min-height','');
        return;
      }
      var sibling = $('#block-nw-home-featured-story li.first .info');
      var height = sibling.outerHeight();
      sponsor.css('min-height',height);
    }

  };

})(jQuery);
