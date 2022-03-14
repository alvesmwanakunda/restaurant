import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddCadeauComponent } from './add-cadeau.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadeauService } from 'src/app/shared/services/cadeau.service';
import { ProduitService } from 'src/app/shared/services/produit.service';
import { TypePointService } from 'src/app/shared/services/type-point.service';
import { ProduitModule } from '../produit/produit.module';

@NgModule({
  declarations: [AddCadeauComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ProduitModule
  ],
  exports:[AddCadeauComponent],
  providers:[CadeauService,TypePointService,ProduitService]
})
export class AddCadeauModule { }
