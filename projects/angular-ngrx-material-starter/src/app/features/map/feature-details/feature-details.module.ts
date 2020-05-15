import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailContainerDirective } from './detail-container.directive';
import { DetailsContainerComponent } from './details-container/details-container.component';
import { ComponentMap, DYNAMIC_COMPONENT_MAP } from './details-component-map';
import { DynamicComponentEventsService } from './dynamic-component-events.service';

@NgModule({
  declarations: [DetailsContainerComponent, DetailContainerDirective],
  imports: [CommonModule],
  exports: [DetailsContainerComponent],
  providers: [
    { provide: DYNAMIC_COMPONENT_MAP, useValue: {} as ComponentMap },
    DynamicComponentEventsService
  ]
})
export class FeatureDetailsModule {}
