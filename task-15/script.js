const SAVED_KEY = 'workwellSavedJobs';
const TILE_COLORS = ['#1F3D36', '#D9774B', '#5E8570', '#B08A4E'];

const jobs = [
  {
    id: 1, title: 'Frontend Developer', company: 'Brightpath Software', location: 'Pune', type: 'Full-time', mode: 'Hybrid',
    level: '1-3 years', salaryMin: 6, salaryMax: 10, posted: 1,
    about: 'Brightpath builds school management software used by more than 400 schools. You will join the web team and own parts of the parent and teacher dashboards.',
    duties: ['Build responsive pages with HTML, CSS and JavaScript', 'Turn designs from the product team into working screens', 'Fix bugs reported by schools and review code with teammates'],
    needs: ['1 to 3 years of frontend experience', 'Good understanding of the DOM and browser APIs', 'A habit of testing your own work'],
    perks: ['Hybrid work, three days at the Pune office', 'Health insurance for you and your family', 'Learning budget of Rs. 20,000 a year']
  },
  {
    id: 2, title: 'Data Analyst', company: 'Northline Analytics', location: 'Remote', type: 'Full-time', mode: 'Remote', level: '1-3 years',
    salaryMin: 7, salaryMax: 12, posted: 3,
    about: 'Northline helps retail brands understand their customers. The analytics team prepares weekly reports and one-off studies for clients across India.',
    duties: ['Clean and combine data from sales and website sources', 'Build dashboards and weekly reports', 'Explain findings to account managers in plain language'],
    needs: ['Strong SQL and Excel skills', 'Python or R is a plus', 'Comfortable presenting numbers to non-technical people'],
    perks: ['Fully remote, flexible hours', 'Home office allowance', 'Four paid learning days a year']
  },
  {
    id: 3, title: 'Graphic Design Intern', company: 'Studio Kora', location: 'Bengaluru', type: 'Internship', mode: 'Hybrid', level: 'Fresher',
    salaryMin: 2, salaryMax: 3, posted: 2,
    about: 'Studio Kora is a small design studio working with food, travel and education brands. This four-month internship is for someone ready to build a portfolio on real projects.',
    duties: ['Create social media graphics and brand layouts', 'Prepare files for print and web', 'Sit in on client reviews and take notes'],
    needs: ['A portfolio with at least two projects', 'Working knowledge of Figma or Illustrator', 'Good eye for spacing and type'],
    perks: ['Mentorship from a senior designer', 'Certificate and reference letter', 'Chance of a full-time offer']
  },
  {
    id: 4, title: 'Digital Marketing Executive', company: 'Greenleaf Foods', location: 'Mumbai', type: 'Full-time', mode: 'On-site', level: '1-3 years',
    salaryMin: 4, salaryMax: 6, posted: 5,
    about: 'Greenleaf sells packaged snacks across western India. The marketing team plans campaigns for social media, email and marketplaces.',
    duties: ['Plan and schedule weekly social media content', 'Run small paid campaigns and report on results', 'Coordinate with designers and the sales team'],
    needs: ['1 to 3 years in digital marketing', 'Experience with Meta Ads or Google Ads', 'Clear writing in English and Hindi'],
    perks: ['Product hampers every quarter', 'Performance bonus', 'Five-day work week']
  },
  {
    id: 5, title: 'Senior Backend Engineer', company: 'Zentra Payments', location: 'Hyderabad', type: 'Full-time', mode: 'Hybrid', level: '3+ years',
    salaryMin: 18, salaryMax: 28, posted: 4,
    about: 'Zentra processes payments for small businesses. The platform team keeps the core transaction services fast and reliable.',
    duties: ['Design and build services in Node.js and PostgreSQL', 'Improve monitoring and incident response', 'Mentor two junior engineers'],
    needs: ['Five or more years building backend systems', 'Experience with payments or other high-volume systems', 'Clear technical writing'],
    perks: ['Stock options', 'Hybrid, two days in office', 'Annual learning and conference budget']
  },
  {
    id: 6, title: 'Content Writer', company: 'The Reading Room', location: 'Remote', type: 'Part-time', mode: 'Remote', level: 'Fresher',
    salaryMin: 3, salaryMax: 4, posted: 6,
    about: 'The Reading Room is an independent publisher. You will write reviews, author interviews and the monthly newsletter, around 20 hours a week.',
    duties: ['Write two articles every week', 'Edit and proofread submissions', 'Help prepare the newsletter'],
    needs: ['Strong writing samples', 'Interest in books and publishing', 'Reliable with deadlines'],
    perks: ['Work from anywhere', 'Free books every month', 'Byline on every article']
  },
  {
    id: 7, title: 'Accounts Assistant', company: 'Kulkarni & Associates', location: 'Pune', type: 'Full-time', mode: 'On-site', level: 'Fresher',
    salaryMin: 3, salaryMax: 4, posted: 8,
    about: 'A chartered accountancy firm with 60 clients. You will support the audit and tax teams during the busy filing season.',
    duties: ['Enter vouchers and reconcile ledgers in Tally', 'Prepare GST return files', 'Organise documents for audits'],
    needs: ['B.Com. graduate', 'Working knowledge of Tally', 'Careful with numbers'],
    perks: ['Study leave for CA exams', 'Paid overtime in filing season', 'Training from partners']
  },
  {
    id: 8, title: 'UX Researcher', company: 'Lumen Health', location: 'Delhi', type: 'Contract', mode: 'Hybrid', level: '1-3 years',
    salaryMin: 8, salaryMax: 12, posted: 9,
    about: 'Lumen builds a patient app for clinics. This six-month contract is for a researcher to run interviews and usability tests before the next release.',
    duties: ['Plan and run user interviews', 'Test prototypes with patients and doctors', 'Share clear findings with designers and engineers'],
    needs: ['Experience in user research', 'Good note taking and synthesis', 'Comfortable speaking with older users'],
    perks: ['Contract can be extended', 'Flexible hours', 'Work with a small, friendly team']
  },
  {
    id: 9, title: 'Software Engineering Intern', company: 'Brightpath Software', location: 'Pune', type: 'Internship', mode: 'On-site', level: 'Fresher',
    salaryMin: 2, salaryMax: 3, posted: 0,
    about: 'A three-month internship where you work on a real feature alongside the engineering team and present it at the end.',
    duties: ['Build a small feature with a mentor', 'Write tests and documentation', 'Present your work to the team'],
    needs: ['Currently in the final year of a computer-related degree', 'Basic JavaScript or Python', 'Curious and willing to ask questions'],
    perks: ['Stipend of Rs. 15,000 a month', 'Pre-placement offer for strong interns', 'Lunch provided']
  },
  {
    id: 10, title: 'Operations Analyst', company: 'Veda Logistics', location: 'Nagpur', type: 'Full-time', mode: 'On-site', level: '1-3 years',
    salaryMin: 5, salaryMax: 8, posted: 7,
    about: 'Veda moves goods for manufacturers across central India. The operations team tracks deliveries, costs and warehouse performance.',
    duties: ['Track delivery performance in daily reports', 'Find delays and suggest fixes', 'Work with warehouse managers on weekly targets'],
    needs: ['Strong Excel skills', 'Interest in supply chains', 'Comfortable on the warehouse floor'],
    perks: ['Relocation support', 'Transport allowance', 'Annual performance bonus']
  },
  {
    id: 11, title: 'Product Designer', company: 'Lumen Health', location: 'Remote', type: 'Full-time', mode: 'Remote', level: '3+ years',
    salaryMin: 14, salaryMax: 22,posted: 11,
    about: 'Lead the design of the Lumen patient app, from first sketches to the final handoff, working closely with product and engineering.',
    duties: ['Own design for the appointments and records features', 'Run design reviews with the team', 'Maintain the design system'],
    needs: ['Four or more years of product design', 'A portfolio with shipped mobile work', 'Experience working with research findings'],
    perks: ['Fully remote', 'Health cover and wellness allowance', 'Four-day week in August']
  },
  {
    id: 12, title: 'Campus Ambassador Programme Lead', company: 'Greenleaf Foods', location: 'Mumbai', type: 'Part-time', mode: 'Hybrid', level: 'Fresher',
    salaryMin: 2, salaryMax: 3, posted: 12,
    about: 'Help Greenleaf reach students by managing a group of ten campus ambassadors across Mumbai colleges.',
    duties: ['Brief and support campus ambassadors', 'Plan two events a month', 'Report on sign-ups and sales'],
    needs: ['Final-year student or recent graduate', 'Confident speaking to groups', 'Organised and dependable'],
    perks: ['Flexible hours', 'Certificate and reference letter', 'Product and event passes']
  }
];

