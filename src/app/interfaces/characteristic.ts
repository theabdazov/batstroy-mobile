import {Category} from './category';

export interface Characteristic {
  id: number;
  name: string;
  valueList: string[];
  category: Category;
  orderNumber: number;
}
