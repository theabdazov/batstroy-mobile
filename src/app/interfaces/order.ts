export interface Order {
  id: number;
  customerFullName: string;
  customerPhoneNumber: string;
  comment: string;
  address: string;
  products: OrderProduct[];
}

export interface OrderProduct {
  productId: number;
  count: number;
}

export interface OrderAdding {
  customerFullName: string;
  customerPhoneNumber: string;
  comment?: string;
  address: string;
  products: OrderProduct[];
}
