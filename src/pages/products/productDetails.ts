import { DisplayNotFound } from "../../components/DisplayNotFound";
import { Spinner } from "../../images/spinner";
import { ProductDTO, ProductKeysToNotDisplayInDetails } from "../../models/Product";
import { getProductByIdWithstore } from "../../services/productService";
import { PathData } from "../../utils/constants";
import { formatString } from "../../utils/sharedComponents/utilsFunctions";

type ProductDetailPageProps = {
    storeId: string;
    productId: string;
    onNavigate: (route: string) => void;
    changeNavigationValue: (pathData: PathData) => void;
};

export function ProductDetailPage(
    { storeId, productId, onNavigate, changeNavigationValue }: ProductDetailPageProps
): HTMLDivElement {

    let product: ProductDTO | null = null;
    let isLoading = true;

    const root = document.createElement("div");
    const title = "Details of the product";

    /* ---------------- Render ---------------- */

    function render(): void {
        root.innerHTML = "";
        /* -------- Loading -------- */

        if (isLoading) {
            const loadingDiv = document.createElement("div");
            loadingDiv.className = "flex justify-center";
            loadingDiv.innerHTML = Spinner;

            root.appendChild(loadingDiv);
            return;
        }

        /* -------- Not Found -------- */

        if (!product) {
            root.appendChild(DisplayNotFound());
            return;
        }

        /* -------- Title -------- */

        const titleEl = document.createElement("div");
        titleEl.className =
            "mb-16 text-4xl text-center dark:text-white";
        titleEl.textContent = title;

        root.appendChild(titleEl);

        /* -------- Main Container -------- */

        const mainContainer = document.createElement("div");
        mainContainer.className =
            "max-w-[1000px] mx-auto w-[90%] rounded-lg";

        /* -------- Edit Button -------- */

        const editContainer = document.createElement("div");
        editContainer.className =
            "text-3xl text-center mb-1 dark:text-white flex justify-end";

        const editButton = document.createElement("button");
        editButton.id = "gotoEditButton";
        editButton.textContent = "Go to Edit";
        editButton.className =
            "max-h-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 " +
            "focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg " +
            "text-sm w-auto px-2 py-1 text-center dark:bg-blue-600 " +
            "dark:hover:bg-blue-700 dark:focus:ring-blue-800";

        editButton.addEventListener("click", () => {
            onNavigate(`/stores/${storeId}/products/${productId}/edit`);
        });

        editContainer.appendChild(editButton);
        mainContainer.appendChild(editContainer);

        /* -------- List -------- */

        const ul = document.createElement("ul");
        ul.className =
            "space-y-2 bg-slate-100 border-gray-200 " +
            "dark:bg-gray-800 dark:text-white rounded-lg";

        Object.entries(product)
            .filter(([key]) =>
                ProductKeysToNotDisplayInDetails.every(
                    (excluded) => excluded !== key
                )
            )
            .forEach(([key, value], index) => {

                const li = document.createElement("li");
                li.id = `displayProductElement${index}`;
                li.className =
                    "flex justify-between border border-gray-200 " +
                    "rounded-lg shadow-xs bg-slate-400 dark:bg-gray-500 " +
                    "dark:border-gray-700 gap-2 margin-top-2";

                const keyDiv = document.createElement("div");
                keyDiv.id = `displayProductElement${index}key`;
                keyDiv.className =
                    "bg-slate-300 dark:bg-gray-600 rounded-l-lg " +
                    "px-1 w-1/2 overflow-y-auto";
                keyDiv.textContent = formatString(key);

                const valueDiv = document.createElement("div");
                valueDiv.id = `displayProductElement${index}value`;
                valueDiv.className =
                    "bg-slate-300 dark:bg-gray-600 rounded-r-lg " +
                    "px-1 w-1/2 overflow-y-auto text-start";
                valueDiv.textContent = String(value);

                li.append(keyDiv, valueDiv);
                ul.appendChild(li);
            });

        mainContainer.appendChild(ul);
        root.appendChild(mainContainer);
    }

    /* ---------------- Init ---------------- */

    function init(changeNavigationValue: (pathData: PathData)=> void): void {
        if (!isNaN(+productId)) {
            getProductByIdWithstore(+storeId, +productId)
                .then((data) => {
                    product = data.product;
                    changeNavigationValue
                        ({ inProducts: true, inStores: true, storeName: data.store.name, productName: product.name, storeId: data.store.id, productId: product.id });

                    isLoading = false;
                    render();
                })
                .catch(() => {
                    product = null;
                    isLoading = false;
                    render();
                });
        } else {
            isLoading = false;
            render();
        }
    }

    render(); // first paint (loading)
    init(changeNavigationValue);   // async load

    return root;
}
