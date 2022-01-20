import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LivraisonComponent } from './livraison.component';



@NgModule({
  declarations: [LivraisonComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[LivraisonComponent]
})
export class LivraisonModule { }
