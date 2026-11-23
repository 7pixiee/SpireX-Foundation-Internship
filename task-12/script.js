const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeIcon.textContent = theme === "dark" ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  localStorage.setItem("northstar-theme", theme);
}
const savedTheme = localStorage.getItem("northstar-theme");
applyTheme(savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
themeToggle.addEventListener("click", () => {
  applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

const doctorSearch = document.getElementById("doctorSearch");
const specialtyFilter = document.getElementById("specialtyFilter");
const doctorCards =  [...document.querySelectorAll(".doctor-card")];
const noResults = document.getElementById("noResults");

function filterDoctors() {
  const query = doctorSearch.value.trim().toLowerCase();
  const specialty = specialtyFilter.value;
  let visible = 0;
  doctorCards.forEach(card => {
    const matchesText = card.dataset.name.toLowerCase().includes(query) || card.dataset.specialty.toLowerCase().includes(query);
    const matchesSpecialty = specialty === "all" || card.dataset.specialty === specialty;
    const show = matchesText && matchesSpecialty;
    card.classList.toggle("hidden", !show);
    if (show) visible++;
  });
  noResults.hidden = visible !== 0;
}
doctorSearch.addEventListener("input", filterDoctors);
specialtyFilter.addEventListener("change", filterDoctors);

const department = document.getElementById("department");
const doctorSelect = document.getElementById("doctor");
const appointmentDate = document.getElementById("appointmentDate");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
appointmentDate.min = localToday;

const doctorDepartments = {
  "Dr. Aarav Khanna": "Cardiology",
  "Dr. Sara Mehta": "Dermatology",
  "Dr. Rohan Nair": "Paediatrics",
  "Dr. Nisha Kapoor": "General Medicine",
  "Dr. Kabir Sethi": "Orthopaedics",
  "Dr. Maya Rao": "Neurology"
};

function chooseDoctor(name, specialty) {
  department.value =specialty;
  doctorSelect.value = name;
  document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
}
document.querySelectorAll("[data-doctor]").forEach(button => {
  button.addEventListener("click", () => chooseDoctor(button.dataset.doctor, button.dataset.specialty));
});
document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => { department.value = link.dataset.service; });
});

department.addEventListener("change", ()=> {
  const selected = department.value;
  doctorSelect.value = selected ? (Object.keys(doctorDepartments).find(name => doctorDepartments[name] === selected) || "") : "";
});
doctorSelect.addEventListener("change", ()=> {
  if (doctorSelect.value) department.value = doctorDepartments[doctorSelect.value];
});

const appointmentForm = document.getElementById("appointmentForm");
const formMessage = document.getElementById("formMessage");
appointmentForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!appointmentForm.reportValidity()) return;

  const formData = new FormData(appointmentForm);
  const appointment = Object.fromEntries(formData.entries());

  appointment.id = `NS-${Date.now().toString().slice(-7)}`;
  appointment.createdAt = new Date().toISOString();

  const appointments = JSON.parse(localStorage.getItem("northstar-appointments") || "[]");
  appointments.push(appointment);
  localStorage.setItem("northstar-appointments", JSON.stringify(appointments));

  formMessage.textContent = `Request ${appointment.id} saved on this device. This demo does not send it to a clinic.`;
  appointmentForm.reset();
  appointmentDate.min = localToday;
});
document.getElementById("year").textContent =new Date().getFullYear();
