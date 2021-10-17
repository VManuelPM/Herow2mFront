import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroeCardComponent } from '../../components/heroe-card/heroe-card.component';
import { UppercaseDirective } from './uppercase.directive';

describe('UppercaseDirective', () => {

  let component: HeroeCardComponent;
  let fixture: ComponentFixture<HeroeCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeroeCardComponent,
        UppercaseDirective
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).createComponent(HeroeCardComponent);
    fixture.detectChanges();
  });

  
});
