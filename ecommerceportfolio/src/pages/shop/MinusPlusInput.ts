interface MinusPlusInputInterface {
    id: string;
    initialValue: number;
    modifyValue: (value: number) => void;
}

export function MinusPlusInput(props: MinusPlusInputInterface): {htmlelement:HTMLElement,modifyValueWithoutCallingPropsMethod:(arg0: number)=> void} {

    let emptyValue = false;
    const container = document.createElement("div");

    // --- ELEMENTS ---
    const minusBtn = document.createElement("button");
    minusBtn.id = props.id + "+";
    minusBtn.className = "bg-red-500 text-white px-4 py-2 rounded-l hover:bg-red-600";
    minusBtn.textContent = "-";

    const input = document.createElement("input");
    input.id = props.id + "input";
    input.className = "mx-2 border border-gray-200 text-center w-16 h-10";
    input.type = "text";

    const plusBtn = document.createElement("button");
    plusBtn.id = props.id + "-";
    plusBtn.className = "bg-green-500 text-white px-4 py-2 rounded-r hover:bg-green-600";
    plusBtn.textContent = "+";

    let internalValue = props.initialValue;

    // --- FUNCTIONS---
    const updateUI = () => {
        minusBtn.disabled = internalValue <= 0;
        plusBtn.disabled = internalValue >= 99;
        input.value = emptyValue ? "" : String(internalValue);
    };

    const minusFunction = () => {

        props.modifyValue(--internalValue);
        emptyValue = false;
        updateUI();
    };

    const plusFunction = () => {
        internalValue++
        props.modifyValue(internalValue );
        emptyValue = false;
        updateUI();
    };

    const modifyValueWithoutCallingPropsMethod = (newValue:number) =>{
        internalValue = newValue
        emptyValue = false;
        updateUI();
    }

    const handleInputChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;

        const isPositiveInteger = /^[0-9]\d*$/.test(inputValue);

        if (isPositiveInteger) {
            if (+inputValue <= 99) {
                props.modifyValue(+inputValue);
                internalValue = +inputValue;
                emptyValue = false;
            }
        }
        if (inputValue === "") {
            emptyValue = true;
        } else if (+inputValue === internalValue) {
            emptyValue = false;
        }
        updateUI();
    };

    // --- EVENTS ---
    minusBtn.addEventListener("click", minusFunction);

    plusBtn.addEventListener("click", (event) => {
        plusFunction();
    });

    input.addEventListener("input", handleInputChange);

    // --- MOUNTING ---
    container.appendChild(minusBtn);
    container.appendChild(input);
    container.appendChild(plusBtn);

    // --- INIT ---
    updateUI();

    return {htmlelement:container , modifyValueWithoutCallingPropsMethod};
}