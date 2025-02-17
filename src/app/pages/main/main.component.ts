import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { infoProduct, Product } from '../../interface/product.interface';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-main',
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule
    

  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  
  serviceProduct = inject(ProductService)

  modalService = inject(NgbModal)
  
  selectedProduct: Product | null = null;
  
  products : Product[] = [
    { productId: 1, productName: 'Product 1', price: 100, quantity: 10 },
    { productId: 2, productName: 'Product 2', price: 200, quantity: 5 },
    { productId: 3, productName: 'Product 3', price: 150, quantity: 8 },
    { productId: 4, productName: 'Product 4', price: 250, quantity: 12 }
  ] 

  infoProduct : infoProduct[] =[];


  quantity: number = 1;


  ngOnInit(): void {
    this.getProduct()
  }
  getProduct(){
    this.serviceProduct.getProducts().subscribe(data =>{
      this.products = data
      console.log("getPRoductdan data", data)
    })
  }

  openModal(product: Product, content: any): void {
    this.quantity = 0
    this.selectedProduct = product;
    this.modalService.open(content); 
  }

  increment() {
    if(this.selectedProduct?.quantity){
      if(this.quantity < this.selectedProduct?.quantity){
        this.quantity++
      }
    }
    }
  decrement() {
    if(this.quantity > 1){
      this.quantity--
    }
    }

    addInfo(productQuantity :any) {
      
      console.log(this.infoProduct);
      
      }

}
