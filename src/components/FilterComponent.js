export default function createFilterComponent() {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filters-container';
  
    filterContainer.innerHTML = `
        <div class="sidebar-filter">
        <h3 class="filter-title" data-filter="job-type">Job type <i class="fas fa-chevron-down"></i></h3>
        <div class="filter-options" data-filter="job-type">
            <button class="filter-btn" data-type="accounting-finance">Accounting & Finance</button>
            <button class="filter-btn" data-type="it-jobs">IT Jobs</button>
            <button class="filter-btn" data-type="customer-services">Customer Services</button>
            <button class="filter-btn" data-type="engineering">Engineering</button>
            <button class="filter-btn" data-type="hr-recruitment">HR & Recruitment</button>
            <button class="filter-btn" data-type="healthcare-nursing">Healthcare & Nursing</button>
            <button class="filter-btn" data-type="creative-design">Creative & Design</button>
            <button class="filter-btn" data-type="travel">Travel</button>
            <button class="filter-btn" data-type="teaching">Teaching</button>
        </div>

        <h3 class="filter-title" data-filter="contract">Contract <i class="fas fa-chevron-down"></i></h3>
        <div class="filter-options" data-filter="contract">
            <button class="filter-btn" data-type="full-time">Full-Time</button>
            <button class="filter-btn" data-type="part-time">Part-Time</button>
        </div>

        <h3 class="filter-title" data-filter="salary-range">Salary range <i class="fas fa-chevron-down"></i></h3>
        <div class="filter-options" data-filter="salary-range">
            <div id="salary-range-container"></div>
            <p id="salary-range-values">30k - 90k</p>
        </div>
        </div>
    `;
  
    filterContainer.querySelectorAll('.filter-button').forEach(button => {
      button.addEventListener('click', (event) => {
        const filterValue = event.target.innerText;
        // Implement the logic to filter jobs based on the selected filterValue
        console.log(`Filtering jobs by: ${filterValue}`);
      });
    });
  
    return filterContainer;
  }
  