import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RegisterComponent,
  ],
  exports: [
    RegisterComponent
  ]
})
export class UserModule { 

}
