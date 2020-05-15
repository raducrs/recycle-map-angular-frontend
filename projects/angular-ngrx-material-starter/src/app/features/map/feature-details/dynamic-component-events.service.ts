import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentEventsService implements OnDestroy {
  private eventObserver: BehaviorSubject<any>;

  constructor() {
    this.eventObserver = new BehaviorSubject<any>({});
  }

  onEvent(viewName, eventName: string, eventHandler) {
    // @TODO develop this
  }

  fireEvent(event: any) {
    this.eventObserver.next(event);
  }

  ngOnDestroy(): void {}
}
