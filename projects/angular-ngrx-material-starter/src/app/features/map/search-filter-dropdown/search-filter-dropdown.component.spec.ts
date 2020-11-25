import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilterDropdownComponent } from './search-filter-dropdown.component';

describe('SearchFilterDropdownComponent', () => {
  let component: SearchFilterDropdownComponent;
  let fixture: ComponentFixture<SearchFilterDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFilterDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFilterDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
