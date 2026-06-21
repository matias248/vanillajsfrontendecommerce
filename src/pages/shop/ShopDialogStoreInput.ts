import { locationIcon } from "../../images/locationIcon";
import { StoreDTO } from "../../models/Store";

type ShopDialogStoreInputProps = {
    store: StoreDTO, idStoreSelected: number | undefined, onClick: (id: number) => void;
}

export class ShopDialogStoreInput {
    props: ShopDialogStoreInputProps
    private root: HTMLElement;

    constructor(props: ShopDialogStoreInputProps) {
        this.props = props;
        this.root = document.createElement('div');
        this.root.id = "storeElementDialog" + props.store.id;
        this.root.className = "h-36 w-full md:min-w-56 bg-white  border-2 rounded-lg shadow-xs dark:bg-gray-800  p-1 " + (props.idStoreSelected === props.store.id ? "border-red-200 dark:border-gray-200" : "border-gray-200 dark:border-gray-700");
    }

    mounting(father: HTMLElement) {
        let inner = document.createElement("div");
        inner.id = "textStoreElementDialog" + this.props.store.id;
        inner.className = "max-w-full mx-1 text-center";

        this.root.addEventListener('click',()=>{
            this.props.onClick(this.props.store.id);
        })

        let name = document.createElement("p");
        name.id = "1textStoreElementDialog" + this.props.store.id;
        name.className = "mb-2 h-7 w-full text-xl font-bold text-gray-900 dark:text-white truncate leading-7";
        name.textContent = this.props.store.name;
        inner.appendChild(name);

        // Icono de ubicación
        let iconWrapper = document.createElement("div");
        iconWrapper.className = "flex justify-center";
        inner.appendChild(iconWrapper);

        let iconDiv = document.createElement("div");
        iconDiv.className = "size-7 dark:fill-slate-300";
        iconWrapper.appendChild(iconDiv);
        iconDiv.innerHTML = locationIcon;

        // Dirección: estado
        let state = document.createElement("p");
        state.id = "2textStoreElementDialog" + this.props.store.id;
        state.className = "h-5 w-full text-sm text-gray-900 dark:text-white truncate leading-5";
        state.textContent = this.props.store.address.state;
        inner.appendChild(state);

        // Dirección: zip + ciudad
        let zipCity = document.createElement("p");
        zipCity.id = "3textStoreElementDialog" + this.props.store.id;
        zipCity.className = "h-5 w-full text-sm text-gray-900 dark:text-white truncate leading-5";
        zipCity.textContent = this.props.store.address.zipCode + " " + this.props.store.address.city;
        inner.appendChild(zipCity);

        // Dirección: calle + número
        let street = document.createElement("p");
        street.id = "4textStoreElementDialog" + this.props.store.id;
        street.className = "h-5 w-full text-sm text-gray-900 dark:text-white truncate leading-5";
        street.textContent = this.props.store.address.streetNumber + " " + this.props.store.address.streetName;
        inner.appendChild(street);

        this.root.appendChild(inner);


        father.appendChild(this.root);
    }

    public getRoot() {
        return this.root;
    }


}
