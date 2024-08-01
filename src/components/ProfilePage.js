import { getUserProfile, navigateTo } from '../utils';

export default async function showProfilePage() {
  console.log('Showing profile page');
  const app = document.getElementById('app');
  if (!app) return;

  try {
    const userProfile = await getUserProfile();
    if (!userProfile) {
      navigateTo('login'); // Redirect to login page if userProfile is null
      return;
    }

    app.innerHTML = `
      <div class="profile-container">
        <h2>Profile</h2>
        <div class="profile-info">
          <p><strong>Name:</strong> ${userProfile.name}</p>
          <p><strong>Email:</strong> ${userProfile.email}</p>
          <p><strong>Member since:</strong> ${new Date(userProfile.createdAt).toLocaleDateString()}</p>
          <button class="btn logout-button">Logout</button>
        </div>
      </div>
    `;

    document.querySelector('.logout-button').addEventListener('click', () => {
      localStorage.removeItem('token');
      navigateTo('login');
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    app.innerHTML = '<p>Error fetching profile. Please try again later.</p>';
  }
}
