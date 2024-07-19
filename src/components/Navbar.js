export default function createNavBar() {
    const navBar = document.createElement('nav');
    navBar.innerHTML = `
      <ul>
        <li><a href="/" data-page="home">Home</a></li>
        <li><a href="/browse-jobs" data-page="browse-jobs">Browse Jobs</a></li>
        <li><a href="/saved-jobs" data-page="saved-jobs">Saved Jobs</a></li>
        <li><a href="/profile" data-page="profile">Profile</a></li>
        <li><a href="/login" data-page="login">Login/Signup</a></li>
        <li><a href="/logout" data-page="logout">Logout</a></li>
      </ul>
    `;
    navBar.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') {
        event.preventDefault();
        navigateTo(event.target.getAttribute('data-page'));
      }
    });
    return navBar;
  }
  