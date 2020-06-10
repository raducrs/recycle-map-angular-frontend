import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChildren,
  QueryList,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { TabItemComponent } from './tab-item/tab-item.component';

@Component({
  selector: 'anms-tab-navigation',
  templateUrl: './tab-navigation.component.html',
  styleUrls: ['./tab-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabNavigationComponent implements OnInit {
  tabItems = [
    {
      icon: 'search',
      text: 'Ce se recicleaza aici?',
      active: true
    },
    {
      icon: 'plus',
      text: 'Cum se recicleaza aici?',
      active: false
    },
    {
      icon: 'times',
      text: 'Cine?',
      active: false
    }
  ];

  activetabId = 0;

  constructor() {}

  ngOnInit(): void {}

  selectTab(tabIdx) {
    this.tabItems.forEach(tab => (tab.active = false));
    this.tabItems[tabIdx].active = true;
    this.activetabId = tabIdx;
  }

  swipeDelta(delta) {
    console.log('swipe', delta);
    let newIndex = this.activetabId + delta;
    newIndex =
      newIndex > this.tabItems.length ? this.tabItems.length - 1 : newIndex;
    newIndex = newIndex < 0 ? 0 : newIndex;
    this.selectTab(newIndex);
  }
}
