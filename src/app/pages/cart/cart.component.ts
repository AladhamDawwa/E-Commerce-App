import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.css']
})
export class CartComponent {

  total = 0;
  cart : Cart = {items : []};

  constructor(private cartService : CartService, private httpClient : HttpClient) {}

  ngOnInit(){
    this.cartService.cart.subscribe(
      (_cart : Cart) => {
        this.cart = _cart;
        this.total = this.cartService.calculateTotal();
      }
    );
  }

  removeItem(item : CartItem){
    this.cartService.removeFromCart(item);
  }

  clearCart(){
    this.cartService.clearCart();
  }

  addToCart(item : CartItem){
    this.cartService.addToCart(item.product);
  }

  removeOneFromCart(item : CartItem){
    this.cartService.removeOneFromCart(item);
  }

  onCheckout(){
    alert('No payment here :)');
  }
}
