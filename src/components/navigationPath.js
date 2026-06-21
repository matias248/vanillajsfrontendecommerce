export class NavigationPath {

    constructor({ onNavigate, pathData }) {
        this.onNavigate = onNavigate;
        this.pathData = { ...pathData };
        this.root = document.createElement("div");
        this.root.className =
            "pl-2 text-xs sm:text-base text-gray-900 dark:text-white flex w-full gap-1 max-w-[100vh]";

        this.render();
    }

    updatePathData(newData) {
        this.pathData = { ...this.pathData, ...newData };
        this.render();
    }

    addSeparator() {
        const separator = document.createElement("div");
        separator.textContent = ">";
        this.root.appendChild(separator);
    }

    render() {
        this.root.innerHTML = "";
        const {
            storeName,
            productName,
            storeId,
            productId,
            inStores,
            inProducts
        } = this.pathData;

        if (inStores && storeName) {
            const stores = document.createElement("div");
            stores.textContent = "Stores";
            stores.className = "hover:opacity-75 cursor-pointer";
            stores.id = "NavStoresTitle"

            stores.addEventListener("click", () => {
                this.onNavigate("/stores");
            });

            this.root.appendChild(stores);
        }

        if (storeName) {
            if (this.root.childNodes.length > 0) this.addSeparator();

            const store = document.createElement("div");
            store.textContent = storeName;
            store.className = "hover:opacity-75 cursor-pointer";
            store.id = "NavStoreName"

            store.addEventListener("click", () => {
                if (storeId !== undefined) {
                    this.onNavigate(`/stores/${storeId}`);
                }
            });

            this.root.appendChild(store);
        }

        if (inProducts && storeId !== undefined) {
            if (this.root.childNodes.length > 0) this.addSeparator();

            const products = document.createElement("div");
            products.textContent = "Products";
            products.className = "hover:opacity-75 cursor-pointer";
            products.id = "NavProductsTitle"

            products.addEventListener("click", () => {
                this.onNavigate(`/stores/${storeId}/products`);
            });

            this.root.appendChild(products);
        }

        if (productName) {
            if (this.root.childNodes.length > 0) this.addSeparator();

            const product = document.createElement("div");
            product.textContent = productName;
            product.className = "hover:opacity-75 cursor-pointer";
            product.id = "NavProductName"

            product.addEventListener("click", () => {
                if (storeId !== undefined && productId !== undefined) {
                    this.onNavigate(
                        `/stores/${storeId}/products/${productId}`
                    );
                }
            });

            this.root.appendChild(product);
        }
    }

    getElement() {
        return this.root;
    }
}
