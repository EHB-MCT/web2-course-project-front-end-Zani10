export default function showContactPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
    <div class="footer-page-container contact-page-container">
        <h2>Contact Us</h2>
        <form>
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>

            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>

            <label for="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>

            <button type="submit">Submit</button>
        </form>
    </div>

    `;
  }
  