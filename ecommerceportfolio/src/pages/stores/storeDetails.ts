import { getStoreById } from "../../services/storeService";
import { Spinner } from "../../images/spinner";
import { StoresKeysToNotDisplayInDetails, StoreDTO } from "../../models/Store";
import { formatString } from "../../utils/sharedComponents/utilsFunctions";
import { DisplayNotFound } from "../../components/DisplayNotFound";
import { PathData } from "../../utils/constants";

/**
 * Props que recibe StoreDetailPage
 */
export interface StoreDetailPageProps {
  id: number;
  onNavigate?: (route: string) => void;
  changeNavigationValue: (pathData: PathData) => void;
}

/**
 * Obtiene la store por ID y ejecuta callbacks
 * @param storeId 
 * @param onSuccess callback si se carga correctamente
 * @param onError callback si hay error
 */
const setValuesOfTheInputs = (
  storeId: number,
  onSuccess: (store: StoreDTO) => void,
  onError?: () => void
) => {
  getStoreById(storeId)
    .then((response) => {
      onSuccess(response);
    })
    .catch(() => {
      console.error("Error loading store");
      if (onError) onError();
    });
};


/**
 * Componente StoreDetailPage
 */
export function StoreDetailPage({
  id,
  onNavigate, changeNavigationValue
}: StoreDetailPageProps): HTMLDivElement {
  const container = document.createElement("div");

  let store: StoreDTO | null = null;
  let isLoading = true;
  const title = "Details of the store";

  /* ---------- Render base ---------- */
  function render() {
    container.innerHTML = "";

    // LOADING
    if (isLoading) {
      const loadingDiv = document.createElement("div");
      loadingDiv.className = "flex justify-center";
      loadingDiv.innerHTML = Spinner; // Spinner sigue siendo string SVG
      container.appendChild(loadingDiv);
      return;
    }

    // NOT FOUND
    if (!store) {
      container.appendChild(DisplayNotFound());
      return;
    }

    // CONTENT
    const titleEl = document.createElement("div");
    titleEl.className = "mb-6 text-4xl text-center mb-16 dark:text-white";
    titleEl.textContent = title;


    const wrapper = document.createElement("div");
    wrapper.className = "max-w-[1000px] mx-auto w-[90%] rounded-lg";

    /* ---------- Go to Edit ---------- */
    const editWrapper = document.createElement("div");
    editWrapper.className =
      "text-3xl text-center mb-1 dark:text-white flex justify-end";

    const editButton = document.createElement("button");
    editButton.id = "gotoEditButton";
    editButton.className =
      "max-h-full text-white bg-blue-600 hover:bg-blue-700 " +
      "focus:ring-2 focus:outline-hidden focus:ring-blue-300 " +
      "font-medium rounded-lg text-sm w-auto px-2 py-1 text-center " +
      "dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

    editButton.textContent = "Go to Edit";
    editButton.onclick = () => {
      onNavigate?.(`/stores/${id}/edit`);
    };


    if (store) {
      changeNavigationValue({ inProducts: false, inStores: true, storeName: store.name, productName: undefined, storeId:store.id, productId: undefined })
    }

    editWrapper.appendChild(editButton);

    /* ---------- List ---------- */
    const ul = document.createElement("ul");
    ul.className =
      "space-y-2 bg-slate-100 border-gray-200 dark:bg-gray-800 " +
      "dark:text-white rounded-lg";

    Object.entries(store)
      .filter(
        ([key]) =>
          StoresKeysToNotDisplayInDetails.every(
            (blockedKey) => blockedKey !== key
          )
      )
      .forEach(([key, value], index) => {
        if (typeof value !== "object") {
          ul.appendChild(createRow(key, value, index));
        } else {
          Object.entries(value).forEach(([k, v], index2) => {
            if (typeof v === "string" || typeof v === "number") {
              ul.appendChild(createRow(k, v, `${index}-${index2}`));
            }
          });
        }
      });

    wrapper.appendChild(editWrapper);
    wrapper.appendChild(ul);

    container.appendChild(titleEl);
    container.appendChild(wrapper);
  }

  /* ---------- Row helper ---------- */
  function createRow(
    key: string,
    value: string | number,
    idSuffix: string | number
  ): HTMLLIElement {
    const li = document.createElement("li");
    li.id = "displayStoreElement" + idSuffix;
    li.className =
      "flex justify-between border-gray-200 border rounded-lg " +
      "shadow-xs bg-slate-400 dark:bg-gray-500 dark:border-gray-700 " +
      "gap-2 margin-top-2";

    const keyDiv = document.createElement("div");
    keyDiv.className =
      "bg-slate-300 dark:bg-gray-600 rounded-l-lg px-1 w-1/2 overflow-y-auto";
    keyDiv.textContent = formatString(key);
    keyDiv.id = "displayStoreElement"+idSuffix+"key"

    const valueDiv = document.createElement("div");
    valueDiv.className =
      "bg-slate-300 dark:bg-gray-600 rounded-r-lg px-1 w-1/2 overflow-y-auto text-start";
    valueDiv.textContent = value.toString();
    valueDiv.id = "displayStoreElement"+idSuffix+"value"

    li.appendChild(keyDiv);
    li.appendChild(valueDiv);

    return li;
  }

  /* ---------- Init (useEffect) ---------- */
  function init() {
    if (!isNaN(+id)) {
      setValuesOfTheInputs(+id, (loadedStore) => {
        store = loadedStore;
        isLoading = false;
        
        render();
      }, () => {
        // Callback de error
        store = null;
        isLoading = false;
        render();
      });
    } else {
      isLoading = false;
      render();
    }
  }

  init();
  render();

  return container;
}
