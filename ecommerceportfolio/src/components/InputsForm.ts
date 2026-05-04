import { replaceTextNumberPerNumber } from "../utils/sharedComponents/utilsFunctions";
import { ButtonProps, InputFormProps, InputSwitchFormProps, InputTextFormProps } from "./CommonInterfaces";

export function InputOfStringForm(props: InputTextFormProps): HTMLDivElement {
    const container = document.createElement('div');
    container.className = "mb-5 w-full min-w-[100px]"
    const label = document.createElement("label");
    label.htmlFor = "inputString-" + props.title;
    label.className = "block mb-2 text-base sm:text-lg dark:text-white flex items-center font-medium"
    label.innerText = props.title + (props.required ? "*" : "")

    container.appendChild(label)

    const textArea = document.createElement('textarea');
    const error: boolean = props.errorShouldBeVisible(props.currentValue ?? " ");
    textArea.id = "inputString-" + props.title;
    textArea.rows = props.numberOfLines ?? 1;
    textArea.className = "block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-slate-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
        + ((props.formularyFailed && error) ? "bg-red-200 dark:bg-red-800" : "")
        + (props.numberOfLines === 1 ? "h-11.5" : "")
        + " " + (props.styleOverride ?? "");
    textArea.textContent = props.currentValue ?? "";

    container.appendChild(textArea);


    let helpText = document.createElement('div');
    if (props.helpText && props.formularyFailed && error) {
        helpText.className = "text-xs dark:text-white italic overflow-hidden"
        helpText.innerText = props.helpText;
        container.appendChild(helpText)
    }

    if (props.onChange) {
        textArea.addEventListener("input", (e: Event) => {
            const target = e.target as HTMLTextAreaElement | HTMLInputElement;
            const value: string = target.value.trim();
            const errorShouldBeVisible = props.errorShouldBeVisible(value);
            props.onChange(value);

            textArea.className = "block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-slate-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                + (errorShouldBeVisible ? "bg-red-200 dark:bg-red-800" : "")
                + (props.numberOfLines === 1 ? "h-11.5" : "")
                + " " + (props.styleOverride ?? "");

            if (props.helpText && errorShouldBeVisible && helpText && !document.contains(helpText)) {
                helpText.className = "text-xs dark:text-white italic overflow-hidden"
                helpText.innerText = props.helpText;
                container.appendChild(helpText)
            }
            else if (document.contains(helpText) && !errorShouldBeVisible) {
                helpText.remove();
            }
        });
    }



    return container;
}

export function InputSwitchForm(props: InputSwitchFormProps): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.className = "mb-5";

    const label = document.createElement("label");
    label.className =
        "block mb-2 text-base sm:text-lg font-medium dark:text-white";
    label.textContent = props.title;

    const select = document.createElement("select");
    select.className =
        "block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-slate-400 " +
        "dark:bg-gray-700 dark:border-gray-600 dark:text-white " +
        (props.errorShouldDisplay ? "bg-red-200 dark:bg-red-800 " : "") +
        (props.styleOverride ?? "");
    select.name = props.title +'selectedOption'

    props.options.forEach((option, index) => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        opt.id = String(index);
        select.appendChild(opt);
    });

    if (props.optionSelected) {
        select.value = props.optionSelected;
    }

    if (props.onChange) {
        select.addEventListener("change", () => {
            props.onChange(select.value);
        });
    }
    



    wrapper.append(label, select);
    return wrapper;
}

