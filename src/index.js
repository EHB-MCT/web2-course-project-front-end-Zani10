import './styles.css';
import createNavBar from './components/Navbar';
import { navigateTo } from './utils';
import showHomePage from './components/HomePage';
import showBrowseJobsPage from './components/BrowseJobsPage';
// import other components similarly...

const app = document.getElementById('app');

function initialize() {
  window.addEventListener('popstate', () => {
    const path = window.location.pathname.replace('/', '');
    navigateTo(path);
  });

  if (window.location.pathname === '/') {
    navigateTo('home');
  } else {
    navigateTo(window.location.pathname.replace('/', ''));
  }
}

window.addEventListener('popstate', () => {
  const page = window.location.pathname === '/' ? 'home' : window.location.pathname.replace('/', '');
  navigateTo(page);
});

initialize();
