import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmePhoneComponent } from './confirme-phone.component';
import { ConfirmePhoneRoutingModule } from './confirme-phone-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';


@NgModule({
  declarations: [ConfirmePhoneComponent],
  imports: [
    CommonModule,
    ConfirmePhoneRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[AuthService]
})
export class ConfirmePhoneModule { }
