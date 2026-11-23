const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = navMenu.querySelectorAll('a[href^="#"]');

function setMenu(open) {
  navMenu.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

navToggle.addEventListener('click', () => setMenu(!navMenu.classList.contains('open')));
navLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) setMenu(false);
});

const sections = [...navLinks]
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

function updateActiveLink() {
  const scrollPoint = window.scrollY + 160;
  let current = sections[0];

  sections.forEach(section => {
    if (section.offsetTop <= scrollPoint) current = section;
  });

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
    current = document.getElementById('contact');
  }

  navLinks.forEach(link => {
    const isCurrent = link.getAttribute('href') === `#${current.id}`;
    link.classList.toggle('active', isCurrent && !link.classList.contains('nav-apply'));
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

// Program filter
const filterButtons = document.querySelectorAll('.filter button');
const courseRows = document.querySelectorAll('.course');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');

    courseRows.forEach(row => {
      row.hidden = button.dataset.filter !== 'all' && row.dataset.level !== button.dataset.filter;
    });
  });
});

// Details popup for programs and news items
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalLink = document.getElementById('modalLink');
const modalClose = document.getElementById('modalClose');

const courseInfo = {
  'B.Sc. Computer Science': 'Intake: 120 seats. Eligibility: Class 12 with mathematics. Annual fee: Rs. 48,000.',
  'BBA': 'Intake: 90 seats. Eligibility: Class 12 in any stream. Annual fee: Rs. 52,000.',
  'B.A. English Literature': 'Intake: 60 seats. Eligibility: Class 12 in any stream. Annual fee: Rs. 32,000.',
  'B.Com. (Honours)': 'Intake: 120 seats. Eligibility: Class 12 with commerce or mathematics. Annual fee: Rs. 38,000.',
  'M.Sc. Information Technology': "Intake: 40 seats. Eligibility: bachelor's degree in computer science or IT. Annual fee: Rs. 65,000.",
  'MBA': "Intake: 60 seats. Eligibility: bachelor's degree and an entrance test score. Annual fee: Rs. 95,000.",
  'M.A. History': "Intake: 30 seats. Eligibility: bachelor's degree in history or a related subject. Annual fee: Rs. 30,000.",
  'M.Com. Finance': 'Intake: 40 seats. Eligibility: B.Com. or an equivalent degree. Annual fee: Rs. 45,000.'
};

const newsInfo = {
  'National Seminar on Data and Society': 'Held in the main auditorium from 9 a.m. to 5 p.m. Visitors can register at the college office.',
  'Annual Arts Festival': 'Performances begin at 5 p.m. each evening in the open-air theatre. Student groups can register for events until 10 December.',
  'Campus Placement Drive': 'Final-year students should register with the placement cell by 5 January and bring two printed copies of their resume.'
};

function openModal(title, text, linkLabel, linkTarget) {
  modalTitle.textContent = title;
  modalText.textContent = text;
  modalLink.textContent = linkLabel;
  modalLink.setAttribute('href', linkTarget);
  modal.hidden = false;
  modalClose.focus();
}

function closeModal() {
  modal.hidden = true;
}

document.querySelectorAll('[data-course]').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.course;
    openModal(name, courseInfo[name], 'Apply Now', '#admissions');
  });
});

document.querySelectorAll('[data-more]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const title = link.dataset.more;
    openModal(title, newsInfo[title], 'Contact the Office', '#contact');
  });
});

modalClose.addEventListener('click', closeModal);
modalLink.addEventListener('click', closeModal);
modal.addEventListener('click', event => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !modal.hidden) closeModal();
});

// Contact form
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('formSuccess');

const rules = {
  name: value => value.trim().length >= 2 || 'Enter your full name.',
  email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || 'Enter a valid email address.',
  subject: value => value.trim().length >= 3 || 'Enter a subject.',
  message: value => value.trim().length >= 10 || 'Write a message of at least 10 characters.'
};

function validateField(input) {
  const result = rules[input.name](input.value);
  const field = input.closest('.field');
  field.classList.toggle('invalid', result !== true);
  field.querySelector('.error').textContent = result === true ? '' : result;
  return result === true;
}

const fields = [...form.querySelectorAll('input, textarea')];

fields.forEach(input => {
  input.addEventListener('blur', () => validateField(input));
  input.addEventListener('input', () => {
    if (input.closest('.field').classList.contains('invalid')) validateField(input);
  });
});

form.addEventListener('submit', event => {
  event.preventDefault();
  successMessage.hidden = true;

  const allValid = fields.map(validateField).every(Boolean);
  if (!allValid) {
    fields.find(input => input.closest('.field').classList.contains('invalid')).focus();
    return;
  }

  form.reset();
  successMessage.hidden = false;
});

document.getElementById('year').textContent = new Date().getFullYear();
