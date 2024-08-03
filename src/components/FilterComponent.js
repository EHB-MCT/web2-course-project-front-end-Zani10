export default function createFilterComponent() {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filters-container';
  
    filterContainer.innerHTML = `
      <div class="filter-section">
        <h3>Job type</h3>
        <button class="filter-button">Accounting & Finance</button>
        <button class="filter-button">IT Jobs</button>
        <button class="filter-button">Customer Services</button>
        <button class="filter-button">Engineering</button>
        <button class="filter-button">HR & Recruitment</button>
        <button class="filter-button">Healthcare & Nursing</button>
        <button class="filter-button">Creative & Design</button>
        <button class="filter-button">Travel</button>
        <button class="filter-button">Teaching</button>
      </div>
      <div class="filter-section">
        <h3>Contract</h3>
        <button class="filter-button">Full-Time</button>
        <button class="filter-button">Part-Time</button>
      </div>
      <div class="filter-section">
        <h3>Salary range</h3>
        <input type="range" min="30000" max="90000" value="60000" class="salary-range">
        <input type="range" min="30000" max="90000" value="90000" class="salary-range">
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
  