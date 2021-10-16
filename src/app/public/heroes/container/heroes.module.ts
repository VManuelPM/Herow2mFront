import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from './heroes.component';
import { SpinnerModule } from 'src/app/core/services/spinner/spinner.module';
import { HeroeTableModule } from '../components/heroe-table/heroe-table.module';
import { HeroeCardModule } from '../components/heroe-card/heroe-card.module';



@NgModule({
  declarations: [
    HeroesComponent
  ],
  imports: [
    CommonModule,
    HeroeTableModule,
    HeroeCardModule,
    SpinnerModule
  ],
  exports:[
    HeroesComponent
  ]
})
export class HeroesModule { }
