import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddClientComponent } from './add-client.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EntrepriseService } from '../../shared/services/entreprise.service';
import { ClientService } from 'src/app/shared/services/client.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AddClientComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[AddClientComponent],
  providers:[EntrepriseService, ClientService]
})
export class AddClientModule { }
