import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-creat-invoice',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './creat-invoice.component.html',
  styleUrl: './creat-invoice.component.scss'
})
export class CreatInvoiceComponent implements OnInit{
  
  builder = inject(FormBuilder)
  rout = inject(Router);
  masterService = inject(MasterService)
  
  invoiceDetail !: FormArray<any>;
  pageTitle= "Create Invoice"
  masterCustomer:any = [
    {name:"Azizbek"},
    {name:"Bahrullo"},
    {name:"Farxod"},
  ];
  masterProduct:any = [
    {name:"olma"},
    {name:"banan"},
    {name:"sok"},
    {name:"vafli"}
  ]

  
  invoiceBuild = this.builder.group({
    invoiceNo: this.builder.control("", Validators.required),
    customerName : this.builder.control("",),
    customerId : this.builder.control("", Validators.required),
    deleveryAdress: this.builder.control(""),
    remarks: this.builder.control(""),
    total : this.builder.control({value: 0, disabled:true}),
    tax: this.builder.control({value: 0, disabled:true}),
    netTotal: this.builder.control({value: 0, disabled:true}),
    detalis: this.builder.array([])
  })

//Functinos
  ngOnInit(): void {
    console.log(this.builder.array)
    this.getCustomer()
    this.getProducts()
  }
    saveInvoice() {
      console.log(this.invoiceBuild.value)
    }

    addNewProduct(){
      this.invoiceDetail = this.invoiceBuild.get("detalis") as FormArray
      this.invoiceDetail.push(this.generateRow())
      console.log(this.invoiceDetail);
      
    }

    get invproducts(){
      return this.invoiceBuild.get("detalis") as FormArray
    }

    generateRow(){
      return this.builder.group({
        invoiceNo: this.builder.control(""),
        productCode: this.builder.control("", Validators.required),
        productName: this.builder.control(""),
        qty: this.builder.control(1),
        salesPrice: this.builder.control(0),
        total: this.builder.control({value: 0, disabled:true})
      })
    }

    getCustomer(){
      this.masterService.GetCustomer().subscribe(res =>{
        this.masterCustomer = res
      })
    }
    getProducts(){
      this.masterService.GetProducts().subscribe(res =>{
        this.masterProduct = res
      })
    }
}
