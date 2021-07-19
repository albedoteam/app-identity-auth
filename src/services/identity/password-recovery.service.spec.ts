/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PasswordRecoveryService } from './password-recovery.service';

describe('Service: PasswordRecovery', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [PasswordRecoveryService]
		});
	});

	it('should ...', inject([PasswordRecoveryService], (service: PasswordRecoveryService) => {
		expect(service).toBeTruthy();
	}));
});
