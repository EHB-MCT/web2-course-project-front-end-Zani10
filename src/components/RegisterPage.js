import { registerUser, navigateTo } from '../utils';

export default function showRegisterPage() {
  console.log('Showing register page');
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="auth-container">
      <h2>Register</h2>
      <form id="register-form">
        <div>
          <label for="name">Name</label>
          <input type="text" id="name" name="name" required>
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required>
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required>
        </div>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="#" id="login-link">Login here</a></p>
    </div>
  `;

  document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      await registerUser(name, email, password);
      console.log('User registered and token stored');
      navigateTo('profile');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  });

  document.getElementById('login-link').addEventListener('click', (event) => {
    event.preventDefault();
    navigateTo('login');
  });
}
