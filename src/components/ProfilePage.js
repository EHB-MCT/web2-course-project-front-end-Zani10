import { getUserProfile, navigateTo, updateUserProfile, uploadUserCV } from '../utils';
import { showNotification } from './notifications';

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

    const cvDisplay = userProfile.cvUrl ? `
      <div class="profile-cv-container">
        <a href="${userProfile.cvUrl}" download class="profile-cv-link">Download CV</a>
      </div>
    ` : `
      <div class="profile-cv-upload">
        <input type="file" id="cvUpload" name="cv">
        <button class="profile-btn profile-upload-cv-button">Upload CV</button>
      </div>
    `;

    app.innerHTML = `
      <div class="profile-container">
        <h2>Profile</h2>
        <div id="notification-container"></div>
        <div class="profile-form">
          <div class="profile-form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" value="${userProfile.name}">
          </div>
          <div class="profile-form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" value="${userProfile.email}">
          </div>
          <div class="profile-form-group">
            <label for="phone">Phone:</label>
            <input type="text" id="phone" value="${userProfile.phone || ''}">
          </div>
          <div class="profile-form-group">
            <label for="address">Address:</label>
            <input type="text" id="address" value="${userProfile.address || ''}">
          </div>
          <div class="profile-form-group">
            <label for="cv">CV:</label>
            ${cvDisplay}
          </div>
          <p><strong>Member since:</strong> ${new Date(userProfile.createdAt).toLocaleDateString()}</p>
          <div class="profile-form-actions">
            <button class="profile-btn profile-save-button">Save</button>
            <button class="profile-btn profile-logout-button">Logout</button>
          </div>
        </div>
      </div>
    `;

    document.querySelector('.profile-logout-button').addEventListener('click', () => {
      localStorage.removeItem('token');
      navigateTo('login');
    });

    document.querySelector('.profile-save-button').addEventListener('click', async () => {
      const updatedProfile = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
      };
      await updateUserProfile(updatedProfile);
      showNotification('Profile updated successfully!', 'success');
    });

    const uploadCvButton = document.querySelector('.profile-upload-cv-button');
    if (uploadCvButton) {
      uploadCvButton.addEventListener('click', async () => {
        const cvFile = document.getElementById('cvUpload').files[0];
        if (cvFile) {
          await uploadUserCV(cvFile);
          showNotification('CV uploaded successfully!', 'success');
          showProfilePage(); // Refresh the profile page to show the uploaded CV
        } else {
          showNotification('Please select a file to upload.', 'error');
        }
      });
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    app.innerHTML = '<p>Error fetching profile. Please try again later.</p>';
  }
}
