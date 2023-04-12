import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuRoutingModule } from './cu-routing.module';
import { CuComponent } from './cu.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CuComponent],
  imports: [
    CommonModule,
    CuRoutingModule,
    SharedModule
  ]
})
export class CuModule { }
