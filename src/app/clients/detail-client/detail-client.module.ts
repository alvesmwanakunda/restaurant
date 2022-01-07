import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailClientComponent } from './detail-client.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [DetailClientComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[DetailClientComponent]
})
export class DetailClientModule { }
