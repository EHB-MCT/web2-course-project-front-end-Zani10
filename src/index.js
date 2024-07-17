import './styles.css';

const app = document.getElementById('app');

function createSearchBar() {
  const searchBar = document.createElement('div');
  searchBar.className = 'search-bar';

  searchBar.innerHTML = `
    <input type="text" id="search-input" placeholder="Search for jobs...">
    <button id="search-button">Search</button>
    <button id="filter-button">Filters</button>
    <div id="filters" class="filters">
      <label for="location">Location:</label>
      <input type="text" id="location" placeholder="Enter location">
      <label for="job-type">Job Type:</label>
      <select id="job-type">
        <option value="">All</option>
        <option value="full-time">Full-time</option>
        <option value="part-time">Part-time</option>
        <option value="contract">Contract</option>
      </select>
      <label for="salary-range">Salary Range:</label>
      <input type="number" id="salary-min" placeholder="Min salary">
      <input type="number" id="salary-max" placeholder="Max salary">
      <button id="apply-filters">Apply Filters</button>
    </div>
  `;

  return searchBar;
}

function initialize() {
  app.innerHTML = '';
  app.appendChild(createSearchBar());
  document.getElementById('search-button').addEventListener('click', fetchJobs);
  document.getElementById('filter-button').addEventListener('click', toggleFilters);
  document.getElementById('apply-filters').addEventListener('click', fetchJobs);
  fetchJobs();
}

function toggleFilters() {
  const filters = document.getElementById('filters');
  filters.style.display = filters.style.display === 'none' ? 'flex' : 'none';
}

async function fetchJobs() {
  const searchInput = document.getElementById('search-input').value;
  const location = document.getElementById('location').value;
  const jobType = document.getElementById('job-type').value;
  const salaryMin = document.getElementById('salary-min').value;
  const salaryMax = document.getElementById('salary-max').value;

  let query = `http://localhost:4000/api/jobs?what=${encodeURIComponent(searchInput)}&where=${encodeURIComponent(location)}`;

  if (jobType) {
    query += `&contract_type=${jobType}`;
  }
  if (salaryMin) {
    query += `&salary_min=${salaryMin}`;
  }
  if (salaryMax) {
    query += `&salary_max=${salaryMax}`;
  }

  try {
    const response = await fetch(query);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.message) {
      throw new Error(data.message);
    }
    displayJobs(data.results);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    displayError(error.message);
  }
}

function displayJobs(jobs) {
  const jobsContainer = document.createElement('div');
  jobsContainer.className = 'jobs-container';

  jobs.forEach(job => {
    const jobCard = document.createElement('div');
    jobCard.className = 'job-card';

    jobCard.innerHTML = `
      <h3>${job.title}</h3>
      <p>${job.company.display_name}</p>
      <p>${job.location.display_name}</p>
      <p>${job.description}</p>
      <button class="details-button" data-id="${job.id}">Details</button>
    `;

    jobCard.querySelector('.details-button').addEventListener('click', () => showJobDetails(job));

    jobsContainer.appendChild(jobCard);
  });

  app.appendChild(jobsContainer);
}

function showJobDetails(job) {
  app.innerHTML = `
    <h2>${job.title}</h2>
    <p><strong>Company:</strong> ${job.company.display_name}</p>
    <p><strong>Location:</strong> ${job.location.display_name}</p>
    <p><strong>Description:</strong> ${job.description}</p>
    <p><strong>Salary:</strong> ${job.salary_min} - ${job.salary_max}</p>
    <button id="back-button">Back</button>
  `;

  document.getElementById('back-button').addEventListener('click', initialize);
}

function displayError(message) {
  const errorContainer = document.createElement('div');
  errorContainer.className = 'error-container';
  errorContainer.innerText = `Error: ${message}`;
  app.appendChild(errorContainer);
}

function showSavedJobs() {
  app.innerHTML = '<h2>Saved Jobs</h2><p>This is the saved jobs page.</p>';
}

function showProfile() {
  app.innerHTML = '<h2>Profile</h2><p>This is the profile page.</p>';
}

function showLogin() {
  app.innerHTML = '<h2>Login/Signup</h2><p>This is the login/signup page.</p>';
}

// Navigation event listener
document.querySelector('nav ul').addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    event.preventDefault();
    const page = event.target.getAttribute('href').substring(1);
    if (page === 'browse-jobs') {
      initialize();
    } else if (page === 'saved-jobs') {
      showSavedJobs();
    } else if (page === 'profile') {
      showProfile();
    } else if (page === 'login') {
      showLogin();
    }
  }
});

initialize();
