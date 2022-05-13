import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeletePointComponent } from './delete-point.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [DeletePointComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[DeletePointComponent]
})
export class DeletePointModule { }
