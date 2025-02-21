import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { infoProduct, mainProduct, Product } from '../../interface/product.interface';
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

  
  
  products : mainProduct[] = [

  ] 

  infoProduct : infoProduct[] =[];


  quantity: number = 1;




  ngOnInit(): void {
    this.getProduct()
    
  }
  getProduct() {
    console.log("ishga tushdi")
  this.serviceProduct.getProducts().subscribe({
    next : (data) =>{
      this.products = data;
      console.log(this.products[0].name)
    },
    error : (err) =>{
      console.log(`error bor ${err.message}`)
    },
    complete :() =>{
      console.log(`operatsiya zur utdi`)
    }
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
