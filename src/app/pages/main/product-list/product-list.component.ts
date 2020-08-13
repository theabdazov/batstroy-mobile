import {Component, OnInit} from '@angular/core';
import {ProductFilterPublic, ProductShortPublic} from '../../../interfaces/product';
import {ProductService} from '../../../services/product.service';
import {PaginationPage} from '../../../interfaces/pagination';
import {CartService} from '../../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  products: ProductShortPublic[] = [];

  filter: ProductFilterPublic = {
    categoryId: null,
    count: 5,
    page: 1,
    name: null
  };

  totalCount = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
  }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.productService.getProductListPublic(this.filter).subscribe(
      response => {
        this.handleResponse(response);
      }
    );
  }

  loadMore(event) {
    if (this.totalCount <= this.filter.page * this.filter.count) {
      event.target.complete();
      return null;
    }
    this.filter.page += 1;
    this.productService.getProductListPublic(this.filter).subscribe(
      response => {
        this.handleResponse(response);
        event.target.complete();
      },
      () => {
        event.target.complete();
      },
    );
  }

  doRefresh(event) {
    this.products = [];
    this.filter.page = 1;
    this.productService.getProductListPublic(this.filter).subscribe(
      response => {
        this.handleResponse(response);
        event.target.complete();
      },
      () => {
        event.target.complete();
      },
    );
  }

  handleResponse(response: PaginationPage<ProductShortPublic>): void {
    this.products.push(...response.data);
    this.totalCount = response.totalCount;
  }

  addToCart(productId: number, event: MouseEvent): void {
    event.stopPropagation();
    this.cartService.addToCart(productId, 1);
  }
}
