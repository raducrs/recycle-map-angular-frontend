import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogToolbarComponent } from './catalog-toolbar.component';

describe('CatalogToolbarComponent', () => {
  let component: CatalogToolbarComponent;
  let fixture: ComponentFixture<CatalogToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogToolbarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
