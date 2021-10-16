import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ModalConfirmationModule } from 'src/app/core/shared/components/modal-confirmation/modal-confirmation.module';
import { ModalSucessModule } from 'src/app/core/shared/components/modal-sucess/modal-sucess.module';
import { HeroesTableComponent } from './heroe-table.component';

@NgModule({
  declarations: [HeroesTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ModalConfirmationModule,
    ModalSucessModule,
  ],
  exports: [HeroesTableComponent],
})
export class HeroeTableModule {}
