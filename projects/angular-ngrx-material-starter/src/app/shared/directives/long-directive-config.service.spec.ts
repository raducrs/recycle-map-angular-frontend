import { TestBed } from '@angular/core/testing';

import { LongDirectiveConfigService } from './long-directive-config.service';

describe('LongDirectiveConfigService', () => {
  let service: LongDirectiveConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LongDirectiveConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
