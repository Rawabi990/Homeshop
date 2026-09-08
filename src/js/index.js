// CSS الخاص بك
import "../css/style.css";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.rtl.min.css";

// Bootstrap JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// نجيب السلة أو ننشئ وحدة
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// =====================
// صفحة المنتجات
// =====================
let buttons = document.querySelectorAll(".add-to-cart");

if (buttons.length > 0) {
  buttons.forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();

      let product = {
        name: this.dataset.name,
        price: Number(this.dataset.price),
        image: this.dataset.image,
        quantity: 1
      };

      // إذا المنتج موجود نزود الكمية
      let existing = cart.find(item => item.name === product.name);

      if (existing) {
        existing.quantity++;
      } else {
        cart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      alert("تمت الإضافة للسلة ✅");
    });
  });
}


// =====================
// صفحة checkout
// =====================
let tbody = document.querySelector("tbody");

if (tbody) {
  displayCart();
}

function displayCart() {
  tbody.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    let productTotal = item.price * item.quantity;
    total += productTotal;

    tbody.innerHTML += `
      <tr>
        <td>
          <div class="custom-media d-flex">
            <img src="${item.image}" width="50">
            <div>
              <h4>${item.name}</h4>
            </div>
          </div>
        </td>
        <td>${item.price}$</td>
        <td>
  <select onchange="changeQuantity(${index}, this.value)">
    ${[1,2,3,4,5].map(q => 
      `<option value="${q}" ${q == item.quantity ? "selected" : ""}>${q}</option>`
    ).join("")}
  </select>
</td>
        <td>${productTotal}$</td>
        <td>
          <button onclick="removeItem(${index})">
            delete
          </button>
        </td>
      </tr>
    `;
  });

  let totalAll = document.getElementById("total-price-for-all-product");
  if (totalAll) {
    totalAll.textContent = total;
  }
}

function changeQuantity(index, value) {
  cart[index].quantity = Number(value);

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}


// حذف منتج
function removeItem(index) {
  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

document.getElementById("fullyear").innerHTML = new Date().getFullYear();