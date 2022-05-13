import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProduitComponent } from './add-produit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProduitService } from 'src/app/shared/services/produit.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AddProduitComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[AddProduitComponent],
  providers:[ProduitService,EntrepriseService]
})
export class AddProduitModule { }
