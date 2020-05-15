import { DetailsParam } from './details-param';
import { EventEmitter } from '@angular/core';
import { DynamicEvent } from './dynamic-event';

export interface DetailsComponent {
  params: DetailsParam;
  evt: EventEmitter<DynamicEvent<any>>;
}
