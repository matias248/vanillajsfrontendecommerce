import { Router } from './router.js';
import { PATHS } from './routes.js';
import { Header } from "./src/components/header.js";
import { NavigationPath } from './src/components/navigationPath.js';
import { RouterHash } from './routerHash.js';


function getCurrentRoute() {
  const { pathname } = window.location;
  return pathname === "/" ? "home" : pathname.replace("/", "");
}
//const ROUTER = new Router(PATHS);
const ROUTERHASH = new RouterHash(PATHS);


let headerInstance = null;

function renderHeader() {
  if (headerInstance) {
    headerInstance.remove();
  }
  headerInstance = Header({
    currentRoute: ROUTERHASH.getCurrentRoute(),
    onNavigate: (route) => {
      ROUTERHASH.load(route);
      renderHeader();

    },
  });

  document.body.prepend(headerInstance);
}




function initApp() {
  renderHeader();
  window.addEventListener("popstate", () => {
    ROUTERHASH.load(getCurrentRoute(), false);
    renderHeader();
  });
  ROUTERHASH.load(getCurrentRoute());
}




initApp();
