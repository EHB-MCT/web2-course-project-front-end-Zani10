import showHomePage from './components/HomePage';
import showBrowseJobsPage from './components/BrowseJobsPage';
import showJobDetailsPage from './components/JobDetailsPage';
import showSavedJobsPage from './components/SavedJobsPage';
import showProfilePage from './components/ProfilePage';
import showLoginPage from './components/LoginPage';
import showRegisterPage from './components/RegisterPage';
import logoutUser from './components/LogoutUser';
import { showNotification } from './components/notifications';

export function displayJobs(jobs, containerId, isFeatured = false) {
  const jobsContainer = document.getElementById(containerId);
  jobsContainer.innerHTML = '';
  jobs.forEach(job => {
    const jobId = job.id || job.jobId;
    const company = job.company.display_name || job.company || 'Not available';
    const location = job.location.display_name || job.location || 'Not available';
    const logoUrl = getCompanyLogoUrl(company);
    const description = job.description || 'No description available';
    const postedDate = job.created || job.created_at ? calculateDaysAgo(job.created || job.created_at) : 'Not available';

    const jobCard = document.createElement('div');
    jobCard.className = isFeatured ? 'job-card homepage-job-card' : 'job-card browse-job-card';

    jobCard.innerHTML = `
      <div class="job-header">
        <h3>${job.title}</h3>
        <img src="${logoUrl}" alt="Company Logo" class="company-logo">
      </div>
      <div class="job-info">
        <div class="job-info-item"><i class="fas fa-building"></i>${company}</div>
        <div class="job-info-item"><i class="fas fa-map-marker-alt"></i>${location}</div>
      </div>
      <div class="job-description">
        <p>${description}</p>
      </div>
      <div class="job-actions">
        <span>Posted ${postedDate}</span>
        <button class="btn save-button" data-job-id="${jobId}"><i class="far fa-heart"></i></button>
      </div>
    `;

    jobCard.addEventListener('click', () => {
      navigateTo('job-details', { job, logoUrl });
    });

    const saveButton = jobCard.querySelector('.save-button');
    saveButton.addEventListener('click', (event) => {
      event.stopPropagation();
      saveJob({
        id: jobId,
        title: job.title,
        company: job.company.display_name || job.company,
        location: job.location.display_name || job.location,
        description: job.description,
        created: job.created || job.created_at
      });
      saveButton.querySelector('i').classList.toggle('fas');
      saveButton.querySelector('i').classList.toggle('far');
    });

    jobsContainer.appendChild(jobCard);
  });
}

export function displayFeaturedJobs(jobs, containerId) {
  const jobsContainer = document.getElementById(containerId);
  jobsContainer.innerHTML = '';
  jobs.forEach(job => {
    const jobId = job.id || job.jobId;
    const company = job.company.display_name || job.company || 'Not available';
    const location = job.location.display_name || job.location || 'Not available';
    const logoUrl = getCompanyLogoUrl(company);
    const description = job.description || 'No description available';
    const postedDate = job.created || job.created_at ? calculateDaysAgo(job.created || job.created_at) : 'Not available';

    const jobCard = document.createElement('div');
    jobCard.className = 'featured-job-card';

    jobCard.innerHTML = `
      <div class="featured-job-header">
        <h3>${job.title}</h3>
        <img src="${logoUrl}" alt="Company Logo" class="featured-company-logo">
      </div>
      <div class="featured-job-info">
        <div class="featured-job-info-item"><i class="fas fa-building"></i>${company}</div>
        <div class="featured-job-info-item"><i class="fas fa-map-marker-alt"></i>${location}</div>
      </div>
      <div class="featured-job-description">
        <p>${description}</p>
      </div>
      <div class="featured-job-actions">
        <span>Posted ${postedDate}</span>
        <button class="btn save-button" data-job-id="${jobId}"><i class="far fa-heart"></i></button>
      </div>
    `;

    jobCard.addEventListener('click', () => {
      navigateTo('job-details', { job, logoUrl });
    });

    const saveButton = jobCard.querySelector('.save-button');
    saveButton.addEventListener('click', (event) => {
      event.stopPropagation();
      saveJob({
        id: jobId,
        title: job.title,
        company: job.company.display_name || job.company,
        location: job.location.display_name || job.location,
        description: job.description,
        created: job.created || job.created_at
      });
      saveButton.querySelector('i').classList.toggle('fas');
      saveButton.querySelector('i').classList.toggle('far');
    });

    jobsContainer.appendChild(jobCard);
  });
}


