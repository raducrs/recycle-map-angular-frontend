import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { SharedModule } from '../../shared/shared.module';
import { MapRoutingModule } from './map-routing.module';
import { PoiPopupComponent } from './poi-popup/poi-popup.component';
import { SearchComponent } from './search/search.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { CoreModule } from '../../core/core.module';
import { NewFeatureComponent } from './feature-details-components/new-feature/new-feature.component';
import { FeatureDetailsModule } from './feature-details/feature-details.module';
import { DYNAMIC_COMPONENT_MAP } from './feature-details/details-component-map';

@NgModule({
  declarations: [
    MapComponent,
    PoiPopupComponent,
    SearchComponent,
    SearchInputComponent,
    NewFeatureComponent
  ],
  imports: [CommonModule, SharedModule, MapRoutingModule, FeatureDetailsModule],
  entryComponents: [NewFeatureComponent],
  providers: [
    {
      provide: DYNAMIC_COMPONENT_MAP,
      useValue: { newcomp: NewFeatureComponent }
    }
  ]
})
export class MapModule {}
