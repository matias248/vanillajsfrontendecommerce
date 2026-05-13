import { ProductsFiltersObserverList } from "./shopTemplate";

type NavigationInputsProps = {
  getCurrentPage: () => number;
  getTotalPages: () => number;
  styleOverride?: string;
  observerSuscribe: (functionToDo: (state: ProductsFiltersObserverList) => void) => () => void;
  updateProductsFiltersObserverList: (newCurentPage: number) => void;
};

export const NavigationInputs = (props: NavigationInputsProps): { container: HTMLElement, reRender: () => void } => {
  const container = document.createElement("div");
  let currentPage = props.getCurrentPage();
  let totalPages = props.getTotalPages();
  const leftButton = document.createElement("button");
  const middle = document.createElement("div");
  const input = document.createElement("input");
  const rightButton = document.createElement("button");
  const label = document.createElement("div");
  label.className = "rounded-md dark:text-white h-[25px] whitespace-nowrap";


  let firstRender = () => {
    container.className = "flex gap-[6px] " + (props.styleOverride ?? "");
    leftButton.textContent = "<";
    leftButton.className =
      "w-[20px] bg-gray-600 rounded-md dark:text-white p-[4px]";
    leftButton.disabled = currentPage <= 1;
    leftButton.addEventListener("click", (event) => {
      event.stopPropagation();
      props.updateProductsFiltersObserverList(currentPage - 1);
    });

    middle.className =
      "flex gap-[2px] max-w-[200px] h-[35px] overflow-auto items-center px-[2px]";

    input.className =
      "max-w-[50px] bg-white rounded-md text-center dark:text-white dark:bg-gray-400 h-[25px]";

    input.value = currentPage !== 0 ? String(currentPage) : "";

    input.addEventListener("change", (event) => {
      const target = event.target as HTMLInputElement;
      const inputValue = target.value;
      const isPositiveInteger = /^[1-9]\d*$/.test(inputValue);

      if (isPositiveInteger || inputValue === "") {
        props.updateProductsFiltersObserverList(Number(inputValue))
      }
    });
    label.textContent =
      "of " + (totalPages === 0 ? "1" : String(totalPages));

    middle.appendChild(input);
    middle.appendChild(label);

    rightButton.textContent = ">";
    rightButton.className =
      "w-[20px] bg-gray-600 rounded-md dark:text-white p-[4px]";

    rightButton.disabled = currentPage >= totalPages;

    rightButton.addEventListener("click", (event) => {
      event.stopPropagation();
      let newValue: number = currentPage + 1;
      console.log(newValue +" "+ currentPage);

      props.updateProductsFiltersObserverList(newValue)
    });
  }

  props.observerSuscribe((newState) => {
    currentPage = newState.currentPage;
    input.value = currentPage !== 0 ? String(currentPage) : "";

    leftButton.disabled = currentPage <= 1;
    rightButton.disabled = currentPage >= totalPages;
  })

  container.appendChild(leftButton);
  container.appendChild(middle);
  container.appendChild(rightButton);
  firstRender();

  const reRender = () => {
    currentPage = props.getCurrentPage();
    totalPages = props.getTotalPages();
    input.value = currentPage !== 0 ? String(currentPage) : "";
    label.textContent =
      "of " + (totalPages === 0 ? "1" : String(totalPages));
      
    rightButton.disabled = currentPage >= totalPages;
    leftButton.disabled = currentPage <= 1;
  }

  return { container, reRender: reRender };
};