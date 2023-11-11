import { Product } from './../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const STORE_BASE_URL = 'https://fakestoreapi.com';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpClient : HttpClient) {}

  getProducts() : Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(`${STORE_BASE_URL}/products`);
  }

  getCategories() : Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(`${STORE_BASE_URL}/products/categories`);
  }
}
