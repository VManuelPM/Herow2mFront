import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from '../core/shared/shared.module';
import { HeroeCardComponent } from './heroes/components/heroe-card/heroe-card.component';
import { UppercaseModule } from './heroes/directives/uppercase/uppercase.module';
import { HeroesService } from './heroes/services/heroes.service';
import { HomeModule } from './home/containers/home.module';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';


@NgModule({
  imports: [
    SharedModule,
    PublicRoutingModule,
    HomeModule,
    UppercaseModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  declarations: [PublicComponent],
  exports: [],
  providers: [HeroesService],
  entryComponents: [HeroeCardComponent],
})
export class PublicModule {
  constructor() {}
}
