import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroeCardComponent } from './heroe-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerModule } from 'src/app/core/services/spinner/spinner.module';
import { HeroesFormService } from '../../services/heroes-form.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UppercaseModule } from '../../directives/uppercase/uppercase.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [HeroeCardComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    SpinnerModule,
    MatButtonModule,
    UppercaseModule,
    TranslateModule
  ],
  providers:[HeroesFormService],
  exports: [HeroeCardComponent],
})
export class HeroeCardModule {}
