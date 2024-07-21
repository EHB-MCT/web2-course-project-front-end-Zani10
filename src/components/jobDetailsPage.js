export default function showJobDetailsPage(job) {
  console.log('Showing job details page');
  const app = document.getElementById('app');

  if (!job || !job.title) {
    app.innerHTML = `<p>Job details not available. Please try again.</p>`;
    return;
  }

  const company = job.company ? (job.company.display_name || job.company) : 'N/A';
  const location = job.location ? (job.location.display_name || job.location) : 'N/A';

  app.innerHTML = `
    <h2>${job.title}</h2>
    <p>Company: ${company}</p>
    <p>Location: ${location}</p>
    <p>Description: ${job.description}</p>
    <button id="interested-button">I am interested</button>
    <button id="save-job-button">Save Job</button>
  `;

  document.getElementById('interested-button').addEventListener('click', () => {
    alert(`You have shown interest in the job: ${job.title}`);
  });

  document.getElementById('save-job-button').addEventListener('click', () => {
    alert(`Job Saved:\nTitle: ${job.title}\nCompany: ${company}\nLocation: ${location}`);
  });
}
