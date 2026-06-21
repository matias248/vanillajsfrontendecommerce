export interface Input {
    styleOverride?: string;
    title: string;
}

export interface InputFormProps<T = Event> extends Input {
    [x: string]: any;
    helpText?: string;
    errorShouldDisplay?: boolean;
    required?: boolean;
    currentValue?: string;
    onChange: (e: T) => void;
}

export interface InputTextFormProps extends InputFormProps<string> {
    numberOfLines: number;
    errorShouldBeVisible: (s: string) => boolean
    formularyFailed?: boolean
}

export interface ButtonProps extends Input {
    functionToDo: () => void;
    id?: string;
}

export interface InputSwitchFormProps extends InputFormProps<string> {
    options: string[];
    optionSelected: string;
}

export interface NavigationInputsProps extends Input {
    currentPage: number;
    totalPages: number;
    handlerCurrentPage: (page: number) => void;
}

export interface MinusPlusInputInterface extends Input {
    modifyValue: (quantity: number) => void;
    id: string;
    value: number;

}

export type FormErrors = {
    [key: string]: string | undefined;
};