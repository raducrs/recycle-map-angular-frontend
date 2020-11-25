import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogCardComponent } from './catalog-card/catalog-card.component';
import { CatalogToolbarComponent } from './catalog-toolbar/catalog-toolbar.component';
import { DropDownButtonComponent } from './catalog-toolbar/drop-down-button/drop-down-button.component';
import { CatalogDetailComponent } from './catalog-detail/catalog-detail.component';

@NgModule({
  declarations: [
    CatalogComponent,
    CatalogCardComponent,
    CatalogToolbarComponent,
    DropDownButtonComponent,
    CatalogDetailComponent
  ],
  imports: [CommonModule, SharedModule, CatalogRoutingModule]
})
export class CatalogModule {}
