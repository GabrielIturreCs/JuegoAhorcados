/* tslint:disable:no-unused-variable */
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Punto3Component } from './punto3.component';

describe('Punto3Component', () => {
  let component: Punto3Component;
  let fixture: ComponentFixture<Punto3Component>;



  beforeEach(() => {
    fixture = TestBed.createComponent(Punto3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
