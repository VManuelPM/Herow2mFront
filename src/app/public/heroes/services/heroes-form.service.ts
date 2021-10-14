import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroesModel } from '../models/heroes.model';

@Injectable({
  providedIn: 'root',
})
export class HeroesFormService {
  heroeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  createFormGroup() {
    this.heroeForm = this.formBuilder.group({
      id: [''],
      heroeName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ]),
      ],
      heroeDescription: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ]),
      ],
      heroeImage: [
        '',
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
    });
  }

  getControl() {
    return this.heroeForm.controls;
  }

  setValueForm(heroe: HeroesModel) {
    this.createFormGroup();
    this.heroeForm.setValue({
      id: heroe.id,
      heroeName: heroe.heroeName,
      heroeDescription: heroe.heroeDescription,
      heroeImage: heroe.heroeImage
    });
  }
}
