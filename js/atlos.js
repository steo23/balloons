// Global cart and stock
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

  // Add or update cart item
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, name, price, qty });
  }

  stock[id] -= qty;
  stockDisplay.textContent = stock[id];
  alert(`${qty} x ${name} added to cart.`);

  // Disable input and hide button if sold out
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

  // Show the checkout button
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.style.display = "inline-block";
  }
}

function checkout() {
  alert("✅ Checkout triggered. Ready to integrate with Atlos.");
}
