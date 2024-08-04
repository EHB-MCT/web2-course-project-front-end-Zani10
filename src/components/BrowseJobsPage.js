import { fetchJobs, displayJobs } from '../utils';

export default async function showBrowseJobsPage(params) {
  console.log('Showing browse jobs page');
  const app = document.getElementById('app');
  app.classList.add('browse-jobs-page');
  app.innerHTML = `
    <div class="filters-container">
      <div class="filter-section">
        <h3>Job type <i class="fas fa-chevron-up"></i></h3>
        <div class="filter-options">
          <button class="filter-option" data-type="Accounting & Finance">Accounting & Finance</button>
          <button class="filter-option" data-type="IT Jobs">IT Jobs</button>
          <button class="filter-option" data-type="Customer Services">Customer Services</button>
          <button class="filter-option" data-type="Engineering">Engineering</button>
          <button class="filter-option" data-type="HR & Recruitment">HR & Recruitment</button>
          <button class="filter-option" data-type="Healthcare & Nursing">Healthcare & Nursing</button>
          <button class="filter-option" data-type="Creative & Design">Creative & Design</button>
          <button class="filter-option" data-type="Travel">Travel</button>
          <button class="filter-option" data-type="Teaching">Teaching</button>
        </div>
      </div>
      <div class="filter-section">
        <h3>Contract <i class="fas fa-chevron-up"></i></h3>
        <div class="filter-options">
          <button class="filter-option" data-contract="Full-Time">Full-Time</button>
          <button class="filter-option" data-contract="Part-Time">Part-Time</button>
        </div>
      </div>
      <div class="filter-section">
        <h3>Salary range <i class="fas fa-chevron-up"></i></h3>
        <div class="filter-options">
          <div id="salary-slider"></div>
        </div>
      </div>
    </div>
    <div class="jobs-container">
      <div id="search-message" class="search-message">20 results found</div>
      <div id="browse-jobs" class="jobs-container"></div>
    </div>
  `;

  document.querySelectorAll('.filter-option').forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('selected');
      fetchAndDisplayJobs();
    });
  });

  document.querySelectorAll('.filter-section h3').forEach(section => {
    section.addEventListener('click', () => {
      const options = section.nextElementSibling;
      options.style.display = options.style.display === 'none' ? 'block' : 'none';
      section.querySelector('i').classList.toggle('fa-chevron-up');
      section.querySelector('i').classList.toggle('fa-chevron-down');
    });
  });

  const salarySlider = document.getElementById('salary-slider');
  noUiSlider.create(salarySlider, {
    start: [30000, 90000],
    connect: true,
    range: {
      'min': 0,
      'max': 100000
    },
    tooltips: [true, true],
    format: {
      to: function (value) {
        return Math.round(value);
      },
      from: function (value) {
        return Number(value);
      }
    }
  });

  salarySlider.noUiSlider.on('change', fetchAndDisplayJobs);

  async function fetchAndDisplayJobs() {
    const selectedTypes = Array.from(document.querySelectorAll('.filter-option.selected[data-type]')).map(button => button.getAttribute('data-type'));
    const selectedContracts = Array.from(document.querySelectorAll('.filter-option.selected[data-contract]')).map(button => button.getAttribute('data-contract'));
    const [minSalary, maxSalary] = salarySlider.noUiSlider.get();

    const params = {
      types: selectedTypes.join(','),
      contracts: selectedContracts.join(','),
      minSalary,
      maxSalary
    };

    try {
      const jobs = await fetchJobs(params);
      displayJobs(jobs, 'browse-jobs');

      const searchMessage = document.getElementById('search-message');
      searchMessage.innerHTML = `<p>${jobs.length} results found</p>`;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      document.getElementById('browse-jobs').innerHTML = '<p>Error fetching jobs. Please try again later.</p>';
    }
  }

  await fetchAndDisplayJobs();
}
