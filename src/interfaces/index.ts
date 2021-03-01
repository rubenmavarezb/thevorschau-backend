
export interface Product {
    name: string;
    description: string;
    category: string,
    gtin: string;
    photos: string[];
    price: number,
    stock: number;
}

export interface CartProduct {
    product: Product;
    quantity: number;
}

export interface FavoriteProduct {
    product: Product;
    quantity: number;
}