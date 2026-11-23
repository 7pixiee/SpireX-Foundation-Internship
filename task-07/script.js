const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const resultInput = document.getElementById("result");

const convertBtn = document.getElementById("convertBtn");
const swapBtn = document.getElementById("swapBtn");

const message = document.getElementById("message");
const rateInfo = document.getElementById("rateInfo");
const lastUpdated = document.getElementById("lastUpdated");

// keep recently fetched rates for five minutes to avoid unnecessary requests
const rateCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

async function getExchangeRates(baseCurrency) {
  const cached = rateCache.get(baseCurrency);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.rates;
  }

  message.textContent = "Fetching latest exchange rates...";
  message.classList.remove("error");
  convertBtn.disabled = true;

  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);

    if (!response.ok) {
      throw new Error("Unable to connect to the exchange rate service.");
    }

    const data = await response.json();

    if (data.result !== "success") {
      throw new Error("Could not retrieve exchange rates.");
    }

    rateCache.set(baseCurrency, {
      rates: data.rates,
      timestamp: Date.now()
    });

    lastUpdated.textContent =
      "Last updated: " + new Date(data.time_last_update_utc).toLocaleString();

    return data.rates;
  } finally {
    convertBtn.disabled = false;
  }
}

async function convertCurrency() {
  const amountText = amountInput.value.trim();
  const amount = Number(amountText);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (amountText === "" || !Number.isFinite(amount) || amount <= 0) {
    message.textContent = "Please enter a valid amount greater than zero.";
    message.classList.add("error");
    resultInput.value = "";
    rateInfo.textContent = "Enter an amount to see the exchange rate";
    return;
  }

  if (from === to) {
    resultInput.value = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    rateInfo.textContent = `1 ${from} = 1 ${to}`;
    message.textContent = "Conversion completed successfully.";
    message.classList.remove("error");
    lastUpdated.textContent = "Same-currency conversion";
    return;
  }

  try {
    const rates = await getExchangeRates(from);
    const exchangeRate = rates[to];

    if (!exchangeRate) {
      throw new Error("Exchange rate not available for this currency.");
    }

    const convertedAmount = amount * exchangeRate;

    resultInput.value = convertedAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    rateInfo.textContent = `1 ${from} = ${exchangeRate.toFixed(4)} ${to}`;
    message.textContent = "Conversion completed successfully.";
    message.classList.remove("error");
  } catch (error) {
    message.textContent = error.message || "Something went wrong. Please try again.";
    message.classList.add("error");
    resultInput.value = "";
    rateInfo.textContent = "Exchange rate unavailable";
  }
}

function swapCurrencies() {
  const previousFrom = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = previousFrom;
  convertCurrency();
}

convertBtn.addEventListener("click", convertCurrency);
swapBtn.addEventListener("click", swapCurrencies);
fromCurrency.addEventListener("change", convertCurrency);
toCurrency.addEventListener("change", convertCurrency);

let inputTimer;
amountInput.addEventListener("input", () => {
  clearTimeout(inputTimer);
  inputTimer = setTimeout(convertCurrency, 350);
});

convertCurrency();
