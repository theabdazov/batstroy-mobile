import {Component, OnInit} from '@angular/core';
import {ProductFilterPublic, ProductShortPublic} from '../../../interfaces/product';
import {ProductService} from '../../../services/product.service';
import {PaginationPage} from '../../../interfaces/pagination';
import {CartService} from '../../../services/cart.service';
import {CategoryService} from '../../../services/category.service';
import {Category, CategoryNode, CategoryWithParent} from '../../../interfaces/category';
import {ClearSubscriptions} from '../../../util/clear-subscriptions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent extends ClearSubscriptions implements OnInit {

  products: ProductShortPublic[] = [];
  filter: ProductFilterPublic = {
    categoryId: 0,
    count: 5,
    page: 1,
    name: null
  };
  totalCount = 0;
  categoryNodes: CategoryNode[] = [];
  categoryChildrenMap: { [key: number]: Category[] } = {};
  categoryMap: { [key: number]: CategoryWithParent } = {};
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 'auto',
    spaceBetween: 20
  };

  cartMap: { [key: number]: number } = {};

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private categoryService: CategoryService,
  ) {
    super();
  }

  ngOnInit() {
    this.getData();
    this.getCategories();
    this.addSubscription(
      this.cartService.cartMap.subscribe(
        data => {
          this.cartMap = data;
        }
      )
    );
  }

  getData(): void {
    this.productService.getProductListPublic(this.filter).subscribe(
      response => {
        this.products = [];
        this.filter.page = 1;
        this.handleResponse(response);
      }
    );
  }

  getCategories(): void {
    this.categoryService.getAllTree().subscribe(
      response => {
        this.categoryNodes = response;
        const recursion = (parentId: number, nodes: CategoryNode[]) => {
          this.categoryChildrenMap[parentId] = [];
          if (nodes && nodes.length) {
            nodes.forEach(item => {
              recursion(item.id, item.children);
              const {children, ...data} = item;
              this.categoryMap[item.id] = {...data, parentId};
              this.categoryChildrenMap[parentId].push(data);
            });
          }
        };
        recursion(0, this.categoryNodes);
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
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart(productId, 1);
  }

  categorySelect(categoryId: number): void {
    this.filter.categoryId = categoryId;
    this.getData();
  }

  onClickBack(): void {
    if (this.categoryMap[this.filter.categoryId] && this.categoryMap[this.filter.categoryId].parentId) {
      this.filter.categoryId = this.categoryMap[this.filter.categoryId].parentId;
    } else {
      this.filter.categoryId = 0;
    }
    this.getData();
  }

  search(): void {
    this.getData();
  }
}
