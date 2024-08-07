import { getSavedJobs, getCompanyLogoUrl, calculateDaysAgo, removeSavedJob } from '../utils';

export default async function showSavedJobsPage() {
  console.log('Showing saved jobs page');
  const app = document.getElementById('app');
  if (!app) return;

  try {
    const savedJobs = await getSavedJobs();
    if (savedJobs.length === 0) {
      app.innerHTML = '<p>No saved jobs available</p>';
      return;
    }

    const jobsHTML = savedJobs.map(job => {
      const logoUrl = getCompanyLogoUrl(job.company);
      const postedDate = calculateDaysAgo(job.created || job.created_at);

      return `
        <div class="job-card" data-job-id="${job.jobId}">
          <div class="job-header">
            <h3>${job.title}</h3>
            <img src="${logoUrl}" alt="Company Logo" class="company-logo">
          </div>
          <div class="job-info">
            <div class="job-info-item"><i class="fas fa-building"></i>${job.company}</div>
            <div class="job-info-item"><i class="fas fa-map-marker-alt"></i>${job.location}</div>
          </div>
          <div class="job-description">
            <p>${job.description}</p>
          </div>
          <div class="job-actions">
            <span>Posted ${postedDate}</span>
            <button class="btn remove-button" data-id="${job.jobId}"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>
      `;
    }).join('');

    app.innerHTML = `
      <div class="saved-jobs-container">
        <h2>Saved Jobs</h2>
        <div class="jobs-container">${jobsHTML}</div>
      </div>
    `;

    document.querySelectorAll('.remove-button').forEach(button => {
      button.addEventListener('click', async (event) => {
        const jobId = event.currentTarget.getAttribute('data-id');
        console.log(`Button clicked to remove job with ID: ${jobId}`);
        try {
          await removeSavedJob(jobId);
        } catch (error) {
          console.error('Failed to remove saved job:', error);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching saved jobs:', error);
    app.innerHTML = '<p>Error fetching saved jobs. Please try again later.</p>';
  }
}
