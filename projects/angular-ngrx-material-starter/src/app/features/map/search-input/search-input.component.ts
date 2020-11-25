import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'anms-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputComponent {
  @Input()
  placeholder: string;

  @Input()
  value = '';
  @Input()
  disabled = false;

  @Output()
  onFocus = new EventEmitter<boolean>();

  hasFocus = false;

  focused() {
    this.hasFocus = true;
    this.onFocus.emit(true);
  }
}
