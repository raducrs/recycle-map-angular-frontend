import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'anms-location-tab',
  templateUrl: './location-tab.component.html',
  styleUrls: ['./location-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationTabComponent implements OnInit {
  @Output() selectionMade: EventEmitter<boolean> = new EventEmitter<boolean>();

  shopSameSaturday;
  shopClosedSaturday;
  shopSameSunday;
  shopClosedSunday;
  recycleCenterSameSaturday;
  recycleCenterClosedSaturday;
  recycleCenterSameSunday;
  recycleCenterClosedSunday;

  selection;

  constructor() {}

  ngOnInit(): void {}

  selectedOption(optionId) {
    this.selection = optionId;
    this.selectionMade.emit(true);
  }
}
