import { saveJob } from '../utils';

export default async function showJobDetailsPage(params) {
  console.log('Showing job details page');
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="job-details">
      <div class="job-header">
        <img id="company-logo" class="company-logo" src="" alt="Company Logo">
        <h2 id="job-title"></h2>
      </div>
      <div class="job-info">
        <div class="job-info-item"><i class="fas fa-building"></i><p id="company-name"></p></div>
        <div class="job-info-item"><i class="fas fa-map-marker-alt"></i><p id="job-location"></p></div>
        <div class="job-info-item"><i class="fas fa-briefcase"></i><p id="job-type"></p></div>
        <div class="job-info-item"><i class="fas fa-calendar-alt"></i><p id="job-posted"></p></div>
      </div>
      <div class="job-actions">
        <button id="interested-button" class="btn">I am interested</button>
        <button id="save-button" class="btn saved">Saved</button>
      </div>
      <div class="job-description">
        <h3>Job Description</h3>
        <p id="job-description"></p>
      </div>
    </div>
  `;

  let job = params.job;
  const logoUrl = params.logoUrl;
  
  if (!job) {
    console.error('Job details not found');
    return;
  }

  console.log('Job Details:', job);

  const companyName = job.company?.display_name || 'N/A';
  const jobTitle = job.title || 'N/A';
  const jobLocation = job.location?.display_name || 'N/A';
  const jobType = job.contract_time || 'N/A';
  const jobPosted = job.created ? calculateDaysAgo(job.created) : 'N/A';
  const jobDescription = job.description || 'N/A';

  const companyLogoElement = document.getElementById('company-logo');
  companyLogoElement.src = logoUrl;
  companyLogoElement.onerror = () => {
    if (!companyLogoElement.src.includes('default-logo.png')) {
      companyLogoElement.src = 'default-logo.png'; // Ensure you have a default-logo.png in your project
    }
  };

  document.getElementById('job-title').innerText = jobTitle;
  document.getElementById('company-name').innerText = companyName;
  document.getElementById('job-location').innerText = jobLocation;
  document.getElementById('job-type').innerText = jobType;
  document.getElementById('job-posted').innerText = `Posted ${jobPosted}`;
  document.getElementById('job-description').innerText = jobDescription;

  document.getElementById('interested-button').addEventListener('click', () => {
    alert('You are interested in this job!');
  });

  document.getElementById('save-button').addEventListener('click', () => {
    saveJob(job);
  });

  localStorage.setItem(`job-${job.id}`, JSON.stringify(job));
}

function calculateDaysAgo(dateString) {
  const datePosted = new Date(dateString);
  const today = new Date();
  const differenceInTime = today - datePosted;
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  return `${differenceInDays} days ago`;
}
