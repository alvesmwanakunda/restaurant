import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReductionComponent } from './reduction.component';

@NgModule({
  declarations: [ReductionComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[ReductionComponent]
})
export class ReductionModule { }
