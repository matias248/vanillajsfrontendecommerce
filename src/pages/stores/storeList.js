import { getStores } from "../../services/storeService";
import { StoreImageGallery } from "../stores/storeImageGallery"
import { FixedButton } from "../../components/inputsShared";
import { Spinner } from "../../images/spinner.ts";

export function StoreList({ onNavigate, changeNavigationValue }) {

    const container = document.createElement("div");
    container.className = "mx-auto max-w-[1600px] w-[90%] py-4";

    const titleEl = document.createElement("div");
    titleEl.textContent = "List of stores";
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


    getStores().then((stores) => {
        //pathData
        spinnerContainer.remove();
        changeNavigationValue({ inProducts: false, inStores: true, storeName: undefined, productName: undefined, storeId: undefined, productId: undefined });
        if (!stores || stores.length === 0) {
            const emptyEl = document.createElement("p");
            emptyEl.textContent = "No stores available";
            emptyEl.className = "text-gray-400 text-center";
            container.appendChild(emptyEl);
            return;
        }

        stores.forEach((store) => {

            const storeEl = StoreImageGallery({
                store,
                onClick: () => onNavigate(`/stores/${store.id}`),
                onClickToEdit: () => onNavigate(`/stores/${store.id}/edit`),
                onClickToProductsListButton: () => onNavigate(`/stores/${store.id}/products`),
            });
            grid.appendChild(storeEl);
        });
    }).catch((err) => {
        spinnerContainer.remove();
        const errorEl = document.createElement("p");
        errorEl.textContent = "Error loading stores";
        errorEl.className = "text-red-500 text-center";
        container.appendChild(errorEl);
    });


    const fixedButton = FixedButton({
        functionToDo: () => onNavigate('/stores/new'),
        title: "Create a store",
    });
    container.appendChild(fixedButton);
    return container;
}