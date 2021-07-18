/* tslint:disable:no-unused-variable */

import { ElementRef } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { LighterDirective } from './lighter.directive';

describe('Directive: Lighter', () => {
    it('should create an instance', () => {
        const directive = new LighterDirective(new ElementRef(new HTMLDivElement()));
        expect(directive).toBeTruthy();
    });
});
