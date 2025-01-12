let cart = [];
let promoCodeApplied = false;

// Sample products with images
const products = [
  { id: 1, name: "Product A", price: 100, image: "images/airpod.jpg" },
  { id: 2, name: "Product B", price: 50, image: "images/watch.jpg" },
  { id: 3, name: "Product C", price: 30, image: "images/headphone.jpg" }
];

// Display products
const productList = document.getElementById("product-list");
products.forEach(product => {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product");
  productDiv.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h4>${product.name}</h4>
    <p>Price: $${product.price}</p>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
  `;
  productList.appendChild(productDiv);
});

// Add product to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cartItem = cart.find(item => item.id === productId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
  const cartItemsDiv = document.getElementById("cart-items");
  const subtotalElement = document.getElementById("subtotal");
  const discountElement = document.getElementById("discount");
  const finalTotalElement = document.getElementById("final-total");

  let subtotal = 0;
  cartItemsDiv.innerHTML = "";

  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    cartItemsDiv.innerHTML += `
      <p>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>
    `;
  });

  const discount = calculateDiscount(subtotal);
  const finalTotal = subtotal - discount;

  subtotalElement.textContent = subtotal.toFixed(2);
  discountElement.textContent = discount.toFixed(2);
  finalTotalElement.textContent = finalTotal.toFixed(2);
}

// Apply promo code
document.getElementById("apply-promo-code").addEventListener("click", () => {
  const promoCodeInput = document.getElementById("promo-code-input").value.trim();
  const promoMessage = document.getElementById("promo-message");

  if (promoCodeApplied) {
    promoMessage.textContent = "Promo code already applied!";
    promoMessage.style.color = "red";
    return;
  }

  if (promoCodeInput === "ostad10" || promoCodeInput === "ostad5") {
    promoCodeApplied = promoCodeInput;
    promoMessage.textContent = "Promo code applied successfully!";
    promoMessage.style.color = "green";
  } else {
    promoMessage.textContent = "Invalid promo code!";
    promoMessage.style.color = "red";
  }

  updateCartDisplay();
});

// Calculate discount
function calculateDiscount(subtotal) {
  if (!promoCodeApplied) return 0;

  if (promoCodeApplied === "ostad10") {
    return subtotal * 0.1;
  } else if (promoCodeApplied === "ostad5") {
    return subtotal * 0.05;
  }

  return 0;
}

// Clear cart
document.getElementById("clear-cart").addEventListener("click", () => {
  cart = [];
  promoCodeApplied = false;
  document.getElementById("promo-message").textContent = "";
  updateCartDisplay();
});
