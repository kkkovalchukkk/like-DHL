var scrollPos = 0;

$(".arrow-up").click(() => $("html,body").animate({ scrollTop: 0 }, 500));

if (window.scrollY >= 78) {
  document.querySelector(".bottom-header").classList.add("fixed-header");
}
$(window).scroll(function () {
  var st = $(this).scrollTop();
  if (st > scrollPos) {
    if (scrollPos >= 78) {
      document.querySelector(".bottom-header").classList.add("fixed-header");
    }
    if (scrollPos >= 250) {
      document.querySelector(".arrow-up").classList.remove("hidden");
    }
  } else {
    if (scrollPos <= 78) {
      document.querySelector(".bottom-header").classList.remove("fixed-header");
    }
    if (scrollPos <= 250) {
      document.querySelector(".arrow-up").classList.add("hidden");
    }
  }
  scrollPos = st;
});
