import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddReductionComponent } from './add-reduction.component';

@NgModule({
  declarations: [AddReductionComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[AddReductionComponent]
})
export class AddReductionModule { }
