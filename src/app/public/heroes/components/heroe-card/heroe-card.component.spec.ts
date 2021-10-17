import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UppercaseDirective } from '../../directives/uppercase/uppercase.directive';
import { HeroesModel } from '../../models/heroes.model';
import { HeroesFormService } from '../../services/heroes-form.service';
import { HeroeCardComponent } from './heroe-card.component';

describe('HeroeCardComponent', () => {
  let component: HeroeCardComponent;
  let fixture: ComponentFixture<HeroeCardComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let heroeForm!: FormGroup;
  let heroesFormService: jasmine.SpyObj<HeroesFormService>;
  let heroe: HeroesModel;

  beforeEach(async () => {
    const heroesFormServiceSpy = jasmine.createSpyObj('HeroesFormService', [
      'createFormGroup',
    ]);
    await TestBed.configureTestingModule({
      declarations: [HeroeCardComponent, UppercaseDirective],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: FormBuilder, useValue: formBuilder },
        { provide: HeroesFormService, userValue: heroesFormServiceSpy },
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
});
