import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { UpdatePersonnelComponent } from './update-personnel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [UpdatePersonnelComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[AuthService,EntrepriseService],
  exports:[UpdatePersonnelComponent]
})
export class UpdatePersonnelModule { }
