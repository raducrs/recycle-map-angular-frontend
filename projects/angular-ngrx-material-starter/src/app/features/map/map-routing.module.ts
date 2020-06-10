import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { NewFeatureDialogsModule } from './feature-details-components/new-feature-dialogs/new-feature-dialogs.module';

const routes: Routes = [
  {
    path: '',
    component: MapComponent,
    data: { title: 'anms.menu.settings' }
  },
  {
    path: 'feature',
    loadChildren: () => NewFeatureDialogsModule
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule {}
