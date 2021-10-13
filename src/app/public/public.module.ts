import { NgModule } from '@angular/core';
import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../core/shared/shared.module';

import { PublicComponent } from './public.component';
import { HomeComponent } from './home/containers/home.component';

@NgModule({
  imports: [PublicRoutingModule, SharedModule],
  declarations: [PublicComponent, HomeComponent],
  exports: [],
  providers: [],
})
export class PublicModule {
  constructor() {}
}
