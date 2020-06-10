import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-catalog-toolbar',
  templateUrl: './catalog-toolbar.component.html',
  styleUrls: ['./catalog-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogToolbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
