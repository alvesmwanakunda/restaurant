import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPasswordComponent } from './new-password.component';
import { NewPasswordRoutingModule } from './new-password-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../shared/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [NewPasswordComponent],
  imports: [
    CommonModule,
    NewPasswordRoutingModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NewPasswordModule { }
