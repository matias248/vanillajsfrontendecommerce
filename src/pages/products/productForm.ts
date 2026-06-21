import { DisplayNotFound } from "../../components/DisplayNotFound";
import { CancelButton, DeleteButton, InputOfStringForm, InputOfUrlImagesForm, ValidateButton, InputSwitchForm, InputOfNumberForm } from "../../components/InputsForm";
import { iconImagePlaceholder } from "../../images/iconImagePlaceholder";
import { Spinner } from "../../images/spinner";
import { arrayCategoryType, arrayCurrencyType, arrayInventoryStatusType, ProductDTO, validateProduct } from "../../models/Product";
import { StoreDTO } from "../../models/Store";
import { createProductById, deleteProductById, getProductByIdWithstore, updateProductById } from "../../services/productService";
import { getStoreById } from "../../services/storeService";
import { DESCRIPTION_RESTRICTION, descriptionRestrictionMessage, NAME_RESTRICTION, nameRestrictionMessage, onlyNumbersRestrictionMessage, PathData, REGEX, setCorrectFormat } from "../../utils/constants";

export const setValuesOfTheInputs = (
    storeId: number,
    productId: number,
    onSuccess: (data: { store: StoreDTO; product: ProductDTO }) => void,
    onError?: () => void
) => {
    getProductByIdWithstore(storeId, productId)
        .then(onSuccess)
        .catch(() => {
            console.error("Error loading products");
            onError?.();
        });
};

type ProductFormProps = {
    storeId: string;
    id?: string;
    onNavigate: (route: string) => void;
    changeNavigationValue: (PathData: PathData) => void;
};

