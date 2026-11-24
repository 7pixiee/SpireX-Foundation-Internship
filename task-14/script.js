const STAGES = ['Applied', 'Under review', 'Interview', 'Offer'];
const STORAGE_KEY = 'internDeskApplications';

const internships = [
  {
    id: 1, title: 'Frontend Developer Intern', company: 'Brightpath Software', field: 'Technology',
    location: 'Pune', mode: 'Hybrid', stipend: 'Rs. 15,000 / month', duration: '3 months', deadline: '2026-12-20',
    about: 'Work with the web team on the customer dashboard used by schools across the country.',
    tasks: ['Build and fix pages in HTML, CSS and JavaScript', 'Review designs with the product team', 'Write simple tests for new components'],
    needs: ['Comfortable with HTML, CSS and JavaScript', 'A few small projects on GitHub', 'Currently in the second or third year']
  },
  {
    id: 2, title: 'Data Analyst Intern', company: 'Northline Analytics', field: 'Technology',
    location: 'Remote', mode: 'Remote', stipend: 'Rs. 12,000 / month', duration: '4 months', deadline: '2027-01-10',
    about: 'Help the analytics team clean data and prepare weekly reports for retail clients.',
    tasks: ['Clean and organise spreadsheets and CSV files', 'Create charts for weekly reports', 'Answer data questions from account managers'],
    needs: ['Basic Excel or Python skills', 'Interest in statistics', 'Able to work 25 hours a week']
  },
  {
    id: 3, title: 'Marketing Intern', company: 'Greenleaf Foods', field: 'Business',
    location: 'Mumbai', mode: 'On-site', stipend: 'Rs. 10,000 / month', duration: '2 months', deadline: '2026-12-12',
    about: 'Support the brand team during the winter product launch across social media and local events.',
    tasks: ['Draft social media posts', 'Track campaign results each week', 'Help run in-store promotions'],
    needs: ['Good written English and Hindi', 'Familiar with Instagram and LinkedIn', 'Pursuing BBA, BMS or a similar course']
  },
  {
    id: 4, title: 'Accounts and Finance Intern', company: 'Kulkarni & Associates', field: 'Commerce',
    location: 'Pune', mode: 'On-site', stipend: 'Rs. 8,000 / month', duration: '3 months', deadline: '2027-01-05',
    about: 'Join a chartered accountancy firm and learn how audits and tax filing work in practice.',
    tasks: ['Enter vouchers and reconcile ledgers', 'Assist with GST return preparation', 'Prepare files for audits'],
    needs: ['B.Com. student or CA foundation passed', 'Working knowledge of Tally', 'Attention to detail']
  },
  {
    id: 5, title: 'Content Writing Intern', company: 'The Reading Room', field: 'Arts & Media',
    location: 'Remote', mode: 'Remote', stipend: 'Rs. 6,000 / month', duration: '3 months', deadline: '2026-12-30',
    about: 'Write book reviews, author interviews and newsletters for an independent publishing house.',
    tasks: ['Write two articles every week', 'Edit and proofread submissions', 'Manage the monthly newsletter'],
    needs: ['Strong writing samples', 'Interest in literature', 'Willing to take editing feedback']
  },
  {
    id: 6, title: 'UI Design Intern', company: 'Studio Kora', field: 'Design',
    location: 'Bengaluru', mode: 'Hybrid', stipend: 'Rs. 14,000 / month', duration: '4 months', deadline: '2027-01-15',
    about: 'Design screens for mobile apps alongside two senior designers.',
    tasks: ['Create wireframes and screen layouts', 'Prepare design files for developers', 'Join weekly client calls'],
    needs: ['A portfolio with at least two projects', 'Basic Figma skills', 'Good sense of layout and spacing']
  },
  {
    id: 7, title: 'HR Operations Intern', company: 'Veda Logistics', field: 'Business',
    location: 'Nagpur', mode: 'On-site', stipend: 'Rs. 9,000 / month', duration: '2 months', deadline: '2026-12-08',
    about: 'Assist the HR team with hiring and onboarding for the new warehouse in Nagpur.',
    tasks: ['Schedule interviews and call candidates', 'Prepare joining documents', 'Update employee records'],
    needs: ['Good communication skills', 'Basic Excel', 'MBA or BBA student preferred']
  },
  {
    id: 8, title: 'Research Assistant Intern', company: 'Centre for Urban Studies', field: 'Arts & Media',
    location: 'Delhi', mode: 'Hybrid', stipend: 'Rs. 7,000 / month', duration: '3 months', deadline: '2027-01-20',
    about: 'Support a research project on public transport and housing in Indian cities.',
    tasks: ['Collect and summarise published studies', 'Help with field surveys', 'Prepare notes for the project team'],
    needs: ['Pursuing history, economics, sociology or a related subject', 'Careful reading and note taking', 'Willing to travel for surveys']
  }
];

