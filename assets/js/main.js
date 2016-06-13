// Slick Carousel
$(document).ready(function(){
  $('.carousel').slick({
    accessibility: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    dots: true,
    fade: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          arrows: false
        }
      }
    ]
  });
});

$(document).ready(function () {
  if ($('.accordion-tabs-minimal')) {
    $('.accordion-tabs-minimal').each(function(index) {
      $(this).children('li').first().children('a').addClass('is-active').next().addClass('is-open').show();
      window.location = $(this).first().children().find('a:first').attr('href');
    });
    $('.accordion-tabs-minimal').on('click', 'li > a.tab-link', function(event) {
      if ($(this).hasClass('disabled')) {
        return event.preventDefault;
      } else if (!$(this).hasClass('is-active')) {
        event.preventDefault();
        var accordionTabs = $(this).closest('.accordion-tabs-minimal');
        accordionTabs.find('.is-open').removeClass('is-open').hide();

        $(this).next().toggleClass('is-open').toggle();
        accordionTabs.find('.is-active').removeClass('is-active');
        $(this).addClass('is-active');
        window.location = $(this).attr('href');

        var sideNavBar = $('.is-open #scroll-on-page-top');
        sideNavBar.find('a').removeClass('sidebar-is-active');
        sideNavBar.find('a:first').addClass('sidebar-is-active');
      } else {
        event.preventDefault();
      }
    });
  }

  if ($('#scroll-on-page-top')) {
    $('.tab-header-and-content #scroll-on-page-top').stick_in_parent({
      offset_top: 20,
      parent: '#usa-sidebar-wrapper'
    });
  }
});

(function (jQuery) {
  jQuery.mark = {
    jump: function (options) {
      var defaults = {
        selector: 'a.scroll-on-page-link'
      };
      if (typeof options == 'string') {
        defaults.selector = options;
      }

      options = jQuery.extend(defaults, options);
      return jQuery(options.selector).click(function (e) {

        var sideNavBar = $(this).closest('#scroll-on-page-top');
        sideNavBar.find('.sidebar-is-active').removeClass('sidebar-is-active');
        $(this).addClass('sidebar-is-active');

        var jumpobj = jQuery(this);
        var target = jumpobj.attr('href');
        var thespeed = 1000;
        var offset = jQuery(target).offset().top;
        jQuery('html,body').animate({
          scrollTop: offset
        }, thespeed, 'swing');
        e.preventDefault();
      });
    }
  };
})(jQuery);


jQuery(function(){  
  jQuery.mark.jump();
});