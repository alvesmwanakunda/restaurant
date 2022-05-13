import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProduitService } from 'src/app/shared/services/produit.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProduitComponent } from './update-produit.component';




@NgModule({
  declarations: [UpdateProduitComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[UpdateProduitComponent],
  providers:[ProduitService, EntrepriseService]
})
export class UpdateProduitModule { }
