
const searchForm = document.getElementById("searchForm");
const countryInput = document.getElementById("countryInput");
const clearBtn = document.getElementById("clearBtn");
const errorMessage = document.getElementById("errorMessage");
const countryCard = document.getElementById("countryCard");
const saveBtn = document.getElementById("saveBtn");
const savedList = document.getElementById("savedList");
const savedCount = document.getElementById("savedCount");
const clearSavedBtn = document.getElementById("clearSavedBtn");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

let currentCountry = null;
let savedCountries = JSON.parse(localStorage.getItem("atlasSavedCountries")) || [];

function formatNumber(number) {
    return number
        ? new Intl.NumberFormat("en-US").format(number)
        : "Not available";
}

function showError(message) {
    errorMessage.textContent = message;
}

function getCurrency(country) {
    if (!country.currencies || !Object.keys(country.currencies).length) {
        return "Not available";
    }

    return Object.entries(country.currencies).map(([code, currency]) => {
        const name = currency.name || code;
        const symbol = currency.symbol ? ` (${currency.symbol})` : "";
        return `${name}${symbol}`;
    }).join(", ");
}

function getLanguages(country) {
    if (!country.languages || !country.languages.length) {
        return "Not available";
    }

    return country.languages
        .map(language => language.name || language.english_name)
        .filter(Boolean)
        .join(", ");
}

function getCapital(country) {
    if (!country.capitals || !country.capitals.length) {
        return "No capital listed";
    }

    return country.capitals
        .map(capital => capital.name)
        .filter(Boolean)
        .join(", ");
}

function getFlag(country) {
    return country.flag?.url_svg || country.flag?.url_png || "";
}

function displayCountry(country) {
    currentCountry = country;

    const flagUrl = getFlag(country);
    const flagWrap = document.getElementById("flagWrap");

    flagWrap.innerHTML = flagUrl
        ? `<img src="${flagUrl}" alt="Flag of ${country.names.common}">`
        : `<div class="flag-placeholder">${country.flag?.emoji || "🌍"}</div>`;

    document.getElementById("countryCode").textContent =
        `${country.codes?.alpha_2 || ""} · ${country.region || "WORLD"}`.toUpperCase();

    document.getElementById("countryName").textContent =
        country.names?.common || "Unknown country";

    document.getElementById("countryOfficial").textContent =
        country.names?.official || "Official name not available";

    document.getElementById("capital").textContent = getCapital(country);
    document.getElementById("population").textContent = formatNumber(country.population);
    document.getElementById("region").textContent = country.region || "Not available";
    document.getElementById("currency").textContent = getCurrency(country);
    document.getElementById("subregion").textContent = country.subregion || "Not available";
    document.getElementById("languages").textContent = getLanguages(country);

    document.getElementById("area").textContent = country.area?.kilometers
        ? `${formatNumber(country.area.kilometers)} km²`
        : "Not available";

    document.getElementById("timezones").textContent = country.timezones?.length
        ? country.timezones.slice(0, 3).join(", ")
        : "Not available";

    document.getElementById("countryHint").textContent =
        `You're exploring ${country.names?.common || "this country"}.`;

    const mapLink = document.getElementById("mapLink");
    const mapUrl = country.links?.maps?.google || "";

    mapLink.href = mapUrl || "#";
    mapLink.setAttribute("aria-disabled", mapUrl ? "false" : "true");

    document.getElementById("resultLabel").textContent = "COUNTRY FOUND";

    saveBtn.disabled = false;
    updateSaveButton();
    countryCard.classList.remove("loading");
}

function searchCountry(name){
    if (!name.trim()) {
        showError("Type a country name to get started.");
        countryInput.focus();
        return;
    }

    showError("Country search will be available after API integration.");
}

// Saved countries
function updateSaveButton() {
    if (!currentCountry) return;

    const isSaved = savedCountries.some(
        country => country.code === currentCountry.codes?.alpha_3
    );

    saveBtn.classList.toggle("saved", isSaved);
    saveBtn.textContent = isSaved ? "♥" : "♡";
    saveBtn.setAttribute(
        "aria-label",
        isSaved ? "Remove saved country" : "Save country"
    );
}

function saveCurrentCountry() {
    if (!currentCountry) return;

    const code = currentCountry.codes?.alpha_3;

    const alreadySaved = savedCountries.some(
        country => country.code === code
    );

    if (alreadySaved) {
        savedCountries = savedCountries.filter(
            country =>country.code !== code
        );
    } else {
        savedCountries.push({
            code,
            name: currentCountry.names?.common || "Unknown country",
            capital: getCapital(currentCountry),
            flag: getFlag(currentCountry),
            flagEmoji: currentCountry.flag?.emoji || "🌍"
        });
    }

    localStorage.setItem(
        "atlasSavedCountries",
        JSON.stringify(savedCountries)
    );

    updateSaveButton();
    renderSavedCountries();
}

function renderSavedCountries() {
    savedCount.textContent = savedCountries.length;

    clearSavedBtn.style.visibility = savedCountries.length
        ? "visible"
        : "hidden";

    if (!savedCountries.length){
        savedList.innerHTML = `
            <div class="empty-saved">
                <span>♡</span>
                <p>No saved countries yet. Tap the heart when you find one you like.</p>
            </div>
        `;
        return;
    }

    savedList.innerHTML = savedCountries.map(country => `
        <div class="saved-item">
            ${country.flag
                ? `<img src="${country.flag}" alt="Flag of ${country.name}">`
                : `<span class="saved-flag">${country.flagEmoji}</span>`
            }
            <div>
                <strong>${country.name}</strong>
                <small>${country.capital}</small>
            </div>
            <button
                type="button"
                data-remove="${country.code}"
                aria-label="Remove ${country.name}"
            >×</button>
        </div>
    `).join("");
}

// Search form
searchForm.addEventListener("submit", event => {
    event.preventDefault();
    searchCountry(countryInput.value);
});

countryInput.addEventListener("input", () => {
    clearBtn.classList.toggle("visible", countryInput.value.length > 0);
});

clearBtn.addEventListener("click", () => {
    countryInput.value = "";
    clearBtn.classList.remove("visible");
    showError("");
    countryInput.focus();
});

// Quick searches
document.querySelectorAll(".quick-searches button").forEach(button => {
    button.addEventListener("click", () => {
        countryInput.value = button.dataset.country;
        clearBtn.classList.add("visible");
        searchCountry(button.dataset.country);
    });
});

// Save country
saveBtn.addEventListener("click", saveCurrentCountry);

savedList.addEventListener("click", event => {
    const removeButton = event.target.closest("[data-remove]");

    if (!removeButton) return;

    savedCountries = savedCountries.filter(
        country => country.code !== removeButton.dataset.remove
    );

    localStorage.setItem(
        "atlasSavedCountries",
        JSON.stringify(savedCountries)
    );

    renderSavedCountries();
    updateSaveButton();
});

clearSavedBtn.addEventListener("click", () => {
    savedCountries = [];
    localStorage.removeItem("atlasSavedCountries");

    renderSavedCountries();
    updateSaveButton();
});

// Theme toggle
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const darkMode = document.body.classList.contains("dark");

    themeIcon.textContent = darkMode ? "☀" : "☾";

    localStorage.setItem(
        "atlasTheme",
        darkMode ? "dark" : "light"
    );
});

if (localStorage.getItem("atlasTheme") === "dark") {
    document.body.classList.add("dark");
    themeIcon.textContent = "☀";
}

renderSavedCountries();
