import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: 'product-card.component.html',
  styleUrls: ['product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product | undefined;
  @Input('fullMode') full = false;
  @Output('addToCart') addToCart = new EventEmitter<Product>();

  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
