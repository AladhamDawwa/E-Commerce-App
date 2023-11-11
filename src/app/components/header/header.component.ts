import { CartService } from './../../services/cart.service';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent {
  
  cart : Cart = {items : []};
  total = 0;
  numOfCartItems = 0;
  cartSubscription : Subscription | undefined;

  constructor(private cartService : CartService) {}

  ngOnInit(){
    this.cartSubscription = this.cartService.cart.subscribe(
      (_cart : Cart) => {
        this.cart = _cart;
        this.numOfCartItems = this.cartService.getCartItems();
        this.total = this.cartService.calculateTotal();
      }
    );
  }

  clearCart(){
    this.cartService.clearCart();
  }

  ngOnDestroy(){
    if(this.cartSubscription) this.cartService.cart.unsubscribe();
  }
}
