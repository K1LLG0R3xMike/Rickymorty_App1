import { TestBed } from '@angular/core/testing';

import { RickyMortyService } from './ricky-morty-service.service';

describe('RickyMortyServiceService', () => {
  let service: RickyMortyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RickyMortyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
