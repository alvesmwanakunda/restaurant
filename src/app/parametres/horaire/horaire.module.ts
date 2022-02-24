import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoraireComponent } from './horaire.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HoraireService } from 'src/app/shared/services/horaire.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';



@NgModule({
  declarations: [HoraireComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  exports:[HoraireComponent],
  providers:[HoraireService, EntrepriseService]
})
export class HoraireModule { }
