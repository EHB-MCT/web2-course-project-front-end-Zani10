import { fetchAndDisplayJobs } from '../utils';

export default function showBrowseJobsPage() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>Browse Jobs</h1>
    <div class="search-bar">
      <input type="text" id="search-input" placeholder="Search for jobs...">
      <button id="search-button">Search</button>
    </div>
    <div id="jobs" class="jobs-container"></div>
  `;

  document.getElementById('search-button').addEventListener('click', fetchAndDisplayJobs);
  fetchAndDisplayJobs();
}
