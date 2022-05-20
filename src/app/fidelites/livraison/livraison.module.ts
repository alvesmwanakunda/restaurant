import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LivraisonComponent } from './livraison.component';
import { CadeauService } from 'src/app/shared/services/cadeau.service';



@NgModule({
  declarations: [LivraisonComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[LivraisonComponent],
  providers:[CadeauService]
})
export class LivraisonModule { }
