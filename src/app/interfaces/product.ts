import {Pagination} from './pagination';
import {CharacteristicValue} from './characteristic-value';

export interface ProductShortPublic {
  id: number;
  name: string;
  price: number;
  photos: string[];
}

export interface ProductFilterPublic extends Pagination {
  name: string;
  categoryId: number;
}

export interface ProductDetailPublic extends ProductShortPublic {
  characteristicValues: CharacteristicValue[];
  desc: string;
}
