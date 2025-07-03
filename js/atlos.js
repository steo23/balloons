// Initialize stock and cart with version check
if (!localStorage.getItem("cartVersion")) {
  localStorage.clear(); // clear old format once
  localStorage.setItem("cartVersion", "v2"); // mark new version
}

let stock = JSON.parse(localStorage.getItem("stock")) || {
  year: 100,
  tear: 100,
  sub: 0,
  stick: 0,
};

let cart = JSON.parse(localStorage.getItem("cart") || "[]");

function saveState() {
  localStorage.setItem("stock", JSON.stringify(stock));
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id, name, price) {
  const qtyInput = document.getElementById(`qty-${id}`);
  const btn = document.getElementById(`btn-${id}`);
  const stockDisplay = document.getElementById(`stock-${id}`);
  const qty = parseInt(qtyInput.value);

  if (isNaN(qty) || qty < 1) {
    alert("Please enter a valid quantity.");
    return;
  }

  if (qty > stock[id]) {
    alert(`Only ${stock[id]} in stock.`);
    return;
  }

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, name, price, qty });
  }

  stock[id] -= qty;
  stockDisplay.textContent = stock[id];

  saveState();

  alert(`${qty} x ${name} added to cart.`);

  if (stock[id] === 0) {
    qtyInput.disabled = true;
    btn.style.display = "none";
  } else {
    qtyInput.max = stock[id];
  }
}

function renderCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  const emptyMessage = document.getElementById('empty-cart-message');
  cart = JSON.parse(localStorage.getItem('cart') || '[]');

  cartItemsDiv.innerHTML = '';

  if (cart.length === 0) {
    emptyMessage.style.display = 'block';
    return;
  }

  emptyMessage.style.display = 'none';

  let total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <h3>${item.name}</h3>
      <p>Price: €${item.price.toFixed(2)}</p>
      <p>Quantity: ${item.qty}</p>
      <p>Subtotal: €${subtotal.toFixed(2)}</p>
      <hr>
    `;
    cartItemsDiv.appendChild(itemDiv);
  });

  // Show total
  const totalDiv = document.createElement('div');
  totalDiv.style.fontWeight = 'bold';
  totalDiv.style.fontSize = '1.2rem';
  totalDiv.textContent = `Total: €${total.toFixed(2)}`;
  cartItemsDiv.appendChild(totalDiv);
}

// Restore stock visually on product page
window.onload = () => {
  for (const id in stock) {
    const stockEl = document.getElementById(`stock-${id}`);
    const qtyInput = document.getElementById(`qty-${id}`);
    const btn = document.getElementById(`btn-${id}`);

    if (stockEl) stockEl.textContent = stock[id];
    if (qtyInput) qtyInput.max = stock[id];
    if (qtyInput && stock[id] === 0) {
      qtyInput.disabled = true;
    }
    if (btn && stock[id] === 0) {
      btn.style.display = "none";
    }
  }

  // Render cart if on cart page
  if (document.getElementById('cart-items')) {
    renderCart();
  }
};
