/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CallbackService } from './callback.service';

describe('Service: Callback', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [CallbackService]
		});
	});

	it('should ...', inject([CallbackService], (service: CallbackService) => {
		expect(service).toBeTruthy();
	}));
});
