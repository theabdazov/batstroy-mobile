import {Subscription} from 'rxjs';
import {OnDestroy} from '@angular/core';

export abstract class ClearSubscriptions implements OnDestroy {
  private subscription: Subscription;

  protected constructor() {
    this.subscription = new Subscription();
  }

  addSubscription(subscription: Subscription): void {
    this.subscription.add(subscription);
  }

  clearAllSubscriptions(): void {
    this.subscription.unsubscribe();
  }

  ngOnDestroy(): void {
    this.clearAllSubscriptions();
  }
}
