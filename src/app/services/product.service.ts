import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { mainProduct, Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  http = inject(HttpClient);

  private apiUrl = "http://localhost:3000/data"

  getProducts(): Observable<mainProduct[]>{
    return this.http.get<mainProduct[]>(this.apiUrl)
  }

}
