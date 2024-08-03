export default function showContactPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="contact-page">
        <h1>Contact Us</h1>
        <p>If you have any questions, feedback, or need assistance, feel free to reach out to us. We're here to help!</p>
        <form class="contact-form">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required>
          
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required>
          
          <label for="message">Message:</label>
          <textarea id="message" name="message" required></textarea>
          
          <button type="submit">Submit</button>
        </form>
      </div>
    `;
  }
  