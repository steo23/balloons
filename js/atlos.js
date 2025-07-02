let stock = {
  year: 10,
  tear: 10,
  sub: 10,
  stick: 1
};

let cart = [];

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

  localStorage.setItem('cart', JSON.stringify(cart)); // ✅ store cart

  alert(`${qty} x ${name} added to cart.`);

  if (stock[id] === 0) {
    qtyInput.disabled = true;
    btn.style.display = "none";
  } else {
    qtyInput.max = stock[id];
  }
}
