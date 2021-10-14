import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';

import { MatDialogRef } from '@angular/material/dialog';
import { HeroesModel } from '../../models/heroes.model';

@Component({
  selector: 'app-heroe-card',
  templateUrl: './heroe-card.component.html',
  styleUrls: ['./heroe-card.component.scss'],
})
export class HeroeCardComponent implements OnInit {
  private heroe!: HeroesModel;
  public heroeForm!: FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private heroesService: HeroesService,
    private dialogRef: MatDialogRef<HeroeCardComponent>
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup() {
    this.heroeForm = this.formBuilder.group({
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

  get getControl() {
    return this.heroeForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.heroeForm.invalid) {
      return;
    }
    console.log(this.heroeForm.value);
    this.heroe = this.heroeForm.value;
    this.heroesService.saveHeroe(this.heroe).subscribe(res=>{
      console.log(res);
    });
    alert('SUCESS!!');
    this.onClose();
  }

  onReset() {
    this.submitted = false;
    this.heroeForm.reset();
  }

  onClose() {
    this.heroeForm.reset();
    this.dialogRef.close();
  }
}
