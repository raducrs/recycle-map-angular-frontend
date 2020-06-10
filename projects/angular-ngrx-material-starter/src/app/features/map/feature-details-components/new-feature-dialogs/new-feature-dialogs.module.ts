import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewFeatureDialogComponent } from './new-feature-dialog/new-feature-dialog.component';
import { TypesRecycableDialogComponent } from './types-recycable-dialog/types-recycable-dialog.component';
import { RecycableTabComponent } from './recycable-tab/recycable-tab.component';
import { AdaptableStepperComponent } from './adaptable-stepper/adaptable-stepper.component';
import { LocationTabComponent } from './location-tab/location-tab.component';
import { NewFeatureComponent } from './new-feature/new-feature.component';
import { NewFeatureDialogsRoutingModule } from './new-feature-dialogs-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { UserTabComponent } from './user-tab/user-tab.component';

@NgModule({
  declarations: [
    NewFeatureComponent,
    NewFeatureDialogComponent,
    TypesRecycableDialogComponent,
    RecycableTabComponent,
    AdaptableStepperComponent,
    LocationTabComponent,
    UserTabComponent
  ],
  imports: [CommonModule, SharedModule, NewFeatureDialogsRoutingModule]
})
export class NewFeatureDialogsModule {}
