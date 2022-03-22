import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProduitComponent } from './produit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProduitService } from 'src/app/shared/services/produit.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { FileUploadModule } from 'ng2-file-upload';
import { AddCadeauComponent } from '../add-cadeau/add-cadeau.component';
import { AddReductionComponent } from '../add-reduction/add-reduction.component';


@NgModule({
  declarations: [ProduitComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
  ],
  exports:[ProduitComponent],
  providers:[ProduitService, EntrepriseService,AddCadeauComponent,AddReductionComponent]
})
export class ProduitModule { }
