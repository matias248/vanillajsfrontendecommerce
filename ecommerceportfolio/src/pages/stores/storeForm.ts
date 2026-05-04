import { createStoreById, deleteStoreById, getStoreById, updateStoreById } from "../../services/storeService";
import { Spinner } from "../../images/spinner";
import { DisplayNotFound } from "../../components/DisplayNotFound";
import { CancelButton, DeleteButton, InputOfStringForm, InputOfUrlImagesForm, ValidateButton } from "../../components/InputsForm";
import { iconImagePlaceholder } from "../../images/iconImagePlaceholder";
import { StoreDTO } from "../../models/Store";
import { DESCRIPTION_RESTRICTION, descriptionRestrictionMessage, NAME_RESTRICTION, nameRestrictionMessage, PathData, REGEX, setCorrectFormat } from "../../utils/constants";
import { replaceTextNumberPerNumber } from "../../utils/sharedComponents/utilsFunctions";
import { validateStore } from "../../models/Store"

export interface StoreFormPageProps {
    id: number;
    onNavigate?: (route: string) => void;
    changeNavigationValue: (pathData: PathData) => void;
}

export function StoreForm({
    id,
    onNavigate, changeNavigationValue,
}: StoreFormPageProps): HTMLElement {
    const container = document.createElement("div");

    let store: StoreDTO | null = null;
    let isLoading = true;
    const storeId = id === undefined ? "new" : id;
    const isEdit = storeId !== "new" && !isNaN(Number(storeId));
    const title = isEdit ? "Edit the store" : "Create a new store";

    let forceShowErrors = false;

    /* ---------------- Render ---------------- */

    function render() {
        container.innerHTML = "";
        if (isLoading) {
            const loading = document.createElement("div");
            loading.className = "flex justify-center";
            loading.innerHTML = Spinner;
            container.appendChild(loading);
            return;
        }

        if (!store) {
            container.appendChild(DisplayNotFound());
            return;
        }

        const wrapper = document.createElement("div");
        wrapper.className = "flex items-center flex-col pb-4";

        const titleEl = document.createElement("div");
        titleEl.className = "mb-6 text-4xl text-center mb-16 dark:text-white";
        titleEl.textContent = title;

        const form = document.createElement("form");
        form.className = "mx-auto w-3/4";

        /* ---------------- Inputs ---------------- */

        const inputs: any = {};

        function bindInput(key: string, input: HTMLInputElement | HTMLTextAreaElement) {
            inputs[key] = input;
        }
        let divImageContainer = document.createElement('svg');
        divImageContainer.innerHTML = iconImagePlaceholder;

        if (store) {
            form.appendChild(
                InputOfUrlImagesForm(
                    {
                        title: "URL",
                        currentValue: store.imageUrl,
                        onChange: (e) => (store.imageUrl = (e.target as HTMLInputElement).value),
                    },
                    divImageContainer
                )
            );

            const divpart = document.createElement('div');
            divpart.className = "flex gap-4"

            const nameInput = InputOfStringForm({
                title: "Name",
                required: true,
                numberOfLines: 1,
                helpText: nameRestrictionMessage,
                errorShouldBeVisible: (s: string) => {
                    return s.length > NAME_RESTRICTION || s.length < 1
                },

                onChange: (e) => {
                    store.name = e;
                },
                formularyFailed: forceShowErrors,
                currentValue: store.name

            })
            divpart.appendChild(nameInput);

            form.appendChild(
                divpart
            );

            divpart.appendChild(
                InputOfStringForm({
                    title: "City",
                    required: true,
                    numberOfLines: 1,
                    helpText: nameRestrictionMessage,
                    errorShouldBeVisible: (s: string) => {
                        return s.length > NAME_RESTRICTION || s.length < 1
                    },
                    formularyFailed: forceShowErrors,

                    onChange: (e) => {
                        store.address.city = e;
                    },

                    currentValue: store.address.city
                })
            )

            form.appendChild(
                InputOfStringForm({
                    title: "State",
                    required: true,
                    numberOfLines: 1,
                    helpText: nameRestrictionMessage,
                    errorShouldBeVisible: (s: string) => {
                        return s.length > NAME_RESTRICTION || s.length < 1
                    },
                    formularyFailed: forceShowErrors,
                    onChange: (e) => {
                        store.address.state = e;
                    },
                    currentValue: store.address.state

                })
            );

            const divpart1 = document.createElement('div');
            divpart1.className = "flex gap-4"

            divpart1.appendChild(
                InputOfStringForm({
                    title: "Zipcode",
                    required: true,
                    numberOfLines: 1,
                    helpText: nameRestrictionMessage,
                    errorShouldBeVisible: (s: string) => {
                        return s.length > NAME_RESTRICTION || s.length < 1
                    },
                    formularyFailed: forceShowErrors,
                    onChange: (e) => {
                        store.address.zipCode = e;
                    },
                    currentValue: store.address.zipCode

                })
            );

            divpart1.appendChild(
                InputOfStringForm({
                    title: "Street Number",
                    required: true,
                    numberOfLines: 1,
                    helpText: nameRestrictionMessage,
                    errorShouldBeVisible: (s: string) => {
                        return s.length > NAME_RESTRICTION || s.length < 1
                    },
                    formularyFailed: forceShowErrors,
                    onChange: (e) => {
                        store.address.streetNumber = e;
                    },
                    currentValue: store.address.streetNumber

                })
            );
            form.appendChild(divpart1)

            form.appendChild(
                InputOfStringForm({
                    title: "Street Name",
                    required: true,
                    numberOfLines: 1,
                    helpText: descriptionRestrictionMessage,
                    errorShouldBeVisible: (s: string) => {
                        return s.length > DESCRIPTION_RESTRICTION || s.length < 1
                    },
                    formularyFailed: forceShowErrors,
                    onChange: (e) => {
                        store.address.streetName = e;
                    },
                    currentValue: store.address.streetName

                })
            );

            const divpart2 = document.createElement('div');
            divpart2.className = "flex gap-4"

            divpart2.appendChild(
                InputOfStringForm({
                    title: "Latitude",
                    required: true,
                    numberOfLines: 1,
                    helpText: setCorrectFormat,
                    errorShouldBeVisible: (s: string) => {
                        return !REGEX.LATITUDE.test(s)
                    },
                    formularyFailed: forceShowErrors,
                    onChange: (e) => {
                        store.location.latitude = replaceTextNumberPerNumber(e);
                    },
                    currentValue: store.location.latitude + ""

                })
            );

            divpart2.appendChild(
                InputOfStringForm({
                    title: "Longitude",
                    required: true,
                    numberOfLines: 1,
                    helpText: setCorrectFormat,
                    errorShouldBeVisible: (s: string) => {
                        return !REGEX.LONGITUDE.test(s)
                    },
                    formularyFailed: forceShowErrors,
                    onChange: (e) => {
                        store.location.longitude = replaceTextNumberPerNumber(e);
                    },
                    currentValue: store.location.longitude + ""
                })
            );

            form.appendChild(divpart2)
        }


        /* ---------------- Buttons ---------------- */

        if (isEdit) {
            form.appendChild(
                DeleteButton({
                    title: "Delete Store",
                    functionToDo: deleteStore,
                })
            );
        }

        const buttons = document.createElement("div");
        buttons.className = "grid md:grid-cols-2 md:gap-28 gap-4 mt-4 mx-auto md:w-80";

        buttons.appendChild(
            ValidateButton({
                title: "Submit",
                functionToDo: submitForm,
            })
        );

        buttons.appendChild(
            CancelButton({
                title: "Cancel",
                functionToDo: () => {
                    if (onNavigate) {
                        onNavigate('/stores')
                    }
                }
            })
        );

        form.appendChild(buttons);

        wrapper.append(titleEl, form);
        container.appendChild(wrapper);
    }


    /* ---------------- Actions ---------------- */

    function submitForm() {

        if (!validateStore(store)) {
            forceShowErrors = true;

            render();
            return;
        }
        if (store) {
            if (isEdit) {
                updateStoreById(Number(storeId), store)
                    .then(() => {
                        if (onNavigate) {
                            onNavigate('/stores')
                        }
                    })
                    .catch(() => console.error("Error when update"));
            } else {
                createStoreById(store)
                    .then(() => {
                        if (onNavigate) {
                            onNavigate('/stores')
                        }
                    })
                    .catch(() => console.error("Error when create"));
            }
        }
    }

    function deleteStore() {
        deleteStoreById(Number(storeId))
            .then(() => {
                if (onNavigate) {
                    onNavigate('/stores')
                }
            })
            .catch(() => console.error("Error when delete"));
    }

    /* ---------------- Init ---------------- */

    function init() {
        if (isEdit) {
            getStoreById(Number(storeId))
                .then((response) => {
                    store = response;
                    isLoading = false;
                    changeNavigationValue({ inProducts: false, inStores: true, storeName: response.name, productName: undefined, storeId: response.id, productId: undefined})

                    render();
                })
                .catch(() => {
                    store = null;
                    isLoading = false;
                    render();
                });
        } else {
            store = {
                id: -1,
                name: "",
                contactPhone: "",
                imageUrl: "",
                address: {
                    city: "",
                    state: "",
                    zipCode: "",
                    streetNumber: "",
                    streetName: "",
                },
                location: {
                    latitude: 0,
                    longitude: 0,
                },
            };
            isLoading = false;
            render();
        }
    }

    init();
    render();

    return container;
}