const $ = id => document.getElementById(id);
const jobList = $('jobList');
const drawer = $('drawer');
const overlay = $('overlay');

const filters = { keyword: '', place: '', type: 'All', mode: 'all', level: 'all', minSalary: 0, sort: 'newest', savedOnly: false };
let savedIds = loadSaved();
let openJobId = null;
let lastRow = null;

function loadSaved(){
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function storeSaved() {
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(savedIds));
  } catch (error) {
    // private windows can block storage, saving just won't persist
  }
}

const isSaved = id => savedIds.includes(id);
const findJob = id => jobs.find(job => job.id === id);

function postedText(days) {
  if (days === 0) return 'Posted today';
  if (days === 1) return 'Posted yesterday';
  if (days < 7) return 'Posted ' + days + ' days ago';
  const weeks = Math.floor(days / 7);
  return 'Posted ' + weeks + (weeks === 1 ? ' week ago' : ' weeks ago');
}

function salaryText(job) {
  return '\u20B9' + job.salaryMin + '\u2013' + job.salaryMax + ' LPA';
}

function tileColor(job) {
  return TILE_COLORS[job.company.length % TILE_COLORS.length];
}

/* listing */

function getVisibleJobs() {
  const keyword = filters.keyword.trim().toLowerCase();
  const place = filters.place.trim().toLowerCase();

  const visible = jobs.filter(job => {
    const inText = (job.title + ' ' + job.company).toLowerCase().includes(keyword);
    const inPlace = (job.location + ' ' + job.mode).toLowerCase().includes(place);
    return inText && inPlace
      && (filters.type === 'All' || job.type === filters.type)
      && (filters.mode === 'all' || job.mode === filters.mode)
      && (filters.level === 'all' || job.level === filters.level)
      && job.salaryMax >= filters.minSalary
      && (!filters.savedOnly || isSaved(job.id));
  });

  if (filters.sort === 'salary') visible.sort((a, b) => b.salaryMax - a.salaryMax);
  else visible.sort((a, b) => a.posted - b.posted);
  return visible;
}

