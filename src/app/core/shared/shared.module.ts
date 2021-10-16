import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './components/header/header.module';
import { FooterModule } from './components/footer/footer.module';
import { SpinnerModule } from '../services/spinner/spinner.module';

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule,
    CommonModule,
    HeaderModule,
    FooterModule,
    SpinnerModule,
  ],
  declarations: [],
  exports: [
    HttpClientModule,
    RouterModule,
    CommonModule,
    HeaderModule,
    FooterModule,
    SpinnerModule,
  ],
  providers: [],
})
export class SharedModule {
  constructor() {}
}
