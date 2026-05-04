import { CartItemDTO } from "../../models/CartItem";
import { arrayCategoryType, ProductDTO } from "../../models/Product";
import { StoreDTO } from "../../models/Store";
import { getProductsPublicUrl } from "../../services/productService";
import { createObservableMap } from "./oberservers/ObserverStoreMapTemplate";
import { createStore } from "./oberservers/ObserverStoreTemplate";
import { createOrderConfirmModal } from "./OrderConfirm";
import { ShopCart } from "./ShopCart";
import { ShopCategoryList } from "./ShopCategoryList";
import { ShopHeader } from "./ShopHeader";
import { ShopProductList, ShopProductListInterface } from "./ShopProductList";
import { ShopSelectorInput } from "./ShopSelectorInput";

export type ShopObserverState = {
    store: StoreDTO | undefined;
}

export type ShopTextFilterObserverState = {
    shopTextFilter: string;
}

export type ProductsFiltersObserverList = {
    currentPage: number;
}

export type CartShopObserverState = {
    cartShopList: CartItemDTO[];
}

export function ShopTemplate() {

    //categoryMapObserver
    const initialValues = new Array();
    arrayCategoryType.forEach((item: string) => initialValues.push([item, false]));
    const categoryMapOberser = createObservableMap<string, boolean>(initialValues);
    const subscribeHandlerCategory = (
        functionToDo: (state: Map<string, boolean>) => void
    ): () => void => {
        return categoryMapOberser.subscribe(functionToDo);
    }
    const updateCategoryItems = (key: string, newValue: boolean) => {
        categoryMapOberser.set(key, newValue)
    }

    //Store Selected observer
    const storeObserver = createStore<ShopObserverState>({
        store: undefined
    });

    let subscribeHandler = (
        functionToDo: (state: ShopObserverState) => void
    ): () => void => {
        return storeObserver.subscribe(functionToDo);
    };
    let updateStore = (store: StoreDTO | undefined) => {
        storeObserver.setState({
            store: store
        });
    }

    // cartShopObserver
    const cartShopObserver = createStore<CartShopObserverState>(
        { cartShopList: [] }
    )

    const changeQuantityInCartShop = (shopItem: CartItemDTO, quantity: number) => {
        let indexOfShopItemInTheArray: number = -1;
        let cartState: CartItemDTO[] = cartShopObserver.getState().cartShopList;
        if (quantity === 0) {
            let newArray = cartState?.filter((element) => {
                return element.id !== shopItem.id;
            })
            cartShopObserver.setState({ cartShopList: newArray });
        }
        else {
            cartState?.forEach((element, index) => {
                if (element.id === shopItem.id) {
                    indexOfShopItemInTheArray = index;
                }
            });
            if (indexOfShopItemInTheArray === -1 || cartState === undefined) {
                let newCartItem: CartItemDTO = shopItem;
                newCartItem.quantity = quantity;
                if (cartState) {
                    cartShopObserver.setState({ cartShopList: [newCartItem, ...cartState] });
                }
                else {
                    cartShopObserver.setState({ cartShopList: [newCartItem, ...cartState] });
                }
            }
            else {
                let newCartShopList = [...cartState];
                newCartShopList[indexOfShopItemInTheArray].quantity = quantity;
                cartShopObserver.setState({ cartShopList: newCartShopList });
            }
        }
    }

    let subscribeHandlerCartShopObserver = (
        functionToDo: (state: CartShopObserverState) => void
    ): () => void => {
        return cartShopObserver.subscribe(functionToDo);
    };


    // ShopTextFilterObserver
    const shopTextFilterObserver = createStore<ShopTextFilterObserverState>({
        shopTextFilter: ""
    })

    let subscribeHandlerShopTextFilter = (
        functionToDo: (state: ShopTextFilterObserverState) => void
    ): () => void => {
        return shopTextFilterObserver.subscribe(functionToDo);
    };

    let updateTextFilter = (newState: string) => {
        shopTextFilterObserver.setState({
            shopTextFilter: newState
        });
    }

    // productFilterObserver
    const productTextFilterObserver = createStore<{ productsTextFilterObserver: string }>({
        productsTextFilterObserver: ""
    })

    let subscribeHandlerProductsTextFilter = (
        functionToDo: (state: { productsTextFilterObserver: string }) => void
    ): () => void => {
        return productTextFilterObserver.subscribe(functionToDo);
    };

    let updateProductsTextFilter = (newState: string) => {
        productTextFilterObserver.setState({
            productsTextFilterObserver: newState
        });
    }

    let orderConfirmModalVue = createOrderConfirmModal(() => { orderConfirmModalVue.remove(); shopCart.removeCartFromVue(); cartShopObserver.setState({ cartShopList: [] }) });

    let containerVue = document.createElement('div');
    containerVue.className = "pb-4";


    // productsfilters Observer ( current page)
    const productsFiltersObserverList = createStore<ProductsFiltersObserverList>({
        currentPage: 1,
    })

    let subscribeHandlerProductsFiltersObserverList = (
        functionToDo: (state: ProductsFiltersObserverList) => void
    ): () => void => {
        return productsFiltersObserverList.subscribe(functionToDo);
    };

    let updateProductsFiltersObserverList = (newCurentPage: number) => {
        productsFiltersObserverList.setState({
            currentPage: newCurentPage
        });
    }

    //Header
    const shopHeaderProps = {

        getStateShopObserver: storeObserver.getState,
        handlerSelectedStore: (store: StoreDTO | undefined) => {
            updateStore(store);
        },
        onChangeStore: subscribeHandler,

        handlerShopTextFilter: (text: any) => {
            console.log("Filtrar tiendas:", text)
        },
        updadeStoresByFilter: () => {
            console.log("Actualizar lista de tiendas filtradas")
        },
        handlerProductTextFilter: (text: string) => {
            updateProductsTextFilter(text);
        },
        updadeProductsByFilter: () => {
            console.log("Actualizar lista de productos filtrados")
        },
        handlerCartListVisble: (isVisible: boolean) => {
            if (isVisible) {
                shopCart.mounting(containerVue);
            }
            else {
                shopCart.removeCartFromVue();
            }
        },
        numberOfElementsInCartShopHandler: () => cartShopObserver.getState().cartShopList.length

    }
    //instance header
    let shopHeader = new ShopHeader(shopHeaderProps)
    containerVue.appendChild(shopHeader.getRoot());

    // containerSecondSelectorInput for small window;
    let containerSecondSelectorInput = document.createElement('div');
    containerSecondSelectorInput.className = "block sm:hidden  ml-[5%] w-[188px] mb-4"

    let secondSelectorInput = new ShopSelectorInput(2, storeObserver.getState, updateStore, subscribeHandler);
    containerSecondSelectorInput.appendChild(secondSelectorInput.getRoot());
    containerVue.appendChild(containerSecondSelectorInput)


    // category Filters
    let categoryContainer = document.createElement('div')
    categoryContainer.className = "mb-4";
    categoryContainer.appendChild(
        ShopCategoryList({
            getAllMapValue: categoryMapOberser.getAll,
            subscribeHandlerCategory,
            updateCategoryItems,
        })
    );
    containerVue.appendChild(categoryContainer)

    // shop ProductList -> includes productList + navigation inputs
    let shopProductListProps: ShopProductListInterface = {
        getCurrentPage: () => productsFiltersObserverList.getState().currentPage,
        subscribeHandlerProductsFiltersObserverList: subscribeHandlerProductsFiltersObserverList,
        updateProductsFiltersObserverList: updateProductsFiltersObserverList,
        changeQuantityInCartShop: changeQuantityInCartShop,
        getCartShopList: () => cartShopObserver.getState().cartShopList,
        subscribeHandlerCartShopObserver: subscribeHandlerCartShopObserver,
    }

    let promiseProducts = getProductsPublicUrl([], 1, 5, "", undefined);
    const shopProductList: { htmlContainer: HTMLElement, renderProductList: (products: ProductDTO[], newTotalPages: number, cartData: CartItemDTO[] ) => void } = ShopProductList(shopProductListProps);

    let shopCart = ShopCart({
        openOrderModal: () => { containerVue.appendChild(orderConfirmModalVue); },
        getCart: function (): CartItemDTO[] {
            return cartShopObserver.getState().cartShopList
        },
        subscribeHandlerCartShopObserver: subscribeHandlerCartShopObserver,
        crossFunction: () => {
            shopCart.removeCartFromVue();
        },
        changeQuantityInCartShop: changeQuantityInCartShop

    });

    // first render 
    promiseProducts.then((result) => {
        shopProductList.renderProductList(result.products, result.totalPages, cartShopObserver.getState().cartShopList)
    })


    subscribeHandlerCartShopObserver((state) => {
        shopHeader.onChangeCartCounter(state);

    })
    // adding suscribers that modifies product list (currentPage-categories-storeSelected)
    subscribeHandlerProductsFiltersObserverList(({ currentPage }) => {
        const arrayCategory: string[] = []
        categoryMapOberser.getAll().forEach((v: boolean, key: string) => {
            if (v) {
                arrayCategory.push(key);
            }
        })
        getProductsPublicUrl(arrayCategory, currentPage, 5, "", storeObserver.getState().store?.id).then((result) => {
            shopProductList.renderProductList(result.products, result.totalPages, cartShopObserver.getState().cartShopList)
        })
    })

    subscribeHandlerCategory((newMap: Map<string, boolean>) => {
        const arrayCategory: string[] = []
        newMap.forEach((v: boolean, key: string) => {
            if (v) {
                arrayCategory.push(key);
            }
        })
        getProductsPublicUrl(arrayCategory, productsFiltersObserverList.getState().currentPage, 5, productTextFilterObserver.getState().productsTextFilterObserver,
            storeObserver.getState().store?.id).then((result) => {
                shopProductList.renderProductList(result.products, result.totalPages, cartShopObserver.getState().cartShopList)
            })
    })
    subscribeHandler((newState) => {
        const arrayCategory: string[] = [];
        categoryMapOberser.getAll().forEach((v: boolean, key: string) => {
            if (v) {
                arrayCategory.push(key);
            }
        })
        getProductsPublicUrl(arrayCategory, productsFiltersObserverList.getState().currentPage, 5, productTextFilterObserver.getState().productsTextFilterObserver, newState.store?.id).then((result) => {
            shopProductList.renderProductList(result.products, result.totalPages, cartShopObserver.getState().cartShopList)

        })
    })

    subscribeHandlerProductsTextFilter((newState) => {
        const arrayCategory: string[] = [];
        categoryMapOberser.getAll().forEach((v: boolean, key: string) => {
            if (v) {
                arrayCategory.push(key);
            }
        })
        getProductsPublicUrl(arrayCategory, productsFiltersObserverList.getState().currentPage, 5, newState.productsTextFilterObserver, storeObserver.getState().store?.id).then((result) => {
            shopProductList.renderProductList(result.products, result.totalPages, cartShopObserver.getState().cartShopList)
        })
    })

    containerVue.appendChild(shopProductList.htmlContainer);

    return containerVue;

}
