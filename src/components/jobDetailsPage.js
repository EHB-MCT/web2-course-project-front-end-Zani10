import { saveJob, fetchJobs, getCompanyLogoUrl, calculateDaysAgo } from '../utils';

export default async function showJobDetailsPage(params) {
  console.log('Showing job details page');
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="job-details-detailspage">
      <div class="job-header-detailspage">
        <img id="company-logo" class="company-logo-detailspage" src="" alt="Company Logo">
        <div>
          <h2 class="job-header-text-detailspage" id="job-title"></h2>
          <div class="job-info-container-detailspage">
            <div class="job-info-detailspage">
              <div class="job-info-item-detailspage"><i class="fas fa-building"></i><p id="company-name"></p></div>
              <div class="job-info-item-detailspage"><i class="fas fa-map-marker-alt"></i><p id="job-location"></p></div>
              <div class="job-info-item-detailspage"><i class="fas fa-briefcase"></i><p id="job-type"></p></div>
              <div class="job-info-item-detailspage"><i class="fas fa-calendar-alt"></i><p id="job-posted"></p></div>
            </div>
          </div>
        </div>
      </div>
      <div class="job-actions-detailspage">
        <button id="interested-button" class="btn-interested-detailspage btn">I am interested</button>
        <button id="save-button" class="btn-saved-detailspage btn">Saved</button>
      </div>
      <div class="job-description-detailspage">
        <h3>Job Description</h3>
        <p id="job-description"></p>
      </div>
    </div>
    <div class="similar-jobs-section">
      <h3>Similar jobs</h3>
      <div id="similar-jobs-container" class="similar-jobs-container"></div>
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

  fetchSimilarJobs(job.title);
}

async function fetchSimilarJobs(jobTitle) {
  try {
    const jobs = await fetchJobs({ what: jobTitle, similar: true });
    console.log('Fetched similar jobs:', jobs);

    // Filter to get 2 similar jobs from different companies
    const uniqueCompanies = new Set();
    const similarJobs = [];
    for (const job of jobs) {
      const companyName = job.company.display_name || job.company;
      if (!uniqueCompanies.has(companyName)) {
        uniqueCompanies.add(companyName);
        similarJobs.push(job);
      }
      if (similarJobs.length >= 2) break;
    }

    displaySimilarJobs(similarJobs, 'similar-jobs-container');
  } catch (error) {
    console.error('Error fetching similar jobs:', error);
    document.getElementById('similar-jobs-container').innerHTML = '<p>Error fetching similar jobs. Please try again later.</p>';
  }
}

function displaySimilarJobs(jobs, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  jobs.forEach(job => {
    const jobId = job.id || job.jobId;
    const company = job.company.display_name || job.company || 'Not available';
    const location = job.location.display_name || job.location || 'Not available';
    const logoUrl = getCompanyLogoUrl(company);
    const postedDate = job.created || job.created_at ? calculateDaysAgo(job.created || job.created_at) : 'Not available';

    const jobCard = document.createElement('div');
    jobCard.className = 'similar-job-card';
    jobCard.innerHTML = `
      <div class="similar-job-info">
        <div class="similar-job-title">${job.title}</div>
        <div class="similar-job-company-location">
          <div class="similar-job-company"><i class="fas fa-building fas-similar-job"></i>${company}</div>
          <div class="similar-job-location"><i class="fas fa-map-marker-alt fas-similar-job"></i>${location}</div>
        </div>
        <div class="similar-job-posted-save">
          <div class="similar-job-posted">Posted ${postedDate}</div>
        </div>
      </div>
      <img src="${logoUrl}" alt="Company Logo" class="similar-job-logo">
    `;

    jobCard.addEventListener('click', () => {
      navigateTo('job-details', { job, logoUrl });
    });

    container.appendChild(jobCard);
  });
}
