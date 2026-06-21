import { DESCRIPTION_RESTRICTION, NAME_RESTRICTION, REGEX } from "../utils/constants";
import type { Address } from "./Address";
import type { GeoPoint } from "./GeoPoint";

export interface StoreDTO {
    id: number;
    name: string;
    address: Address;
    location: GeoPoint;
    contactPhone: string;
    imageUrl?: string;
}

export const StoresKeysToNotDisplayInDetails = ["id", "contactPhone"]

export function validateStore(store: StoreDTO): boolean {
    const validations: boolean[] = [];

    validations.push(
        store.name !== "" &&
        store.name.length <= NAME_RESTRICTION
    );

    validations.push(
        store.address.city !== "" &&
        store.address.city.length <= NAME_RESTRICTION
    );

    validations.push(
        store.address.state !== "" &&
        store.address.state.length <= NAME_RESTRICTION
    );

    validations.push(
        store.address.zipCode !== "" &&
        store.address.zipCode.length <= NAME_RESTRICTION
    );

    validations.push(
        store.address.streetNumber !== "" &&
        REGEX.ONLYNUMBERS.test(store.address.streetNumber)
    );

    validations.push(
        store.address.streetName !== "" &&
        store.address.streetName.length <= DESCRIPTION_RESTRICTION
    );

    validations.push(
        REGEX.LATITUDE.test(String(store.location.latitude))
    );

    validations.push(
        REGEX.LONGITUDE.test(String(store.location.longitude))
    );

    return validations.every(Boolean);
}
