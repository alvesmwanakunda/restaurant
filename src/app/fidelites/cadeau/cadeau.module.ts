import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CadeauComponent } from './cadeau.component';
import { CadeauService } from 'src/app/shared/services/cadeau.service';



@NgModule({
  declarations: [CadeauComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[CadeauComponent],
  providers:[CadeauService]
})
export class CadeauModule { }
