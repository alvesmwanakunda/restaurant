import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmeRoutingModule } from './confirme-routing.module';
import { ConfirmeComponent } from './confirme.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../shared/services/auth.service';


@NgModule({
  declarations: [ConfirmeComponent],
  imports: [
    CommonModule,
    ConfirmeRoutingModule,
    SharedModule
  ],
  providers:[AuthService]
})
export class ConfirmeModule { }
