import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'anms-drop-down-button',
  templateUrl: './drop-down-button.component.html',
  styleUrls: ['./drop-down-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropDownButtonComponent implements OnInit {
  @Input() showText: false;

  constructor() {}

  ngOnInit(): void {}
}
