import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  http = inject(HttpClient);

  private apiUrl = "local"

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl)
  }

}
