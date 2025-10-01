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
const alertAddCartSuccess = () => {
  const elementAlert = document.querySelector("[alert-add-cart-success");
  if (elementAlert) {
    elementAlert.classList.remove("alert-hidden");
    setTimeout(() => {
      elementAlert.classList.add("alert-hidden");
    }, 3000);
    const closeAlert = elementAlert.querySelector("[close-alert]");
    closeAlert.addEventListener("click", () => {
      elementAlert.classList.add("alert-hidden");
    });
  }
};
// carts
const cart = localStorage.getItem("cart");
if (!cart) {
  localStorage.setItem("cart", JSON.stringify([]));
}
const showMiniCart = () => {
  const miniCart = document.querySelector("[mini-cart]");
  if (miniCart) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      miniCart.innerHTML = cart.length;
    }
  }
};
showMiniCart();
const formAddToCart = document.querySelector("[form-add-to-cart]");
if (formAddToCart) {
  formAddToCart.addEventListener("submit", function (event) {
    event.preventDefault();
    const quantity = parseInt(event.target.elements.quantity.value);
    const tourId = parseInt(formAddToCart.getAttribute("tour-id"));
    if (quantity > 0 && tourId) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const indexExitsTour = cart.findIndex((item) => item.tourId === tourId);
      if (indexExitsTour == -1) {
        cart.push({
          tourId: tourId,
          quantity: quantity,
        });
      } else {
        cart[indexExitsTour].quantity += quantity;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      alertAddCartSuccess();
      showMiniCart();
    }
  });
}
// end carts
