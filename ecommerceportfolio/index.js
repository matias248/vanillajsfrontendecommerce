import { Router } from './router.js';
import { PATHS } from './routes.js';
import { Header } from "./src/components/header.js";
import { NavigationPath } from './src/components/navigationPath.js';

function getCurrentRoute() {
  const { pathname } = window.location;
  return pathname === "/" ? "home" : pathname.replace("/", "");
}
const ROUTER = new Router(PATHS);


let headerInstance = null;

function renderHeader() {
  if (headerInstance) {
    headerInstance.remove();
  }
  headerInstance = Header({
    currentRoute: getCurrentRoute(),
    onNavigate: (route) => {
      ROUTER.load(route);
      renderHeader();

    },
  });

  document.body.prepend(headerInstance);
}




function initApp() {
  renderHeader();

  window.addEventListener("popstate", () => {
    ROUTER.load(getCurrentRoute(), false);
    renderHeader();
  });
  ROUTER.load(getCurrentRoute());
}




initApp();
