import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from '../../interface/product.interface';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-main',
  imports: [
    RouterOutlet,
    CommonModule

  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  products : Product[] = [
    { productId: 1, productName: 'Product 1', price: 100, quantity: 10 },
    { productId: 2, productName: 'Product 2', price: 200, quantity: 5 },
    { productId: 3, productName: 'Product 3', price: 150, quantity: 8 },
    { productId: 4, productName: 'Product 4', price: 250, quantity: 12 }
  ] 

  serviceProduct = inject(ProductService)

  ngOnInit(): void {
    this.getProduct()
  }
  getProduct(){
    this.serviceProduct.getProducts().subscribe(data =>{
      this.products = data
      console.log("getPRoductdan data", data)
    })
  }

  openModul(product:Product){
    console.log('bosildi', product)
  }

}
