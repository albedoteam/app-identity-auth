/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthServerService } from './auth-server.service';

describe('Service: AuthServer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthServerService]
    });
  });

  it('should ...', inject([AuthServerService], (service: AuthServerService) => {
    expect(service).toBeTruthy();
  }));
});
