import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

import { HeroesModel } from '../../models/heroes.model';
import { HeroesFormService } from '../../services/heroes-form.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-heroe-card',
  templateUrl: './heroe-card.component.html',
  styleUrls: ['./heroe-card.component.scss'],
})
export class HeroeCardComponent implements OnInit {
  heroe!: HeroesModel;
  public submitted = false;
  image!: string;

  constructor(
    private heroesFormService: HeroesFormService,
    private heroesService: HeroesService,
    private dialogRef: MatDialogRef<HeroeCardComponent>,
  ) {}

  ngOnInit(): void {}

  get getHeroeForm() {
    return this.heroesFormService.heroeForm;
  }

  get getControl() {
    return this.heroesFormService.getControl();
  }

  formInvalid() {
    return this.getHeroeForm.invalid;
  }

  getFormImage(): string {
    return this.getHeroeForm.get('heroeImage')?.value;
  }

  onSubmit() {
    this.submitted = true;
    if (this.formInvalid()) {
      return;
    }
    this.heroe = this.heroesFormService.heroeForm.value;

    if (!this.heroe.id) {
      this.heroesService
        .saveHeroe(this.heroe)
        .toPromise()
        .then((res) => {
          if (!res) {
            alert('Error saving');
          }
        });
    } else {
      this.heroesService
        .updateHeroe(this.heroe)
        .toPromise()
        .then((res) => {
          if (!res) {
            alert('Error updating');
          }
        });
    }
    this.onReset();
    this.onClose();
  }

  onReset() {
    this.submitted = false;
    this.heroesFormService.heroeForm.reset();
  }

  onClose() {
    this.heroesFormService.heroeForm.reset();
    this.dialogRef.close(true);
  }
}
