// Make cart and stock globally accessible
window.stock = {
  year: 10,
  tear: 10,
  sub: 10,
  stick: 1
};

window.cart = [];

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

  // Add to cart or update existing item
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.qty += qty;
  } else {
    cart.push({ id, name, price, qty });
  }

  stock[id] -= qty;

  stockDisplay.textContent = stock[id];
  alert(`${qty} x ${name} added to cart.`);

  if (stock[id] === 0) {
    qtyInput.disabled = true;
    btn.style.display = "none";
  } else {
    qtyInput.max = stock[id];
  }
}

function viewCart() {
  if (!cart || cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let total = 0;
  let summary = "🛒 Your Cart:\n\n";

  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    summary += `${item.qty} x ${item.name} = €${itemTotal.toFixed(2)}\n`;
  });

  summary += `\nTotal: €${total.toFixed(2)}`;
  alert(summary);
}
