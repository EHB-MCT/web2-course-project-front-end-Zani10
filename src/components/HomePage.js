import { fetchJobs, displayJobs, navigateTo } from '../utils';

export default function showHomePage() {
  console.log('Showing home page');
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>Featured Jobs</h1>
    <div class="search-bar">
      <input type="text" id="home-search-input" placeholder="Search for jobs...">
      <input type="text" id="home-location-input" placeholder="Location...">
      <button id="home-search-button">Search</button>
    </div>
    <div id="featured-jobs" class="jobs-container"></div>
    <button id="view-more">View More</button>
  `;

  document.getElementById('home-search-button').addEventListener('click', () => {
    const searchInput = document.getElementById('home-search-input').value;
    const locationInput = document.getElementById('home-location-input').value;
    navigateTo('browse-jobs', `${searchInput ? `?what=${encodeURIComponent(searchInput)}` : ''}${locationInput ? `&where=${encodeURIComponent(locationInput)}` : ''}`);
  });

  document.getElementById('view-more').addEventListener('click', () => navigateTo('browse-jobs'));

  fetch('http://localhost:4000/api/jobs/get-featured')
    .then(response => response.json())
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
