import { crossIcon } from "../../images/crossIcon";
import { iconImagePlaceholder } from "../../images/iconImagePlaceholder";
import { CartItemDTO } from "../../models/CartItem";
import { MinusPlusInput } from "./MinusPlusInput";

interface ProductImageGalleryProps {
    cartItem: CartItemDTO;
    changeQuantityInCartShop: (shopItem: CartItemDTO, quantity: number) => void;
}

export interface ShopProductImageGallery {
    root: HTMLElement,
    changeValueQuantity: (newValue: number) => void;
}

export function ShopProductImageGallery(
    props: ProductImageGalleryProps
): ShopProductImageGallery {

    let showDescription = false;

    const container = document.createElement("div");
    container.id = "ShopProductElementGallery" + props.cartItem.id;
    container.className = "h-75 min-w-64 bg-white border border-gray-200 rounded-lg shadow-xs";
    let valueQuantity = props.cartItem.quantity;
    let modifyValueOnlyInVue: ((arg0: number) => void) | null = null


    function render() {
        container.innerHTML = "";

        if (!showDescription) {
            // IMAGE
            const imageWrapper = document.createElement("div");
            imageWrapper.id = "ShopImageProductGallery" + props.cartItem.id;
            imageWrapper.className = "w-56 mt-2 mx-auto h-28";

            if (props.cartItem.imageUrl) {
                const img = document.createElement("img");
                img.src = props.cartItem.imageUrl;
                img.className = "h-28 max-w-full rounded-lg object-cover mx-auto text-center dark:text-white";
                img.alt = "error loading image";
                imageWrapper.appendChild(img);
            } else {
                const placeholder = document.createElement("div");
                placeholder.id = "divNoImageSet" + props.cartItem.id;
                placeholder.className = "h-28 max-w-full rounded-lg";
                placeholder.innerHTML = iconImagePlaceholder;
                imageWrapper.appendChild(placeholder);
            }

            // TEXT WRAPPER
            const textWrapper = document.createElement("div");
            textWrapper.id = `textShopProductGallery${props.cartItem.id}`;
            textWrapper.className = "mt-2 max-w-full h-24 mx-1 text-center overflow-auto";

            const nameWrapper = document.createElement("div");
            nameWrapper.id = `1textShopProductGallery${props.cartItem.id}`;
            nameWrapper.className = "w-full";

            const name = document.createElement("div");
            name.className = "text-2xl font-bold text-gray-900 dark:text-white  leading-8 whitespace-nowrap";
            name.textContent = props.cartItem.name;

            nameWrapper.appendChild(name);

            const priceWrapper = document.createElement("div");
            priceWrapper.className = "w-full";

            const price = document.createElement("p");
            price.id = `2textShopProductGallery${props.cartItem.id}`;
            price.className = "text-2xl font-bold text-gray-900 dark:text-white whitespace-nowrap leading-8";
            price.textContent = props.cartItem.price + props.cartItem.currency;

            priceWrapper.appendChild(price);

            // BUTTON WRAPPER
            const buttonWrapper = document.createElement("div");
            buttonWrapper.className = "flex flex-row-reverse items-center max-[1040px]:justify-center";

            const button = document.createElement("button");
            button.id = "learnMore" + props.cartItem.id;
            button.className = "text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ";
            button.textContent = "Learn more";

            button.addEventListener("click", () => {
                showDescription = true;
                render();
            });


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
            minusPlusInputContainer.appendChild(minusPlusInput.htmlelement);
            modifyValueOnlyInVue = minusPlusInput.modifyValueWithoutCallingPropsMethod

            buttonWrapper.appendChild(button);
            textWrapper.appendChild(nameWrapper);
            textWrapper.appendChild(priceWrapper);
            textWrapper.appendChild(buttonWrapper);

            container.appendChild(imageWrapper);
            container.appendChild(textWrapper);
            container.appendChild(minusPlusInputContainer);

        } else {
            // CLOSE BUTTON
            const closeWrapper = document.createElement("div");
            closeWrapper.id = "descriptionProductCrossIcon" + props.cartItem.id;
            closeWrapper.className = "size-12";

            const close = document.createElement("button");
            close.innerHTML = crossIcon;

            close.addEventListener("click", () => {
                showDescription = false;
                render();
            });

            closeWrapper.appendChild(close);

            // DESCRIPTION
            const description = document.createElement("div");
            description.id = "descriptionProductText" + props.cartItem.id;
            description.className = "dark:text-white overflow-y-auto h-61 mx-1";
            description.textContent = props.cartItem.description;

            container.appendChild(closeWrapper);
            container.appendChild(description);
        }
    }
    const changeValueQuantity = (newValue: number) => {
        valueQuantity = newValue
        if(modifyValueOnlyInVue)
        modifyValueOnlyInVue(newValue)
    }

    render();

    return { root: container, changeValueQuantity: changeValueQuantity };
}