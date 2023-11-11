import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from './../models/cart.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({items : []});

  constructor(private snackbar : MatSnackBar) { }

  addToCart(product : Product){
    const checkProduct = this.cart.value.items.find((item : CartItem) => product.id === item.product.id);
    if(checkProduct) checkProduct.quantity += 1;
    else this.cart.value.items.push({product, quantity : 1});
    this.cart.next(this.cart.value);
    this.snackbar.open('Product added to cart', 'close', {duration : 3000});
  }

  clearCart(){
    this.cart.value.items = [];
    this.cart.next(this.cart.value);
    this.snackbar.open('Cart cleared', 'OK', {duration : 3000});
  }

  calculateTotal(){
    let total = 0;
    this.cart.value.items.forEach((item : CartItem) => {
      total += item.product.price * item.quantity;
    });
    return total;
  }

  getCartItems(){
    let numOfItems = 0;
    this.cart.value.items.forEach((item : CartItem) => {
      numOfItems += item.quantity;
    });
    return numOfItems;
  }

  removeFromCart(product : CartItem){
    const index = this.cart.value.items.indexOf(product);
    this.cart.value.items.splice(index, 1);
    this.cart.next(this.cart.value);
    this.snackbar.open('Product removed from cart', 'close', {duration : 3000});
  }

  removeOneFromCart(product : CartItem){
    if(product.quantity === 1) this.removeFromCart(product);
    else {
      product.quantity -= 1;
      this.cart.value.items[this.cart.value.items.indexOf(product)] = product;
      this.cart.next(this.cart.value);
      this.snackbar.open('One Product removed from cart', 'close', {duration : 3000});
    }
  }
}
