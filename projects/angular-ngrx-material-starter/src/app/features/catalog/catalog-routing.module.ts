import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogCardComponent } from './catalog-card/catalog-card.component';
import {CatalogDetailComponent} from './catalog-detail/catalog-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogComponent,
    data: { title: 'anms.menu.settings' }
  },
  {
    path: ':id',
    component: CatalogDetailComponent,
    data: { title: 'anms.menu.settings' }
  },
  {
    path: 'card-test',
    component: CatalogCardComponent,
    data: { title: 'anms.menu.settings' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule {}