export function ProductForm({ storeId, id, onNavigate, changeNavigationValue }: ProductFormProps
) {
    let product: ProductDTO | null = null;
    let store: StoreDTO | null = null;
    let isLoading = true;

    const wrapper = document.createElement("div");
    let productId = id ? +id : "new"

    let forceShowErrors = false;

    let productPriceStringWrapper: string | null = null;


    /* ---------------- Init ---------------- */

    function init() {
        if (productId !== "new" && !isNaN(+productId)) {
            setValuesOfTheInputs(
                +storeId,
                +productId,
                (data) => {
                    product = data.product;
                    store = data.store;
                    isLoading = false;
                    changeNavigationValue({ inProducts: true, inStores: true, storeName: data.store.name, productName: data.product.name, storeId: data.store.id, productId: data.product.id })
                    render();
                },
                () => {
                    product = null;
                    store = null;
                    isLoading = false;
                    changeNavigationValue({
                        inProducts: false,
                        inStores: false,
                        storeName: undefined,
                        productName: undefined,
                        storeId: undefined,
                        productId: undefined
                    })
                    render();
                }
            );
        } else {
            if (product == null) {
                getStoreById(+storeId).then(
                    (storeResponse: StoreDTO) => {
                        store = storeResponse;
                        changeNavigationValue({
                            inProducts: true,
                            inStores: true,
                            storeName: storeResponse.name,
                            productName: undefined,
                            storeId: storeResponse.id,
                            productId: undefined
                        })
                        isLoading = false;
                        
                            product = {
                                id: -1,
                                storeId: +storeId,
                                name: "",
                                description: "",
                                price: 0,
                                currency: arrayCurrencyType[0],
                                imageUrl: "",
                                category: arrayCategoryType[0],
                                inventoryStatus: arrayInventoryStatusType[0],
                            };
                        render();

                    }
                ).catch(
                    () => {
                        changeNavigationValue({
                            inProducts: false,
                            inStores: false,
                            storeName: undefined,
                            productName: undefined,
                            storeId: undefined,
                            productId: undefined
                        })
                        isLoading = false;
                        render();

                    }
                )
            }
            isLoading = false;
        }
    }

    /* ---------------- Render ---------------- */

    function render() {
        if (productPriceStringWrapper === null)
            productPriceStringWrapper = product ? "" + product.price : "";
        wrapper.innerHTML = "";

        if (isLoading) {
            const loading = document.createElement("div");
            loading.className = "flex justify-center";
            loading.innerHTML = Spinner;
            wrapper.appendChild(loading);
            return;
        }
        wrapper.className = "mb-4"
        if (!product || !store) {
            wrapper.appendChild(DisplayNotFound());
            return;
        }

        const title = document.createElement("div");
        title.className = "mb-16 text-4xl text-center dark:text-white";
        title.textContent =
            productId !== "new" ? "Edit the product" : "Create a new product";

        const form = document.createElement("form");
        form.className = "mx-auto w-3/4";

        form.onsubmit = (e) => {
            e.preventDefault();
            submitForm();
        };

        let divImageContainer = document.createElement('svg');
        divImageContainer.innerHTML = iconImagePlaceholder;

        /* ---------------- Inputs ---------------- */

        form.appendChild(
            InputOfUrlImagesForm(
                {
                    title: "URL",
                    currentValue: product.imageUrl,
                    onChange: (e) => (product.imageUrl = (e.target as HTMLInputElement).value),
                },
                divImageContainer
            )
        );

        form.appendChild(
            InputOfStringForm({
                title: "Name",
                required: true,
                numberOfLines: 1,
                currentValue: product.name,
                helpText: nameRestrictionMessage,
                formularyFailed: forceShowErrors,
                errorShouldBeVisible: (s) =>
                    s.length > NAME_RESTRICTION || s.length < 1,
                onChange: (v) => (product!.name = v),
            })
        );

        form.appendChild(
            InputOfStringForm({
                title: "Description",
                required: true,
                numberOfLines: 4,
                currentValue: product.description,
                helpText: descriptionRestrictionMessage,
                formularyFailed: forceShowErrors,
                errorShouldBeVisible: (s) =>
                    s.length > DESCRIPTION_RESTRICTION || s.length < 1,
                onChange: (v) => (product!.description = v),
            })
        );

        let div1 = document.createElement('div');
        div1.className = "flex gap-4 ";

        div1.appendChild(
            InputOfNumberForm({
                title: "Price",
                required: true,
                currentValue: productPriceStringWrapper,
                helpText: setCorrectFormat,
                formularyFailed: forceShowErrors,
                onChange: (v) => {
                    productPriceStringWrapper = v;
                },
                numberOfLines: 0,
                errorShouldBeVisible: function (s: string): boolean {
                    return isNaN(+s) || s == "" || +s <0 || !REGEX.PRICE.test(s) ;
                },
            })
        );
        div1.appendChild(
            InputSwitchForm({
                title: "Currency",
                required: true,
                currentValue: product.currency,
                helpText: descriptionRestrictionMessage,
                onChange: (v) => (product.currency = v),
                options: arrayCurrencyType,
                optionSelected: product.currency,
                styleOverride: " text-center h-11.5 min-w-[50px] ",

            })
        );

        form.appendChild(
            InputSwitchForm({
                title: "Category",
                required: true,
                currentValue: product.description,
                helpText: descriptionRestrictionMessage,
                onChange: (v) => (product.category = v),
                options: arrayCategoryType,
                optionSelected: product.category
            })
        );

        form.appendChild(
            InputSwitchForm({
                title: "Inventory status",
                required: true,
                currentValue: product.description,
                helpText: descriptionRestrictionMessage,
                onChange: (v) => (product.inventoryStatus = v),
                options: arrayInventoryStatusType,
                optionSelected: product.inventoryStatus
            })
        );

        form.appendChild(div1)

        /* ---------------- Buttons ---------------- */

        if (productId !== "new") {
            form.appendChild(
                DeleteButton({
                    title: "Delete Product",
                    functionToDo: deleteProduct,
                })
            );
        }

        const buttons = document.createElement("div");
        buttons.className =
            "grid md:grid-cols-2 md:gap-28 gap-4 mt-4 mx-auto md:w-80";

        buttons.appendChild(
            ValidateButton({
                title: "Submit",
                functionToDo: submitForm,
            })
        );

        buttons.appendChild(
            CancelButton({
                title: "Cancel",
                functionToDo: () => onNavigate(`/stores/${storeId}/products`),
            })
        );

        form.appendChild(buttons);

        wrapper.append(title, form);
    }

    /* ---------------- Actions ---------------- */

    function submitForm() {
        if (!product) return;
        if (productPriceStringWrapper && isNaN(+productPriceStringWrapper)) {
            forceShowErrors = true;
            render();
        }
        else {
            product.price = +productPriceStringWrapper;
        }
        if (!validateProduct(product)) {
            forceShowErrors = true;
            render();
            return;
        }

        if (productId !== "new") {
            updateProductById(+storeId, +productId, product)
                .then(() => onNavigate(`/stores/${storeId}/products`))
                .catch(() => console.error("Error when update"));
        } else {
            createProductById(+storeId, product)
                .then(() => onNavigate(`/stores/${storeId}/products`))
                .catch(() => console.error("Error when create"));
        }
    }

    function deleteProduct() {
        deleteProductById(+storeId, +productId)
            .then(() => onNavigate(`/stores/${storeId}/products`))
            .catch(() => console.error("Error when delete"));
    }

    init();
    return wrapper;
}

