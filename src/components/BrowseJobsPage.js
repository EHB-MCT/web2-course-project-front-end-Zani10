import { fetchAndDisplayJobs } from '../utils';

export default async function showBrowseJobsPage(params = {}) {
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

  document.getElementById('search-button').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input').value;
    const locationInput = document.getElementById('location-input').value;
    fetchAndDisplayJobs({ what: searchInput, where: locationInput }, true);
  });

  await fetchAndDisplayJobs(params);
}
