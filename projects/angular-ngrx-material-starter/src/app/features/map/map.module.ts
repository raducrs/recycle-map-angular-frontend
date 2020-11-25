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
import { NewFeatureDialogComponent } from './feature-details-components/new-feature-dialogs/new-feature-dialog/new-feature-dialog.component';
import { TypesRecycableDialogComponent } from './feature-details-components/new-feature-dialogs/types-recycable-dialog/types-recycable-dialog.component';
import { RecycableTabComponent } from './feature-details-components/new-feature-dialogs/recycable-tab/recycable-tab.component';
import { TabNavigationModule } from './tab-navigation/tab-navigation.module';
import { AdaptableStepperComponent } from './feature-details-components/new-feature-dialogs/adaptable-stepper/adaptable-stepper.component';
import { LocationTabComponent } from './feature-details-components/new-feature-dialogs/location-tab/location-tab.component';
import { NewFeatureDialogsModule } from './feature-details-components/new-feature-dialogs/new-feature-dialogs.module';
import { SearchFilterDropdownComponent } from './search-filter-dropdown/search-filter-dropdown.component';

@NgModule({
  declarations: [
    MapComponent,
    PoiPopupComponent,
    SearchComponent,
    SearchInputComponent,
    NewFeatureComponent,
    SearchFilterDropdownComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MapRoutingModule,
    FeatureDetailsModule,
    TabNavigationModule
  ],
  entryComponents: [NewFeatureComponent],
  providers: [
    {
      provide: DYNAMIC_COMPONENT_MAP,
      useValue: { newcomp: NewFeatureComponent }
    }
  ]
})
export class MapModule {}
