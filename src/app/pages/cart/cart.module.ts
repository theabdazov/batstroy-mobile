import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CartPageRoutingModule} from './cart-routing.module';

import {CartPage} from './cart.page';
import {CounterModule} from '../../modules/counter/counter.module';
import {OrderComponent} from './order/order.component';
import {Toast} from '@ionic-native/toast/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule,
    CounterModule,
  ],
  providers: [Toast],
  declarations: [CartPage, OrderComponent]
})
export class CartPageModule {
}
