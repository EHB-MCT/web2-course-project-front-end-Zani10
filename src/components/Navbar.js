import { navigateTo } from '../utils';

export default function createNavBar(isHomePage) {
  const navBar = document.createElement('nav');
  navBar.className = isHomePage ? 'home-nav' : 'simple-nav';
  navBar.innerHTML = `
    <div class="nav-logo">CareerBox</div>
    <ul class="nav-links">
      <li><a href="/" data-page="home">Home</a></li>
      <li><a href="/browse-jobs" data-page="browse-jobs">Browse Jobs</a></li>
      <li><a href="/saved-jobs" data-page="saved-jobs">Saved Jobs</a></li>
      <li><a href="/profile" data-page="profile">Profile</a></li>
      <li>
        <div class="account-icon"><i class="fas fa-user"></i></div>
        <div class="dropdown-menu">
          <a href="/login" data-page="login">Login</a>
          <a href="/register" data-page="register">Register</a>
        </div>
      </li>
    </ul>
  `;
  navBar.addEventListener('click', (event) => {
    if (event.target.tagName === 'A' || event.target.closest('a')) {
      event.preventDefault();
      const page = event.target.getAttribute('data-page') || event.target.closest('a').getAttribute('data-page');
      navigateTo(page);
    }
  });

  const accountIcon = navBar.querySelector('.account-icon');
  const dropdownMenu = navBar.querySelector('.dropdown-menu');
  accountIcon.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show');
  });

  return navBar;
}
