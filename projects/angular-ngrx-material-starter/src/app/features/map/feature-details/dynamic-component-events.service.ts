import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicEvent } from './interfaces/dynamic-event';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentEventsService implements OnDestroy {
  eventObserver: BehaviorSubject<DynamicEvent>;

  constructor() {
    this.eventObserver = new BehaviorSubject<DynamicEvent>({ type: 'blank' });
  }

  onEvent(viewName, eventName: string, eventHandler) {
    // @TODO develop this
  }

  fireEvent(event: DynamicEvent) {
    this.eventObserver.next(event);
  }

  ngOnDestroy(): void {}
}
