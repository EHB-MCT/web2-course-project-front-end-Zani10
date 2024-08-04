export default function showAboutPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
    <div class="footer-page-container about-page-container">
        <h2>About Us</h2>
        <div class="about-section">
            <h3>Our Mission</h3>
            <p>Our mission is to provide the best job search experience for job seekers and employers alike...</p>
        </div>
        <div class="about-section">
            <h3>Our Team</h3>
            <p>We are a team of dedicated professionals committed to helping you find your dream job...</p>
    </div>
    </div>

    `;
  }
  