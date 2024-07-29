import './styles.css';
import createNavBar from './components/Navbar';
import { navigateTo, isAuthenticated } from './utils';
import showHomePage from './components/HomePage';
import showBrowseJobsPage from './components/BrowseJobsPage';
import showJobDetailsPage from './components/JobDetailsPage';
import showSavedJobsPage from './components/SavedJobsPage';
import showProfilePage from './components/ProfilePage';
import showLoginPage from './components/LoginPage';
import showRegisterPage from './components/RegisterPage';

const app = document.getElementById('app');

function renderPage() {
  const path = window.location.pathname.replace('/', '');
  const mainNav = document.getElementById('main-nav');

  if (path === '' || path === 'home') {
    mainNav.innerHTML = '';
    mainNav.appendChild(createNavBar(true));
    showHomePage();
  } else {
    mainNav.innerHTML = '';
    mainNav.appendChild(createNavBar(false));
    if (path === 'browse-jobs') {
      const params = new URLSearchParams(window.location.search);
      showBrowseJobsPage(Object.fromEntries(params.entries()));
    } else if (path === 'job-details') {
      const params = new URLSearchParams(window.location.search);
      showJobDetailsPage(Object.fromEntries(params.entries()));
    } else if (path === 'saved-jobs') {
      showSavedJobsPage();
    } else if (path === 'profile') {
      if (isAuthenticated()) {
        showProfilePage();
      } else {
        navigateTo('login');
      }
    } else if (path === 'login') {
      showLoginPage();
    } else if (path === 'register') {
      showRegisterPage();
    } else {
      showHomePage();
    }
  }
}

function initialize() {
  window.addEventListener('popstate', renderPage);

  const path = window.location.pathname.replace('/', '');
  if (path === '') {
    navigateTo('home');
  } else {
    const params = new URLSearchParams(window.location.search);
    navigateTo(path, Object.fromEntries(params.entries()));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('search-button').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input').value;
    const locationInput = document.getElementById('location-input').value;
    navigateTo('browse-jobs', { what: searchInput, where: locationInput });
  });

  renderPage();
});

initialize();
