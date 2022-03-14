import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitService } from 'src/app/shared/services/produit.service';
import { TypePointService } from 'src/app/shared/services/type-point.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReductionService } from 'src/app/shared/services/reduction.service';
import { UpdateReductionComponent } from './update-reduction.component';




@NgModule({
  declarations: [UpdateReductionComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[UpdateReductionComponent],
  providers:[ProduitService, TypePointService,EntrepriseService,ReductionService]
})
export class UpdateReductionModule { }
