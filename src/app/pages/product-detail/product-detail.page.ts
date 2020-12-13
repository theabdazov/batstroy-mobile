import {Component, OnInit} from '@angular/core';
import {ProductDetailPublic} from '../../interfaces/product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';
import {ClearSubscriptions} from '../../util/clear-subscriptions';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage extends ClearSubscriptions implements OnInit {

  product: ProductDetailPublic;
  productId: number;
  count = 1;

  cartMap: { [key: number]: number } = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {
    super();
  }

  ngOnInit() {
    this.productId = parseInt(this.activatedRoute.snapshot.params.id, 10);
    if (this.productId) {
      this.getData();
    }

    this.addSubscription(
      this.cartService.cartMap.subscribe(
        data => {
          this.cartMap = data;
        }
      )
    );
  }

  getData(): void {
    this.productService.getByIdPublic(this.productId).subscribe(
      response => {
        this.product = response;
      }
    );
  }

  addToCart(): void {
    this.cartService.addToCart(this.product.id, this.count);
  }

}
