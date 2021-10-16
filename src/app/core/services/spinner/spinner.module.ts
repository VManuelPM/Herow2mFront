import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptorService } from '../../interceptors/spinner-interceptor/spinner-interceptor.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  exports:[
    NgxSpinnerModule,
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptorService,
      multi: true,
    }
  ]
})
export class SpinnerModule { }
