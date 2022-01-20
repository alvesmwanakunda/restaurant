import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CadeauComponent } from './cadeau.component';



@NgModule({
  declarations: [CadeauComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[CadeauComponent]
})
export class CadeauModule { }
