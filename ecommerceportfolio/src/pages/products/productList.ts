import { getStores } from "../../services/storeService";
import { StoreImageGallery } from "../stores/storeImageGallery"
import { FixedButton } from "../../components/inputsShared";
import { Spinner } from "../../images/spinner";
import { getProductsWithstore } from "../../services/productService";
import { ProductImageGallery } from "./productImageGallery";
import { PathData } from "../../utils/constants";
import { DisplayNotFound } from "../../components/DisplayNotFound";

export function ProductList(
    { onNavigate, storeId, changeNavigationValue }: { onNavigate: (route: string) => void; storeId: string, changeNavigationValue: (pathData: PathData) => void }) {

    const container = document.createElement("div");
    container.className = "mx-auto max-w-[1600px] w-[90%] py-4";

    const titleEl = document.createElement("div");
    titleEl.textContent = "List of products";
    titleEl.className = "text-4xl text-center mb-8 dark:text-white";
    container.appendChild(titleEl);

    // Spinner de carga
    const spinnerContainer = document.createElement("div");
    spinnerContainer.className = "flex justify-center";
    spinnerContainer.innerHTML = Spinner;
    container.appendChild(spinnerContainer);

    const grid = document.createElement("div");
    grid.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-y-4 gap-y-6 pb-4 md:justify-items-center";
    container.appendChild(grid);

    getProductsWithstore(+(storeId ?? 0)).then((data) => {
        //pathData
        spinnerContainer.remove();
        let products = data.products;
        let store = data.store;
        if (!products || products.length === 0) {
            const emptyEl = document.createElement("p");
            emptyEl.textContent = "No products available";
            emptyEl.className = "text-gray-400 text-center";
            container.appendChild(emptyEl);
            return;
        }
        changeNavigationValue({ inProducts: true, inStores: true, storeName: data.store.name, productName: undefined, storeId: data.store.id, productId: undefined })

        products.forEach((product) => {

            const storeEl = ProductImageGallery({
                product,
                onClick: () => {
                    onNavigate(`/stores/${store.id}/products/${product.id}`)
                },
                onClickToEdit: () => onNavigate(`/stores/${store.id}/products/${product.id}/edit`),
            });
            grid.appendChild(storeEl);
        });
    }).catch((err) => {
        spinnerContainer.remove();
        const errorEl = document.createElement("p");
        errorEl.textContent = "Error loading stores";
        errorEl.className = "text-red-500 text-center";
        container.appendChild(DisplayNotFound());
    });


    const fixedButton = FixedButton({
        functionToDo: () => onNavigate(`/stores/${storeId}/products/new`),
        title: "Create a product",
    });
    container.appendChild(fixedButton);
    return container;
}