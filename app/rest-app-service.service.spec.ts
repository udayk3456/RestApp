import { TestBed } from '@angular/core/testing';

import { RestAppService } from './rest-app-service.service';

describe('RestAppServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestAppService = TestBed.get(RestAppService);
    expect(service).toBeTruthy();
  });
});
