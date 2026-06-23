import { NavigationPath } from "./src/components/navigationPath";

export class RouterHash {
    constructor(paths) {
        this.paths = paths;
        this.initRouter();
        window.addEventListener("hashchange", () => {
            this.load(this.getCurrentRoute(), false);
        });
    }

    initRouter() {
        this.load(this.getCurrentRoute());
    }

    getCurrentRoute() {
        let hash = (window.location.hash === " " ? "/#/" : window.location.hash);

        let pathname = hash.slice(1);

        pathname = pathname === "" ? "/" : pathname;

        let URL = pathname === "/"
            ? "/" 
            :  pathname.replace(/\/$/, "");

        return URL;
    }

    load(page = "/", pushState = true) {
        const { paths } = this;
        const $CONTAINER = document.querySelector("#content");
        for (const key in paths) {
            const route = paths[key];
            const paramNames = [];
            const regexPath = route.path.replace(/:([^/]+)/g, (_, param) => {
                paramNames.push(param);
                return "([^/]+)";
            });
            const regex = new RegExp("^" + regexPath + "$");


            const match = page.match(regex);

            if (!match) continue;

            const params = {};
            paramNames.forEach((name, i) => {
                params[name] = match[i + 1];
            });
            $CONTAINER.innerHTML = "";

            let initialPathData = {
                storeName: undefined,
                productName: undefined,
                storeId: undefined,
                productId: undefined,
                inStores: true,
                inProducts: true
            };

            const navigationPath = new NavigationPath({
                onNavigate: (route) => {
                    this.load(route, true);
                },
                pathData: initialPathData,
            })


            const result = route.template({
                ...params,
                onNavigate: (route) => {
                    this.load(route, true);
                },
                changeNavigationValue: ({ inProducts, inStores, storeName, productName, storeId, productId }) => {
                    navigationPath.updatePathData({ inProducts, inStores, storeName, productName, storeId, productId });
                }

            })

            if (typeof result === "string") {
                $CONTAINER.innerHTML = result;
            } else if (result instanceof HTMLElement) {
                $CONTAINER.appendChild(navigationPath.getElement());

                $CONTAINER.appendChild(result);

            }

            if (pushState) {
                window.location.hash = page;  
            }
            return;

        }
    }
}