/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Http-401Component } from './http-401.component';

describe('Http-401Component', () => {
  let component: Http-401Component;
  let fixture: ComponentFixture<Http-401Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Http-401Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Http-401Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
