import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { DetailsConstructorParams } from '../feature-details/interfaces/details-constructor-params';
import { DynamicEvent } from '../feature-details/interfaces/dynamic-event';

@Component({
  selector: 'anms-poi-popup',
  templateUrl: './poi-popup.component.html',
  styleUrls: ['./poi-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoiPopupComponent implements OnInit {
  popRequest: DetailsConstructorParams = {
    params: { h: 'hello' },
    component: 'newcomp'
  };

  constructor() {}

  ngOnInit(): void {}
}
