import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HeroesFormService } from './heroes-form.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('HeroesFormService', () => {
  let service: HeroesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [HeroesFormService],
      declarations: [],
    });
    service = TestBed.inject(HeroesFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
