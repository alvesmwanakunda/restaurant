import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmeEmailComponent } from './confirme-email.component';
import { ConfirmeEmailRoutingModule } from './confirme-email-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../shared/services/auth.service';


@NgModule({
  declarations: [ConfirmeEmailComponent],
  imports: [
    CommonModule,
    ConfirmeEmailRoutingModule,
    SharedModule
  ],
  providers:[AuthService]
})
export class ConfirmeEmailModule { }