function heartIcon() {
  return '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.9 4.5 6.6 4.5c2 0 3.5 1 5.4 3 1.9-2 3.4-3 5.4-3 3.7 0 5.7 3.9 4.2 7.3C19.5 16.4 12 21 12 21z"/></svg>';
}

function renderJobs(animate) {
  const visible = getVisibleJobs();
  $('resultCount').textContent = visible.length === 1 ? '1 job found' : visible.length + ' jobs found';

  if (visible.length === 0) {
    const message = filters.savedOnly && savedIds.length === 0
      ? 'You have not saved any jobs yet. Press the heart on a job to keep it here.'
      : 'No jobs match these filters.';
    jobList.innerHTML = `<li class="empty"><p>${message}</p><button id="clearFilters">Clear all filters</button></li>`;
    return;
  }

  jobList.innerHTML = visible.map((job, index) => `
    <li class="${animate ? 'enter' : ''}" style="--i:${Math.min(index, 10)}">
      <button class="job-open" data-id="${job.id}">
        <span class="logo-tile" style="background:${tileColor(job)}">${job.company[0]}</span>
        <span class="job-main">
          <span class="job-title">${job.title}</span>
          <span class="job-sub">${job.company} &middot; ${job.location}</span>
          <span class="tags"><span class="tag type">${job.type}</span><span class="tag">${job.mode}</span><span class="tag">${job.level === 'Fresher' ? 'Fresher' : job.level}</span></span>
        </span>
        <span class="job-side">
          <span class="job-salary">${salaryText(job)}</span>
          <span class="job-posted">${postedText(job.posted)}</span>
        </span>
      </button>
      <button class="save-btn" data-save="${job.id}" aria-pressed="${isSaved(job.id)}" aria-label="Save ${job.title}">${heartIcon()}</button>
    </li>`).join('');
}

function updateSavedCount() {
  const counter = $('savedCount');
  counter.textContent = savedIds.length;
  counter.classList.add('bump');
  setTimeout(() => counter.classList.remove('bump'), 250);
}

function toggleSaved(id) {
  if (isSaved(id)) {
    savedIds = savedIds.filter(savedId => savedId !== id);
    showToast('Removed from saved jobs');
  } else {
    savedIds.push(id);
    showToast('Job saved');
  }
  storeSaved();
  updateSavedCount();
}

jobList.addEventListener('click', event => {
  const saveButton = event.target.closest('.save-btn');
  const openButton = event.target.closest('.job-open');

  if (saveButton) {
    toggleSaved(Number(saveButton.dataset.save));
    if (filters.savedOnly) renderJobs(false);
    else saveButton.setAttribute('aria-pressed', isSaved(Number(saveButton.dataset.save)));
  } else if (openButton) {
    lastRow = openButton;
    openDrawer(Number(openButton.dataset.id));
  } else if (event.target.id === 'clearFilters') {
    resetFilters();
  }
});

/* filters */

function syncFormToFilters() {
  $('keyword').value = filters.keyword;
  $('place').value = filters.place;
  $('modeFilter').value = filters.mode;
  $('levelFilter').value = filters.level;
  $('salaryRange').value = filters.minSalary;
  $('sortBy').value = filters.sort;
  updateSalaryLabel();
  setActivePill();
  setSavedToggle();
}

function resetFilters() {
  Object.assign(filters, { keyword: '', place: '', type: 'All', mode: 'all', level: 'all', minSalary: 0, sort: 'newest', savedOnly: false });
  syncFormToFilters();
  renderJobs(true);
}

