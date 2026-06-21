import { crossIcon } from "../../images/crossIcon";
import { CartItemDTO } from "../../models/CartItem";
import { getTotalPriceCart } from "../../utils/sharedComponents/utilsFunctions";
import { ShopCartInputList } from "./ShopCartInputList";
import { CartShopObserverState } from "./shopTemplate";

interface ShopCartProps {
    getCart: () => CartItemDTO[];
    openOrderModal: () => void;
    subscribeHandlerCartShopObserver: (functionToDo: (state: CartShopObserverState) => void) => () => void;
    crossFunction: () => void;
    changeQuantityInCartShop: (shopItem: CartItemDTO, quantity: number) => void;
}

export const ShopCart = (props: ShopCartProps) => {

    let localCart: CartItemDTO[] = [];

    let totalPriceCartValue: string = getTotalPriceCart(localCart);

    const root = document.createElement('div');
    root.className = "fixed h-dvh bg-gray-300 dark:bg-gray-500 top-0 right-0 max-[460px]:w-[60%] w-[40%] md:w-[30%] z-10 rounded-l-lg flex flex-col gap-1 px-2 transition-transform duration-500 "

    const crossIconContainer = document.createElement('div');
    crossIconContainer.className = "size-10 relative -left-1"
    crossIconContainer.onclick = () => {
        props.crossFunction();
        root.classList.remove("translate-x-0");
        root.classList.add("translate-x-full");
    }
    crossIconContainer.innerHTML = crossIcon
    crossIconContainer.id = "crossShopCart"


    const cartShopText = document.createElement('div');
    cartShopText.className = "dark:text-white font-bold self-center  text-xl";
    cartShopText.textContent = 'Cart shop';

    const cartInputList = document.createElement('div');
    cartInputList.className = "flex-1 overflow-auto mb-2"

    // cartList
    const totalPriceCart = document.createElement('div');
    totalPriceCart.className = "dark:text-white text-xl overflow-x-auto whitespace-nowrap mb-2"
    totalPriceCart.textContent = `Total: ${totalPriceCartValue} €`

    const shopButtonConfirm = document.createElement('button');
    shopButtonConfirm.className = 'mb-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg text-lg w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:text-white ';
    shopButtonConfirm.name = 'confirmDialogShopButton';
    shopButtonConfirm.textContent = 'Submit Order';

    shopButtonConfirm.onclick = () => { if (localCart.length > 0) props.openOrderModal() }


    root.appendChild(crossIconContainer);
    root.appendChild(cartShopText);

    const shopCartInputList = ShopCartInputList({ changeQuantityInCartShop: props.changeQuantityInCartShop, subscribeHandlerCartShopObserver: props.subscribeHandlerCartShopObserver })

    root.appendChild(shopCartInputList);
    //CartInputList
    root.appendChild(totalPriceCart);

    //
    root.appendChild(shopButtonConfirm);

    const changeCartData = (newState: CartShopObserverState) => {
        localCart = newState.cartShopList;
        totalPriceCartValue = getTotalPriceCart(localCart);
        totalPriceCart.textContent = `Total: ${totalPriceCartValue} €`
        //change new list
    }
    props.subscribeHandlerCartShopObserver(changeCartData)

    const mounting = (father: HTMLElement) => {
        root.classList.add("translate-x-full");
        father.appendChild(root);

        setTimeout(() => {
            root.classList.add("translate-x-0");
            root.classList.remove("translate-x-full");
        }, 0);
    }

    const removeCartFromVue = () => {
        root.classList.remove("translate-x-0");
        root.classList.add("translate-x-full");

        setTimeout(() => {
            root.remove();
        }, 500);
    }






    return { root, mounting, removeCartFromVue };


}