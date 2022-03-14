import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateLivraisonComponent } from './update-livraison.component';
import { TypePointService } from 'src/app/shared/services/type-point.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { LivraisonService } from 'src/app/shared/services/livraison.service';




@NgModule({
  declarations: [UpdateLivraisonComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[UpdateLivraisonComponent],
  providers:[TypePointService,EntrepriseService,LivraisonService]
})
export class UpdateLivraisonModule { }
