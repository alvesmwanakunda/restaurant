import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteCadeauComponent } from './delete-cadeau.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [DeleteCadeauComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[DeleteCadeauComponent]
})
export class DeleteCadeauModule { }
