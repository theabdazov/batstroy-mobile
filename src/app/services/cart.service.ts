import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartMap = new BehaviorSubject<{ [key: number]: number }>({});

  constructor() {
    const idsString = localStorage.getItem('cart');
    if (idsString) {
      this.cartMap.next(JSON.parse(idsString));
    }
  }

  addToCart(productId: number, count: number): void {
    const currentCartMap = this.cartMap.getValue();
    currentCartMap[productId] = count;
    this.cartMap.next(currentCartMap);
    localStorage.setItem('cart', JSON.stringify(currentCartMap));
  }

  deleteFromCart(productId: number): void {
    const currentCartMap = this.cartMap.getValue();
    delete currentCartMap[productId];
    this.cartMap.next(currentCartMap);
    localStorage.setItem('cart', JSON.stringify(currentCartMap));
  }

  clearCart(): void {
    this.cartMap.next({});
    localStorage.removeItem('cart');
  }

}
