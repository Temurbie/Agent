import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { Customer, Productt } from '../../interface/product.interface';

@Component({
  selector: 'app-creat-invoice',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './creat-invoice.component.html',
  styleUrl: './creat-invoice.component.scss'
})
export class CreatInvoiceComponent implements OnInit {



  builder = inject(FormBuilder)
  rout = inject(Router);
  masterService = inject(MasterService)
  http = inject(HttpClient)
  url: string = "https://projectapi.gerasim.in/api/Products"

  invoiceDetail !: FormArray<any>;
  invoiceProduct !: FormGroup<any>;

  pageTitle = "Create Invoice"

  masterCustomer: { code: string; name: string; phoneNumber: string; address: string }[] = [
    { code: 'C001', name: 'Laziz', address: 'Mustaqillik Kuchasi 4 uy', phoneNumber: '99.695.95.98' },
    { code: 'C002', name: 'Farrux', address: 'Chulquvar mahalla', phoneNumber: '99.696.36.63' }
  ];
 masterProduct: Productt[] = [
  { code: "P001", name: "Laptop", category: "Electronics", price: 1200, stock: 10 },
  { code: "P002", name: "Smartphone", category: "Electronics", price: 800, stock: 15 },
  { code: "P003", name: "Headphones", category: "Accessories", price: 150, stock: 30 },
  { code: "P004", name: "Keyboard", category: "Accessories", price: 50, stock: 50 },
  { code: "P005", name: "Mouse", category: "Accessories", price: 30, stock: 60 },
  { code: "P006", name: "Monitor", category: "Electronics", price: 300, stock: 20 },
  { code: "P007", name: "Tablet", category: "Electronics", price: 500, stock: 12 },
  { code: "P008", name: "Printer", category: "Office Supplies", price: 200, stock: 8 },
  { code: "P009", name: "Desk Chair", category: "Furniture", price: 100, stock: 5 },
  { code: "P010", name: "USB Drive", category: "Accessories", price: 25, stock: 100 }
];



  invoiceBuild = this.builder.group({
    invoiceNo: this.builder.control("", Validators.required),
    customerName: this.builder.control("",),
    customerId: this.builder.control("", Validators.required),
    deleveryAdress: this.builder.control(""),
    remarks: this.builder.control(""),
    total: this.builder.control({ value: 0, disabled: true }),
    tax: this.builder.control({ value: 0, disabled: true }),
    netTotal: this.builder.control({ value: 0, disabled: true }),
    detalis: this.builder.array([])
  })
  item: any;

  //Functinos
  ngOnInit(): void {
    // this.getCustomer()
    this.getProducts()
  }
  saveInvoice() {
    console.log(this.invoiceBuild.value)
  }

  addNewProduct() {
    this.invoiceDetail = this.invoiceBuild.get("detalis") as FormArray
    this.invoiceDetail.push(this.generateRow())
    console.log(this.invoiceDetail);

  }

  get invproducts() {
    return this.invoiceBuild.get("detalis") as FormArray
  }

  generateRow() {
    return this.builder.group({
      invoiceNo: this.builder.control(""),
      productCode: this.builder.control("", Validators.required),
      productName: this.builder.control(""),
      qty: this.builder.control(1),
      salesPrice: this.builder.control(0),
      total: this.builder.control({ value: 0, disabled: true })
    })
  }

  getCustomer() {
    this.masterService.GetCustomer().subscribe(res => {
      this.masterCustomer = res as Customer[]
    })
  }
  getProducts() {
    this.masterService.GetProducts().subscribe({
      next: (data) => console.log("getProductsadan Mal", data),
      error: (err) => console.log("getPRuctsdan err", err)
    })
  }

  customerChange() {

    let customerCode = this.invoiceBuild.get("customerId")?.value;

    let custData = this.masterCustomer.find(e => e.code === customerCode);
    if (custData) {
      this.invoiceBuild.get("deleveryAdress")?.setValue(`${custData.address + ' ' + custData.phoneNumber}`)
      this.invoiceBuild.get("customerName")?.setValue(custData.name)
    }
    // this.masterService.GetCustomerbyCode(customerCode).subscribe(data =>{
    //   let custData:any;
    //    custData = data
    //   if(custData != null){
    //     this.invoiceBuild.get("deleveryAdress")?.setValue(custData.address , custData.phoneNumber)
    //   }
    // })

  }

  changeProduct(index: number) {
    this.invoiceDetail = this.invoiceBuild.get("detalis") as FormArray;
    this.invoiceProduct = this .invoiceDetail.at(index) as FormGroup;
    
    let productCode = this.invoiceProduct.get("productCode")?.value;
    
    let proData: any =this.masterProduct.find(e => e.code === productCode)
    if (proData) {
      this.invoiceProduct.get("productName")?.setValue(proData.name);
      this.invoiceProduct.get("salesPrice")?.setValue(proData.price);
    } else {
      console.warn("Mahsulot topilmadi:", productCode);
    }
    
    
    
    // if (productCode) {
    // this.masterService.GetProductbyCode(productCode).subscribe(data =>{
    //   let proData:any;
    //    proData = data
    //   if(proData != null){
    //     this.invoiceProduct.get("productName")?.setValue(proData.name)
    //     this.invoiceProduct.get("salesPrice")?.setValue(proData.name)
    //   }
    // })

    
  }
}
