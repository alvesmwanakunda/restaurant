import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReductionComponent } from './reduction.component';
import { CadeauService } from 'src/app/shared/services/cadeau.service';

@NgModule({
  declarations: [ReductionComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[ReductionComponent],
  providers:[CadeauService]
})
export class ReductionModule { }
