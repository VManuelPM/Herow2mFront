import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './components/header/header.module';
import { FooterModule } from './components/footer/footer.module';
import { SpinnerModule } from '../services/spinner/spinner.module';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    HeaderModule,
    FooterModule,
    SpinnerModule
  ],
  declarations: [],
  exports: [
    RouterModule,
    CommonModule,
    HeaderModule,
    FooterModule,
    SpinnerModule
  ],
  providers: [],
})
export class SharedModule {
  constructor() {}
}