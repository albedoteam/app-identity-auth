/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Http-404Component } from './http-404.component';

describe('Http-404Component', () => {
  let component: Http-404Component;
  let fixture: ComponentFixture<Http-404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Http-404Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Http-404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
