/* tslint:disable:no-unused-variable */

import { ElementRef } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { DarkerColorDirective } from './darker-color.directive';

describe('Directive: DarkerColor', () => {
	it('should create an instance', () => {
		const directive = new DarkerColorDirective(new ElementRef(new HTMLDivElement()));
		expect(directive).toBeTruthy();
	});
});
