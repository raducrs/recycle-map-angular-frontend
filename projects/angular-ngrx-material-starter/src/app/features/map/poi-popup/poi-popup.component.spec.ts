import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiPopupComponent } from './poi-popup.component';

describe('PoiPopupComponent', () => {
  let component: PoiPopupComponent;
  let fixture: ComponentFixture<PoiPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PoiPopupComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
