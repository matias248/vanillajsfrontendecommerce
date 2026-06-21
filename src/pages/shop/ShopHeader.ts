import { StoreDTO } from "../../models/Store"
import { SearchBar } from "./searchBar"
import { ShopSelectorInput } from "./ShopSelectorInput"
import { CartShopObserverState, ShopObserverState } from "./shopTemplate"
import { shoppingCartIcon as ShoppingCartIcon } from "../../images/shoppingCartIcon"
import { getTotalProductsElements } from "../../utils/sharedComponents/utilsFunctions"

type ShopHeaderProps = {
  storesList?: StoreDTO[]
  getStateShopObserver: () => ShopObserverState
  handlerSelectedStore: (store: StoreDTO | undefined) => void
  handlerShopTextFilter: (text: string) => void
  updadeStoresByFilter: () => void
  handlerProductTextFilter: (text: string) => void
  updadeProductsByFilter: () => void
  handlerCartListVisble: (isVisible: boolean) => void
  numberOfElementsInCartShopHandler: () => number
  onChangeStore: (functionToDo: (state: ShopObserverState) => void) => () => void
}

export class ShopHeader {

  public root: HTMLElement
  private props: ShopHeaderProps
  private cartCounter?: HTMLElement
  private cartCounterFixed?: HTMLElement

  private cartButton: HTMLElement;
  private isComponentVisible = true
  private localProductTextfilter = "";
  private numberOfElementsInCartShop = 0;

  private cartButtonFixed!: HTMLElement;
  private stickyContainer2: HTMLElement;
  private cartWrapper: HTMLElement;

  constructor(props: ShopHeaderProps) {


    this.stickyContainer2 = document.createElement('div');
    this.stickyContainer2.className = "mx-auto max-w-[1000px]  w-[90%] flex flex-row-reverse px-2 py-1";


    this.props = props
    this.numberOfElementsInCartShop = this.props.numberOfElementsInCartShopHandler();
    this.cartButton = document.createElement("button")
    this.cartButton.id = "shoppingCart"
    this.cartButton.className =
      "relative bg-blue-600 hover:bg-blue-700 rounded-full p-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-hidden "

    this.cartCounter = document.createElement("div");
    this.cartCounter.className = `absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full my-auto text-center flex items-center justify-center overflow-hidden ${(this.numberOfElementsInCartShop ?? 0) > 9 ? "size-6" : "size-5"}`

    this.cartButtonFixed = document.createElement('div');
    this.cartButtonFixed.id = "shoppingCartFixed"
    // crear root
    this.root = document.createElement("header")
    this.root.className = "h-[64px] mb-4 sm:mb-8"
    this.cartWrapper = document.createElement("div")
    this.cartWrapper.className = "flex items-center lg:order-2"


    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {

        if (entry.isIntersecting && !this.isComponentVisible) {
          this.isComponentVisible = true;
          this.cartButton.className =
            "relative bg-blue-600 hover:bg-blue-700 rounded-full p-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-hidden"
          this.cartWrapper.appendChild(this.cartButton)
        }

        if (!entry.isIntersecting && this.isComponentVisible) {
          this.isComponentVisible = false;
          this.cartButton.className += " pointer-events-auto animate-fade-in-scale "
          this.stickyContainer2.appendChild(this.cartButton);
        }

      });
    });
    observer.observe(this.cartWrapper);

    // render inicial
    this.render()


  }

  /* ------------------ UPDATE CART COUNT ------------------ */
  setCartCount(count?: number) {
    const value = count ?? 0
    const display = value === 0 ? "" : value > 99 ? "+99" : value.toString()
    if (this.cartCounter) this.cartCounter.textContent = display
    if (this.cartCounterFixed) this.cartCounterFixed.textContent = display
  }

  /* ------------------ RENDER ------------------ */
  private render() {
    this.root.innerHTML = "" // limpiar contenido previo

    const container = document.createElement("div")
    container.className = "bg-slate-100 border-gray-200 dark:bg-gray-800 max-w-[1000px] mx-auto w-[90%] rounded-lg"

    const flexRow = document.createElement("div")
    flexRow.className = "flex items-center max-w-full gap-[4px] justify-between mx-2"

    // ShopSelectorInput
    const selectorWrapper = document.createElement("div")
    selectorWrapper.className = "hidden sm:block"
    let shopSelectorInput = new ShopSelectorInput(1, this.props.getStateShopObserver, this.props.handlerSelectedStore, this.props.onChangeStore);

    selectorWrapper.appendChild(shopSelectorInput.getRoot());

    const searchBar = new SearchBar({
      textFilter: "",
      functionOnSubmit: () => { this.props.handlerProductTextFilter(this.localProductTextfilter) },
      id: "filterproducts",
      onChange: (text) => { this.localProductTextfilter = text }
    })
    const searchWrapper = document.createElement("div")
    searchWrapper.className = "flex-1"
    searchWrapper.appendChild(searchBar.root);

    this.cartButton.addEventListener("click", () => this.props.handlerCartListVisble(true))

    const cartIcon = document.createElement("div")
    cartIcon.className = "size-6"
    cartIcon.innerHTML = ShoppingCartIcon

    if (this.cartCounter === undefined) {
      this.cartCounter = document.createElement("div");

    }
    this.cartCounter.className = `absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full my-auto text-center flex items-center justify-center overflow-hidden ${(this.numberOfElementsInCartShop ?? 0) > 9 ? "size-6" : "size-5"}`

    this.cartCounter.textContent =
      this.numberOfElementsInCartShop && this.numberOfElementsInCartShop > 0
        ? this.numberOfElementsInCartShop > 99
          ? "+99"
          : this.numberOfElementsInCartShop.toString()
        : ""

    if (this.numberOfElementsInCartShop && this.numberOfElementsInCartShop !== 0) {
      this.cartButton.appendChild(this.cartCounter)
    }

    this.cartButton.appendChild(cartIcon)
    this.cartWrapper.appendChild(this.cartButton)

    // ensamblar flex row
    flexRow.appendChild(selectorWrapper)
    flexRow.appendChild(searchWrapper)
    flexRow.appendChild(this.cartWrapper)
    container.appendChild(flexRow)
    this.root.appendChild(container)

    // sticky cart placeholder
    let stickyContainer = document.createElement("div");
    stickyContainer.className = "fixed w-full top-4 pointer-events-none";
    stickyContainer.id = "stickyCartPlaceholder";
    stickyContainer.appendChild(this.stickyContainer2)
    this.root.appendChild(stickyContainer)

  }

  public onChangeCartCounter(state: CartShopObserverState) {
    this.numberOfElementsInCartShop = getTotalProductsElements(state.cartShopList);
    if (this.cartCounter)
      this.cartCounter.textContent =
        this.numberOfElementsInCartShop && this.numberOfElementsInCartShop > 0
          ? this.numberOfElementsInCartShop > 99
            ? "+99"
            : this.numberOfElementsInCartShop.toString()
          : ""
    if (this.numberOfElementsInCartShop && this.numberOfElementsInCartShop !== 0 && this.cartCounter) {
      this.cartCounter.className = `absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full my-auto text-center flex items-center justify-center overflow-hidden ${(this.numberOfElementsInCartShop ?? 0) > 9 ? "size-6" : "size-5"}`
      this.cartButton.appendChild(this.cartCounter)
    }
    else {
      this.cartCounter?.remove()
    }
  }

  getRoot() {
    return this.root;
  }
}


