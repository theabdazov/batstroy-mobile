import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order, OrderAdding} from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = 'api/order';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  create(order: OrderAdding) {
    return this.httpClient.post(this.url, order);
  }
}
