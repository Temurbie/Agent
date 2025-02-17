export interface Product {
    productName: string;
    productId: string | number
    price: number
    quantity: number
}
export interface infoProduct extends Product{
    totalPrice: number;
    date?: number;
    numberNakladnoy?: number;
    nameAgent?: string;
    nameMarket?:string
}