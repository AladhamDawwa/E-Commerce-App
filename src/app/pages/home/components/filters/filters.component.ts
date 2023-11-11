import { Subscription } from 'rxjs';
import { StoreService } from './../../../../services/store.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html',
  styleUrls: ['filters.component.css']
})
export class FiltersComponent {
  categories : Array<string> | undefined;
  @Output('categoryChange') categoryChange = new EventEmitter<string>();
  categoriesSubscription : Subscription | undefined;
  category = 'All';

  constructor(private storeService : StoreService) {}

  ngOnInit(): void {
    this.getCategories();
  }
  
  ngOnDestroy(): void {
    if(this.categoriesSubscription) this.categoriesSubscription.unsubscribe();
  }

  getCategories() {
    this.categoriesSubscription = this.storeService.getCategories().subscribe(
      (_categories : Array<string>) => {
        this.categories = ['All', ..._categories];
    });
  }

  changeCategory(category : string) {
    this.categoryChange.emit(category);
    this.category = category;
  }
}
