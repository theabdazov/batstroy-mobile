import {Pagination} from './pagination';
import {SaleType} from './sale-type';
import {ProductCharacteristic} from './product-characteristic';

export interface ProductShortPublic {
  id: number;
  name: string;
  price: number;
  photos: string[];
  saleType: SaleType;
}

export interface ProductFilterPublic extends Pagination {
  name: string;
  categoryId: number;
}

export interface ProductDetailPublic extends ProductShortPublic {
  characteristics: ProductCharacteristic[];
  desc: string;
}
