import { TestBed } from '@angular/core/testing';

import { HeroesFormService } from './heroes-form.service';

describe('HeroesFormService', () => {
  let service: HeroesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroesFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
