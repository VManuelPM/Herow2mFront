import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from 'src/app/core/services/spinner/spinner.module';
import { HeroesModule } from '../../heroes/container/heroes.module';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SpinnerModule,
    HeroesModule
  ]
})
export class HomeModule { }
