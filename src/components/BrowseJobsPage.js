import { fetchJobs, displayJobs, navigateTo } from '../utils';

export default async function showBrowseJobsPage(params) {
  console.log('Showing browse jobs page');
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>Browse Jobs</h1>
    <div id="search-message" class="search-message"></div>
    <div id="jobs" class="jobs-container"></div>
  `;

  const jobs = await fetchJobs(params);
  displayJobs(jobs, 'jobs');

  if (params.what || params.where) {
    const message = `${jobs.length} results for <span class="highlight">${params.what}</span> in <span class="highlight">${params.where}</span>`;
    document.getElementById('search-message').innerHTML = message;
  }
}
