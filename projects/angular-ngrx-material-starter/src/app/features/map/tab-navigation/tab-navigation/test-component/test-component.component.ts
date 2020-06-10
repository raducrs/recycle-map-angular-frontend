import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
