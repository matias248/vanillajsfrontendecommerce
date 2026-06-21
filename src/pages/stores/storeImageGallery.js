import {EditButton} from '../../components/inputsShared.js'

export function StoreImageGallery(props) {
  const { store, onClick, onClickToEdit, onClickToProductsListButton } = props;

  const container = document.createElement("div");
  container.id = "storeElementGallery" + store.id;
  container.className =
    "h-56 md:w-56 bg-white border border-gray-200 rounded-lg shadow-xs dark:bg-gray-800 dark:border-gray-700 relative";
  container.addEventListener("click", onClick);

  /* -------- Edit Button -------- */
 
  const editBtn = EditButton({
  id: store ? store.id : -1,
  styleOverride: "absolute top-0 right-0",
  functionToDo: () => {
    onClickToEdit()
  }
});

  container.appendChild(editBtn);

  /* -------- Image Section -------- */
  const imageWrapper = document.createElement("div");
  imageWrapper.id = "imageStoreGallery" + store.id;
  imageWrapper.className = "w-28 mt-5 mx-auto h-16";

  if (store.imageUrl) {
    const img = document.createElement("img");
    img.src = store.imageUrl;
    img.alt = "error loading image";
    img.className =
      "h-16 max-w-full rounded-lg object-cover mx-auto text-center dark:text-white";
    imageWrapper.appendChild(img);
  } else {
    const noImageDiv = document.createElement("div");
    noImageDiv.id = "divNoImageSet" + store.id;
    noImageDiv.className = "h-16 max-w-full rounded-lg";
    noImageDiv.textContent = "No image"; // placeholder simple
    imageWrapper.appendChild(noImageDiv);
  }

  container.appendChild(imageWrapper);

  /* -------- Text Section -------- */
  const textWrapper = document.createElement("div");
  textWrapper.id = "textStoreGallery" + store.id;
  textWrapper.className = "mt-8 max-w-full h-24 mx-1 text-center";

  const name = document.createElement("p");
  name.id = "1textStoreGallery" + store.id;
  name.className =
    "h-1/3 w-full text-xl font-bold text-gray-900 dark:text-white truncate leading-7";
  name.textContent = store.name;

  const city = document.createElement("p");
  city.id = "2textStoreGallery" + store.id;
  city.className =
    "h-1/3 w-full text-sm text-gray-900 dark:text-white truncate leading-5";
  city.textContent = store.address.city;

  const buttonWrapper = document.createElement("div");
  buttonWrapper.className =
    "h-1/3 flex flex-row-reverse items-center overflow-hidden";

  const productsButton = document.createElement("button");
  productsButton.id = "listOfProductsButton" + store.id;
  productsButton.className =
    "max-h-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-hidden focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
  productsButton.textContent = "List of Products";
  productsButton.addEventListener("click", (e) => {
    e.stopPropagation();
    onClickToProductsListButton();
  });

  buttonWrapper.appendChild(productsButton);

  textWrapper.appendChild(name);
  textWrapper.appendChild(city);
  textWrapper.appendChild(buttonWrapper);

  container.appendChild(textWrapper);

  return container;
}