const $ = id=> document.getElementById(id);
const board = $('board');
const openingsList = $('openings');
const detailPane = $('detail');

let applications = loadApplications();
let selectedId = null;
let applyingTo = null;

function loadApplications() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveApplications() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  } catch (error) {
    // storage can be block in private windows; the app still works for this visit
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatDate(dateString) {
  const date = dateString.length === 10 ? new Date(dateString + 'T00:00:00') : new Date(dateString);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function daysLeft(dateString){
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((new Date(dateString + 'T00:00:00') - today) / 86400000);
}

function hasApplied(id) {
  return applications.some(app => app.internshipId === id);
}

function findInternship(id) {
  return internships.find(item => item.id === id);
}

/* browse */

function fillFieldFilter(){
  const fields = [...new Set(internships.map(item => item.field))].sort();
  fields.forEach(field => {
    const option = document.createElement('option');
    option.textContent = field;
    $('fieldFilter').appendChild(option);
  });
}

function getFilteredInternships() {
  const text = $('search').value.trim().toLowerCase();
  const field = $('fieldFilter').value;
  const mode = $('modeFilter').value;

  return internships.filter(item=> {
    const matchesText = item.title.toLowerCase().includes(text) || item.company.toLowerCase().includes(text);
    return matchesText && (field === 'all' || item.field === field) && (mode === 'all' || item.mode === mode);
  });
}

function renderList() {
  const results = getFilteredInternships();
  $('resultCount').textContent = results.length === 1 ? '1 opening' : results.length + ' openings';

  if (results.length === 0) {
    openingsList.innerHTML = '<li class="empty">No internships match your search. Try a different word or clear the filters.</li>';
    return;
  }

  openingsList.innerHTML = results.map(item => `
    <li>
      <button class="opening ${item.id === selectedId ? 'selected' : ''}" data-id="${item.id}">
        <h3>${item.title}</h3>
        <p class="company">${item.company}</p>
        <p class="meta">${item.location} &middot; ${item.mode} &middot; ${item.stipend}</p>
      </button>
    </li>`).join('');
}

function renderDetail() {
  const item = findInternship(selectedId);

  if (!item) {
    detailPane.innerHTML= '<p class="placeholder">Select an internship from the list to read the details.</p>';
    return;
  }

  const left = daysLeft(item.deadline);
  const closed = left < 0;
  const applied = hasApplied(item.id);
  let deadlineNote = '';
  if (!closed && left <= 14) deadlineNote = `<p class="closing">Closing in ${left === 0 ? 'less than a day' : left + ' days'}</p>`;

  let buttonText = 'Apply now';
  if (applied) buttonText = 'Already applied';
  if (closed) buttonText = 'Applications closed';

  detailPane.innerHTML = `
    <button class="back" id="backButton">&larr; Back to list</button>
    <h2>${item.title}</h2>
    <p>${item.company}</p>
    ${deadlineNote}
    <dl class="facts">
      <div><dt>Location</dt><dd>${item.location} (${item.mode})</dd></div>
      <div><dt>Stipend</dt><dd>${item.stipend}</dd></div>
      <div><dt>Duration</dt><dd>${item.duration}</dd></div>
      <div><dt>Apply by</dt><dd>${formatDate(item.deadline)}</dd></div>
    </dl>
    <p>${item.about}</p>
    <h3>What you will do</h3>
    <ul>${item.tasks.map(task => `<li>${task}</li>`).join('')}</ul>
    <h3>What we are looking for</h3>
    <ul>${item.needs.map(need => `<li>${need}</li>`).join('')}</ul>
    <button class="btn-main" id="applyButton" ${applied || closed ? 'disabled' : ''}>${buttonText}</button>`;
}

function selectInternship(id) {
  selectedId = id;
  board.classList.add('viewing');
  renderList();
  renderDetail();
}

openingsList.addEventListener('click',event => {
  const row = event.target.closest('.opening');
  if (row) selectInternship(Number(row.dataset.id));
});

detailPane.addEventListener('click', event => {
  if (event.target.id === 'backButton') board.classList.remove('viewing');
  if (event.target.id === 'applyButton') openApplyDialog(selectedId);
});

['search', 'fieldFilter', 'modeFilter'].forEach(id => {
  $(id).addEventListener('input', () => {
    board.classList.remove('viewing');
    renderList();
  });
});

/* apply form */

const dialog = $('applyDialog');
const form = $('applyForm');

const checks = {
  name: value => value.trim().length >= 2 || 'Please enter your full name.',
  email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || 'Please enter a valid email address.',
  college: value => value.trim().length >= 3 || 'Please tell us your college and course.',
  reason: value => value.trim().length >= 20 || 'Write at least a couple of sentences (20 characters).'
};

function checkField(input) {
  const result = checks[input.name](input.value);
  input.parentElement.querySelector('small').textContent = result === true ? '' : result;
  return result === true;
}

function openApplyDialog(id) {
  const item = findInternship(id);
  applyingTo = item;
  $('dialogTitle').textContent = 'Apply for ' + item.title;
  $('dialogSub').textContent = item.company + ', ' + item.location;
  form.reset();
  form.querySelectorAll('small').forEach(note => (note.textContent = ''));
  dialog.showModal();
}

$('cancelApply').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const inputs = [...form.querySelectorAll('input, textarea')];
  const allGood = inputs.map(checkField).every(Boolean);
  if (!allGood) return;

  applications.unshift({
    internshipId: applyingTo.id,
    name: form.elements.name.value.trim(),
    email: form.elements.email.value.trim(),
    appliedOn: new Date().toISOString(),
    stage: 0
  });
  saveApplications();
  dialog.close();
  showToast('Application sent to ' + applyingTo.company);
  updateCount();
  renderDetail();
});

