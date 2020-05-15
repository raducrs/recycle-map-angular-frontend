import { InjectionToken, Type } from '@angular/core';
import { DetailsComponent } from './interfaces/details-component';
import { NewFeatureComponent } from '../feature-details-components/new-feature/new-feature.component';

export interface ComponentMap {
  [name: string]: Type<DetailsComponent>;
}

export const DYNAMIC_COMPONENT_MAP = new InjectionToken<ComponentMap>(
  'ComponentMap'
);
