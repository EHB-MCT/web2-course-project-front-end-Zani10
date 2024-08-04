export default function showTermsPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="footer-page-container terms-page-container">
        <h2>Terms and Conditions</h2>
        <p>Welcome to CareerBox!</p>
        <p>These terms and conditions outline the rules and regulations for the use of CareerBox's Website.</p>
        <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use CareerBox if you do not agree to take all of the terms and conditions stated on this page.</p>
        <h3>Cookies</h3>
        <p>We employ the use of cookies. By accessing CareerBox, you agreed to use cookies in agreement with the CareerBox's Privacy Policy.</p>
        <h3>License</h3>
        <p>Unless otherwise stated, CareerBox and/or its licensors own the intellectual property rights for all material on CareerBox. All intellectual property rights are reserved. You may access this from CareerBox for your own personal use subjected to restrictions set in these terms and conditions.</p>
      </div>
    `;
  }
  