export function getCompanyLogoUrl(companyName) {
  if (typeof companyName !== 'string') return 'path/to/default-image.png'; // Ensure there's a fallback for default image
  const apiKey = 'pk_fMS1bC3BQwG26u8Ev8j_QA';
  const companyNameFormatted = companyName.toLowerCase().replace(/\s+/g, '');
  return `https://img.logo.dev/${companyNameFormatted}.com?token=${apiKey}&size=200&format=png`;
}

export function calculateDaysAgo(dateString) {
  const datePosted = new Date(dateString);
  const today = new Date();
  const differenceInTime = today - datePosted;
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  return `${differenceInDays} days ago`;
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

export async function saveJob(job) {
  const token = localStorage.getItem('token');
  if (!token) {
    navigateTo('login');
    return;
  }

  const jobToSave = {
    jobId: job.id || job.jobId, // Ensure jobId is included
    title: job.title,
    company: job.company.display_name || job.company,
    location: job.location.display_name || job.location,
    description: job.description,
    created: job.created || new Date().toISOString() // Ensure the created date is set
  };

  try {
    const response = await fetch('http://localhost:4000/api/users/saved-jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(jobToSave),
    });

    if (!response.ok) {
      throw new Error('Failed to save job');
    }

    showNotification('Job saved successfully!', 'success');
  } catch (error) {
    console.error('Error saving job:', error);
    showNotification('Failed to save job. Please try again.', 'error');
  }
}

export async function getSavedJobs() {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token, authorization denied');
  }

  try {
    const response = await fetch('http://localhost:4000/api/users/saved-jobs', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch saved jobs');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function removeSavedJob(jobId) {
  console.log(`Removing job with ID: ${jobId}`);
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token, authorization denied');
  }

  try {
    const response = await fetch(`http://localhost:4000/api/users/saved-jobs/${jobId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Animation before removing the job card from the DOM
    const jobCard = document.querySelector(`.job-card[data-job-id="${jobId}"]`);
    if (jobCard) {
      jobCard.classList.add('removing');
      setTimeout(() => {
        jobCard.remove();
      }, 300); // Match this duration with your CSS animation duration
    }

    showNotification('Job unsaved successfully!', 'remove');
  } catch (error) {
    console.error('Error removing saved job:', error);
    showNotification('Failed to remove job. Please try again.', 'error');
  }
}


export async function loginUser(email, password) {
  try {
    const response = await fetch('http://localhost:4000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }
    const data = await response.json();
    localStorage.setItem('token', data.token);
  } catch (error) {
    throw new Error('Login failed');
  }
}

export async function registerUser(name, email, password) {
  try {
    const response = await fetch('http://localhost:4000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    const data = await response.json();
    localStorage.setItem('token', data.token);
  } catch (error) {
    throw new Error('Registration failed');
  }
}

export function isAuthenticated() {
  const token = localStorage.getItem('token');
  return !!token;
}

export async function getUserProfile() {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token, authorization denied');
  }
  try {
    const response = await fetch('http://localhost:4000/api/users/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateUserProfile(profileData) {
  const token = localStorage.getItem('token');
  if (!token) {
    navigateTo('login');
    return;
  }

  try {
    const response = await fetch('http://localhost:4000/api/users/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    showNotification('Profile updated successfully!', 'success');
  } catch (error) {
    console.error('Error updating profile:', error);
    showNotification('Failed to update profile. Please try again.', 'error');
  }
}

export async function uploadUserCV(cvFile) {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token, authorization denied');
  }

  const formData = new FormData();
  formData.append('cv', cvFile);

  try {
    const response = await fetch('http://localhost:4000/api/users/upload-cv', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload CV');
    }

    const data = await response.json();
    showNotification('CV uploaded successfully!', 'success');
    return data.filePath;
  } catch (error) {
    throw new Error(error.message);
  }
}
