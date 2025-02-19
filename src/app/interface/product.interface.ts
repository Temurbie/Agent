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

export interface Customer {
    code: string;
    name: string;
    phoneNumber: string;
    address: string;
  }

  export interface Productt {
    code: string;
    name: string;
    category: string;
    price: number;
    stock: number;
  }
  
  