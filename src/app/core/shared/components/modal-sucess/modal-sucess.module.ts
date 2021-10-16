import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSucessComponent } from './modal-sucess.component';
import {MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ModalSucessComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [ModalSucessComponent,MatDialogModule],
})
export class ModalSucessModule {}
