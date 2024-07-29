import { loginUser, navigateTo } from '../utils';

export default function showLoginPage() {
  console.log('Showing login page');
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="auth-container">
      <h2>Login</h2>
      <form id="login-form">
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required>
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="#" id="register-link">Register here</a></p>
    </div>
  `;

  document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      await loginUser(email, password);
      console.log('User logged in and token stored');
      navigateTo('profile');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  });

  document.getElementById('register-link').addEventListener('click', (event) => {
    event.preventDefault();
    navigateTo('register');
  });
}
