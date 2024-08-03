export default function showTermsPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="terms-page">
        <h1>Terms and Conditions</h1>
        <p>Welcome to CareerBox!</p>
        <p>These terms and conditions outline the rules and regulations for the use of CareerBox's Website.</p>
        <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use CareerBox if you do not agree to take all of the terms and conditions stated on this page.</p>
        <h2>Cookies</h2>
        <p>We employ the use of cookies. By accessing CareerBox, you agreed to use cookies in agreement with the CareerBox's Privacy Policy.</p>
        <h2>License</h2>
        <p>Unless otherwise stated, CareerBox and/or its licensors own the intellectual property rights for all material on CareerBox. All intellectual property rights are reserved. You may access this from CareerBox for your own personal use subjected to restrictions set in these terms and conditions.</p>
      </div>
    `;
  }
  