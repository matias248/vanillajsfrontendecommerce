import { CartItemDTO } from "../../models/CartItem";
import { ShopProductImageGallery } from "./ShopCartInputItem";
import { CartShopObserverState } from "./shopTemplate";

interface ShopCartInputListProps {
    changeQuantityInCartShop: (shopItem: CartItemDTO, quantity: number) => void;
    subscribeHandlerCartShopObserver: (functionToDo: (state: CartShopObserverState) => void) => () => void;
}

export const ShopCartInputList = (props: ShopCartInputListProps) => {
    const container = document.createElement("div");
    container.className =
        "flex flex-col gap-1 flex-1 overflow-y-auto";

    const renderEmpty = () => {
        const empty = document.createElement("div");
        empty.id = "emptyCartShop";
        empty.className = "dark:text-white text-center my-auto";
        empty.textContent = "The cart shop is empty";
        return empty;
    };


    const renderItems = (listCartItemsLocal: CartItemDTO[]) => {
        const fragment = document.createDocumentFragment();
        listCartItemsLocal?.forEach((item) => {
            const itemNode = ShopProductImageGallery({
                cartItem: item,
                changeQuantityInCartShop: props.changeQuantityInCartShop,
            });

            fragment.appendChild(itemNode);
        });

        return fragment;
    };

    props.subscribeHandlerCartShopObserver((newState) => {
        newState.cartShopList;
        container.innerHTML = "";
        if (newState.cartShopList && newState.cartShopList.length > 0) {
            container.appendChild(renderItems(newState.cartShopList));
        } else {
            container.appendChild(renderEmpty());
        }
    })


    return container;
};