import {Component, HostListener, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {OrderAdding, OrderProduct} from '../../../interfaces/order';
import {CartService} from '../../../services/cart.service';
import {OrderService} from '../../../services/order.service';
import {Toast} from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  orderAdding: OrderAdding = {
    products: [],
    customerFullName: '',
    customerPhoneNumber: '',
    address: '',
    comment: ''
  };

  @HostListener('document:ionBackButton', ['$event'])
  overrideHardwareBackAction($event: any) {
    this.dismiss();
  }

  constructor(
    private modalController: ModalController,
    private cartService: CartService,
    private orderService: OrderService,
    private toast: Toast
  ) {
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss(false);
  }

  order(): void {
    if (this.orderAdding.customerFullName && this.orderAdding.customerPhoneNumber && this.orderAdding.address) {
      const productIds: OrderProduct[] = [];
      const cartMap = this.cartService.cartMap.getValue();
      Object.keys(cartMap).forEach(
        key => {
          productIds.push({
            productId: parseInt(key, 10),
            count: cartMap[key]
          });
        }
      );
      this.orderService.create({...this.orderAdding, products: productIds}).subscribe(
        () => {
          this.modalController.dismiss(true);
        }
      );
    } else {
      this.showError();
    }
  }

  showError(): void {
    this.toast.show('Заполните все обязательные поля', '3000', 'bottom').subscribe(
      () => {
      }
    );
  }

}
