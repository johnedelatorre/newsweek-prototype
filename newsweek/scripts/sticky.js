/**
 * Implementation of Drupal behavior.
 */
(function($) {
  Drupal.behaviors.ibtimes = {

    elements: {},
    lastScroll: 0,

    attach: function (context, settings) {
      if ($('body').hasClass('logged-in')) {
        return;
      }
      this.init();
      this.stickyHeader();
      this.stickySocialPanel();
      this.stickySidebar();
    },

    init: function () {
      if (!this.elements.length) {
        var thisObj = this;
        this.elements.window = {
          el: $(window)
        };
        this.elements.pageHeader = {
          el: $('header.stickyhead')
        }
        this.elements.articleSocial = {
          el: $('.article-social')
        }
        this.elements.dropdown = {
          el: $('.page-header .dropdown')
        }
        this.elements.stickySocial = {
          el: $('.sticky_social')
        }
        this.elements.right1 = {
          el: $('#dfp-ad-right1-wrapper')
        }
        this.elements.right2 = {
          el: $('#dfp-ad-right2-wrapper')
        }
        this.elements.right3 = {
          el: $('#dfp-ad-right3-wrapper')
        }
        this.elements.right1Aside = {
          el: this.elements.right1.el.closest('aside')
        }
        this.elements.right2Aside = {
          el: this.elements.right2.el.closest('aside')
        }
        this.elements.right3Aside = {
          el: this.elements.right3.el.closest('aside')
        }
        this.elements.articleBody = {
          el: $('.article-content')
        }
        this.elements.contentBottom = {
          el: $('.page-bottom')
        }
        this.elements.body = {
          el: $('body')
        }
        this.elements.mExpand = {
          el: $('.m-expand')
        }

        $(document).on('recalculate', function() {
          thisObj.recalculateElements();
        });

        if (typeof googletag != 'undefined') {
          googletag.cmd.push(function() {
            googletag.pubads().addEventListener('slotRenderEnded', function (event) {
              $.event.trigger({
                type: 'recalculate'
              });
              $.event.trigger({
                type: 'reposition'
              });
            });
          });
        }

        $(window).on('scroll', function() {
          $.event.trigger({
            type: 'reposition'
          });
        });

        $(window).on('resize', function() {
          $.event.trigger({
            type: 'recalculate'
          });
          $.event.trigger({
            type: 'reposition'
          });
        });

        $(document).on('breaking_news_open breaking_news_close', function() {
          $.event.trigger({
            type: 'recalculate'
          });
          $.event.trigger({
            type: 'reposition'
          });
        });

        $.event.trigger({
          type: 'recalculate'
        });

        $.event.trigger({
          type: 'reposition'
        });
      }
    },

    recalculateElements: function() {
      var el;
      var fixed = false;
      this.elements.window.height = this.elements.window.el.height();
      this.elements.window.width = this.elements.window.el.width();

      this.elements.pageHeader = this.setItemAttributes(this.elements.pageHeader);
      this.elements.articleSocial = this.setItemAttributes(this.elements.articleSocial);
      this.elements.dropdown = this.setItemAttributes(this.elements.dropdown);
      this.elements.stickySocial = this.setItemAttributes(this.elements.stickySocial);
      this.elements.right1Aside = this.setItemAttributes(this.elements.right1Aside);
      this.elements.right2Aside = this.setItemAttributes(this.elements.right2Aside);
      this.elements.right3Aside = this.setItemAttributes(this.elements.right3Aside);
      this.elements.articleBody = this.setItemAttributes(this.elements.articleBody);
      this.elements.contentBottom = this.setItemAttributes(this.elements.contentBottom);
    },

    setItemAttributes: function(item) {
      var el;
      var fixed = false;
      var absolute = false;
      el = item.el;
      if (!el.length) {
        return item;
      }
      if (el.hasClass('fixed')) {
        fixed = true;
        el.removeClass('fixed');
      }
      if (el.hasClass('absolute')) {
        absolute = true;
        el.removeClass('absolute');
      }
      item.height = el.length ? el.outerHeight(true) : 0;
      item.width = el.length ? el.width() : 0;
      item.left = el.length ? el.offset().left : 0;
      item.top = el.length ? el.offset().top : 0;
      if (fixed) {
        el.addClass('fixed');
      }
      if (absolute) {
        el.addClass('absolute');
      }
      return item;
    },

    stickyHeader: function () {
      if (this.elements.pageHeader.el.length) {
        var thisObj = this;
        $(document).on('reposition', function(e) {
          thisObj.affixHeader();
          thisObj.scrollHeader();
        });
      }
    },

    affixHeader: function() {
      this.elements.pageHeader.el.addClass('affix');
      this.elements.body.el.css('padding-top', this.elements.pageHeader.height);
    },

    scrollHeader: function () {
      var st = this.elements.window.el.scrollTop();
      if (this.elements.window.width < 768) {
        if (st > this.elements.pageHeader.height) {
          if (st >= this.lastScroll) {
            if(!this.elements.body.el.hasClass('expand-menu')) {
              this.elements.pageHeader.el.css({
                'top': -this.elements.pageHeader.height
              });
            }
          }
          else if (st < this.lastScroll) {
            this.elements.pageHeader.el.css({
              'top': 0
            });
          }
        }
        else {
          if (st >= this.lastScroll) {
            this.elements.pageHeader.el.css({
              'top': 0
            });
          }
          else {
            this.elements.pageHeader.el.css({
              'top': ''
            });
          }
        }

        var dropdownHeight = this.elements.window.height - this.elements.pageHeader.height;
        this.elements.dropdown.el.css({
          'height': dropdownHeight,
          'overflow-y': 'scroll'
        });

        if (this.elements.articleSocial.el.length > 0) {
          if (st > this.lastScroll){
            this.elements.articleSocial.el.css('bottom', 0);
          }
          else {
            this.elements.articleSocial.el.css('bottom', -this.elements.articleSocial.height);
          }
        }
      }
      // desktop
      else {
        this.elements.dropdown.el.css({
          'height': '',
          'overflow-y': ''
        });
        this.elements.articleSocial.el.css('bottom', '');
      }
      this.lastScroll = st;
    },

    stickySocialPanel: function () {
      var thisObj = this;
      var stickySocial = this.elements.stickySocial.el;
      if (stickySocial.length) {
        $(document).on('reposition', function() {
          thisObj.customSocialSticky();
        });
      }

      $(document).on('click', '.share-toggle', function(){
        $(this).toggleClass('active').parent().toggleClass('expand');
      });
    },

    customSocialSticky: function () {
      var sticky = this.elements.stickySocial.el;
      var itemH = this.elements.stickySocial.height;
      var refH = this.elements.articleBody.height;
      var sLeft = this.elements.stickySocial.left;

      var start = this.elements.articleBody.top;
      var stop = start + refH - itemH;

      var height = this.elements.pageHeader.height;
      var topPosition = height + 35;

      var st = this.elements.window.el.scrollTop() + topPosition;
      if (st > start && st < stop){
        sticky.removeClass('absolute').addClass('fixed').css({
          'left': sLeft,
          'top': topPosition
        });
      }
      else if (st >= stop) {
        sticky.addClass('absolute').css({
          'left': sLeft,
          'top': stop
        });
      }
      else {
        sticky.removeClass('fixed absolute').css({
          'left': '',
          'top': ''
        });
      }
    },

    stickySidebar: function () {
      var thisObj = this;
      if (this.elements.body.el.hasClass('locked-content')) {
        return;
      }
      $(document).on('reposition', function() {
        if (thisObj.elements.window.width > 991) {
          if ($('.standard-article #dfp-ad-right1').hasClass('sticky-ads')) {
            thisObj.stickSidebar(thisObj.elements.right1Aside, 1);
          }
          else if ($('.magazine-article #dfp-ad-right1').hasClass('sticky-ads')) {
            thisObj.stickSidebar(thisObj.elements.right1Aside, 2);
            thisObj.stickSidebar(thisObj.elements.right2Aside, 3);
            thisObj.stickSidebar(thisObj.elements.right3Aside, 4);
          }
        }
      });
    },

    stickSidebar: function(sticky, type) {
      if (!sticky.el.length) {
        return;
      }
      var stickyHeight = sticky.height;
      var stickyWidth = sticky.width;
      var stickyLeft = sticky.left;

      var articleHeight = this.elements.articleBody.height;

      var start = sticky.top;
      var stopTop = this.elements.articleBody.top;
      var stopBot = this.elements.contentBottom.top;
      var stop = stopBot - stickyHeight;
      var contentHeight = stopBot - stopTop;

      // regular article
      if (type == '1') {
        var halfArticleHeight = articleHeight / 2;

        a = stickyHeight; // sidebar height
        b = halfArticleHeight; // half article height
        if (a > b) { //sidebar greater than half article height
          stop = stopBot - a;
        }
        else if (b > a) { //sidebar can stop at mid-article
          stop = stopTop + b;
        }
      }

      // featured article
      else {
        var a = 0;
        var b = 0;
        var c = stickyHeight;
        
        if (type == '2') {
          var siblingAside = this.elements.articleBody.el.find('aside.break-2');
          var siblingParallax = this.elements.articleBody.el.find('p.parallax:first');
        }
        else if (type == '3' || type == '4') {
          var siblingAside = sticky.el.nextAll('aside.break:first');
          var siblingParallax = sticky.el.nextAll('p.parallax:first');
        }
        
        if (siblingAside.length) {
          var siblingAsideTop = siblingAside.offset().top;
          a = siblingAsideTop;
        }
        if (siblingParallax.length) {
          var siblingParallaxTop = siblingParallax.offset().top;
          b = siblingParallaxTop;
        }

        if (a > 0 && b > 0) { // case 1: sibling parallax and sibling ad exist
          if (a > b) { // if immediate sibling is parallax, stop before parallax
            stop = b - c;
          }
          else { // if immediate sibling is right ad, stop before ad
            stop = a - c;
          }
        }
        else if (a > 0 && b == 0) { // case 2: no sibling parallax, stop before ad
          stop = a - c;
        }
        else if (a == 0 && b > 0) { // case 3: no sibling ad, stop before parallax
          stop = b - c;
        }
        else { // case 4: no siblings, stop at end of article
          stop = parseInt(stopBot) - c;
        }
      }


      var topPosition = this.elements.pageHeader.height + 15;
      var st = this.elements.window.el.scrollTop() + topPosition;
      if (st > start && st < stop){
        sticky.el.removeClass('absolute').addClass('fixed').css({
          'width':stickyWidth,
          'left':stickyLeft,
          'top':topPosition
        });
      }
      else if (st >= stop) {
        sticky.el.addClass('absolute').addClass('fixed').css({
          'width':stickyWidth,
          'left':stickyLeft,
          'top':stop
        });
      }
      else {
        sticky.el.removeClass('fixed absolute').css({
          'width':'',
          'left':'',
          'top':''
        });
      }
    }
  };

})(jQuery);
