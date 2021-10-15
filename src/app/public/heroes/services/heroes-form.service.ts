import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroesModel } from '../models/heroes.model';

@Injectable({
  providedIn: 'root',
})
export class HeroesFormService {
  public heroeForm!: FormGroup;
  private reg !: string;

  constructor(private formBuilder: FormBuilder) {
    this.reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
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
        Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(this.reg)]),
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
