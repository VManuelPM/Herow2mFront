import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../core/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { PublicComponent } from './public.component';
import { HomeComponent } from './home/containers/home.component';
import { HeroeCardComponent } from './heroes/components/heroe-card/heroe-card.component';
import { HeroesService } from './heroes/services/heroes.service';
import { HeroesComponent } from './heroes/container/heroes.component';
import { HeroesTableComponent } from './heroes/components/heroe-table/heroe-table.component';
import { HeroesFormService } from './heroes/services/heroes-form.service';

@NgModule({
  imports: [CommonModule, PublicRoutingModule, SharedModule, ReactiveFormsModule],
  declarations: [
    PublicComponent,
    HeroesComponent,
    HomeComponent,
    HeroesTableComponent,
    HeroeCardComponent,
  ],
  exports: [],
  providers: [HeroesService, HeroesFormService],
  entryComponents: [HeroeCardComponent]
})
export class PublicModule {
  constructor() {}
}
