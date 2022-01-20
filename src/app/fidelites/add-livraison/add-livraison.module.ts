import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddLivraisonComponent } from './add-livraison.component';



@NgModule({
  declarations: [AddLivraisonComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[AddLivraisonComponent]
})
export class AddLivraisonModule { }
