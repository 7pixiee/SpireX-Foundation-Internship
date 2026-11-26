const photo = id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=500&q=80`;

const menu = {
  'Starters': [
    { id: 'st1', name: 'Charred Corn Soup', desc: 'Sweet corn, roasted garlic, smoked paprika oil.', price: 240, veg: true, img: photo('1476224203421-9ac39bcb3327') },
    { id: 'st2', name: 'Fig and Feta Salad', desc: 'Fresh figs, rocket, feta, walnuts and a honey dressing.', price: 360, veg: true, img: photo('1540189549336-e6e99c3679fe') },
    { id: 'st3', name: 'Avocado Egg Toast', desc: 'Sourdough, smashed avocado, a soft egg and chilli flakes.', price: 320, veg: true, spicy: true, img: photo('1482049016688-2d3e1b311543') },
    { id: 'st4', name: 'Garlic Bread from the Oven', desc: 'Baked in the wood oven with butter and parsley.', price: 220, veg: true, img: photo('1504674900247-0877df9cc836') }
  ],
  'Pizza & Pasta': [
    { id: 'pp1', name: 'Margherita', desc: 'Tomato, buffalo mozzarella and basil on a 48-hour dough.', price: 420, veg: true, img: photo('1565299624946-b28f40a0ae38') },
    { id: 'pp2', name: 'Fire Roasted Veg Pizza', desc: 'Peppers, zucchini, olives, red onion and chilli oil.', price: 480, veg: true, spicy: true, img: photo('1565299624946-b28f40a0ae38') },
    { id: 'pp3', name: 'Hand-rolled Tagliatelle', desc: 'Slow-cooked tomato sauce, basil and aged parmesan.', price: 460, veg: true, img: photo('1473093295043-cdd812d0e601') },
    { id: 'pp4', name: 'Chicken Arrabbiata Penne', desc: 'Grilled chicken, spicy tomato sauce and fresh parsley.', price: 520, spicy: true, img: photo('1473093295043-cdd812d0e601') }
  ],
  'Mains': [
    { id: 'mn1', name: 'Grilled Salmon', desc: 'Lemon butter, charred broccolini and new potatoes.', price: 890, img: photo('1467003909585-2f8a72700288') },
    { id: 'mn2', name: 'Ember Burger', desc: 'Smoked beef patty, caramelised onion, cheddar and fries.', price: 540, img: photo('1551782450-a2132b4ba21d') },
    { id: 'mn3', name: 'Wood-fired Cauliflower', desc: 'Whole roasted head, tahini, pomegranate and herbs.', price: 480, veg: true, img: photo('1512621776951-a57141f2eefd') },
    { id: 'mn4', name: 'Slow-cooked Lamb Shank', desc: 'Braised for six hours, with creamy mash and gravy.', price: 980, img: photo('1414235077428-338989a2e8c0') }
  ],
  'Desserts': [
    { id: 'ds1', name: 'Fig and Honey Tart', desc: 'Buttery pastry, baked figs and vanilla cream.', price: 280, veg: true, img: null },
    { id: 'ds2', name: 'Molten Chocolate Cake', desc: 'Warm centre, served with salted caramel ice cream.', price: 320, veg: true, img: null },
    { id: 'ds3', name: 'Cardamom Panna Cotta', desc: 'Set cream with cardamom and a rhubarb compote.', price: 260, veg: true, img: null }
  ],
  'Drinks': [
    { id: 'dr1', name: 'Fresh Lime Soda', desc: 'Sweet, salted or mixed.', price: 120, veg: true, img: null },
    { id: 'dr2', name: 'Cold Brew Tonic', desc: 'Cold brew coffee over tonic water and orange.', price: 190, veg: true, img: null },
    { id: 'dr3', name: 'Fig and Ginger Cooler', desc: 'Fig syrup, ginger, lemon and soda.', price: 180, veg: true, img: null }
  ]
};

const allDishes = Object.values(menu).flat();
const dishById = id => allDishes.find(dish => dish.id === id);

const $ = id => document.getElementById(id);
const money = amount => '\u20B9' + amount.toLocaleString('en-IN');

/* theme */

$('themeBtn').addEventListener('click', () => {
  const root = document.documentElement;
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try {
    localStorage.setItem('emberTheme', next);
  } catch (error) {
    // storage may be blocked, the theme just won't be remembered
  }
});

/* header and navigation */

const nav = $('nav');
const burger = $('burger');
const navLinks = [...nav.querySelectorAll('a')];

function setNav(open) {
  nav.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
}

burger.addEventListener('click', () => setNav(!nav.classList.contains('open')));
navLinks.forEach(link => link.addEventListener('click', () => setNav(false)));

const watchedSections = navLinks.map(link => document.querySelector(link.getAttribute('href')));

function onScroll() {
  $('siteHead').classList.toggle('scrolled', window.scrollY > 10);

  let current = null;
  watchedSections.forEach(section => {
    if (section.offsetTop - 160 <= window.scrollY) current = section;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', current !== null && link.getAttribute('href') === '#' + current.id);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* reveal on scroll */

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('in'));
}

/* opening hours */

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const hours = { 0: [11, 23], 1: [12, 23], 2: [12, 23], 3: [12, 23], 4: [12, 23], 5: [12, 24], 6: [12, 24] };

function hourText(hour) {
  if (hour === 24) return 'midnight';
  return (hour % 12 === 0 ? 12 : hour % 12) + (hour < 12 ? ' am' : ' pm');
}

function showHours() {
  const today = new Date().getDay();
  const order = [1, 2, 3, 4, 5, 6, 0];

  $('hoursTable').innerHTML = order.map(day => `
    <tr class="${day === today ? 'today' : ''}">
      <td>${dayNames[day]}</td><td>${hourText(hours[day][0])} to ${hourText(hours[day][1])}</td>
    </tr>`).join('');

  const now = new Date();
  const hourNow = now.getHours() + now.getMinutes() / 60;
  const [opens, closes] = hours[today];
  const status = $('openStatus');

  if (hourNow >= opens && hourNow < closes) {
    status.textContent = 'Open now, until ' + hourText(closes);
    status.classList.add('open');
  } else if (hourNow < opens) {
    status.textContent = 'Closed, opens today at ' + hourText(opens);
  } else {
    status.textContent = 'Closed, opens tomorrow at ' + hourText(hours[(today + 1) % 7][0]);
  }
}

/* menu */

const dishList = $('dishList');
const tabsBox = $('menuTabs');
const preview = $('preview');
let activeCategory = Object.keys(menu)[0];

function renderTabs() {
  tabsBox.innerHTML = Object.keys(menu).map(category =>
    `<button class="tab" role="tab" aria-selected="${category === activeCategory}" data-category="${category}">${category}</button>`
  ).join('');
}

function renderDishes() {
  dishList.innerHTML = menu[activeCategory].map((dish, index) => `
    <li class="dish" style="--i:${index}" data-img="${dish.img || ''}">
      <div>
        <div class="dish-title">
          <h3>${dish.name}</h3><span class="dots"></span><span class="price">${money(dish.price)}</span>
        </div>
        <p>${dish.veg ? '<span class="veg" title="Vegetarian"></span>' : ''}${dish.desc}${dish.spicy ? ' \uD83D\uDD25' : ''}</p>
      </div>
      <button class="add-btn" data-add="${dish.id}" aria-label="Add ${dish.name} to your plate">+</button>
    </li>`).join('');
}

tabsBox.addEventListener('click', event => {
  const tab = event.target.closest('.tab');
  if (!tab) return;
  activeCategory = tab.dataset.category;
  renderTabs();
  renderDishes();
});

dishList.addEventListener('click', event => {
  const button = event.target.closest('[data-add]');
  if (!button) return;
  addToPlate(button.dataset.add);
});

// a small photo follows the cursor while you hover a dish
dishList.addEventListener('mouseover', event => {
  const row = event.target.closest('.dish');
  if (!row || !row.dataset.img) return;
  preview.querySelector('img').src = row.dataset.img;
  preview.classList.add('show');
});

dishList.addEventListener('mousemove', event => {
  let x = event.clientX + 24;
  if (x + 240 > window.innerWidth) x = event.clientX - 254;
  preview.style.left = x + 'px';
  preview.style.top = event.clientY + 18 + 'px';
});

dishList.addEventListener('mouseleave', () => preview.classList.remove('show'));
dishList.addEventListener('mouseout', event => {
  if (!event.relatedTarget || !event.relatedTarget.closest('.dish')) preview.classList.remove('show');
});

/* plate */

const plate = {};
const panel = $('platePanel');
const overlay = $('overlay');

function plateCount() {
  return Object.values(plate).reduce((sum, qty) => sum + qty, 0);
}

function plateTotal() {
  return Object.entries(plate).reduce((sum, [id, qty]) => sum + dishById(id).price * qty, 0);
}

function addToPlate(id) {
  plate[id] = (plate[id] || 0) + 1;
  updatePlate();
  showToast(dishById(id).name + ' added to your plate');
}

function changeQty(id, change) {
  plate[id] += change;
  if (plate[id] <= 0) delete plate[id];
  updatePlate();
}

function updatePlate() {
  const count = plateCount();
  const badge = $('plateCount');
  badge.textContent = count;
  badge.classList.add('bump');
  setTimeout(() => badge.classList.remove('bump'), 250);

  const ids = Object.keys(plate);
  $('plateItems').innerHTML = ids.length === 0
    ? '<li class="plate-empty">Your plate is empty. Add something from the menu.</li>'
    : ids.map(id => `
      <li>
        <div><span class="name">${dishById(id).name}</span><br><span class="sub">${money(dishById(id).price)} each</span></div>
        <div class="qty">
          <button data-minus="${id}" aria-label="Remove one">&minus;</button>
          <span>${plate[id]}</span>
          <button data-plus="${id}" aria-label="Add one">+</button>
        </div>
      </li>`).join('');

  $('plateTotal').textContent = money(plateTotal());
  $('plateBook').disabled = count === 0;

  const note = $('preorderNote');
  note.hidden = count === 0;
  note.textContent = count === 0 ? '' : `Your plate has ${count} ${count === 1 ? 'dish' : 'dishes'} (${money(plateTotal())}). We will have it ready when you arrive.`;
}

function openPanel(open) {
  panel.classList.toggle('open', open);
  overlay.classList.toggle('open', open);
  panel.setAttribute('aria-hidden', !open);
  if (open) $('plateClose').focus();
}

$('plateBtn').addEventListener('click', () => openPanel(true));
$('plateClose').addEventListener('click', () => openPanel(false));
overlay.addEventListener('click', () => openPanel(false));
$('plateBook').addEventListener('click', () => {
  openPanel(false);
  $('book').scrollIntoView({ behavior: 'smooth' });
});

$('plateItems').addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.plus) changeQty(button.dataset.plus, 1);
  if (button.dataset.minus) changeQty(button.dataset.minus, -1);
});

/* services accordion */

const accItems = document.querySelectorAll('.acc-item');
accItems.forEach(item => {
  item.querySelector('.acc-btn').addEventListener('click', () => {
    const willOpen = !item.classList.contains('open');
    accItems.forEach(other => {
      other.classList.remove('open');
      other.querySelector('.acc-btn').setAttribute('aria-expanded', 'false');
    });
    if (willOpen) {
      item.classList.add('open');
      item.querySelector('.acc-btn').setAttribute('aria-expanded', 'true');
    }
  });
});

/* gallery lightbox */

const galleryButtons = [...document.querySelectorAll('.g-item')];
const lightbox = $('lightbox');
let lightboxIndex = 0;

function showPhoto(index) {
  lightboxIndex = (index + galleryButtons.length) % galleryButtons.length;
  const button = galleryButtons[lightboxIndex];
  const image = button.querySelector('img');
  $('lbImage').src = image.src.replace('w=700', 'w=1400').replace('w=900', 'w=1400');
  $('lbImage').alt = image.alt;
  $('lbCaption').textContent = button.dataset.caption;
}

function openLightbox(index) {
  showPhoto(index);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  $('lbClose').focus();
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  galleryButtons[lightboxIndex].focus();
}

galleryButtons.forEach((button, index) => button.addEventListener('click', () => openLightbox(index)));
$('lbClose').addEventListener('click', closeLightbox);
$('lbPrev').addEventListener('click', () => showPhoto(lightboxIndex - 1));
$('lbNext').addEventListener('click', () => showPhoto(lightboxIndex + 1));
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', event => {
  if (lightbox.classList.contains('open')) {
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showPhoto(lightboxIndex - 1);
    if (event.key === 'ArrowRight') showPhoto(lightboxIndex + 1);
  } else if (event.key === 'Escape' && panel.classList.contains('open')) {
    openPanel(false);
  }
});

/* table booking */

const slotTimes = ['12:00', '13:30', '15:00', '19:00', '20:30', '22:00'];
const bookForm = $('bookForm');
const dateInput = $('bookDate');
let guests = 2;
let chosenSlot = '';

function slotLabel(time) {
  const [h, m] = time.split(':').map(Number);
  const suffix = h < 12 ? ' am' : ' pm';
  return (h % 12 === 0 ? 12 : h % 12) + ':' + String(m).padStart(2, '0') + suffix;
}

function todayString() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

// not real availability, just a repeatable pattern so some slots look taken
function isTaken(date, time) {
  let hash = 0;
  for (const char of date + time) hash = (hash * 31 + char.charCodeAt(0)) % 1000;
  return hash % 4 === 0;
}

function isPast(date, time) {
  if (date !== todayString()) return false;
  const [h, m] = time.split(':').map(Number);
  const now = new Date();
  return h + m / 60 <= now.getHours() + now.getMinutes() / 60;
}

function renderSlots() {
  const date = dateInput.value;
  if (chosenSlot && (isTaken(date, chosenSlot) || isPast(date, chosenSlot))) chosenSlot = '';

  $('slots').innerHTML = slotTimes.map(time => {
    const unavailable = !date || isTaken(date, time) || isPast(date, time);
    return `<button type="button" class="slot" data-time="${time}" aria-pressed="${time === chosenSlot}" ${unavailable ? 'disabled' : ''}>${slotLabel(time)}</button>`;
  }).join('');
}

$('slots').addEventListener('click', event => {
  const slot = event.target.closest('.slot');
  if (!slot) return;
  chosenSlot = slot.dataset.time;
  $('slotError').textContent = '';
  renderSlots();
});

dateInput.addEventListener('change', () => {
  dateInput.closest('.field').classList.remove('bad');
  dateInput.nextElementSibling.textContent = '';
  renderSlots();
});

$('guestsDown').addEventListener('click', () => setGuests(guests - 1));
$('guestsUp').addEventListener('click', () => setGuests(guests + 1));

function setGuests(number) {
  guests = Math.min(12, Math.max(1, number));
  $('guestsOut').textContent = guests;
}

const rules = {
  date: value => (value && value >= todayString()) || 'Please pick a date from today onwards.',
  name: value => value.trim().length >= 2 || 'Please enter your name.',
  phone: value => /^[6-9]\d{9}$/.test(value.replace(/[\s-]/g, '')) || 'Enter a 10-digit mobile number.',
  email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || 'Enter a valid email address.'
};

function checkField(input) {
  const result = rules[input.name](input.value);
  input.closest('.field').classList.toggle('bad', result !== true);
  input.nextElementSibling.textContent = result === true ? '' : result;
  return result === true;
}

const checkedInputs = ['date', 'name', 'phone', 'email'].map(name => bookForm.elements[name]);
checkedInputs.forEach(input => input.addEventListener('blur', () => checkField(input)));

bookForm.addEventListener('submit', event => {
  event.preventDefault();
  const fieldsOk = checkedInputs.map(checkField).every(Boolean);
  const slotOk = chosenSlot !== '';
  $('slotError').textContent = slotOk ? '' : 'Please choose a time.';

  if (!fieldsOk || !slotOk) {
    const firstBad = bookForm.querySelector('.bad input') || $('slots');
    firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  showConfirmation();
});

function showConfirmation() {
  const dateText = new Date(dateInput.value + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
  const reference = 'EF-' + (1000 + Math.floor(Math.random() * 9000));
  const preorder = plateCount() > 0 ? `<dt>Pre-order</dt><dd>${plateCount()} dishes, ${money(plateTotal())}</dd>` : '';

  $('confirm').innerHTML = `
    <h3>Your table is booked</h3>
    <p>Thank you, ${bookForm.elements.name.value.trim().split(' ')[0]}. A confirmation will be sent to ${bookForm.elements.email.value.trim()}.</p>
    <dl>
      <dt>Reference</dt><dd>${reference}</dd>
      <dt>Date</dt><dd>${dateText}</dd>
      <dt>Time</dt><dd>${slotLabel(chosenSlot)}</dd>
      <dt>Guests</dt><dd>${guests}</dd>
      ${preorder}
    </dl>
    <button class="btn btn-line" id="newBooking">Make another booking</button>`;

  bookForm.hidden = true;
  $('confirm').hidden = false;
}

$('confirm').addEventListener('click', event => {
  if (event.target.id !== 'newBooking') return;
  bookForm.reset();
  dateInput.value = todayString();
  chosenSlot = '';
  setGuests(2);
  renderSlots();
  $('confirm').hidden = true;
  bookForm.hidden = false;
});

/* small helpers */

let toastTimer;
function showToast(message) {
  const toast = $('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
}

dateInput.min = todayString();
dateInput.value = todayString();

showHours();
renderTabs();
renderDishes();
renderSlots();
updatePlate();
$('year').textContent = new Date().getFullYear();