function setActivePill() {
  document.querySelectorAll('.pill').forEach(pill => {
    pill.setAttribute('aria-pressed', pill.dataset.type === filters.type);
  });
}

function updateSalaryLabel() {
  $('salaryLabel').textContent = filters.minSalary === 0 ? 'Any' : '\u20B9' + filters.minSalary + ' LPA+';
}

function setSavedToggle() {
  $('savedToggle').setAttribute('aria-pressed', filters.savedOnly);
}

function scrollToResults() {
  document.querySelector('.listing').scrollIntoView({ behavior: 'smooth' });
}

$('keyword').addEventListener('input', event => { filters.keyword = event.target.value; renderJobs(false); });
$('place').addEventListener('input', event => { filters.place = event.target.value; renderJobs(false); });

$('searchForm').addEventListener('submit', event => {
  event.preventDefault();
  renderJobs(true);
  scrollToResults();
});

document.querySelectorAll('.quick-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    filters.keyword = tag.dataset.term;
    $('keyword').value = tag.dataset.term;
    renderJobs(true);
    scrollToResults();
  });
});

$('typePills').addEventListener('click', event => {
  const pill = event.target.closest('.pill');
  if (!pill) return;
  filters.type = pill.dataset.type;
  setActivePill();
  renderJobs(true);
});

$('modeFilter').addEventListener('change', event => { filters.mode = event.target.value; renderJobs(true); });
$('levelFilter').addEventListener('change', event => { filters.level = event.target.value; renderJobs(true); });
$('sortBy').addEventListener('change', event => { filters.sort = event.target.value; renderJobs(true); });

$('salaryRange').addEventListener('input', event => {
  filters.minSalary = Number(event.target.value);
  updateSalaryLabel();
  renderJobs(false);
});

$('savedToggle').addEventListener('click', () => {
  filters.savedOnly = !filters.savedOnly;
  setSavedToggle();
  renderJobs(true);
  if (filters.savedOnly) scrollToResults();
});

/* details drawer */

function openDrawer(id) {
  const job = findJob(id);
  openJobId = id;

  drawer.innerHTML = `
    <button class="drawer-close" id="drawerClose" aria-label="Close details">&times;</button>
    <div class="drawer-body">
      <div>
       <h2>${job.title}</h2>
        <p class="company-line">${job.company} &middot; ${postedText(job.posted).toLowerCase()}</p>
      </div>
      <dl class="facts">
        <div><dt>Location</dt><dd>${job.location}</dd></div>
        <div><dt>Work mode</dt><dd>${job.mode}</dd></div>
        <div><dt>Job type</dt><dd>${job.type}</dd></div>
        <div><dt>Salary</dt><dd>${salaryText(job)}</dd></div>
        <div><dt>Experience</dt><dd>${job.level}</dd></div>
      </dl>
      <div>
        <p>${job.about}</p>
        <h3>What you will do</h3>
        <ul>${job.duties.map(item => `<li>${item}</li>`).join('')}</ul>
      </div>
      <div>
        <h3>What we are looking for</h3>
        <ul>${job.needs.map(item => `<li>${item}</li>`).join('')}</ul>
        <h3>What you get</h3>
        <ul>${job.perks.map(item => `<li>${item}</li>`).join('')}</ul>
      </div>
      <div class="drawer-actions">
        <button class="btn-apply" id="applyButton">Apply for this job</button>
        <button class="btn-save" id="drawerSave">${isSaved(id) ? 'Saved' : 'Save'}</button>
      </div>
    </div>`;

  drawer.classList.add('open');
  overlay.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  drawer.scrollTop = 0;
  document.body.style.overflow = 'hidden';
  $('drawerClose').focus();
}

function closeDrawer() {
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastRow) lastRow.focus();
}

drawer.addEventListener('click', event => {
  const job = findJob(openJobId);

  if (event.target.id === 'drawerClose') closeDrawer();

  if (event.target.id === 'applyButton') {
    event.target.textContent = 'Application sent';
    event.target.disabled = true;
    showToast('Application sent to ' + job.company);
  }

  if (event.target.id === 'drawerSave') {
    toggleSaved(job.id);
    event.target.textContent = isSaved(job.id) ? 'Saved' : 'Save';
    renderJobs(false);
  }
});

overlay.addEventListener('click', closeDrawer);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
});

/* helpers */

let toastTimer;
function showToast(message) {
  const toast = $('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function countUp(element, target) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    element.textContent = target;
    return;
  }
  const duration = 900;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    element.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

countUp($('statRoles'), jobs.length);
countUp($('statCompanies'), new Set(jobs.map(job => job.company)).size);
countUp($('statRemote'), jobs.filter(job => job.mode === 'Remote').length);

renderJobs(true);
$('savedCount').textContent = savedIds.length;
$('year').textContent = new Date().getFullYear();
