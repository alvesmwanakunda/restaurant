import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmeRoutingModule } from './confirme-routing.module';
import { ConfirmeComponent } from './confirme.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ConfirmeComponent],
  imports: [
    CommonModule,
    ConfirmeRoutingModule,
    SharedModule
  ]
})
export class ConfirmeModule { }
