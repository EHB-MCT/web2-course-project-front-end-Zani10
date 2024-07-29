import { getUserProfile, navigateTo } from '../utils';

export default async function showProfilePage() {
  console.log('Showing profile page');
  const app = document.getElementById('app');
  if (!app) return;

  const isAuthenticated = !!localStorage.getItem('token');
  if (!isAuthenticated) {
    console.log('User is not authenticated. Redirecting to login page.');
    navigateTo('login');
    return;
  }

  try {
    const userProfile = await getUserProfile();
    app.innerHTML = `
      <div class="profile-container">
        <h2>Profile</h2>
        <p><strong>Name:</strong> ${userProfile.name}</p>
        <p><strong>Email:</strong> ${userProfile.email}</p>
        <button id="logout-button">Logout</button>
      </div>
    `;

    document.getElementById('logout-button').addEventListener('click', () => {
      localStorage.removeItem('token');
      navigateTo('login');
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    app.innerHTML = '<p>Error fetching profile. Please try again later.</p>';
  }
}
