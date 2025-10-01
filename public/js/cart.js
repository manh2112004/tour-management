//lấy data in ra giao diện
const drawListTour = () => {
  fetch("http://localhost:3000/cart/list-json", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: localStorage.getItem("cart"),
  })
    .then((res) => res.json())
    .then((data) => {
      const htmlsArray = data.tours.map((item, index) => {
        return `
        <tr>
            <td>${index + 1}</td>
            <td>
                <img src=${item.image} alt=${
          item.infoTour.title
        } width="80px" />
            </td>
            <td><a href="/tours/detail/${item.infoTour.slug}">${
          item.infoTour.title
        }</a></td>
            <td>${item.price_special.toLocaleString()}</td>
            <td>
            <input 
                type="number" 
                name="quantity" 
                value=${item.quantity} 
                min="1" 
                item-id=${item.tourId}
                style="width:60px" />
            </td>
            <td>${item.total.toLocaleString()}</td>
            <td>
            <button class="btn btn-danger btn-sm" btn-delete=${
              item.tourId
            }>Xoá</button>
            </td>
        </tr>
      `;
      });
      const listTour = document.querySelector("[list-tour]");
      listTour.innerHTML = htmlsArray.join("");
      // tính tổng đơn hàng
      const totalPrice = data.tours.reduce((sum, item) => sum + item.total, 0);
      const elementTotalPrice = document.querySelector("[total-price]");
      elementTotalPrice.innerHTML = totalPrice.toLocaleString();
      deleteItemCart();
      updateQuantityInCart();
    });
};
drawListTour();
// end lấy data in ra giao diện
// xoá sản phẩm trong giỏ hàng
const deleteItemCart = () => {
  const listBtnDelete = document.querySelectorAll("[btn-delete]");
  if (listBtnDelete) {
    listBtnDelete.forEach((button) => {
      button.addEventListener("click", () => {
        const tourId = button.getAttribute("btn-delete");
        const cart = JSON.parse(localStorage.getItem("cart"));
        const newCart = cart.filter((item) => item.tourId != tourId);
        localStorage.setItem("cart", JSON.stringify(newCart));
        drawListTour();
        updateCartCount();
      });
    });
  }
};
// end xoá sản phẩm trong giỏ hàng
// update sản phẩm trong giỏ hàng
const updateQuantityInCart = () => {
  const listInputUpdate = document.querySelectorAll(
    "[list-tour] input[item-id]"
  );
  if (listInputUpdate) {
    listInputUpdate.forEach((input) => {
      input.addEventListener("change", () => {
        const tourId = input.getAttribute("item-id");
        const quantity = parseInt(input.value);
        const cart = JSON.parse(localStorage.getItem("cart"));
        const tourUpdate = cart.find((item) => item.tourId == tourId);
        tourUpdate.quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        drawListTour();
      });
    });
  }
};
// end update sản phẩm trong giỏ hàng
const updateCartCount = () => {
  const miniCart = document.querySelector("[mini-cart]");
  if (miniCart) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    miniCart.innerHTML = cart.length;
  }
};
//Đặt tour
const formOder = document.querySelector("[form-order]");
if (formOder) {
  formOder.addEventListener("submit", (event) => {
    event.preventDefault();
    const fullName = event.target.elements.fullName.value;
    const phone = event.target.elements.phone.value;
    const note = event.target.elements.note.value;
    const cart = JSON.parse(localStorage.getItem("cart"));
    const data = {
      info: {
        fullName: fullName,
        phone: phone,
        note: note,
      },
      cart: cart,
    };
    fetch("/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          localStorage.removeItem("cart");
          window.location.href(`/order/success?orderCode=${data.orderCode}`);
        } else {
          alert("đặt hàng thất bại");
        }
      });
  });
}
// end đặt tour
