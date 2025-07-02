let stock = {
  year: 10,
  tear: 10,
  sub: 10,
  stick: 1 // you said only 1 in stock
};

let cart = [];

function addToCart(id, name, price) {
  const qtyInput = document.getElementById(`qty-${id}`);
  const stockDisplay = document.getElementById(`stock-${id}`);
  const button = qtyInput.nextElementSibling; // safer way to find the button

  const qty = parseInt(qtyInput.value);

  if (isNaN(qty) || qty < 1) {
    alert("Please enter a valid quantity.");
    return;
  }

  if (qty > stock[id]) {
    alert(`Sorry, only ${stock[id]} in stock.`);
    return;
  }

  // Add to cart
  cart.push({ name, price, qty });
  stock[id] -= qty;

  // Update UI
  stockDisplay.textContent = stock[id];
  alert(`${qty} x ${name} added to cart.`);

  // Disable input & hide button if stock = 0
  if (stock[id] === 0) {
    qtyInput.disabled = true;
    button.style.display = "none";
  } else {
