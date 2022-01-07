import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddClientComponent } from './add-client.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [AddClientComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[AddClientComponent]
})
export class AddClientModule { }
