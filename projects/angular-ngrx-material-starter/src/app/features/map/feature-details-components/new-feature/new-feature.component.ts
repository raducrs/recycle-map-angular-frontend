import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter
} from '@angular/core';
import { DetailsComponent } from '../../feature-details/interfaces/details-component';
import { DetailsParam } from '../../feature-details/interfaces/details-param';
import { DynamicComponentEventsService } from '../../feature-details/dynamic-component-events.service';
import { DynamicEvent } from '../../feature-details/interfaces/dynamic-event';

@Component({
  selector: 'anms-new-feature',
  templateUrl: './new-feature.component.html',
  styleUrls: ['./new-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewFeatureComponent implements OnInit, DetailsComponent {
  @Input()
  params: DetailsParam;

  evt: EventEmitter<DynamicEvent<string>>;

  constructor(private eventsService: DynamicComponentEventsService) {
    this.evt = new EventEmitter<DynamicEvent<string>>();
  }

  ngOnInit(): void {}

  onSuppress() {
    this.evt.emit({ type: 'new-feature-suppress' });
  }
}
