import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewFeatureComponent } from './new-feature/new-feature.component';

const routes: Routes = [
  {
    path: 'new',
    component: NewFeatureComponent,
    data: { title: 'anms.menu.settings' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewFeatureDialogsRoutingModule {}
