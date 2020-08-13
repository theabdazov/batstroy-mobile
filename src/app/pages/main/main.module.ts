import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {CounterModule} from '../../modules/counter/counter.module';
import {FilePathModule} from '../../modules/file-path/file-path.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    CounterModule,
    FilePathModule
  ],
  declarations: [MainPage, ProductListComponent, ProductDetailComponent]
})
export class MainPageModule {}
