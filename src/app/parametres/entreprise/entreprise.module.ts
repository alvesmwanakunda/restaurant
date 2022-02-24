import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrepriseComponent } from './entreprise.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';





@NgModule({
  declarations: [EntrepriseComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  exports:[EntrepriseComponent],
  providers:[EntrepriseService]
})
export class EntrepriseModule { }
