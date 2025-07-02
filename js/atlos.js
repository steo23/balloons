let stock = {
  year: 10,
  tear: 10,
  sub: 10,
  stick: 10
};

let cart = [];

function addToCart(id, name, price) {
  const qtyInput = document.getElementById(`qty-${id}`);
  const qty = parseInt(qtyInput.value);

  if (qty > stock[id]) {
    alert(`Sorry, only ${stock[id]} in stock.`);
    return;
  }

  cart.push({ name, price, qty });
  stock[id] -= qty;

  document.getElementById(`stock-${id}`).textContent = stock[id];
  alert(`${qty} x ${name} added to cart.`);
}

function viewCart() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let total = 0;
  let summary = "🛒 Your Cart:\n\n";

  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    summary += `${item.qty} x ${item.name} = $${itemTotal.toFixed(2)}\n`;
  });

  summary += `\nTotal: $${total.toFixed(2)}`;
  alert(summary);
}
