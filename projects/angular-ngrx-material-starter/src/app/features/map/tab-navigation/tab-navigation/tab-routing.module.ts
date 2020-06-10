import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponentComponent } from './test-component/test-component.component';

const routes: Routes = [
  {
    path: '',
    component: TestComponentComponent,
    data: { title: 'anms.menu.settings' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabRoutingModule {}
