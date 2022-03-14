import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddReductionComponent } from './add-reduction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReductionService } from 'src/app/shared/services/reduction.service';
import { ProduitService } from 'src/app/shared/services/produit.service';
import { TypePointService } from 'src/app/shared/services/type-point.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';


@NgModule({
  declarations: [AddReductionComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[AddReductionComponent],
  providers:[ReductionService,ProduitService,TypePointService,EntrepriseService]
})
export class AddReductionModule { }
