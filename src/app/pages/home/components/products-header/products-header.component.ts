import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: 'products-header.component.html',
  styleUrls: ['products-header.component.css']
})
export class ProductsHeaderComponent {
  @Input('numOfItems') numOfItems : number = 0;
  @ViewChild('sortIcon') sortIcon: ElementRef | undefined;
  @Output() columnsChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() numOfItemsChange = new EventEmitter<Array<number>>();

  pageSize = 5;
  pageIndex = 0;

  ngOnChanges() {
    // console.log(this.numOfItems);
  }

  ngOnInit() {
    this.numOfItemsChange.emit([0, this.pageSize]);
  }

  onColumnsUpdate(count: number) {
    this.columnsChange.emit(count);
  }

  sort() {    
    this.sortIcon?.nativeElement.classList.toggle('flip');
    this.sortChange.emit(this.sortIcon?.nativeElement.classList.contains('flip') ? 'desc' : 'asc');
  }

  rangeChange(el : any) {
    let {pageIndex, pageSize} = el;
    let start = pageIndex * pageSize;
    let end = start + pageSize;
    this.numOfItemsChange.emit([start, end]);
  }
}
