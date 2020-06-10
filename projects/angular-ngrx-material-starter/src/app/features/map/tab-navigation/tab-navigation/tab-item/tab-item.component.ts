import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'anms-tab-item',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss']
})
export class TabItemComponent implements OnInit {
  @Input()
  active = false;

  @Input()
  icon = 'search';

  @Input()
  text: string;

  constructor() {}

  ngOnInit(): void {}
}