export function InputOfNumberForm(props: InputTextFormProps): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.className = "mb-5 w-full min-w-[100px]";
    const label = document.createElement("label");
    label.className =
        "block mb-2 text-base sm:text-lg font-medium dark:text-white flex items-center";
    label.textContent = props.title + (props.required ? "*" : "");

    const input = document.createElement("input");
    input.type = "text";
    input.id = "inputNumber-" + props.title;
    input.required = !!props.required;
    input.value = props.currentValue ?? "0"

    const error: boolean = props.errorShouldBeVisible(props.currentValue ?? " ");

    input.className =
        "bg-gray-50 border border-slate-400 text-gray-900 text-base rounded-lg block w-full p-2.5 " +
        "dark:bg-gray-700 dark:border-gray-600 dark:text-white " +
        (error ? "bg-red-200 dark:bg-red-800 " : " ") +
        (props.styleOverride ?? "");

    wrapper.append(label, input);

    let helpText = document.createElement('div');
    if (props.helpText && props.formularyFailed && error) {
        helpText.className = "text-xs dark:text-white italic overflow-hidden"
        helpText.innerText = props.helpText;
        wrapper.appendChild(helpText)
    }

    if (props.onChange) {
        input.addEventListener("input", (e: Event) => {
            const target = e.target as HTMLTextAreaElement | HTMLInputElement;
            const initialValue = target.value.trim();

            const value: string | number = "" + replaceTextNumberPerNumber(initialValue);
            let errorShouldBeVisible = props.errorShouldBeVisible(value) || initialValue === "";
            if (initialValue == "") {
                props.onChange("");
            }
            else {
                props.onChange(value);

            }

            input.className = "block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-slate-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                + (errorShouldBeVisible ? "bg-red-200 dark:bg-red-800" : "")
                + (props.numberOfLines === 1 ? "h-11.5" : "")
                + " " + (props.styleOverride ?? "");

            if (props.helpText && errorShouldBeVisible && helpText && !document.contains(helpText)) {
                helpText.className = "text-xs dark:text-white italic overflow-hidden"
                helpText.innerText = props.helpText;
                wrapper.appendChild(helpText)
            }
            else if (document.contains(helpText) && !errorShouldBeVisible) {
                helpText.remove();
            }
        });
    }

    if (props.helpText && props.errorShouldDisplay) {
        const help = document.createElement("div");
        help.className = "text-xs dark:text-white italic overflow-hidden";
        help.textContent = props.helpText;
        wrapper.appendChild(help);
    }

    return wrapper;
}

export function InputOfUrlImagesForm(
    props: InputFormProps,
    ImagePlaceholder: HTMLElement
): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.className = "mb-5";

    const preview = document.createElement("div");
    preview.className =
        "w-24 h-24 mb-2 bg-white border border-slate-400 rounded-lg shadow-xs " +
        "dark:bg-gray-800 dark:border-gray-700 mx-auto sm:mx-0";

    if (props.currentValue) {
        const img = document.createElement("img");
        img.src = props.currentValue;
        img.className =
            "mt-5 h-16 max-w-full rounded-lg object-cover mx-auto";
        preview.appendChild(img);
    } else {
        preview.appendChild(ImagePlaceholder)
    }

    const label = document.createElement("label");
    label.className =
        "block mb-2 text-lg font-medium dark:text-white flex items-center";
    label.textContent = props.title + (props.required ? "*" : "");

    const textarea = document.createElement("textarea");
    textarea.rows = 1;
    textarea.required = !!props.required;

    textarea.className =
        "bg-gray-50 border border-slate-400 text-gray-900 text-base rounded-lg block w-full p-2.5 " +
        "dark:bg-gray-700 dark:border-gray-600 dark:text-white " +
        (props.errorShouldDisplay ? "bg-red-200 " : "") +
        (props.styleOverride ?? "");
    textarea.textContent = props.currentValue ?? "";

    textarea.id = "inputImageUrl-URL";

    if (props.onChange) {
        textarea.addEventListener("input", props.onChange);
    }

    wrapper.append(preview, label, textarea);

    if (props.helpText && props.errorShouldDisplay) {
        const help = document.createElement("div");
        help.className = "text-xs dark:text-white italic overflow-hidden";
        help.textContent = props.helpText;
        wrapper.appendChild(help);
    }

    return wrapper;
}





export function ValidateButton(props: ButtonProps): HTMLButtonElement {
    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = props.title;

    button.className =
        "text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-hidden " +
        "focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 " +
        "dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 " +
        (props.styleOverride ?? "");
    
        button.name ="submitButton"

    button.addEventListener("click", (event) => {
        event.preventDefault();
        props.functionToDo?.();
    });
    return button;
}

export function CancelButton(props: ButtonProps): HTMLButtonElement {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = props.title;
    button.name = "cancelButton";

    button.className =
        "text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-hidden " +
        "focus:ring-red-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 " +
        "dark:bg-red-600 dark:hover:bg-red-700 " +
        (props.styleOverride ?? "");

    button.onclick = (e) => {
        e.preventDefault();
        props.functionToDo();
    };

    return button;
}

export function DeleteButton(props: ButtonProps): HTMLButtonElement {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = props.title;
    button.name ="deleteButton";

    button.className =
        "text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-hidden " +
        "focus:ring-red-300 font-medium rounded-lg text-xs  sm:w-auto px-5 py-2.5 " +
        "dark:bg-red-800 dark:hover:bg-red-900 " +
        (props.styleOverride ?? "");

    button.onclick = (e) => {
        e.preventDefault();
        props.functionToDo();
    };

    return button;
}


