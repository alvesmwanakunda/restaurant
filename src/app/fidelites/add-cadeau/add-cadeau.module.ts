import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddCadeauComponent } from './add-cadeau.component';



@NgModule({
  declarations: [AddCadeauComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports:[AddCadeauComponent]
})
export class AddCadeauModule { }