/* applications tab */

function renderApplications() {
  const list = $('appList');

  if (applications.length === 0) {
    list.innerHTML = '<li class="empty-box">You have not applied to anything yet. Open an internship and press Apply now.</li>';
    return;
  }

  list.innerHTML = applications.map((app, index) => {
    const item = findInternship(app.internshipId);
    const steps = STAGES.map((name, i) => `<li class="${i <= app.stage ? 'done' : ''}">${name}</li>`).join('');
    const nextButton = app.stage < STAGES.length - 1
      ? `<button data-action="advance" data-index="${index}">Mark next stage (demo)</button>` : '';

    return `
      <li class="app">
        <div class="app-head">
          <div>
            <h3>${item.title}</h3>
            <p>${item.company} &middot; ${item.location}</p>
          </div>
          <p>Applied on ${formatDate(app.appliedOn)} as ${escapeHtml(app.name)}</p>
        </div>
        <ol class="stages">${steps}</ol>
        <div class="app-actions">
          ${nextButton}
          <button data-action="withdraw" data-index="${index}">Withdraw application</button>
        </div>
      </li>`;
  }).join('');
}

$('appList').addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  const index = Number(button.dataset.index);

  if (button.dataset.action === 'advance') {
    applications[index].stage += 1;
  } else if (button.dataset.action === 'withdraw') {
    if (!confirm('Withdraw this application?')) return;
    applications.splice(index, 1);
  }

  saveApplications();
  updateCount();
  renderApplications();
});

/* tabs and small helpers  */

function showView(view) {
  $('browse').hidden = view !== 'browse';
  $('applications').hidden = view !== 'applications';
  $('tabBrowse').classList.toggle('active', view === 'browse');
  $('tabApps').classList.toggle('active', view === 'applications');
  if (view === 'applications') renderApplications();
  window.scrollTo(0, 0);
}

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => showView(tab.dataset.view));
});

$('logo').addEventListener('click', event => {
  event.preventDefault();
  showView('browse');
});

function updateCount() {
  $('appCount').textContent = applications.length;
}

let toastTimer;
function showToast(message) {
  const toast = $('toast');
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (toast.hidden = true), 3000);
}

fillFieldFilter();
renderList();
renderDetail();
updateCount();
$('year').textContent = new Date().getFullYear();
