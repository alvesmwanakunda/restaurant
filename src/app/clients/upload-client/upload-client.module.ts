import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadClientComponent } from './upload-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from 'src/app/shared/services/client.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { EntrepriseService } from '../../shared/services/entreprise.service';



@NgModule({
  declarations: [UploadClientComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[UploadClientComponent],
  providers:[ClientService,EntrepriseService]
})
export class UploadClientModule { }
