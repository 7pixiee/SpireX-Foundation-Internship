const products = [
  { id: 1, name: "Studio Bottle", category: "Lifestyle", price: 890, tag: "Bestseller", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85" },
  { id: 2, name: "Everyday Tote", category: "Accessories", price: 1290, tag: "New", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85" },
  { id: 3, name: "Desk Organizer", category: "Desk", price: 1590, tag: "", image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=85" },
  { id: 4, name: "Minimal Wallet", category: "Accessories", price: 1190, tag: "", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85" },
  { id: 5, name: "Ceramic Mug", category: "Lifestyle", price: 690, tag: "", image: "https://images.unsplash.com/photo-1616241673111-508b4662c707?q=80&w=802&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" },
  { id: 6, name: "Wireless Headphones", category: "Desk", price: 2490, tag: "Popular", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85" }
];
products[5].image = "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85";

const CART_KEY = "forme-shopping-cart";
const THEME_KEY = "forme-theme";
let cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
let activeFilter = "All";
let searchTerm = "";
let toastTimer;

const productGrid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");
const money = amount => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function renderProducts() {
  const visible = products.filter(product => {
    const matchesCategory = activeFilter === "All" || product.category === activeFilter;
    const matchesSearch = `${product.name} ${product.category}`.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  document.getElementById("productTotal").textContent = `${String(visible.length).padStart(2, "0")} PRODUCTS`;
  productGrid.innerHTML = visible.length ? visible.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}
      </div>
      <div class="product-info">
        <div><h3>${product.name}</h3><span class="product-category">${product.category}</span></div>
        <span class="product-price">${money(product.price)}</span>
      </div>
      <button class="add-button" data-add="${product.id}">Add to bag <span>＋</span></button>
    </article>
  `).join("") : `<p class="no-results">No products found. Try another search.</p>`;
}

function renderCart() {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => {
    const product = products.find(product => product.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  const shippingCost = subtotal === 0 || subtotal >= 2500 ? 0 : 120;
  const total = subtotal + shippingCost;

  document.getElementById("cartCount").textContent = itemCount;
  document.getElementById("cartHeadingCount").textContent = `(${itemCount})`;
  document.getElementById("subtotal").textContent = money(subtotal);
  document.getElementById("shipping").textContent = subtotal === 0 ? "—" : shippingCost === 0 ? "Free" : money(shippingCost);
  document.getElementById("total").textContent = money(total);
  document.getElementById("shippingNote").textContent = subtotal === 0
    ? "Shipping is calculated at checkout."
    : shippingCost === 0 ? "Your order qualifies for complimentary shipping." : `Add ${money(2500 - subtotal)} more for complimentary shipping.`;
  document.getElementById("checkoutButton").disabled = cart.length === 0;
  document.getElementById("clearCart").hidden = cart.length === 0;

  if (!cart.length) {
    cartItems.innerHTML = `<div class="empty-cart">
      <div class="empty-icon"><svg viewBox="0 0 24 24"><path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 1.9-1.4L22 8H6"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg></div>
      <h3>Your bag is empty</h3><p>Find something useful for your everyday.</p><a href="#shop" class="outline-button">Explore products</a>
    </div>`;
    return;
  }

  cartItems.innerHTML = cart.map(item => {
    const product = products.find(product => product.id === item.id);
    if (!product) return "";
    return `<article class="cart-row">
      <img src="${product.image}" alt="${product.name}">
      <div>
        <h3 class="cart-product-name">${product.name}</h3>
        <span class="cart-product-category">${product.category}</span>
        <div class="quantity-control" aria-label="Quantity controls for ${product.name}">
          <button data-quantity="${product.id}" data-change="-1" aria-label="Decrease quantity">−</button>
          <span>${item.quantity}</span>
          <button data-quantity="${product.id}" data-change="1" aria-label="Increase quantity">＋</button>
        </div>
      </div>
      <div class="cart-item-end">
        <strong class="cart-item-price">${money(product.price * item.quantity)}</strong>
        <button class="remove-button" data-remove="${product.id}">Remove</button>
      </div>
    </article>`;
  }).join("");
}

function updateCart() {
  cart = cart.filter(item => products.some(product => product.id === item.id) && item.quantity > 0);
  saveCart();
  renderCart();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  const id = Number(button.dataset.add);
  const existing = cart.find(item => item.id === id);
  if (existing) existing.quantity += 1;
  else cart.push({ id, quantity: 1 });
  updateCart();
  showToast(`${products.find(product => product.id === id).name} added to your bag`);
});

cartItems.addEventListener("click", event => {
  const quantityButton = event.target.closest("[data-quantity]");
  const removeButton = event.target.closest("[data-remove]");
  if (quantityButton) {
    const id = Number(quantityButton.dataset.quantity);
    const item = cart.find(item => item.id === id);
    if (item) item.quantity += Number(quantityButton.dataset.change);
    updateCart();
  }
  if (removeButton) {
    const id = Number(removeButton.dataset.remove);
    cart = cart.filter(item => item.id !== id);
    updateCart();
    showToast("Item removed from your bag");
  }
});

document.getElementById("clearCart").addEventListener("click", () => {
  cart = [];
  updateCart();
  showToast("Your bag has been cleared");
});

document.querySelectorAll(".filter-button").forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach(filter => filter.classList.toggle("active", filter === button));
    renderProducts();
  });
});

document.querySelectorAll("[data-category-link]").forEach(link => {
  link.addEventListener("click", () => {
    activeFilter = link.dataset.categoryLink;
    document.querySelectorAll(".filter-button").forEach(button => button.classList.toggle("active", button.dataset.filter === activeFilter));
    renderProducts();
  });
});

document.getElementById("productSearch").addEventListener("input", event => {
  searchTerm = event.target.value.trim().toLowerCase();
  renderProducts();
});

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
}
setTheme(localStorage.getItem(THEME_KEY) || "dark");
document.getElementById("themeToggle").addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

document.getElementById("checkoutButton").addEventListener("click", () => {
  showToast("Checkout demo — your bag is ready.");
});

renderProducts();
renderCart();
