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