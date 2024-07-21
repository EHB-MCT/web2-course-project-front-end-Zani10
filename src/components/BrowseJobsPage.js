import { fetchJobs, displayJobs, navigateTo } from '../utils';

export default async function showBrowseJobsPage(params) {
  console.log('Showing browse jobs page');
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>Browse Jobs</h1>
    <div class="search-bar">
      <input type="text" id="search-input" placeholder="Search for jobs...">
      <input type="text" id="location-input" placeholder="Location...">
      <button id="search-button">Search</button>
    </div>
    <div id="search-message" class="search-message"></div>
    <div id="jobs" class="jobs-container"></div>
  `;

  document.getElementById('search-button').addEventListener('click', async () => {
    const searchInput = document.getElementById('search-input').value;
    const locationInput = document.getElementById('location-input').value;
    navigateTo('browse-jobs', { what: searchInput, where: locationInput });
  });

  const jobs = await fetchJobs(params);
  displayJobs(jobs, 'jobs');

  if (params.what || params.where) {
    const message = `${jobs.length} results for <span class="highlight">${params.what}</span> in <span class="highlight">${params.where}</span>`;
    document.getElementById('search-message').innerHTML = message;
  }
}
