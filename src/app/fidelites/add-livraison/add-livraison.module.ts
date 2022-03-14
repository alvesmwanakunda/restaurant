import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddLivraisonComponent } from './add-livraison.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypePointService } from 'src/app/shared/services/type-point.service';
import { LivraisonService } from 'src/app/shared/services/livraison.service';





@NgModule({
  declarations: [AddLivraisonComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[AddLivraisonComponent],
  providers:[TypePointService, LivraisonService]
})
export class AddLivraisonModule { }
