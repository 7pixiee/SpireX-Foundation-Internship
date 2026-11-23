const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");
const expenseDate = document.getElementById("expenseDate");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");
const expenseCount = document.getElementById("expenseCount");
const listCount = document.getElementById("listCount");
const formMessage = document.getElementById("formMessage");

const storageKey = "soft-life-expenses";
let expenses = JSON.parse(localStorage.getItem(storageKey)) || [];

const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset()* 60000)
  .toISOString().split("T")[0];

expenseDate.value = localDate;
expenseDate.max = localDate;

document.getElementById("todayLabel").textContent =
  today.toLocaleDateString("en-IN", { month: "long", year: "numeric" });

function formatMoney(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2
  }).format(amount);
}

function formatDate(date) {
  return new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function saveExpenses() {
  localStorage.setItem(storageKey, JSON.stringify(expenses));
}

function getCategoryIcon(category) {
  const icons = {
    Food: "♡",
    Shopping: "✧",
    Travel: "↗",
    Bills: "⌂",
    Other: "✿"
  };
  return icons[category] || "✿";
}

function renderExpenses() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  totalAmount.textContent =formatMoney(total);
  expenseCount.textContent = `${expenses.length} ${expenses.length === 1 ? "expense" : "expenses"}`;
  listCount.textContent = `${expenses.length} ${expenses.length === 1 ? "item" : "items"}`;

  if (expenses.length === 0) {
    expenseList.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">♡</span>
       <h3>Nothing here yet</h3>
        <p>Add your first expense and it will show up here.</p>
      </div>
    `;
    return;
  }

  const sortedExpenses = [...expenses].sort((a, b) => {
    return new Date(b.date) - new Date(a.date) || b.id - a.id;
  });

  expenseList.innerHTML = sortedExpenses.map(expense => `
    <article class="expense-item">
      <div class="category-icon">${getCategoryIcon(expense.category)}</div>
      <div class="expense-info">
        <h3>${escapeHTML(expense.name)}</h3>
        <p class="expense-meta">${expense.category} · ${formatDate(expense.date)}</p>
      </div>
      <div class="expense-right">
        <span class="expense-amount">${formatMoney(expense.amount)}</span>
        <button class="delete-button" type="button" data-id="${expense.id}"
          aria-label="Delete ${escapeHTML(expense.name)}" title="Delete expense">×</button>
      </div>
    </article>
  `).join("");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
   '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

expenseForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = expenseName.value.trim();
  const amount = Number(expenseAmount.value);
  const category = expenseCategory.value;
  const date = expenseDate.value;

  if (!name || !Number.isFinite(amount) || amount <= 0 || !date) {
    formMessage.textContent = "Please enter a name, a valid amount and a date.";
    return;
  }

  if (date > localDate) {
    formMessage.textContent ="Please choose today or an earlier date.";
    return;
  }

  expenses.push({
    id: Date.now(),
    name,
    amount,
    category,
    date
  });

  saveExpenses();
  renderExpenses();
  expenseForm.reset();
  expenseDate.value = localDate;
  formMessage.textContent = "Expense added successfully.";
  expenseName.focus();
});

expenseList.addEventListener("click", function(event) {
  const deleteButton = event.target.closest(".delete-button");

  if (!deleteButton) return;

  const expenseId = Number(deleteButton.dataset.id);
  expenses = expenses.filter(expense => expense.id !== expenseId);

  saveExpenses();
  renderExpenses();
  formMessage.textContent = "Expense deleted.";
});

renderExpenses();
