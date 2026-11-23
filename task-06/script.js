const clock = document.getElementById("clock");
const period = document.getElementById("period");
const date = document.getElementById("date");
const greeting = document.getElementById("greeting");
const formatButton = document.getElementById("formatButton");
const themeButton = document.getElementById("themeButton");

let use24Hour = false;

function updateClock() {
  const now = new Date();

  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  let displayHours;
  if (use24Hour) {
    displayHours = String(hours).padStart(2, "0");
    period.textContent = "";
  } else {
    displayHours = String(hours % 12 || 12).padStart(2, "0");
    period.textContent = hours >= 12 ? "PM" : "AM";
  }

  clock.textContent = `${displayHours}:${minutes}:${seconds}`;

  date.textContent = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(now);

  if (hours < 12) {
    greeting.textContent = "Good morning!";
  } else if (hours < 17) {
    greeting.textContent = "Good afternoon!";
  } else {
    greeting.textContent = "Good evening!";
  }
}

formatButton.addEventListener("click", () => {
  use24Hour = !use24Hour;
  formatButton.textContent = use24Hour ? "12-HOUR FORMAT" : "24-HOUR FORMAT";
  updateClock();
});

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeButton.textContent = isDark ? "☀" : "☾";
  themeButton.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
});

updateClock();
setInterval(updateClock, 1000);
