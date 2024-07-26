import { fetchJobs, displayJobs, navigateTo } from '../utils';

export default function showHomePage() {
  console.log('Showing home page');
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2>Featured</h2>
    <div id="featured-jobs" class="jobs-container"></div>
    <button id="view-more">View more</button>
  `;

  document.getElementById('view-more').addEventListener('click', () => navigateTo('browse-jobs'));

  fetchJobs({ featured: true })
    .then(jobs => {
      console.log('Fetched featured jobs:', jobs);
      if (jobs.length === 0) {
        document.getElementById('featured-jobs').innerHTML = '<p>No featured jobs available</p>';
      } else {
        displayJobs(jobs, 'featured-jobs');
      }
    })
    .catch(error => {
      console.error('Error fetching featured jobs:', error);
      document.getElementById('featured-jobs').innerHTML = '<p>Error fetching featured jobs. Please try again later.</p>';
    });
}
