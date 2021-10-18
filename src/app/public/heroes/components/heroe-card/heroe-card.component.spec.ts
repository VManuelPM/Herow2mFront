import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { UppercaseDirective } from '../../directives/uppercase/uppercase.directive';
import { HeroesModel } from '../../models/heroes.model';
import { HeroesFormService } from '../../services/heroes-form.service';
import { HeroesService } from '../../services/heroes.service';
import { HeroeCardComponent } from './heroe-card.component';

describe('HeroeCardComponent', () => {
  let component: HeroeCardComponent;
  let fixture: ComponentFixture<HeroeCardComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let heroeForm!: FormGroup;
  let heroesFormService: jasmine.SpyObj<HeroesFormService>;
  let heroe: HeroesModel;

  const dialogMock = {
    close: () => {},
  };

  beforeEach(async () => {
    const heroesFormServiceSpy = jasmine.createSpyObj('HeroesFormService', [
      'createFormGroup',
    ]);
    await TestBed.configureTestingModule({
      declarations: [HeroeCardComponent, UppercaseDirective],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatDialogModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: FormBuilder, useValue: formBuilder },
        { provide: HeroesFormService, userValue: heroesFormServiceSpy },
        { provide: TranslateService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    heroesFormService = TestBed.inject(
      HeroesFormService
    ) as jasmine.SpyObj<HeroesFormService>;
    heroe = {
      id: 1,
      heroeName: 'test',
      heroeDescription: 'test',
      heroeImage: 'https://cdn-icons-png.flaticon.com/512/2503/2503183.png',
    };
    heroesFormService.setValueForm(heroe);
    fixture = TestBed.createComponent(HeroeCardComponent);
    component = fixture.componentInstance;
    component.getHeroeForm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be uppercase', () => {
    const input = fixture.nativeElement.querySelector('#heroeName');
    const uppercase = input.style.textTransform;
    expect(uppercase).toBe('uppercase');
  });

  it('should form invalid', () => {
    heroe = {
      id: 1,
      heroeName: 'te',
      heroeDescription: 'te',
      heroeImage: 'https://cdn-icons-png.flaticon.com/512/2503/2503183.png',
    };
    heroesFormService.setValueForm(heroe);
    expect(component.formInvalid()).toBeTrue();
  });

  it('should onSubmit', () => {
    heroe = {
      id: 1,
      heroeName: 'test',
      heroeDescription: 'test',
      heroeImage: 'https://cdn-icons-png.flaticon.com/512/2503/2503183.png',
    };
    heroesFormService.setValueForm(heroe);
    expect(component.formInvalid()).toBeFalse();
    component.onSubmit();
  });
});
