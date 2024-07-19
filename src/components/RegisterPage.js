export default function showRegisterPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <h1>Register</h1>
      <form id="register-form">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <button type="submit">Register</button>
      </form>
    `;
  
    document.getElementById('register-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      try {
        const response = await fetch('http://localhost:4000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (!response.ok) {
          throw new Error('Registration failed');
        }
  
        navigateTo('login');
      } catch (error) {
        console.error('Error registering:', error);
      }
    });
  }
  