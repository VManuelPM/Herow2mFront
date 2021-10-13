import { NgModule } from '@angular/core';
import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../core/shared/shared.module';

import { PublicComponent } from './public.component';
import { HomeComponent } from './home/containers/home.component';
import { HeroeCardComponent } from './heroes/components/heroe-card/heroe-card.component';
import { HeroesService } from './heroes/services/heroes.service';
import { HeroesComponent } from './heroes/container/heroes.component';
import { HeroesTableComponent } from './heroes/components/heroe-table/heroe-table.component';

@NgModule({
  imports: [PublicRoutingModule, SharedModule],
  declarations: [
    PublicComponent,
    HeroesComponent,
    HomeComponent,
    HeroesTableComponent,
    HeroeCardComponent,
  ],
  exports: [],
  providers: [HeroesService]
})
export class PublicModule {
  constructor() {}
}
