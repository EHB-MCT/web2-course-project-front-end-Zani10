import showHomePage from './components/HomePage';
import showBrowseJobsPage from './components/BrowseJobsPage';
import showJobDetailsPage from './components/JobDetailsPage';
import showSavedJobsPage from './components/SavedJobsPage';
import showProfilePage from './components/ProfilePage';
import showLoginPage from './components/LoginPage';
import showRegisterPage from './components/RegisterPage';
import logoutUser from './components/LogoutUser';

export function displayJobs(jobs, containerId) {
  const jobsContainer = document.getElementById(containerId);
  jobsContainer.innerHTML = '';
  jobs.forEach(job => {
    const jobCard = document.createElement('div');
    jobCard.className = 'job-card';
    const company = job.company ? (job.company.display_name || job.company) : 'N/A';
    const location = job.location ? (job.location.display_name || job.location) : 'N/A';
    const logoUrl = getCompanyLogoUrl(company);
    jobCard.innerHTML = `
      <img src="${logoUrl}" alt="Company Logo" class="company-logo">
      <h3>${job.title}</h3>
      <p>Company: ${company}</p>
      <p>Location: ${location}</p>
      <p>Description: ${job.description}</p>
    `;
    jobCard.addEventListener('click', () => {
      navigateTo('job-details', { job, logoUrl });
    });
    jobsContainer.appendChild(jobCard);
  });
}

export function getCompanyLogoUrl(companyName) {
  const apiKey = 'pk_fMS1bC3BQwG26u8Ev8j_QA';
  const companyNameFormatted = companyName.toLowerCase().replace(/\s+/g, '');
  return `https://img.logo.dev/${companyNameFormatted}.com?token=${apiKey}&size=200&format=png`;
}


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

export function navigateTo(page, param = {}) {
  console.log(`Navigating to: ${page}`);
  window.history.pushState({}, page, `/${page}${param ? `?${new URLSearchParams(param).toString()}` : ''}`);
  if (page === 'home') {
    showHomePage();
  } else if (page === 'browse-jobs') {
    showBrowseJobsPage(param);
  } else if (page === 'job-details') {
    showJobDetailsPage(param);
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
