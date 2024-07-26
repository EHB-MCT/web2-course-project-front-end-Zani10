import { fetchJobs, displayJobs } from '../utils';

export default async function showBrowseJobsPage(params) {
  console.log('Showing browse jobs page');
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2>Browse Jobs</h2>
    <div id="browse-jobs" class="jobs-container"></div>
  `;

  try {
    const jobs = await fetchJobs(params);
    displayJobs(jobs, 'browse-jobs');
  } catch (error) {
    console.error('Error fetching jobs:', error);
    document.getElementById('browse-jobs').innerHTML = '<p>Error fetching jobs. Please try again later.</p>';
  }
}
