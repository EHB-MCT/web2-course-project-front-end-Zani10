import { fetchJobs, displayJobs } from '../utils';

export default async function showBrowseJobsPage(params) {
  console.log('Showing browse jobs page');
  const app = document.getElementById('app');
  app.innerHTML = `
    <div id="search-message" class="search-message"></div>
    <div id="browse-jobs" class="jobs-container"></div>
  `;

  try {
    const jobs = await fetchJobs(params);
    displayJobs(jobs, 'browse-jobs');

    if (params.what || params.where) {
      const searchMessage = document.getElementById('search-message');
      const searchTerm = params.what ? params.what : 'jobs';
      const locationTerm = params.where ? `${params.where}` : '';
      searchMessage.innerHTML = `<p>${jobs.length} results for <span style="color: #286DB1;">${searchTerm}</span> in ${locationTerm ? `<span style="color: #286DB1;">${locationTerm}</span>` : ''}</p>`;
    }

  } catch (error) {
    console.error('Error fetching jobs:', error);
    document.getElementById('browse-jobs').innerHTML = '<p>Error fetching jobs. Please try again later.</p>';
  }
}
