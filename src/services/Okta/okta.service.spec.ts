/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OktaService } from './okta.service';

describe('Service: Okta', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OktaService]
    });
  });

  it('should ...', inject([OktaService], (service: OktaService) => {
    expect(service).toBeTruthy();
  }));
});
