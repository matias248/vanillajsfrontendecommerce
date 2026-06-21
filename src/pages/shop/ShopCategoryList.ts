import { crossIcon } from '../../images/crossIcon'
import { verifyIcon } from '../../images/verifyIcon';


// ==============================
// TYPES
// ==============================

type ShopCategoryItemProps = {
  category: string;
  filterOn: boolean;
  onChange: (e: MouseEvent) => void;
  id: number;
  iconMap: WeakMap<HTMLElement, HTMLElement>;
  textMap: WeakMap<HTMLElement, HTMLElement>;
};

type ShopCategoryListProps = {
  getAllMapValue: () => Map<string, boolean>;
  subscribeHandlerCategory: (
    fn: (state: Map<string, boolean>) => void
  ) => () => void;
  updateCategoryItems: (key: string, newValue: boolean) => void;
};

// ==============================
// ITEM COMPONENT
// ==============================

export const ShopCategoryItem = ({
  category,
  filterOn,
  onChange,
  id,
  iconMap,
  textMap,
}: ShopCategoryItemProps): HTMLElement => {
  const container = document.createElement("div");
  container.id = `ShopCategoryItem${id}`;
  container.className =
    "dark:text-white rounded-lg px-2 flex " +
    (filterOn ? "bg-blue-500" : "bg-gray-500");

  container.setAttribute("data-active", String(filterOn));
  container.setAttribute("data-key", category);

  container.addEventListener("click", onChange);

  const iconWrapper = document.createElement("div");
  iconWrapper.className = "dark:fill-white size-[20px] self-center";
  iconWrapper.innerHTML = filterOn ? verifyIcon : crossIcon;

  const text = document.createElement("div");
  text.textContent = category;

  iconMap.set(container, iconWrapper);
  textMap.set(container, text);

  container.appendChild(iconWrapper);
  container.appendChild(text);

  return container;
};

// ==============================
// LIST COMPONENT
// ==============================

export const ShopCategoryList = ({
  getAllMapValue,
  subscribeHandlerCategory,
  updateCategoryItems,
}: ShopCategoryListProps): HTMLElement => {
  const container = document.createElement("div");
  container.id = "categoryListContainer";
  container.className = "max-w-[1200px] mx-auto w-[90%] rounded-lg";

  const title = document.createElement("div");
  title.className = "dark:text-white text-lg";
  title.textContent = "Our Categories";

  const list = document.createElement("div");
  list.className = "flex gap-1 flex-wrap";

  // WeakMaps for internal referencies
  const iconMap = new WeakMap<HTMLElement, HTMLElement>();
  const textMap = new WeakMap<HTMLElement, HTMLElement>();

  // map of items render
  const itemsMap = new Map<string, HTMLElement>();

  // ------------------------------
  // CREATE ITEM
  // ------------------------------
  const createItem = (key: string, value: boolean, index: number) => {
    return ShopCategoryItem({
      id: index,
      category: key,
      filterOn: value,
      onChange: () => {
        const current = getAllMapValue().get(key) ?? false;
        updateCategoryItems(key, !current);
      },
      iconMap,
      textMap,
    });
  };

  // ------------------------------
  // UPDATE EXISTING ITEM
  // ------------------------------
  const updateItem = (el: HTMLElement, value: boolean) => {
    const current = el.getAttribute("data-active") === "true";
    if (current === value) return;

    el.setAttribute("data-active", String(value));

    el.className =
      "dark:text-white rounded-lg px-2 flex " +
      (value ? "bg-blue-500" : "bg-gray-500");

    const icon = iconMap.get(el);
    if (icon) {
      icon.innerHTML = value ? verifyIcon : crossIcon;
    }
  };

  // ------------------------------
  // INITIAL RENDER
  // ------------------------------
  const renderInitial = (map: Map<string, boolean>) => {
    let index = 0;
    map.forEach((value, key) => {
      const item = createItem(key, value, index++);
      itemsMap.set(key, item);
      list.appendChild(item);
    });
  };

  // ------------------------------
  // UPDATE (REACTIVE)
  // ------------------------------
  
  const update = (newMap: Map<string, boolean>) => {
    let index = 0;

    newMap.forEach((value, key) => {
      const existing = itemsMap.get(key);

      if (!existing) {
        const newItem = createItem(key, value, index);
        itemsMap.set(key, newItem);
        list.appendChild(newItem);
      } else {
        updateItem(existing, value);
      }

      index++;
    });

    // Remove if they don't exist anymore
    // I take out this code because map should no elimate values never (logic of the app).
    /*
    for (const [key, el] of itemsMap.entries()) {
      if (!newMap.has(key)) {
        el.remove();
        itemsMap.delete(key);
      }
    }*/
  };

  // ------------------------------
  // INIT
  // ------------------------------
  renderInitial(getAllMapValue());

  const unsubscribe = subscribeHandlerCategory(update);

  container.appendChild(title);
  container.appendChild(list);

  // cleanup manual
  (container as unknown as { cleanup: () => void }).cleanup = unsubscribe;

  return container;
};