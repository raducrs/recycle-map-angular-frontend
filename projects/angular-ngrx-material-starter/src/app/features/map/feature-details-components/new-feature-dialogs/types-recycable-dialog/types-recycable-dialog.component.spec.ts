import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesRecycableDialogComponent } from './types-recycable-dialog.component';

describe('TypesRecycableDialogComponent', () => {
  let component: TypesRecycableDialogComponent;
  let fixture: ComponentFixture<TypesRecycableDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TypesRecycableDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesRecycableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
