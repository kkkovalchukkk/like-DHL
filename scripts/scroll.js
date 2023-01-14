var scrollPos = 0;
$(window).scroll(function () {
  var st = $(this).scrollTop();
  if (st > scrollPos) {
    if (scrollPos >= 78) {
      document.querySelector(".bottom-header").classList.add("fixed-header");
    }
  } else {
    if (scrollPos <= 78) {
      document.querySelector(".bottom-header").classList.remove("fixed-header");
    }
  }
  scrollPos = st;
});
