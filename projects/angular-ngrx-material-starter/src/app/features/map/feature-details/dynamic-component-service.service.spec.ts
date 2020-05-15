import { TestBed } from '@angular/core/testing';

import { DynamicComponentEventsService } from './dynamic-component-events.service';

describe('DynamicComponentServiceService', () => {
  let service: DynamicComponentEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicComponentEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
