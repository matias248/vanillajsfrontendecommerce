import { DESCRIPTION_RESTRICTION, NAME_RESTRICTION, REGEX } from "../utils/constants";

export interface ProductDTO {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    inventoryStatus: string;
    category: string;
    storeId: number;
    currency: string;
}
export const ProductKeysToNotDisplayInDetails = ["id", "storeId"]

export const CategoryType = {
    Accessories: 'Accessories',
    Fitness: 'Fitness',
    Electronics: 'Electronics',
    Clothing: 'Clothing'
};

export const inventoryStatusType = {
    INSTOCK: 'INSTOCK',
    LOWSTOCK: 'LOWSTOCK',
    OUTOFSTOCK: 'OUTOFSTOCK'
};

export const currencyType = {
    EUR: '€',
    DOLLAR: '$',
    STERLING: '£'
};

export const arrayCategoryType = Object.values(CategoryType)

export const arrayInventoryStatusType = Object.values(inventoryStatusType)

export const arrayCurrencyType = Object.values(currencyType)


export function validateProduct(product: ProductDTO): boolean {
    const validations: boolean[] = [];

    validations.push(
        product.name !== "" &&
        product.name.length <= NAME_RESTRICTION
    );

    validations.push(
        product.description !== "" &&
        product.description.length <= DESCRIPTION_RESTRICTION
    );

    validations.push(
        !isNaN(product.price) && product.price >=0 && REGEX.PRICE.test(product.price+'')
    );




    return validations.every(Boolean);
}
