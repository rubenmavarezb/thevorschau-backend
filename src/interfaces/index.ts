
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

export interface Chat {
    chat: {
        user: [],
        helper: []
    }
}

export interface ShippingAddress {
    name: string;
    lastname: string;
    phone: string;
    address: string;
    zipcode: string;
    city: string;
    country: string;
}

export interface BillingAddress extends ShippingAddress {
    email: string;
}

export interface PaymentInformation {
    cardname: string;
    cardnumber: string;
    cardexpirationdate: Date;
    cvv: string;
}