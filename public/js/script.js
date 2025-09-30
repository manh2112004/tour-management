// Slider Tour Detail
var imagesThumb = new Swiper(".imagesThumb", {
  spaceBetween: 10, // Khoảng cách giữa các slide
  slidesPerView: 4, // Hiển thị 4 slide cùng lúc
  freeMode: true, // Cho phép cuộn tự do, không bắt buộc theo snap từng slide
});

var imagesMain = new Swiper(".imagesMain", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: imagesThumb, // Kết nối với slider con
  },
});
// End Slider Tour Detail
