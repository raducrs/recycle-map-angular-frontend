import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFeatureDialogComponent } from './new-feature-dialog.component';

describe('NewFeatureDialogComponent', () => {
  let component: NewFeatureDialogComponent;
  let fixture: ComponentFixture<NewFeatureDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewFeatureDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFeatureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
