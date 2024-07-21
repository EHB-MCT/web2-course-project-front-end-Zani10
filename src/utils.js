import showHomePage from './components/HomePage';
import showBrowseJobsPage from './components/BrowseJobsPage';
import showJobDetailsPage from './components/JobDetailsPage';
import showSavedJobsPage from './components/SavedJobsPage';
import showProfilePage from './components/ProfilePage';
import showLoginPage from './components/LoginPage';
import showRegisterPage from './components/RegisterPage';
import logoutUser from './components/LogoutUser';

export async function fetchJobs(params = {}) {
  const { featured, what = 'developer', where = '' } = params;
  let query = 'http://localhost:4000/api/jobs';
  if (featured) {
    query += '/get-featured';
  } else {
    query += `?what=${encodeURIComponent(what)}&where=${encodeURIComponent(where)}`;
  }
  try {
    const response = await fetch(query);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

export function displayJobs(jobs, containerId) {
  const jobsContainer = document.getElementById(containerId);
  jobsContainer.innerHTML = '';
  jobs.forEach(job => {
    const jobCard = document.createElement('div');
    jobCard.className = 'job-card';
    const company = job.company ? (job.company.display_name || job.company) : 'N/A';
    const location = job.location ? (job.location.display_name || job.location) : 'N/A';
    jobCard.innerHTML = `
      <h3>${job.title}</h3>
      <p>Company: ${company}</p>
      <p>Location: ${location}</p>
      <p>Description: ${job.description}</p>
      <button class="save-button" data-id="${job.id}">Save</button>
    `;
    jobCard.addEventListener('click', () => navigateTo('job-details', job));
    jobCard.querySelector('.save-button').addEventListener('click', (e) => {
      e.stopPropagation();
      saveJob(job);
    });
    jobsContainer.appendChild(jobCard);
  });
}

export function navigateTo(page, params = {}) {
  console.log(`Navigating to: ${page}`);
  window.history.pushState({}, page, `/${page}`);
  if (page === 'home') {
    showHomePage();
  } else if (page === 'browse-jobs') {
    showBrowseJobsPage(params);
  } else if (page === 'job-details') {
    showJobDetailsPage(params);
  } else if (page === 'saved-jobs') {
    showSavedJobsPage();
  } else if (page === 'profile') {
    showProfilePage();
  } else if (page === 'login') {
    showLoginPage();
  } else if (page === 'register') {
    showRegisterPage();
  } else if (page === 'logout') {
    logoutUser();
  }
}

export function saveJob(job) {
  alert(`Job Saved:\nTitle: ${job.title}\nCompany: ${job.company}\nLocation: ${job.location}`);
}
