import './styles.css';
import createNavBar from './components/Navbar';
import { navigateTo } from './utils';
import showHomePage from './components/HomePage';
import showBrowseJobsPage from './components/BrowseJobsPage';
// import other components similarly...

const app = document.getElementById('app');

function initialize() {
  app.innerHTML = '';
  app.appendChild(createNavBar());
  const initialPage = window.location.pathname === '/' ? 'home' : window.location.pathname.replace('/', '');
  navigateTo(initialPage);
}

window.addEventListener('popstate', () => {
  const page = window.location.pathname === '/' ? 'home' : window.location.pathname.replace('/', '');
  navigateTo(page);
});

initialize();
