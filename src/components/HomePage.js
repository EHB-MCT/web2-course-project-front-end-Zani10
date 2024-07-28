import { fetchJobs, displayJobs, navigateTo } from '../utils';

export default function showHomePage() {
  console.log('Showing home page');
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2 class="homepage-title">Featured</h2>
    <div id="homepage-featured-jobs" class="homepage-jobs-container"></div>
    <button id="view-more" class="homepage-view-more">View more</button>
  `;

  document.getElementById('view-more').addEventListener('click', () => navigateTo('browse-jobs'));

  fetchJobs({ featured: true })
    .then(jobs => {
      console.log('Fetched featured jobs:', jobs);
      if (jobs.length === 0) {
        document.getElementById('homepage-featured-jobs').innerHTML = '<p>No featured jobs available</p>';
      } else {
        displayJobs(jobs, 'homepage-featured-jobs');
      }
    })
    .catch(error => {
      console.error('Error fetching featured jobs:', error);
      document.getElementById('homepage-featured-jobs').innerHTML = '<p>Error fetching featured jobs. Please try again later.</p>';
    });
}
