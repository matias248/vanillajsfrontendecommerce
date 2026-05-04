import type { CartItemDTO } from "./CartItem";

export interface Order {
    cartShop: CartItemDTO[];
    total:number;
}

//may be in the futur : add delivery adress ...