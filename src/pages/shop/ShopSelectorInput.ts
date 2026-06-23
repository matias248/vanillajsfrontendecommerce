import { StoreDTO } from "../../models/Store";
import { ShopSelectorDialog } from "./ShopDialog";
import { ShopObserverState } from "./shopTemplate";


export class ShopSelectorInput {

    private root: HTMLElement
    private storeName: string = "Store not selected";
    private shopSelectorDialog!: ShopSelectorDialog;
    private id: number;

    private shopSelectorObserver: (functionToDo: (state: ShopObserverState) => void) => () => void
    private unSuscribeToOnChange: () => void


    constructor(
        id: number,
        getStateShopObserver: () => ShopObserverState,
        updateStore: (st: StoreDTO | undefined) => void,
        shopSelectorObserver: (functionToDo: (state: ShopObserverState) => void) => () => void
    ) {
        this.id = id;
        this.shopSelectorObserver = shopSelectorObserver;
        this.root = document.createElement('div');
        this.root.className = "flex h-full border-2 border-gray-400 rounded-lg dark:border-slate-700";
        this.root.id = "ShopSelectorInput" + id;
        this.root.setAttribute("name", "ShopSelectorInput");

        this.render();
        this.unSuscribeToOnChange =
            this.shopSelectorObserver((newState) => {
                const storeNameContainers = document.getElementsByName('storeNameContainer');
                storeNameContainers.forEach((el) => {
                    el.textContent = newState.store
                        ? newState.store.name
                        : "Store not selected";
                });
            });

        this.shopSelectorDialog = new ShopSelectorDialog({ getStateShopObserver: getStateShopObserver, father: this.root, setSelectedStore: updateStore })

        this.root.addEventListener('click', (event) => {
            //Solo montalo si no existe
            if (!document.contains(this.shopSelectorDialog.getRoot())) {
                this.shopSelectorDialog.mounting();
            }
        })
    }

    private render() {
        this.root.innerHTML = '';
        let container = document.createElement('div');
        container.className = "w-[144px] ml-2";

        let myStoreTextContainer = document.createElement('div');
        myStoreTextContainer.className = "text-sm dark:text-white truncate";
        myStoreTextContainer.textContent = "My Store";

        let storeNameContainer = document.createElement('div');
        storeNameContainer.className = "text-xs dark:text-white truncate";
        storeNameContainer.textContent = this.storeName;
        storeNameContainer.id = "storeNameContainer" + this.id;
        storeNameContainer.setAttribute('name', "storeNameContainer");

        let arrowContainer = document.createElement('div');
        arrowContainer.className = "size-[40px] flex items-center justify-center dark:text-white"
        arrowContainer.textContent = "▼"
        container.appendChild(myStoreTextContainer);
        container.appendChild(storeNameContainer);

        this.root.appendChild(container);
        this.root.appendChild(arrowContainer);

    }


    getRoot(): HTMLElement {
        return this.root;
    }
}