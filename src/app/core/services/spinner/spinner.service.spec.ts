import { TestBed } from '@angular/core/testing';
import { NgxSpinnerService } from 'ngx-spinner';

import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;
  let ngxSpinnerService: jasmine.SpyObj<NgxSpinnerService>;
  let spinnerService: jasmine.SpyObj<SpinnerService>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);

    ngxSpinnerService = TestBed.inject(
      NgxSpinnerService
    ) as jasmine.SpyObj<NgxSpinnerService>;
    spinnerService = TestBed.inject(
      SpinnerService
    ) as jasmine.SpyObj<SpinnerService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('call spinner', () => {
    const spinnerServiceSpy = spyOn(spinnerService, "callSpinner" ).and.callThrough();
    const ngxSpinnerServiceSpy = spyOn(ngxSpinnerService,  "show").and.callThrough();
    service.callSpinner();
    expect(spinnerServiceSpy).toHaveBeenCalledTimes(1);
    expect(ngxSpinnerServiceSpy).toHaveBeenCalledTimes(1);
  });

  it('stop spinner', () => {
    const spinnerServiceSpy = spyOn(spinnerService, "stopSpinner" ).and.callThrough();
    const ngxSpinnerServiceSpy = spyOn(ngxSpinnerService,  "hide").and.callThrough();
    service.stopSpinner();
    expect(spinnerServiceSpy).toHaveBeenCalledTimes(1);
    expect(ngxSpinnerServiceSpy).toHaveBeenCalledTimes(1);
  });
});
