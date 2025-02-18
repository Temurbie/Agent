import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  http = inject(HttpClient);

  url = "url"

  GetCustomer(){
   return this.http.get(this.url)
  }
  GetCustomerbyCode(code:any){
    return this.http.get(this.url, code)
  }

  GetProducts(){
    return this.http.get(this.url)
  }
  GetProductsbyCode(code:any){
    return this.http.get(this.url , code)
  }
}
