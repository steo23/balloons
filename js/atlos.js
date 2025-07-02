if (!localStorage.getItem("cartVersion")) {
  localStorage.clear(); // clear old format once
  localStorage.setItem("cartVersion", "v2"); // mark that we're using the new one
}

let stock = JSON.parse(localStorage.getItem("stock")) || {
  year: 10,
  tear: 10,
  sub: 10,
  stick: 1
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

  saveState(); // save both cart and stock

  alert(`${qty} x ${name} added to cart.`);

  if (stock[id] === 0) {
    qtyInput.disabled = true;
    btn.style.display = "none";
  } else {
    qtyInput.max = stock[id];
  }
}

window.onload = () => {
  // Restore stock visually on product page
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
};
