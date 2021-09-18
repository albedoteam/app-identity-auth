/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ForgetPasswordFormComponent } from './form.component';

describe('ForgetPasswordFormComponent', () => {
	let component: ForgetPasswordFormComponent;
	let fixture: ComponentFixture<ForgetPasswordFormComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ForgetPasswordFormComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ForgetPasswordFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
