import { crossIcon } from "../../images/crossIcon";
import { iconImagePlaceholder } from "../../images/iconImagePlaceholder";
import { CartItemDTO } from "../../models/CartItem";
import { MinusPlusInput } from "./MinusPlusInput";

interface ProductImageGalleryProps {
    cartItem: CartItemDTO;
    changeQuantityInCartShop: (shopItem: CartItemDTO, quantity: number) => void;
}

export function ShopProductImageGallery(
    props: ProductImageGalleryProps
): HTMLElement {


    const container = document.createElement("div");
    container.id = "ShopCartItem" + props.cartItem.id;
    container.className = "h-55 w-full md:min-w-56 bg-white  rounded-lg shadow-xs dark:bg-gray-800  p-1";
    let valueQuantity = props.cartItem.quantity;

    function render() {
        container.innerHTML = "";

            // IMAGE
            const imageWrapper = document.createElement("div");
            imageWrapper.id = "ShopImageProductGallery" + props.cartItem.id;
            imageWrapper.className = "size-18 mt-2 mx-auto ";

            if (props.cartItem.imageUrl) {
                const img = document.createElement("img");
                img.src = props.cartItem.imageUrl;
                img.className = "h-full max-w-full rounded-lg object-cover mx-auto text-center dark:text-white";
                img.alt = "error loading image";
                imageWrapper.appendChild(img);
            } else {
                const placeholder = document.createElement("div");
                placeholder.id = "divNoImageSet" + props.cartItem.id;
                placeholder.className = "h-full max-w-full rounded-lg";
                placeholder.innerHTML = iconImagePlaceholder;
                imageWrapper.appendChild(placeholder);
            }

            // TEXT WRAPPER
            const textWrapper = document.createElement("div");
            textWrapper.id = `textShopCart${props.cartItem.id}`;
            textWrapper.className = "mt-2 max-w-full h-14 mx-1 text-center overflow-auto";

            const nameWrapper = document.createElement("div");
            nameWrapper.id = `1textShopCartItem${props.cartItem.id}`;
            nameWrapper.className = "w-full";

            const name = document.createElement("div");
            name.className = "text-xl font-bold text-gray-900 dark:text-white  leading-7 whitespace-nowrap";
            name.textContent = props.cartItem.name;

            nameWrapper.appendChild(name);

            const priceWrapper = document.createElement("div");
            priceWrapper.className = "w-full";

            const price = document.createElement("p");
            price.id = `2textShopProductGallery${props.cartItem.id}`;
            price.className = "text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap  leading-7";
            price.textContent = props.cartItem.price + props.cartItem.currency;

            priceWrapper.appendChild(price);

        
            const minusPlusInputContainer = document.createElement('div');
            minusPlusInputContainer.className = " h-16 flex justify-center items-center rounded-lg"

            const minusPlusInput = MinusPlusInput({
                id: "minusPlusProductItem" + props.cartItem.id,
                initialValue: valueQuantity,
                modifyValue: function (value: number): void {
                    valueQuantity = value;
                    props.changeQuantityInCartShop(props.cartItem, value);
                }
            })
            minusPlusInputContainer.appendChild(minusPlusInput);

            textWrapper.appendChild(nameWrapper);
            textWrapper.appendChild(priceWrapper);

            container.appendChild(imageWrapper);
            container.appendChild(textWrapper);
            container.appendChild(minusPlusInputContainer);

        
    }

    render();

    return container;
}