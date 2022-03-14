import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CadeauService } from 'src/app/shared/services/cadeau.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateCadeauComponent } from './update-cadeau.component';
import { ProduitService } from 'src/app/shared/services/produit.service';
import { TypePointService } from 'src/app/shared/services/type-point.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';




@NgModule({
  declarations: [UpdateCadeauComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[UpdateCadeauComponent],
  providers:[CadeauService, ProduitService, TypePointService,EntrepriseService]
})
export class UpdateCadeauModule { }
