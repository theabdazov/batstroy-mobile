import {Component, OnInit} from '@angular/core';
import {ClearSubscriptions} from '../../util/clear-subscriptions';
import {ProductShortPublic} from '../../interfaces/product';
import {CartService} from '../../services/cart.service';
import {ProductService} from '../../services/product.service';
import {ModalController} from '@ionic/angular';
import {OrderComponent} from './order/order.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage extends ClearSubscriptions implements OnInit {

  cartMap: { [key: number]: number } = {};
  totalPrice = 0;
  products: ProductShortPublic[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    public modalController: ModalController
  ) {
    super();
  }

  ngOnInit(): void {
    this.addSubscription(
      this.cartService.cartMap.subscribe(
        data => {
          this.cartMap = data;
          const count = Object.keys(data).length;
          if (count) {
            this.load();
          } else {
            this.products = [];
          }
        }
      )
    );
  }

  load(): void {
    const ids = Object.keys(this.cartService.cartMap.getValue()).map(id => parseInt(id, 10));
    this.productService.getByIdsPublic(ids).subscribe(
      response => {
        this.products = response;
        this.calculateTotalPrice();
      }
    );
  }

  delete(productId: number): void {
    this.cartService.deleteFromCart(productId);
  }

  calculateTotalPrice(): void {
    this.totalPrice = 0;
    this.products.forEach(product => {
      this.totalPrice += product.price * this.cartMap[product.id];
    });
  }

  updateCount(productId: number, value: number) {
    this.cartService.addToCart(productId, value);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: OrderComponent,
      cssClass: 'my-custom-class'
    });
    modal.onWillDismiss().then(
      result => {
        if (result.data) {
          this.cartService.clearCart();
        }
      }
    );
    return await modal.present();
  }


}
