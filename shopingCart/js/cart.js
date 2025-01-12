let cart = [];

// Add product to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cartItem = cart.find(item => item.product.id === productId);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ product, quantity: 1 });
  }

  updateCart();
}

// Update cart quantity
function updateQuantity(productId, quantity) {
  const cartItem = cart.find(item => item.product.id === productId);
  if (cartItem) {
    cartItem.quantity = Math.max(1, parseInt(quantity)); // Prevent negative or zero quantity
    updateCart();
  }
}

// Remove product from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.product.id !== productId);
  updateCart();
}

// Clear all items from cart
function clearCart() {
  cart = [];
  updateCart();
}

// Update cart display
function updateCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  const totalDiv = document.getElementById('total');
  cartItemsDiv.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.innerHTML = `
      <p>${item.product.name} - $${item.product.price} x 
        <input type="number" value="${item.quantity}" onchange="updateQuantity(${item.product.id}, this.value)"> = $${item.product.price * item.quantity}</p>
      <button onclick="removeFromCart(${item.product.id})">Remove</button>
    `;
    cartItemsDiv.appendChild(cartItemDiv);
    total += item.product.price * item.quantity;
  });

  totalDiv.textContent = `Total: $${total}`;
}

// Handle checkout button click
document.getElementById('checkout').addEventListener('click', () => {
  alert('Proceeding to checkout...');
});

// Handle clear cart button click
document.getElementById('clear-cart').addEventListener('click', () => {
  clearCart();
});
