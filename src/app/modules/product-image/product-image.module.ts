import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductImageComponent} from './product-image.component';
import {FilePathModule} from '../file-path/file-path.module';



@NgModule({
  declarations: [
    ProductImageComponent
  ],
  exports: [
    ProductImageComponent
  ],
  imports: [
    CommonModule,
    FilePathModule
  ]
})
export class ProductImageModule { }
