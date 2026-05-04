import { CartItemDTO } from "../../models/CartItem";
import { ProductDTO } from "../../models/Product";
import { getQuantityOfProductInCartShop, productDTOtoCartItemDTO } from "../../utils/sharedComponents/utilsFunctions";
import { NavigationInputs } from "./NavigationInputs";
import { ShopProductImageGallery } from "./ShopProductImageGallery";
import { ProductsFiltersObserverList } from "./shopTemplate";

export interface ShopProductListInterface {
    changeQuantityInCartShop: (shopItem: CartItemDTO, quantity: number) => void;
    //cartShopList: CartItemDTO[];
    getCartShopList: () => CartItemDTO[];
    getCurrentPage: () => number;
    subscribeHandlerProductsFiltersObserverList: (functionToDo: (state: ProductsFiltersObserverList) => void) => () => void;
    updateProductsFiltersObserverList: (newCurentPage: number) => void;
    subscribeHandlerCartShopObserver: (functionToDo: (state: {
        cartShopList: CartItemDTO[];
    }) => void) => () => void
}

export const ShopProductList = (props: ShopProductListInterface) => {

    let isLoading = true // change
    let totalPages = 1;
    let products: ProductDTO[] | undefined = []
    let cartItems: Map<number ,ShopProductImageGallery >  = new Map();
    const noItemFound = document.createElement('div');
    noItemFound.textContent = "No items found";
    noItemFound.className = "dark:text-white  rounded-lg  min-h-[300px] dark:bg-gray-600 bg-gray-300 p-2 w-full  flex items-center justify-center";

    const spinnerContainer = document.createElement('div');
    spinnerContainer.className = "flex justify-center";
    //spinnerContainer.innerHTML = Spinner;

    const mainContainer = document.createElement('div');
    mainContainer.className = "max-w-[1200px] mx-auto w-[90%] flex flex-col "

    const shopProductListContainer = document.createElement('div');
    shopProductListContainer.className = "grid grid-cols-1 min-[1040px]:grid-cols-3 xl:grid-cols-4 md:gap-y-4 gap-y-6 rounded-lg  min-h-[300px] dark:bg-gray-600 bg-gray-300 p-2 md:justify-items-center"

    //navigation Inputs
    let navigationInputsProps = {
        getCurrentPage: () => props.getCurrentPage(),
        getTotalPages: () => totalPages,
        styleOverride: "mb-2 self-end",
        observerSuscribe: props.subscribeHandlerProductsFiltersObserverList,
        updateProductsFiltersObserverList: props.updateProductsFiltersObserverList
    }
    const navigationInputsContainer = NavigationInputs(navigationInputsProps);

    let render = () => {
        mainContainer.innerHTML = "";
        mainContainer.appendChild(navigationInputsContainer);

        if (isLoading && products === undefined || products === undefined || products && products.length === 0) {
            mainContainer.appendChild(noItemFound);
        }
        if (isLoading) {
            mainContainer.appendChild(spinnerContainer);
        }
        if (!isLoading && products && products.length > 0) {
            mainContainer.appendChild(shopProductListContainer);
        }
    }

    // ShopProductImageGallery

    const renderProductList = (newproducts: ProductDTO[], newTotalPages: number, cartData: CartItemDTO[]) => {
        shopProductListContainer.innerHTML = ""
        cartItems.clear()
        newproducts.forEach((product) => {
            //Image Gallery
            const wrapper = document.createElement("div");

            wrapper.id = "ShopProductElementGalleryContainer" + product.id;
            wrapper.className = "w-full min-[1040px]:w-[258px]";

            const cartItem = productDTOtoCartItemDTO(
                product,
                getQuantityOfProductInCartShop(cartData, product.id)
            )

            const shopProductImageGallery = ShopProductImageGallery({
                cartItem,
                changeQuantityInCartShop: props.changeQuantityInCartShop
            });
            cartItems.set(product.id, shopProductImageGallery);

            wrapper.appendChild(shopProductImageGallery.root);

            shopProductListContainer.appendChild(wrapper);
        })
        products = newproducts
        isLoading = false;
        totalPages = newTotalPages;
        render();
    }
    
    const renderProductListWithoutCreate = (newproducts: ProductDTO[], newTotalPages: number, cartData: CartItemDTO[]) => {
        newproducts.forEach((product)=> {
            if(cartItems.has(product.id)){
                let c = cartItems.get(product.id);
                alert("aa")
                console.log(getQuantityOfProductInCartShop(cartData,product.id))
                c?.changeValueQuantity(getQuantityOfProductInCartShop(cartData,product.id))
            }
        })
    }


    render();
    props.subscribeHandlerCartShopObserver((newstate) => {
        renderProductListWithoutCreate(products ?? [], totalPages, newstate.cartShopList)
    })

    return { htmlContainer: mainContainer, renderProductList };


}