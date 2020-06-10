import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabNavigationComponent } from './tab-navigation/tab-navigation.component';
import { TabItemComponent } from './tab-navigation/tab-item/tab-item.component';
import { TestComponentComponent } from './tab-navigation/test-component/test-component.component';
import { TabRoutingModule } from './tab-navigation/tab-routing.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    TabNavigationComponent,
    TabItemComponent,
    TestComponentComponent
  ],
  exports: [TabNavigationComponent],
  imports: [CommonModule, TabRoutingModule, SharedModule]
})
export class TabNavigationModule {}
