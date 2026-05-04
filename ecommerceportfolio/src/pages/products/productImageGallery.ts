import { EditButton } from "../../components/inputsShared";
import { iconImagePlaceholder } from "../../images/iconImagePlaceholder";
import { ProductDTO } from "../../models/Product";

interface ProductImageGalleryProps {
    product: ProductDTO;
    onClick: (id: number) => void;
    onClickToEdit: () => void;
}

export function ProductImageGallery(
    props: ProductImageGalleryProps
): HTMLDivElement {
    const { product, onClick, onClickToEdit } = props;

    // Root
    const container = document.createElement("div");
    container.id = `productElementGallery${product.id}`;
    container.className =
        "h-56 md:w-56 bg-white border border-gray-200 rounded-lg shadow-xs " +
        "dark:bg-gray-800 dark:border-gray-700 relative";

    container.addEventListener("click", () => onClick(product.id));

    /* ---------------- Edit Button ---------------- */

    const editButton = EditButton({
        id: product.id.toString(),
        styleOverride: "absolute top-0 right-0",
        functionToDo: (e?: Event) => {
            e?.stopPropagation();
            onClickToEdit();
        },
        title: "Edit",
    });

    container.appendChild(editButton);

    /* ---------------- Image ---------------- */

    const imageWrapper = document.createElement("div");
    imageWrapper.id = `imageProductGallery${product.id}`;
    imageWrapper.className = "w-28 mt-5 mx-auto h-16";

    if (product.imageUrl) {
        const img = document.createElement("img");
        img.src = product.imageUrl;
        img.alt = "error loading image";
        img.className =
            "h-16 max-w-full rounded-lg object-cover mx-auto text-center dark:text-white";
        imageWrapper.appendChild(img);
    } else {
        const noImageDiv = document.createElement("div");
        noImageDiv.id = `divNoImageSet${product.id}`;
        noImageDiv.className = "h-16 max-w-full rounded-lg";
        noImageDiv.innerHTML = iconImagePlaceholder
        imageWrapper.appendChild(noImageDiv);
    }

    container.appendChild(imageWrapper);

    /* ---------------- Text ---------------- */

    const textContainer = document.createElement("div");
    textContainer.id = `textProductGallery${product.id}`;
    textContainer.className =
        "mt-8 max-w-full h-24 mx-1 text-center";

    const nameEl = document.createElement("p");
    nameEl.id = `1textProductGallery${product.id}`;
    nameEl.className =
        "h-1/2 w-full text-xl font-bold text-gray-900 dark:text-white " +
        "overflow-hidden text-ellipsis leading-6";
    nameEl.textContent = product.name;

    const descriptionEl = document.createElement("p");
    descriptionEl.id = `2textProductGallery${product.id}`;
    descriptionEl.className =
        "w-full text-sm text-gray-700 dark:text-gray-400 leading-6 line-clamp-2";
    descriptionEl.textContent = product.description;

    textContainer.append(nameEl, descriptionEl);
    container.appendChild(textContainer);

    return container;
}
