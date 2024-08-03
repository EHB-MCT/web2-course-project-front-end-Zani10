export default function showAboutPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="about-page">
        <h1>About Us</h1>
        <p>Welcome to CareerBox, your number one source for job listings. We're dedicated to providing you the best job search experience, with a focus on reliability, customer service, and uniqueness.</p>
        <p>Founded in 2023, CareerBox has come a long way from its beginnings. When we first started out, our passion for helping people find jobs drove us to start our own business.</p>
        <p>We hope you enjoy our platform as much as we enjoy offering it to you. If you have any questions or comments, please don't hesitate to contact us.</p>
        <p>Sincerely, <br> The CareerBox Team</p>
      </div>
    `;
  }
  