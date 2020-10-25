import {Pagination} from './pagination';
import {CharacteristicValue} from './characteristic-value';
import {SaleType} from './sale-type';

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
  characteristicValues: CharacteristicValue[];
  desc: string;
}
