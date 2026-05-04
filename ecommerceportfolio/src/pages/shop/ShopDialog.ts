import { StoreDTO } from "../../models/Store"
import { getStoresFilteredByNameCityCodeZip } from "../../services/storeService";
import { clickOutside } from "../../utils/sharedComponents/utilsFunctions"
import { SearchBar } from "./searchBar"
import { ConfirmDialogShopButton } from "./ShopDialogButtonConfirm";
import { ShopDialogStoreInput } from "./ShopDialogStoreInput";
import { ShopObserverState } from "./shopTemplate";

interface ShopSelectorDialogProps {
    getStateShopObserver: () => ShopObserverState,
    father: HTMLElement;
    setSelectedStore: (selectedStore: StoreDTO | undefined) => void;
}

export class ShopSelectorDialog {
    private root: HTMLElement
    private props: ShopSelectorDialogProps

    private shopSelected?: StoreDTO

    private storesList: StoreDTO[] = [];

    private storeListContainer: HTMLElement

    private removeClickOutside!: () => void;

    private storeTextFilter: string = "";

    private storeTextFilterTemporal: string = "";


    constructor(props: ShopSelectorDialogProps) {
        this.props = props
        this.root = document.createElement("div")
        this.root.className = "fixed h-[100vh] bg-gray-300 dark:bg-gray-500 top-0 left-0 max-[460px]:w-[50%] w-[40%] md:w-[30%] z-10 rounded-r-lg flex flex-col gap-1 px-1 transition-transform duration-500 "
        this.storeListContainer = document.createElement("div")
        this.storeListContainer.className = "flex-1 overflow-auto mb-2"
        // Crear root
        // Render
        this.render()

        // animación de entrada

    }

    private render() {
        this.root.innerHTML = ""

        // título
        const title = document.createElement("div")
        title.className = "dark:text-white font-bold self-center"
        title.textContent = "Select your store"

        // descripción
        const desc = document.createElement("div")
        desc.className = "dark:text-slate-100 text-sm mb-1"
        desc.textContent = "Enter your zip code or city to see the nearest stores. This will allow you to filter products by store. "

        let searchBar = new SearchBar({
            textFilter: this.storeTextFilterTemporal,
            functionOnSubmit: () => {
                this.storeTextFilter = this.storeTextFilterTemporal; console.log(this.storeTextFilterTemporal);
                this.updateStores(this.storeTextFilter)
            },
            id: "filtershops",
            onChange: (text: string) => {
                this.storeTextFilterTemporal = text;
            }
        })

        let d = document.createElement('div');
        d.appendChild(searchBar.root);

        // lista de stores
        this.shopSelected = this.props.getStateShopObserver().store;
        this.storeListContainer = document.createElement("div")
        this.storeListContainer.className = "flex flex-col gap-1  overflow-auto flex-1 mb-2"
        this.renderStoreList()


        // ensamblar
        this.root.appendChild(title)
        this.root.appendChild(desc)
        this.root.appendChild(d)

        this.root.appendChild(this.storeListContainer)
        let confirmDialogShopButton = new ConfirmDialogShopButton({ functionToDo: () => { this.removeOfDomAndChangeShop() }, styleOverride: "", title: "Select store" });

        const buttonWrapper = document.createElement("div")
        buttonWrapper.className = "mb-2"
        this.root.appendChild(buttonWrapper)

        confirmDialogShopButton.mounted(buttonWrapper);

    }

    private renderStoreList() {
        this.storeListContainer.innerHTML = ""


        const stores = this.storesList;

        stores.forEach((store: StoreDTO) => {
            const storeItem = document.createElement("div")

            let props = {
                store: store, idStoreSelected: this.shopSelected?.id, onClick: () => {
                    this.shopSelected = store
                    this.renderStoreList()
                }
            }
            let storeItemContent = new ShopDialogStoreInput(props);
            storeItemContent.mounting(storeItem);

            this.storeListContainer.appendChild(storeItem)
        })
    }

    updateStores(text: string) {
        //this.props.storesList = storesList
        getStoresFilteredByNameCityCodeZip(text).then((
            stores: StoreDTO[]
        ) => {
            this.storesList = stores;
            this.renderStoreList();
        }).catch(() => {

        })
    }

    // close without changing shopStore
    close() {
        this.removeClickOutside();
        this.root.classList.remove("translate-x-0");
        this.root.classList.add("-translate-x-full");
        setTimeout(() => {
            this.root.remove();
        }, 500);
    }

    removeOfDomAndChangeShop() {
        this.removeClickOutside();
        this.root.classList.remove("translate-x-0");
        this.root.classList.add("-translate-x-full");
        setTimeout(() => {
            this.root.remove();
        }, 500);
        this.props.setSelectedStore(this.shopSelected)
    }

    getRoot() {
        return this.root;
    }

    mounting() {
        this.shopSelected = this.props.getStateShopObserver().store;

        this.root.classList.add("-translate-x-full");
        this.props.father.appendChild(this.root);

        this.root.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        this.removeClickOutside = clickOutside(this.root, () => {
            this.close();
        });

        this.storesList = [];
        this.updateStores(this.storeTextFilter);

        setTimeout(() => {
            this.root.classList.remove("-translate-x-full");
            this.root.classList.add("translate-x-0");
        }, 0);
    }

}