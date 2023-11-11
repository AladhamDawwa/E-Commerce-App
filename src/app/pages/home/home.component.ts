import { CartService } from './../../services/cart.service';
import { StoreService } from './../../services/store.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  
  colsCount = 3;
  AllProducts : Array<Product> | undefined;
  products : Array<Product> | undefined;
  productsSubscription : Subscription | undefined;
  sort = 'asc';
  beginIndex = 0;
  endIndex = 0;
  checkFilter = false;
  constructor(private cartService: CartService, private storeService : StoreService) {}
  
  ngOnInit(): void {
    this.getProducts();
  }
  
  ngOnDestroy(): void {
    if(this.productsSubscription) this.productsSubscription.unsubscribe();
  }

  getProducts() {
    this.productsSubscription = this.storeService.getProducts().subscribe(
      (_products : Array<Product>) => {
        this.AllProducts = _products;
        this.products = _products;
    });
  }

  onColumnsChange(colsNum : number) {
    this.colsCount = colsNum;
  }

  onSortChange(sort : string) {
    if(sort === this.sort) return;
    this.sort = sort;
    this.products = this.products?.reverse();
  }

  async onCategoryChange(category : string) {
    if(category === 'All') {
      this.products = this.AllProducts;
      return;
    }
    this.products = this.AllProducts?.filter((product : Product) => product.category === category);
  }

  onNumOfItemsChange(range : Array<number>) {
    this.beginIndex = range[0];
    this.endIndex = range[1];
  }

  onAddToCart(product : Product) {
    this.cartService.addToCart(product);
  }

  toggleFilter(){
    this.checkFilter = !this.checkFilter;
  }
}
