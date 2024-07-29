import { navigateTo, isAuthenticated } from '../utils';

export default function createNavBar(isHomePage) {
  const navBar = document.createElement('nav');
  navBar.className = isHomePage ? 'home-nav' : 'simple-nav';
  const authLinks = isAuthenticated() ? `
    <li><a href="/profile" data-page="profile">Profile</a></li>
    <li><a href="#" id="logout-link">Logout</a></li>
  ` : `
    <li><a href="/login" data-page="login">Login</a></li>
    <li><a href="/register" data-page="register">Register</a></li>
  `;
  
  navBar.innerHTML = `
    <div class="nav-logo">CareerBox</div>
    <ul class="nav-links">
      <li><a href="/" data-page="home">Home</a></li>
      <li><a href="/browse-jobs" data-page="browse-jobs">Browse Jobs</a></li>
      <li><a href="/saved-jobs" data-page="saved-jobs">Saved Jobs</a></li>
      ${authLinks}
    </ul>
  `;

  navBar.addEventListener('click', (event) => {
    if (event.target.tagName === 'A' || event.target.closest('a')) {
      event.preventDefault();
      const page = event.target.getAttribute('data-page') || event.target.closest('a').getAttribute('data-page');
      navigateTo(page);
    }
  });

  if (isAuthenticated()) {
    const logoutLink = navBar.querySelector('#logout-link');
    logoutLink.addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.removeItem('token');
      navigateTo('home');
    });
  }

  return navBar;
}
