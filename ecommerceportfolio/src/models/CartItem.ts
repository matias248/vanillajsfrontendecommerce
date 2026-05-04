export interface CartItemDTO {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
    description:string;
    currency: string;
}