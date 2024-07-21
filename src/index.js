import './styles.css';
import createNavBar from './components/Navbar';
import { navigateTo } from './utils';
import showHomePage from './components/HomePage';
import showBrowseJobsPage from './components/BrowseJobsPage';
import showJobDetailsPage from './components/JobDetailsPage';
// import other components similarly...

const app = document.getElementById('app');

function initialize() {
  window.addEventListener('popstate', () => {
    const path = window.location.pathname.replace('/', '');
    navigateTo(path);
  });

  const path = window.location.pathname.replace('/', '');
  if (path === '') {
    navigateTo('home');
  } else {
    const params = new URLSearchParams(window.location.search);
    navigateTo(path, Object.fromEntries(params.entries()));
  }
}

window.addEventListener('popstate', () => {
  const page = window.location.pathname === '/' ? 'home' : window.location.pathname.replace('/', '');
  const params = new URLSearchParams(window.location.search);
  navigateTo(page, Object.fromEntries(params.entries()));
});

initialize();
