import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecycableTabComponent } from './recycable-tab.component';

describe('RecycableTabComponent', () => {
  let component: RecycableTabComponent;
  let fixture: ComponentFixture<RecycableTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecycableTabComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecycableTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
